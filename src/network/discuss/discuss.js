import { request } from '../index'

export function addDiscuss(data) {
  return request({
    url: '/discuss/discuss',
    method: 'post',
    data: data
  })
}