import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    PageCur: 'index',
    userInfo: {},
    openid: '',
  },
  mutations: {
    changePageCur (state, cur) {
      console.log(cur)
      state.PageCur = cur;
    },
    SET_USER_INFO (state, info) {
      state.userInfo = info
    },
    SET_USER_OPENID (state, id) {
      state.openid = id
    }
  }
})

module.exports = store