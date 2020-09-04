import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/login/index',
    method: 'post',
    data
  })
}
export function getInfo(data) {
  return request({
    url: '/admin/admin/getinfo',
    method: 'get',
    params: data
  })
}
export function fetchBannerList(data) {
  return request({
    url: 'admin/index/get_carousels',
    method: 'get',
    params: data
  })
}
