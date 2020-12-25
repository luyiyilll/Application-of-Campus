import { request } from './index'

/*根据类型获取通知、会议、公示列表*/
export function likeAction(data) {
  return request({
    url: '/like/like',
    method: 'post',
    data: data
  })
}