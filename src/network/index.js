import axios from 'axios'

axios.defaults.withCredentials = true

export function request (config) {
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 15000
  })
  return instance(config)
}