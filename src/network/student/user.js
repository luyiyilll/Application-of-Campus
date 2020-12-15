import { request } from '../index';
export function addUser (data) {
  return request({
    url: '/user/adduser',
    method: 'post',
    data: data
  })
}