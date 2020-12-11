import { request } from '../index';

export function userLogin(data) {
  console.log(data)
  return request({
    url: '/user/login',
    method: 'post',
    data: data
  })
}

export function updateUserInfo(data) {

}