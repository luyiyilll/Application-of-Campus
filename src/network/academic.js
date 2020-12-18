import { request } from './index';

/*获取学院*/
export function getAcademic() {
  return request({
    url: '/academic/all',
    method: 'get'
  })
}

/*获取专业*/
export function getMajor(data) {
  return request({
    url: '/academic/major',
    method: 'post',
    data: data
  })
}

/*获取支部*/
export function getDepartment(data) {
  return request({
    url: '/academic/depart',
    method: 'get',
    params: data
  })
}