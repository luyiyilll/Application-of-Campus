import Vue from 'vue'
import App from './App'
import cuCustom from '../colorui/components/cu-custom.vue'
import axios from 'axios'
import store from './store/index'

Vue.use(cuCustom)

Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3001/api'
})

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
