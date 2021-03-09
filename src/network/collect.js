import { request } from './index'

/*根据id和openid增加收藏*/
export function addCollect (data) {
  return request({
    url: '/collect/collect',
    method: 'post',
    data: data
  })
}

/*根据otherid和openid取消收藏*/
export function deleteCollect (data) {
  return request({
    url: '/collect/deletecollect',
    method: 'post',
    data: data
  })
}
/*根据id取消收藏*/
export function deleteCollectById (data) {
  return request({
    url: '/collect/cancel',
    method: 'post',
    data: data
  })
}

/*根据openid获取全部的收藏*/
export function getAllByOpenid (data) {
  return request({
    url: '/collect/list',
    method: 'post',
    data: data
  })
}

/*根据id和openid查看是否收藏*/
export function isCollect (data) {
  return request({
    url: '/collect/iscollect',
    method: 'post',
    data: data
  })
}

/*根据搜索关键字获取收藏列表*/
export function getSearchWordList (data) {
  return request({
    url: '/collect/searchlist',
    method: 'post',
    data: data
  })
}

//根据类型和openid获取收藏列表
export function getCollectByType (data) {
  return request({
    url: '/collect/typelist',
    method: 'post',
    data: data
  })
}

