<template>
  <div class="token-switch">
    <div class="token-switch-header">
      <div style="position: relative;height: 32px;width: 32px;">
        <router-link to="/add-session">
          <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor" aria-hidden="true" class="centered-container"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
          </svg>
        </router-link>
      </div>
    </div>
    <div class="token-switch-body">
      <div class="centered-container token-switch-file-area">
        <div style="position: relative">
          <div class="token-switch-send-file disable-text-select" ref="sendCard" @click.stop="activeCard='sendCard'"
                :class="{'active-card': activeCard==='sendCard'}">
            <div class="token-switch-file-header">发送文件</div>
            <div style="height: calc(100% - 58px);position: relative;">
              <!--文件上传图标-->
              <div>
                <input type="file" class="centered-container" style="width: 32px;height: 32px;opacity: 0" @change.stop="handleFileSelected($event)">
                <svg v-if="uploadState==='initial'" t="1557549380599" id="send-file-button" class="centered-container" style="z-index: -1;" viewBox="0 0 1024 1024" p-id="7096"
                     width="32" height="32">
                  <path
                    d="M570.709333 730.453333H450.56c-88.064 0-159.744-71.68-159.744-159.744V450.56c0-88.064 71.68-159.744 159.744-159.744h120.149333C658.773333 290.816 730.453333 362.496 730.453333 450.56v120.149333c0 88.064-71.68 159.744-159.744 159.744z"
                    fill="#FFE55C" p-id="7097"></path>
                  <path
                    d="M632.832 512.682667c-5.461333 0-10.24-2.048-14.336-6.144L512.682667 401.408 407.552 506.538667c-8.192 8.192-21.162667 8.192-28.672 0-8.192-8.192-8.192-21.162667 0-28.672L498.346667 357.717333c7.509333-7.509333 21.162667-7.509333 28.672 0l119.466666 119.466667c8.192 8.192 8.192 21.162667 0 28.672-3.413333 4.778667-8.874667 6.826667-13.653333 6.826667z"
                    fill="#4D4D4D" p-id="7098"></path>
                  <path
                    d="M512.682667 657.408c-11.605333 0-20.48-8.874667-20.48-20.48v-266.24c0-11.605333 8.874667-20.48 20.48-20.48s20.48 8.874667 20.48 20.48v266.24c0 11.605333-8.874667 20.48-20.48 20.48z"
                    fill="#4D4D4D" p-id="7099"></path>
                  <path
                    d="M647.168 872.448h-273.066667c-124.245333 0-225.28-101.034667-225.28-225.28v-273.066667c0-124.245333 101.034667-225.28 225.28-225.28h273.066667c124.245333 0 225.28 101.034667 225.28 225.28v273.066667c0 124.245333-101.034667 225.28-225.28 225.28z m-273.066667-682.666667c-101.717333 0-184.32 82.602667-184.32 184.32v273.066667c0 101.717333 82.602667 184.32 184.32 184.32h273.066667c101.717333 0 184.32-82.602667 184.32-184.32v-273.066667c0-101.717333-82.602667-184.32-184.32-184.32h-273.066667z"
                    fill="#1afa29" p-id="7100" data-spm-anchor-id="a313x.7781069.0.i26" class="selected"></path>
                </svg>
              </div>
              <!--文件被选择后显示的界面-->
              <div class="centered-container" style="margin: 80px auto;" v-if="uploadState==='fileSelected' || uploadState==='fileSending'">
                <div
                  class="token-switch-send-file-avatar">
                  <div class="token-switch-send-file-clear-file-button">
                    <!--清楚上传文件按钮-->
                    <div style="top: -3px;right: 1px;position: absolute;" @click.self.stop="handleFileClear()">✕</div>
                  </div>
                </div>
                <div style="text-align: center;font-size: 12px;margin: 10px auto;">{{uploadFile.name}}</div>
                <span style="margin: 20px 0;" v-if="uploadState==='fileSending'">
                  <progress :value="uploadFileProgress" max="100" style="background-color: white;height: 2px;width: 150px;border-style: none;"></progress>
                <span style="font-size: 9px;position: relative;top: 5px;right: -10px;" @click="handleFileCancel()">✕</span>
              </span>
              </div>
              <!--上传成功后显示回传token的区域-->
              <div class="transfer-number-display centered-container" v-if="uploadState==='fileSent'">
                <strong style="color:red">提示对方输入</strong>
                <div style="letter-spacing: 13px;font-size: 32px;font-weight: 400;word-wrap: break-word;">
                  {{ returnedNumber }}
                </div>
              </div>
            </div>
            <div class="bottom-area-single-button" style="background-color: crimson"
                 v-if="uploadState==='fileSent' || uploadState==='fileSendError'" @click="resetUploadState()">返回</div>
            <div class="bottom-area-single-button" :style="{'background-color': uploadState==='fileSelected'?'mediumspringgreen':'gray'}"
                 v-if="uploadState==='fileSelected' || uploadState==='initial'" @click.stop="handleFileSend()">发送</div>
          </div>
          <div class="token-switch-receive-file disable-text-select" ref="receiveCard"
               @click.stop="activeCard='receiveCard'"
               :class="{'active-card': activeCard==='receiveCard'}">
              <div class="token-switch-file-header" style="text-align: right">接收文件</div>
              <div style="font-size: 14px;margin: 20px 0 -10px 0;"><strong>输入验证码:</strong></div>
              <div style="display: flex;flex-wrap: wrap;flex: 1 0 auto;align-content: center;">
                <input type="text" class="single-number-input-area"
                       v-for="(item,index) in numberArray" :key="index"
                       v-model="numberArray[index]" :ref="index"
                       @input="handleInputBoxChange(index)"
                       :style="{'pointer-events': activeCard==='receiveCard'?'all':'none'}">
              </div>
              <div class="bottom-area-single-button" :style="{'pointer-events': downloadFileLink?'all':'none',
                                                              'background-color': downloadFileLink?'mediumspringgreen':'gray'}">
                <a :href="downloadFileLink" target="_blank" download="sample" style="text-decoration: none;color: white">接收</a>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "token-switch",
    data: function () {
      return{
        numberArray: Array(6).fill(''),
        uploadState: 'initial',
        uploadFile: null,
        downloadFileLink: null,
        uploadFileProgress: 0,
        returnedNumber: null,
        activeCard: 'sendCard'
      }
    },
    methods:{
      handleFileSelected(event){
        let file = event.target.files[0];
        if (file!==null){
          this.uploadFile = file;
          this.uploadState = 'fileSelected';
        }
      },
      handleFileClear(){
        if (this.uploadFile){
          this.uploadFile = null;
          this.uploadState = 'initial';
        }
      },
      handleFileCancel(){},
      handleFileSend(){
        if(this.uploadFile && this.uploadState!=='fileSending') {
          let form = new FormData();
          form.append('file', this.uploadFile);

          this.uploadState = 'fileSending';
          this.$ajax.post('/uploadTokenFile', form, {
            onUploadProgress: function (progressEvent) {
              if (progressEvent.lengthComputable) {
                this.uploadFileProgress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
              }
            }
          }).then((res)=>{
            if (res.data){
              this.returnedNumber = res.data.returnedNumber;
              this.uploadState = 'fileSent';
              this.uploadFileProgress = 0;
            }
          }).catch((err)=>{
            console.log(`上传tokenFile出现问题:${err}`);
            this.uploadState = 'fileSendError';
          })
        }
      },
      // 将所有data恢复默认状态
      resetUploadState(){
        this.uploadState = 'initial';
        this.uploadFile = null;
        this.uploadFileProgress = 0;
        this.returnedNumber = null;
      },
      handleInputBoxChange(index){
        if (this.numberArray[index]===''){
          if (index>0) this.$refs[index-1][0].focus();
        }
        else{
          let matched = this.numberArray[index].match(/[\d\w]/g);
          if(matched){
            this.numberArray[index] = matched[0];
            if (index<5){
              this.$refs[index+1][0].focus();
            }
          }
          else this.numberArray[index] = '';
        }
        if(this.numberArray.findIndex((x)=>{return x===''})===-1){
          this.handleFileReceive();
        }
      },
      handleFileReceive(){
        this.$ajax.get('/downloadTokenFile/'+ this.numberArray.join(''),{
          responseType: 'blob'
        }).then((res)=>{
            // 当number不正确返回的是空blob
            if (res.data.size!==0){
              this.downloadFileLink = URL.createObjectURL(res.data);
            }
            else {
              if (this.downloadFileLink){
                URL.revokeObjectURL(this.downloadFileLink);
                this.downloadFileLink = null;
              }
            }
          })
          .catch((err)=>{
            console.log(err);
          })
      }
    },
    mounted() {
      console.log('页面挂载了一次, TokenSwitch');
      this.$ajax.defaults.baseURL = this.$store.state.FSAddr;
    }
  }
</script>

<style scoped>
  @import "../assets/css/public.css";
  .token-switch {
    height: 100vh;
    width: 100vw;
  }

  .token-switch-header {
    height: 32px;
    box-shadow: 0 0 8px #CFCFCF;
  }

  .token-switch-body {
    position: relative;
    height: calc(100% - 32px);
    width: 100%;
  }

  .token-switch-file-area {
    height: 360px;
    width: 300px;
  }

  .token-switch-send-file {
    width: 200px;
    background-color: white;
    border-radius: 10px;
    z-index: 1;
    box-shadow: 0 0 15px #CFCFCF;
    height: 300px;
    position: absolute;
    opacity: 0.9;
    transition: transform 0.25s linear 0s;
  }

  .token-switch-file-header{
    height: 32px;
    line-height: 32px;
    text-align: left;
    border-bottom: #CFCFCF solid 1px;
    box-sizing: border-box;
    margin: 0 10px;
    font-size: 14px;
    font-weight: 400;
  }

  .token-switch-receive-file {
    height: 300px;
    width: 200px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 15px #CFCFCF;
    position: absolute;
    right: 0;
    z-index: 0;
    display: flex;
    flex-direction: column;
    opacity: 0.9;
    transition: transform 0.25s linear 0s;
  }
  .token-switch-send-file-avatar{
    height: 48px;
    background-color: aquamarine;
    margin: 0 auto;
    border-radius: 5px;
    width: 48px;
    position: relative;
  }
  .token-switch-send-file-clear-file-button{
    height: 8px;
    width: 8px;
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 50%;
    font-size: 8px;
    color: white;
    cursor: default;
    background-color: red;
  }
  .transfer-number-display{
    height: 100px;
    text-align: center;
    font-size: 14px;
    width: 120px
  }
  .bottom-area-single-button{
    height: 28px;
    line-height: 28px;
    background-color: mediumspringgreen;
    border-radius: 0 0 10px 10px;
    color: white;
    text-align: center;
  }
  .single-number-input-area{
    height: 32px;
    width: 32px;
    margin: 16px;
    text-align: center;
    font-size: 18px;
    border: none;
    box-shadow: 0 0 8px #CFCFCF;
  }
  .active-card{
    transform: scale(1.05);
    z-index: 1;
    opacity: 1;
  }
</style>
