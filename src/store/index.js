import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    PageCur: 'index',
    userInfo: {},
    openInfo: {
      openid: '',
      session_key: ''
    }
  },
  mutations: {
    changePageCur (state, cur) {
      console.log(cur)
      state.PageCur = cur;
    },
    SET_USER_INFO (state, info) {
      state.userInfo = info
    },
    SET_USER_OPENID_KEY (state, id, key) {
      state.openInfo.openid = id
      state.openInfo.session_key = key
    }
  }
})

module.exports = store