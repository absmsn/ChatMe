import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    newAddToken: null,
    userId: null,
    msgTheme: 'aquamarine',
    tokenList: [],
    //FSAddr: 'http://114.116.79.159:3008/',
    //MSAddr: 'http://114.116.79.159:3000/'
    MSAddr: 'http://localhost:3000/',
    FSAddr: 'http://localhost:3008/'
  },
  mutations:{
    pushTokenList(state, token){
      state.tokenList.push(token);
    },
    addToken(state, token){
      state.newAddToken = token;
    },
    removeToken(state, hashToken){
      let index = state.tokenList.findIndex((x)=> x.hashToken===hashToken);
      if (index!==-1){
        state.tokenList.splice(index, 1);
      }
    },
    setUserId(state, userId) { state.userId = userId; }
  }
});

export default store;