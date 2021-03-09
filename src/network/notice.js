import { request } from './index'

/*根据类型获取通知、会议、公示列表*/
export function list (data) {
  return request({
    url: '/notice/list',
    method: 'post',
    data: data
  })
}

/*根据id获取内容*/
export function getContById (data) {
  return request({
    url: '/notice/id',
    method: 'post',
    data: data
  })
}


