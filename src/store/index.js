import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    PageCur: 'index'
  },
  mutations: {
    changePageCur(state, cur) {
      console.log(cur)
      state.PageCur = cur;
    }
  }
})

module.exports = store