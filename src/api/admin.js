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
    url: '/admin/index/get_carousels',
    method: 'get',
    params: data
  })
}

export function fetchBannerDetail(data) {
  return request({
    url: '/admin/index/get_carousel',
    method: 'get',
    params: data
  })
}
export function fetchFooterInfo(data) {
  return request({
    url: '/admin/footer/get_config',
    method: 'get',
    params: data
  })
}
export function editFooterInfo(data) {
  return request({
    url: '/admin/footer/update_config',
    method: 'post',
    data
  })
}
export function uploadFile(data) {
  return request({
    url: '/admin/upload/save',
    method: 'post',
    data
  })
}

export function editBanner(data) {
  return request({
    url: '/admin/index/update_carousel',
    method: 'post',
    data
  })
}
export function fetchSolveMethods(data) {
  return request({
    url: '/admin/index/get_solutions',
    method: 'get',
    params: data
  })
}
export function fetchSolveMethodsDetail(data) {
  return request({
    url: '/admin/index/get_solution',
    method: 'get',
    params: data
  })
}
export function editSolveMethod(data) {
  return request({
    url: '/admin/index/update_solution',
    method: 'post',
    data
  })
}
export function deleteSolveMethod(data) {
  return request({
    url: '/admin/index/delete_partner',
    method: 'post',
    data
  })
}
export function fetchPartner(data) {
  return request({
    url: '/admin/index/get_partners',
    method: 'get',
    params: data
  })
}
export function addPartner(data) {
  return request({
    url: '/admin/index/save_partner',
    method: 'post',
    data
  })
}
export function fetchPartnerDetail(data) {
  return request({
    url: '/admin/index/get_partner',
    method: 'get',
    params: data
  })
}
export function editPartner(data) {
  return request({
    url: '/admin/index/update_partner',
    method: 'post',
    data
  })
}
export function deletePartner(data) {
  return request({
    url: '/admin/index/delete_partner',
    method: 'post',
    data
  })
}

export function fetchBusinessList(data) {
  return request({
    url: '/admin/business_area/get_datalist',
    method: 'get',
    params: data
  })
}
export function fetchBusinessDetail(data) {
  return request({
    url: '/admin/business_area/get_data',
    method: 'get',
    params: data
  })
}
export function fetchBusinessConfig(data) {
  return request({
    url: '/admin/business_area/get_ad',
    method: 'get',
    params: data
  })
}
export function editBusinessConfig(data) {
  return request({
    url: '/admin/business_area/update_ad',
    method: 'post',
    data
  })
}
export function editBusiness(data) {
  return request({
    url: '/admin/business_area/update_data',
    method: 'post',
    data
  })
}

export function fetchCaseConfig(data) {
  return request({
    url: '/admin/customer_case/get_ad',
    method: 'get',
    params: data
  })
}
export function editCaseConfig(data) {
  return request({
    url: '/admin/customer_case/update_ad',
    method: 'post',
    data
  })
}
export function fetchCaseList(data) {
  return request({
    url: '/admin/customer_case/get_datalist',
    method: 'get',
    params: data
  })
}
export function fetchCaseClass(data) {
  return request({
    url: '/admin/customer_case/get_categorys',
    method: 'get',
    params: data
  })
}
export function fetchCaseDetail(data) {
  return request({
    url: '/admin/customer_case/get_data',
    method: 'get',
    params: data
  })
}
export function editCaseDetail(data) {
  return request({
    url: '/admin/customer_case/update_data',
    method: 'post',
    data
  })
}
export function addCaseDetail(data) {
  return request({
    url: '/admin/customer_case/save_data',
    method: 'post',
    data
  })
}
export function deleteCaseDetail(data) {
  return request({
    url: '/admin/customer_case/delete_data',
    method: 'post',
    data
  })
}

//啊啊啊啊啊啊


export function fetchNewsConfig(data) {
  return request({
    url: '/admin/news/get_ad',
    method: 'get',
    params: data
  })
}
export function editNewsConfig(data) {
  return request({
    url: '/admin/news/update_ad',
    method: 'post',
    data
  })
}
export function fetchNewsList(data) {
  return request({
    url: '/admin/news/get_datalist',
    method: 'get',
    params: data
  })
}
export function fetchNewsClass(data) {
  return request({
    url: '/admin/news/get_categorys',
    method: 'get',
    params: data
  })
}
export function fetchNewsDetail(data) {
  return request({
    url: '/admin/news/get_data',
    method: 'get',
    params: data
  })
}
export function editNewsDetail(data) {
  return request({
    url: '/admin/news/update_data',
    method: 'post',
    data
  })
}
export function addNewsDetail(data) {
  return request({
    url: '/admin/news/save_data',
    method: 'post',
    data
  })
}
export function deleteNewsDetail(data) {
  return request({
    url: '/admin/news/delete_data',
    method: 'post',
    data
  })
}

export function fetchAboutConfig(data) {
  return request({
    url: '/admin/aboutus/get_ad',
    method: 'get',
    params: data
  })
}
export function editAboutConfig(data) {
  return request({
    url: '/admin/aboutus/update_ad',
    method: 'post',
    data
  })
}

export function fetchAboutConfigData(data) {
  return request({
    url: '/admin/aboutus/get_config',
    method: 'get',
    params: data
  })
}
export function editAboutConfigData(data) {
  return request({
    url: '/admin/aboutus/update_config',
    method: 'post',
    data
  })
}
export function fetchAboutConfigEnv(data) {
  return request({
    url: '/admin/aboutus/get_environment',
    method: 'get',
    params: data
  })
}
export function editAboutConfigEnv(data) {
  return request({
    url: '/admin/aboutus/update_environment',
    method: 'post',
    data
  })
}

export function fetchAboutDetail(data) {
  return request({
    url: '/admin/aboutus/get_aboutus',
    method: 'get',
    params: data
  })
}
export function editAboutDetail(data) {
  return request({
    url: '/admin/aboutus/update_aboutus',
    method: 'post',
    data
  })
}






















