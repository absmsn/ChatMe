 <template>
  <div class="setting">
    <div class="setting-main">
      <div class="header-menu">
        <!--返回按钮-->
        <div style="width: 32px;height: 32px;float: left;position: relative;">
          <router-link to="/home">
            <svg viewBox="64 64 896 896" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true" class="centered-container">
              <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z">
              </path>
            </svg>
          </router-link>
        </div>
        <!--转到交换token页面-->
        <div style="height: 32px;width: 32px;float: right;position: relative;" title="交换token文件">
          <router-link to="/token-switch">
            <svg t="1557630540039" class="centered-container" style="" viewBox="0 0 1024 1024" p-id="10974" width="16" height="16">
              <path d="M655.405227 857.770667h-314.026667A341.333333 341.333333 0 0 1 38.701227 358.570667l107.52 71.68a213.333333 213.333333 0 0 0 195.242666 299.434666h314.026667V618.666667l256 170.666666-256 170.666667v-102.229333z m-283.050667-554.666667v102.826667l-256-170.666667 256-170.666667v110.506667h310.357333a341.333333 341.333333 0 0 1 303.104 498.517333l-107.52-71.68a213.333333 213.333333 0 0 0-195.498666-298.837333H372.35456z" fill="#9571E9" p-id="10975"></path>
            </svg>
          </router-link>
        </div>
      </div>
      <div class="token-content">
        <div class="prompt-text"><strong>在下方输入token:</strong></div>
        <div class="token-input-area">
          <div class="token-input-area-blank"></div>
          <div class="token-input-area-content">
            <div class="single-token-area" v-for="(item,index) in tokenArray" :key="index">
              <div class="token-display-area">
                <input
                  type="text"
                  class="token-input-box"
                  v-model="item.token"
                  @input="inputChanged(index,item.token)"
                  @paste="inputChanged(index,item.token)"
                  @focus="focusedInputBoxIndex=index"
                  @keyup.enter="handleEnterPressed(index)"
                  :ref="index" v-focus="true" size="10" :disabled="item.file!==null"
                />
                <!-- 将input的值绑定到数组的某个元素 -->
                <!--<div class="token-background centered-container" style="display:none" v-if="tokenArray[index]===undefined">-->

                <!--</div>-->
              </div>
              <div class="token-file-upload-button-area" v-if="index===focusedInputBoxIndex&&
                                                               tokenArray[index].token===' '&&
                                                               tokenArray[index].file===null">
                <svg
                  t="1555833393060"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  p-id="4793"
                  width="16"
                  height="16"
                >
                  <path
                    d="M872.448 939.008H151.552l-40.96-40.96V299.008l40.96-40.96h158.72v81.92H192.512v517.12h638.976V339.968H713.728v-81.92h158.72l40.96 40.96v599.04z"
                    fill="#437DFF"
                    p-id="4794"
                  ></path>
                  <path
                    d="M387.072 229.376l-34.816-50.176 138.24-94.208h34.816l131.072 94.208-35.84 50.176-113.664-81.92z"
                    fill="#63F7DE"
                    p-id="4795"
                  ></path>
                  <path d="M473.088 137.216h61.44v370.688h-61.44z" fill="#63F7DE" p-id="4796"></path>
                </svg>
                <input type="file" @change="handleFileUpload($event, index)"
                       class="token-file-upload-button centered-container">
              </div>
              <div class="token-file-upload-button-area" v-if="tokenArray[index].file!=null"
                   @click="deleteSingleFile(index)">
                <!--<文件删除图标>-->
                <svg t="1555929451110" class="icon" style="" viewBox="0 0 1084 1024" p-id="2199" width="16.9375"
                     height="16">
                  <path
                    d="M1029.851429 175.542857h-333.531429v-40.96c0-52.662857-46.811429-105.325714-99.474286-105.325714H456.411429c-52.662857 0-93.622857 52.662857-93.622858 105.325714V175.542857H23.405714c-11.702857 0-23.405714 11.702857-23.405714 23.405714s11.702857 23.405714 23.405714 23.405715h122.88v637.805714c0 93.622857 70.217143 163.84 163.84 163.84h433.005715c93.622857 0 169.691429-70.217143 169.691428-163.84V222.354286h117.028572c11.702857 0 23.405714-11.702857 23.405714-23.405715s-11.702857-23.405714-23.405714-23.405714zM409.6 134.582857c0-29.257143 17.554286-58.514286 40.96-58.514286h146.285714c29.257143 0 52.662857 29.257143 52.662857 58.514286V175.542857H409.6v-40.96zM532.48 351.085714c11.702857 0 23.405714 11.702857 23.405714 23.405715v409.6c0 11.702857-11.702857 23.405714-23.405714 23.405714s-23.405714-11.702857-23.405714-23.405714v-409.6c0-11.702857 5.851429-23.405714 23.405714-23.405715z m-193.097143 52.662857c11.702857 0 23.405714 11.702857 23.405714 23.405715v315.977143c0 11.702857-11.702857 23.405714-23.405714 23.405714s-23.405714-11.702857-23.405714-23.405714V427.154286c0-11.702857 11.702857-23.405714 23.405714-23.405715z m333.531429 23.405715c0-11.702857 11.702857-23.405714 23.405714-23.405715s23.405714 11.702857 23.405714 23.405715v315.977143c0 11.702857-11.702857 23.405714-23.405714 23.405714s-23.405714-11.702857-23.405714-23.405714V427.154286z"
                    fill="#1296db" p-id="2200"></path>
                </svg>
              </div>
            </div>
            <div class="clear-all-tokens-button">
              <svg t="1555903111030" class="centered-container" @click="clearAllTokens" style="" viewBox="0 0 1024 1024"
                   version="1.1" p-id="1107" width="16" height="16">
                <path
                  d="M511.95904 0C229.66272 0 0 229.6832 0 512s229.66272 512 511.95904 512C794.29632 1024 1024 794.3168 1024 512S794.29632 0 511.95904 0z m0 922.64448C285.53216 922.64448 101.3248 738.42688 101.3248 512S285.53216 101.35552 511.95904 101.35552c226.43712 0 410.65472 184.2176 410.65472 410.64448s-184.2176 410.64448-410.65472 410.64448z"
                  fill="#00DBC6" p-id="1108"></path>
                <path
                  d="M760.5248 328.58112a54.19008 54.19008 0 0 0-16.71168-39.50592 57.15968 57.15968 0 0 0-40.192-16.25088c-14.9504 0-29.07136 5.61152-39.75168 15.80032L517.888 427.4176l-143.6672-138.55744a57.37472 57.37472 0 0 0-40.01792-16.03584c-15.03232 0-29.184 5.67296-39.84384 15.95392a54.4256 54.4256 0 0 0-16.97792 39.48544 54.40512 54.40512 0 0 0 16.87552 39.50592l142.20288 137.08288-143.47264 136.40704a54.56896 54.56896 0 0 0-17.152 39.46496 54.40512 54.40512 0 0 0 16.73216 39.54688 57.32352 57.32352 0 0 0 40.20224 16.18944 57.62048 57.62048 0 0 0 39.75168-15.72864l144.83456-137.74848L663.552 724.0192a57.1392 57.1392 0 0 0 39.99744 16.0256 57.2416 57.2416 0 0 0 39.89504-15.94368 54.29248 54.29248 0 0 0 17.00864-39.41376 54.41536 54.41536 0 0 0-16.87552-39.58784l-144.7936-139.63264 144.52736-137.45152a54.33344 54.33344 0 0 0 17.21344-39.43424z"
                  fill="#00DBC6" p-id="1109"></path>
              </svg>
            </div>
          </div>
          <div class="token-input-area-blank"></div>
        </div>
        <div class="submit-token-button" @click="submitToken()">
          <svg t="1555903922090" class="centered-container" viewBox="0 0 1024 1024" p-id="3054" width="32" height="32">
            <path
              d="M220.885971 38.595872m27.329502-27.329503l0 0q27.329502-27.329502 54.659005 0l472.919216 472.919217q27.329502 27.329502 0 54.659005l0 0q-27.329502 27.329502-54.659005 0l-472.919216-472.919217q-27.329502-27.329502 0-54.659005Z"
              fill="#FF3E7D" p-id="3055"></path>
            <path
              d="M748.457707 457.83148m27.329503 27.329502l0 0q27.329502 27.329502 0 54.659005l-472.919217 472.919216q-27.329502 27.329502-54.659005 0l0 0q-27.329502-27.329502 0-54.659004l472.919217-472.919217q27.329502-27.329502 54.659005 0Z"
              fill="#00A5FF" p-id="3056"></path>
            <path
              d="M787.043405 512.008402a38.498515 38.498515 0 0 0-11.242036-26.886785 38.784187 38.784187 0 0 0-54.664195 0l-26.886784 26.886785 26.886784 26.886785a38.784187 38.784187 0 0 0 54.664195 0 38.498515 38.498515 0 0 0 11.242036-26.886785z"
              fill="#0039AE" p-id="3057"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import b64_md5 from '../crypto/md5';

  export default {
    name: "add-session",
    data: function () {
      return {
        tokenArray: [{token: " ", file: null}],
        focusedInputBoxIndex: 0,
        hashToken: null,
        msgBoxContent: ''
      };
    },
    directives: {
      focus: {
        inserted: function (el, {value}) {
          if (value) {
            el.focus();
          }
        }
      }
    },
    methods: {
      inputChanged(index, item) {
        if (item === "") {
          // 删除某个元素
          if (index === this.tokenArray.length - 1) {
            this.tokenArray.pop();
            // if (this.tokenArray[index-1].file===null)
            //   this.tokenArray.pop();
            this.tokenArray.push({token: ' ', file: null});
          } else {
            this.tokenArray.splice(index, 1);
          }
          if (this.tokenArray.length > 0) {
            if (index > 0)
              if (this.tokenArray[index - 1].file == null)
                this.$refs[index - 1][0].focus();
              else
                this.$refs[0][0].focus();
          }
        } else {
          let arr = item.split("");
          if (arr) {
            if (index === this.tokenArray.length - 1) {
              if (arr[0] === ' ' || arr[arr.length - 1] === ' ') { // 因为输入框在初始化时默认加入了一个空格,所以无论如何在input的value内至少有一个
                if (arr[0] === ' ') {                        // 空格,这些都要去掉,但是在输入中文时,输入法会传递一个
                  arr.shift();
                } else if (arr[arr.length - 1] === ' ') {
                  arr.pop();
                }
              }
            }
            this.tokenArray.pop();
            for (let i = 0; i < arr.length; ++i) {
              arr[i] = {token: arr[i], file: null};
            }
            this.tokenArray.splice(index, 1, ...arr);
            this.tokenArray.push({token: " ", file: null});
          }
        }
      },
      clearAllTokens: function () {
        let length = this.tokenArray.length;
        this.tokenArray.splice(0, length - 1);
      },
      handleEnterPressed(index){
        if(index === this.tokenArray.length-1){
          this.submitToken();
        }
      },
      submitToken: function () {
        let finalToken = [];
        let finalToken1 = [];
        let tempAdd = [];
        for (let i = 0; i < this.tokenArray.length - 1; ++i) {
          if (this.tokenArray[i].file !== null) {
            let mergedStr = tempAdd.join('');
            tempAdd.splice(0, tempAdd.length);
            if (mergedStr !== ''){
              finalToken.push(mergedStr);
              finalToken1.push(mergedStr);
            }
            finalToken.push(this.tokenArray[i].file.content);
            finalToken1.push(this.tokenArray[i].file.name);
          } else {
            tempAdd.push(this.tokenArray[i].token);
          }
        }
        if (tempAdd){
          finalToken.push(tempAdd.join(''));
          finalToken1.push(tempAdd.join(''));
        }
        let linkedToken = finalToken.join('');
        if (linkedToken !== '') {
          // 如果还没有该token
          let hashToken = b64_md5(linkedToken);
          hashToken = hashToken.replace(/\//g, ''); // 去掉所有/字符,以防服务端创建文件夹时出现问题
          if (this.tokenList.findIndex((x) => {return x.hashToken === hashToken}) === -1){
            this.$store.commit('pushTokenList', {
              token: finalToken1.join(''),
              hashToken: hashToken
            });
            this.$socket.emit('addSession', this.$store.state.userId, hashToken);
          }
          else{
            alert("已经登录了");
            // 提示用户token重复登录
          }
        } else {
          // 提醒用户输入token或者什么也不做
        }
      },
      handleFileUpload: function (event, index) {
        let file = event.target.files[0];
        if (file !== null) {
          let fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.addEventListener('load', () => {
            //this.tokenArray.splice(index,0,{token:' ',file:fileReader.result});
            this.tokenArray[index].file = {
              name: file.name,
              content: fileReader.result
            };
            // this.uploadFilesArray.splice(position,0,this.fileReader.result);
          }, true);
          if (index < this.tokenArray.length - 1)
            this.inputChanged(index, ' '); // 以上事件可能被触发了多次,该句不要写在回调里
          else
            this.inputChanged(index, '  ');
        }
      },
      deleteSingleFile: function (index) {
        this.tokenArray[index].file = null;
      }
    },
    computed:{
      tokenList(){
        return this.$store.state.tokenList;
      }
    },
    sockets: {
      // emit函数内的所有参数会被包裹为一个数组
      addSession(response) {
        let hashToken = response.hashToken;
        let sessionId = response.sessionId; 
        let peerStatus = response.peerStatus;
        let t = this.tokenList.find((x)=>{
          return x.hashToken===hashToken
        });
        if(t){
          this.$store.commit('addToken', {
            token: t.token,
            hashToken: t.hashToken,
            sessionId: sessionId,
            peerStatus: peerStatus
          });
          this.tokenArray = [{token:" ", file: null}];
          this.$router.replace('/');
          console.log('the server had accept the connection');
        }
      }
    },
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .centered-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }

  .setting-main {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .header-menu {
    flex: 0 0 32px;
    box-shadow: 0 0 10px #CFCFCF;
  }

  .token-content {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
  }

  .token-content .prompt-text {
    padding: 20px 0;
    text-align: center;
  }

  .token-input-area {
    display: flex;
    flex: 1 0 auto;
  }

  .token-input-area-blank {
    flex: 2 2 auto;
  }

  .token-input-area-content {
    display: flex;
    display: -webkit-flex;
    flex: 2 2 auto;
    flex-wrap: wrap;
    justify-items: center;
    align-content: flex-start;
    max-width: 600px;
  }

  .single-token-area .token-display-area {
    position: relative;
    margin: 10px;
    text-align: center;
  }

  .single-token-area .token-display-area .token-background {
    background-color: black;
    color: white;
    font-family: monospace;
    font-weight: bolder;
    border-radius: 3px;
    font-size: 15px;
    line-height: 40px;
  }

  .single-token-area .token-input-box {
    width: 40px;
    height: 40px;
    font-size: 20px;
    text-align: center;
    border: none;
    box-shadow: 0 0 6px #cfcfcf;
  }

  .single-token-area .token-file-upload-button-area {
    padding: 5px 10px;
    text-align: center;
    position: relative;
  }

  .token-file-upload-button-area .token-file-upload-button {
    width: 32px;
    height: 32px;
    opacity: 0;
  }

  .clear-all-tokens-button {
    height: 40px;
    width: 40px;
    margin: 10px 10px 10px 0;
    position: relative;
  }

  .submit-token-button {
    flex: 0 0 96px;
    position: relative;
  }
</style>
