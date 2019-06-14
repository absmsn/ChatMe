<template>
    <div class="dialog-record">
      <div class="dialog-record-header">
        <div style="position: relative;height: 32px;width: 32px;">
          <router-link to="/home">
            <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor" aria-hidden="true" class="centered-container"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 0 0 0 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
            </svg>
          </router-link>
        </div>
      </div>
      <div class="dialog-record-body">
        <div style="padding: 20px;text-align:left"><strong>所有记录</strong></div>
        <div style="overflow:auto">
        <div style="margin: 4px 0;" v-for="recordArea in dialogRecord" :key="recordArea.hashToken">
            <div class="dialog-fold-bar">
              <div style="position: relative;width: 32px;height:100%;float:left">
                <svg @click="recordArea.folded=false" v-if="recordArea.folded" t="1558837390736" class="centered-container" viewBox="0 0 1024 1024" version="1.1" p-id="5208" width="16" height="16">
                  <path d="M512.149333 1023.978667c282.773333 0 511.936-229.141333 511.936-511.914667C1024.085333 229.312 794.816 0.021333 512.042667 0.021333S0 229.312 0 512.064c0 282.773333 229.269333 511.914667 512.149333 511.914667z m0-960c247.488 0 448 200.597333 448 447.978666 0 247.338667-200.618667 448-448 448-247.338667 0-448.064-200.533333-448.064-447.872 0-247.509333 200.597333-448.106667 448.064-448.106666z m-28.16 593.194666c7.722667 7.744 18.197333 10.133333 28.16 8.384 9.984 1.749333 20.437333-0.618667 28.181334-8.384l244.885333-245.098666a32.085333 32.085333 0 0 0 0-45.269334 32.064 32.064 0 0 0-45.248 0L512.042667 594.752 284.138667 366.805333a32.085333 32.085333 0 0 0-45.269334 0 32.085333 32.085333 0 0 0 0 45.269334l245.12 245.098666z" fill="#000000" p-id="5209"></path>
                </svg>
                <svg @click="recordArea.folded=true" v-else t="1558858803365" class="centered-container" viewBox="0 0 1024 1024" version="1.1" p-id="8062" width="16" height="16">
                  <path d="M512 928.005c-229.366 0-415.983-186.619-415.983-415.984 0-229.364 186.617-415.98 415.982-415.98 229.366 0 415.985 186.616 415.985 415.98 0 229.365-186.619 415.984-415.985 415.984M512 992c265.053 0 479.981-214.866 479.981-479.98C991.98 246.97 777.051 32.038 512 32.038c-265.114 0-479.98 214.93-479.98 479.981 0 265.116 214.866 479.981 479.98 479.981z" p-id="8063" fill="#000000"></path><path d="M512 346.527c8.188 0 16.373 3.124 22.625 9.376l203.99 203.992c12.5 12.5 12.5 32.749 0 45.248-12.498 12.498-32.747 12.498-45.247 0L489.376 401.15c-12.5-12.5-12.5-32.75 0-45.247 6.25-6.252 14.437-9.376 22.623-9.376z" p-id="8064" fill="#000000"></path>
                  <path d="M512 346.527c8.188 0 16.373 3.124 22.625 9.376 12.5 12.497 12.5 32.747 0 45.247L330.634 605.143c-12.5 12.498-32.75 12.498-45.249 0-12.5-12.5-12.5-32.748 0-45.248l203.991-203.992c6.25-6.252 14.437-9.376 22.623-9.376z" p-id="8065" fill="#000000"></path>
                </svg>
              </div>
              <div style="float: left;height: 100%;width: calc(100% - 32px);line-height: 32px;">{{ recordArea.token }}</div>
            </div>
          <div class="record-display-area" v-if="!recordArea.folded">
            <div style="display: flex">
              <div class="record-display-area-item">开始时间</div>
              <div class="record-display-area-item">终止时间</div>
              <div class="record-display-area-item">持续时间</div>
            </div>
            <div v-for="(record,index) in recordArea.records" :key="index" style="display: flex">
              <div class="record-display-area-item">{{record.establishedTime | timeRepresentation}}</div>
              <div class="record-display-area-item">{{record.closedTime | timeRepresentation}}</div>
              <div class="record-display-area-item">{{displayInterval(record.establishedTime, record.closedTime)}}</div>
              <svg style="height:25px" t="1558850611690" @click="removeDialogRecord(recordArea.hashToken ,index)" viewBox="0 0 1024 1024" version="1.1" p-id="6122" width="16" height="16">
                <path d="M512 620.544l253.3376 253.3376a76.6976 76.6976 0 1 0 108.544-108.544L620.6464 512l253.2352-253.3376a76.6976 76.6976 0 1 0-108.544-108.544L512 403.3536 258.6624 150.1184a76.6976 76.6976 0 1 0-108.544 108.544L403.3536 512 150.1184 765.3376a76.6976 76.6976 0 1 0 108.544 108.544L512 620.6464z" p-id="6123"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "DialogRecord",
  data: function(){
    return{
      dialogRecord: []
    }
  },
  methods:{
    removeDialogRecord(hashToken, index){
      let t = this.dialogRecord.find(x=> x.hashToken===hashToken);
      if(t!==null){
        this.$socket.emit('removeDialogRecord', t.records[index].sessionId);
        t.records.splice(index, 1);
      }
    },
    displayInterval(first, second){
      if(!first || !second) return '';

      let interval = new Date(Date.parse(second) - Date.parse(first));

      let time = interval.getFullYear()===1970?'':interval.getFullYear()-1970+'-';
      time += interval.getMonth()===0?'':interval.getMonth()+'-';
      time += interval.getDate()-1===0?'':interval.getDate()-1+' ';

      time += interval.getUTCHours()===0?'':interval.getUTCHours()+'h:';
      time += interval.getMinutes()===0?'':interval.getMinutes()+'m:';
      time += interval.getSeconds()===0?'':interval.getSeconds()+'s';

      return time;
    }
  },
  computed:{
    tokens(){
      return this.$store.state.tokenList;
    }
  },
  watch:{
    tokens(){
      console.log('token发生了变化');
      let before = this.dialogRecord.map(x=>{return {
        token: x.token,
        hashToken: x.hashToken
      }});
      let after = this.tokens.map(x=>{return {
        token: x.token,
        hashToken: x.hashToken
      }});

      let removed = before.filter(x=>!after.find(y=>y.hashToken===x.hashToken));
      let added = after.filter(x=>!before.find(y=>y.hashToken===x.hashToken));
      if (added!==[]) {
        this.$socket.emit('getDialogRecords', added.map(x=> x.hashToken));
      }
      if(removed!==[]){
        removed.forEach(e => {
          let i = this.dialogRecord.findIndex(x=>x.hashToken===e.hashToken);
          if(i!==-1){
            this.dialogRecord.splice(i, 1);
          }
        });
      }
    }
  },
  mounted(){
    this.$socket.emit('getDialogRecords', this.tokens.map(x=> x.hashToken));
  },
  sockets:{
    getDialogRecords(records){
      let r = {};
      records.forEach(x=>{
        if(!r.hasOwnProperty(x.token)){
          let t = this.tokens.find(y=>y.hashToken===x.token);
          if(t!==null){
            r[x.token] = {token: t.token,hashToken: x.token, folded: true,records:[]}
          }
        }
        if(r.hasOwnProperty(x.token)){
          r[x.token].records.push(x);
        }
      });
      for(let x in r){
        this.dialogRecord.push(r[x]);
      }
    }
  }
}
</script>

<style scoped>
  @import "../assets/css/public.css";
  .dialog-record{
    margin: 0;
    padding: 0;
    height: 100vh;
  }
  .dialog-record-header{
    height: 32px;
    box-shadow: 0 0 10px #CFCFCF;
  }
  .dialog-record-body{
    height: calc(100% - 32px);
    max-width: 500px;
    margin: 0 auto;
  }
  .dialog-fold-bar{
    background-color: aliceblue;
    position: relative;
    height: 32px;
    box-shadow: 0 0 6px #CFCFCF;
    margin: 4px 2px;
  }
  .record-display-area{
    display: flex;
    flex-direction: column;
  }
  .record-display-area-item{
    text-align: center;
    flex: 1 1 30%;
  }
</style>
