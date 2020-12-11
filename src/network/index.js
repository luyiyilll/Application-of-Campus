import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'https://www.appcampus.top:8083',
    timeout: 15000
  })
  return instance(config)
}