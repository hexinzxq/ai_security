import request from '@/utils/request'

// 首页- 摄像头使用情况
export function getprojector(params) {
  return request({
    url: '/home/projector',
    method: 'get',
    params: params
  })
}

// 首页-处理事件统计
export function eventQuery(params) {
  return request({
    url: '/home/eventQuery',
    method: 'get',
    params: params
  })
}

// 首页- 值守监测和烟火识别柱状图
export function onDutyMonitoring(params) {
  return request({
    url: '/home/onDutyMonitoring',
    method: 'get',
    params: params
  })
}

// 首页- 查询摄像头列表
export function selectCameraList(params) {
  return request({
    url: '/home/selectCameraList',
    method: 'get',
    params: params
  })
}

// 矿区门禁数据
export function accessControl(params) {
  return request({
    url: '/home/accessControl',
    method: 'get',
    params: params
  })
}

