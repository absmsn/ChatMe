<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'App',
  sockets:{
    allocUserId(userId) {
      console.log('分配了userId');
      if (this.$store.state.userId === null) {
        this.$store.commit('setUserId', userId);
      }
      this.$socket.emit("allocUserId", this.$store.state.userId, userId);
    },
  },
  created: function(){
    Vue.filter('timeRepresentation', (time)=>{
      if(!time) return '';

      let now = new Date();
      let temp = new Date();
      temp.setTime(Date.parse(time));
      time = temp;
      if (time.getFullYear() === now.getFullYear()) {
        let v = time.getMinutes(); v = v < 10 ? "0" + v : v;
        let t = time.getHours() + ":" + v;
        if (
          time.getMonth() === now.getMonth() &&
          time.getDate() === now.getDate()
        ) { return t; }
        return (time.getMonth()+1) + "-" + time.getDate() + ' ' + t;
      }
      return time.toLocaleDateString();
    })
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
