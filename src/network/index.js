import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 15000
})

instance.defaults.withCredentials = true;

instance.interceptors.response.use(res => {
  return res
}, error => {
  return Promise.reject(error)
})

export function request (config) {
  return instance(config)
}

