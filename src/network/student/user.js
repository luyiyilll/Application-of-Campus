import { request } from '../index';

/*注册用户*/
export function addUser(data) {
  return request({
    url: '/user/adduser',
    method: 'post',
    data: data
  })
}

/*根据openid获取用户信息*/
export function findUserByOid(data){
  return request({
    url:'/user/user/id',
    method:'post',
    data:data
  })
}

/*获取年级*/
export function getGrade() {
  return request({
    url: '/user/grade',
    method: 'get'
  })
}

/*上传用户信息*/
export function info(data) {
  return request({
    url: '/user/info',
    method: 'post',
    data: data
  })
}