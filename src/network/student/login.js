import { request } from '../index';

export function login(data) {
  return {
    url: '/login',
    method: 'post',
    params: data
  }
}