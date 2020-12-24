import { request } from './index'

/*增加讨论*/
export function addDiscuss(data) {
  return request({
    url: '/discuss/discuss',
    method: 'post',
    data: data
  })
}

/*获取用户讨论列表*/
export function discussInfo(data) {
  return request({
    url: '/discuss/list/id',
    method: 'post',
    data: data
  })
}

