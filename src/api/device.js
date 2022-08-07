import request from '@/utils/request'

export function deviceSynchronization(params) {
  return request({
    url: '/device/deviceSynchronization',
    method: 'get',
    params
  })
}
// 新增设备数据
export function addDevice(data) {
  return request({
    url: '/device/add',
    method: 'post',
    data
  })
}

// 推流视频
export function videoStream(data) {
  return request({
    url: '/device/videoStream',
    method: 'post',
    data
  })
}

// 列出设备
export function listDeviceData(params) {
  return request({
    url: '/device/listPage',
    method: 'get',
    params
  })
}

// 删除设备数据
export function deleteDeviceData(params) {
  return request({
    url: '/device/delete',
    method: 'get',
    params
  })
}

// 更新设备数据
export function updateDeviceData(data) {
  return request({
    url: '/device/update',
    method: 'post',
    data
  })
}
