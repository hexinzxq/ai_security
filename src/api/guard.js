import request from '@/utils/request'

// 事件（分页）查询
export function listPage(params) {
  return request({
    url: '/event/listPage',
    method: 'get',
    params: params
  })
}
// 事件添加
export function addEvent(data) {
  return request({
    url: '/event/add',
    method: 'post',
    data
  })
}

// 事件状态修改
export function changeStates(data) {
  return request({
    url: '/event/changeStates',
    method: 'post',
    data
  })
}
// 事件状态修改 批量
export function changeAllState(data) {
  return request({
    url: '/event/changeAllState',
    method: 'post',
    data
  })
}

// 事件批量导出（根据时间和类型）
export function exportByType(params) {
  return request({
    url: '/event/exportAlarmMaterial',
    method: 'get',
    params: params
  })
}
