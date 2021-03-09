import { request } from './index'

/*根据id增加浏览量*/
export function addView (data) {
  return request({
    url: '/view/view',
    method: 'post',
    data: data
  })
}

/*根据openid获取最近浏览列表*/
export function getViewListByOpenid (data) {
  return request({
    url: '/view/list',
    method: 'post',
    data: data
  })
}