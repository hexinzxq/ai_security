import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

// 获取表格数据
export function getTableData(url, params) {
  return request({
    url,
    method: 'get',
    params: params
  })
}

export function getTableDataPost(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}
// 删除接口
export function deleteActionsInData(url, data, params) {
  return request({
    url,
    method: 'post',
    data,
    params
  })
}
export function deleteGet(url, params) {
  return request({
    url,
    method: 'GET',
    params
  })
}
export function getMainTableData(url, params) {
  return request({
    url,
    method: 'get',
    params
  })
}
export function vehicleInfoPost(url, data, params) {
  return request({
    url,
    method: 'post',
    data,
    params
  })
}
// 修改数据信息post方法
export function updateData(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}
// 获取路由信息
export function getRouteInfo(url, params) {
  return request({
    url,
    method: 'get',
    params
  })
}
// 车辆警告处理接口
export function handleVehicleWarning(url, params) {
  return request({
    url,
    method: 'post',
    params
  })
}
// 车辆首页告警数据接口
export function getIndexData(url, params) {
  return request({
    url,
    method: 'get',
    params
  })
}


