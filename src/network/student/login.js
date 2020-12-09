import { request } from '../index';

export function userLogin(data) {
  return request({
    url: '/user/login',
    method: 'post',
    params: data
  })
}

export function updateUserInfo(data){

}