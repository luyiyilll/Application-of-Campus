import { request } from './index';

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  })
}

export function getOpenid(data) {
  return request({
    url: '/user/openid',
    method: 'post',
    data: data
  })
}