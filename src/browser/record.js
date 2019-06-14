// AudioNode分类
// MediaStreamAudioSourceNode 用于连接麦克风设备
// JavascriptProcessorNode 用于处理播放数据
// AudioBufferSourceNode 用于连接音频文件

let leftDataList = []; // 存放左声道数据
let rightDataList = []; // 存放右声道数据

let recordData;

let audioContext, jsNode;
let mediaNode, mediaStreamOut;

function startRecord(callbackSuccess, callbackFail){
	navigator.mediaDevices.getUserMedia({
  		audio: {
    		sampleRate: 44100,
    		channelCount: 2,
    		volume: 1
    	}
	}).then(mediaStream => {
		mediaStreamOut = mediaStream;
		audioContext = new(window.AudioContext || window.WebkitAudioContext);
		mediaNode = audioContext.createMediaStreamSource(mediaStream);
		jsNode = createJsNode(audioContext);
		jsNode.connect(audioContext.destination);
		jsNode.onaudioprocess = onAudioProcess;
		mediaNode.connect(jsNode);
		callbackSuccess();
	}).catch((err)=>{
	  callbackFail();
  });
}

function stopRecord() {
  mediaStreamOut.getAudioTracks()[0].stop();
  mediaNode.disconnect();
  jsNode.disconnect();

  let leftData = mergeArray(leftDataList),
    rightData = mergeArray(rightDataList);
  leftDataList = []; rightDataList = [];
  let data = interleaveLeftRight(leftData, rightData);
  recordData = createWavFile(data);
}

function cancelRecord(){
  mediaStreamOut.getAudioTracks()[0].stop();
  mediaNode.disconnect();
  jsNode.disconnect();
  leftDataList = []; rightDataList = [];
  recordData = undefined;
}

function getRecordData() { return recordData; }

function createJsNode(audioContext) {
  const BUFFER_SIZE = 4096;
  const INPUT_CHANNEL_COUNT = 2;
  const OUTPUT_CHANNEL_COUNT = 2;

  let creator = audioContext.createScriptProcessor || audioContext.createJavascriptNode;
  creator = creator.bind(audioContext);
  return creator(BUFFER_SIZE, INPUT_CHANNEL_COUNT, OUTPUT_CHANNEL_COUNT);
}

function onAudioProcess(event) {
  let audioBuffer = event.inputBuffer;
  let leftChannelData = audioBuffer.getChannelData(0),
    rightChannelData = audioBuffer.getChannelData(1);

  leftDataList.push(leftChannelData.slice(0));
  rightDataList.push(rightChannelData.slice(0));
}

function interleaveLeftRight(left, right) {
  let length = left.length + right.length;
  let data = new Float32Array(length);

  for (let i = 0; i < length; i++) {
    let k = i * 2;
    data[k] = left[i];
    data[k + 1] = right[i];
  }
  return data;
}

function mergeArray(list) {
  let length = list[0].length * list.length;
  let data = new Float32Array(length),
    offset = 0;

  for (let i = 0; i < list.length; ++i) {
    data.set(list[i], offset);
    offset += list[i].length;
  }
  return data;
}

function createWavFile(audioData) {
  let dataLength = audioData.length * 2;
  let buffer = new ArrayBuffer(44 + dataLength);
  let data = new DataView(buffer);

  let offset = 0;

  let writeString = function (str) {
    for (let i = 0; i < str.length; i++) {
      data.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  // 资源交换文件标识符 
  writeString('RIFF');
  offset += 4;
  // 下个地址开始到文件尾总字节数,即文件大小-8 
  data.setUint32(offset, 36 + dataLength, true);
  offset += 4;
  // WAV文件标志
  writeString('WAVE');
  offset += 4;
  // 波形格式标志 
  writeString('fmt ');
  offset += 4;
  // 过滤字节,一般为 0x10 = 16 
  data.setUint32(offset, 16, true);
  offset += 4;
  // 格式类别 (PCM形式采样数据) 
  data.setUint16(offset, 1, true);
  offset += 2;
  // 通道数 
  data.setUint16(offset, 2, true);
  offset += 2;
  // 采样率,每秒样本数,表示每个通道的播放速度 
  data.setUint32(offset, 44100, true);
  offset += 4;
  // 波形数据传输率 (每秒平均字节数) 单声道×每秒数据位数×每样本数据位/8 
  data.setUint32(offset, 44100 * 4, true);
  offset += 4;
  // 快数据调整数 采样一次占用字节数 单声道×每样本的数据位数/8 
  data.setUint16(offset, 2 * 2, true);
  offset += 2;
  // 每样本数据位数 
  data.setUint16(offset, 16, true);
  offset += 2;
  // 数据标识符 
  writeString('data');
  offset += 4;
  // 采样数据总数,即数据总大小-44 
  data.setUint32(offset, dataLength, true);
  offset += 4;
  // 写入采样数据 
  // if (sampleBits === 8) {
  //   for (let i = 0; i < audioData.length; i++, offset++) {
  //     let s = Math.max(-1, Math.min(1, audioData[i]));
  //     let val = s < 0 ? s * 0x8000 : s * 0x7FFF;
  //     val = parseInt(255 / (65535 / (val + 32768)));
  //     data.setInt8(offset, val, true);
  //   }
  // } else {
    for (let i = 0; i < audioData.length; i++, offset += 2) {
      let s = Math.max(-1, Math.min(1, audioData[i]));
      data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
  // }
  return new Blob([data], {type: 'audio/mp3'});
}

export {
  startRecord,
  stopRecord,
  cancelRecord,
  getRecordData
}
