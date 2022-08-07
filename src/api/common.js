import request from '@/utils/request'

// 获取路由菜单
export function getRouter(data) {
  return request({
    url: '/menu/findAllMenu',
    method: 'get',
    data
  })
}

export function selectMenuByUser(params) {
  return request({
    url: '/role/selectMenuByUser',
    method: 'get',
    params: params
  })
}

// 校验token
export function analysisToken(params) {
  return request({
    url: '/event/upload`',
    method: 'post',
    params
  })
}

// 上传
export function uploadImg(data) {
  return request({
    url: '/event/upload',
    method: 'post',
    data
  })
}

// 设备控制
export function deviceControl(data) {
  return request({
    url: '/device/ptzControlOperation',
    method: 'post',
    data
  })
}

// 终止聚焦
export function stopFocusing(params) {
  return request({
    url: '/device/ptzControlOperationStop',
    method: 'get',
    params
  })
}

export function deviceMonitoring(params) {
  return request({
    url: '/device/monitoring',
    method: 'get',
    params: params
  })
}

// 导出文件
export function downFile(url, parameter) {
  return request({
    url: url,
    params: parameter,
    method: 'get',
    responseType: 'blob'
  })
}
