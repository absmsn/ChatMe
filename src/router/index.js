import Vue from 'vue'
import Router from 'vue-router'
import ChatHome from '../views/ChatHome'
import AddSession from '../views/AddSession'
import TokenSwitch from '../views/TokenSwitch';
import DialogRecord from '../views/DialogRecord'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'chat-home',
      component: ChatHome
    },
    {
      path: "/add-session",
      name: "add-session",
      component: AddSession
    },
    {
      path: "/token-switch",
      name: "token-switch",
      component: TokenSwitch
    },
    {
      path: "/dialog-record",
      name: "dialog-record",
      component: DialogRecord
    }
  ]
})
