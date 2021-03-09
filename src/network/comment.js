import { request } from './index'

/*根据id和type增加评论*/
export function addComment (data) {
  return request({
    url: '/comment/comment',
    method: 'post',
    data: data
  })
}