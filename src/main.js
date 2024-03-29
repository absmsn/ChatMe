// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store'
import VueSocketio from 'vue-socket.io'
import axios from 'axios';

Vue.config.productionTip = true;
Vue.config.performance = true;

Vue.prototype.$ajax= axios;

Vue.use(new VueSocketio({
  debug: true,
  connection: store.state.MSAddr
}));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});
