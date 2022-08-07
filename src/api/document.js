import request from '@/utils/request'

// 人员白名单 - 新增数据
export function addUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

// 人员白名单 - 删除数据
export function deleteData(params) {
  return request({
    url: '/user/del',
    method: 'get',
    params: params
  })
}

// 人员白名单 - 修改数据
export function updateData(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

// 车辆白名单 - 新增数据
export function addVehicle(data) {
  return request({
    url: '/vehicle/add',
    method: 'post',
    data
  })
}

// 车辆白名单 - 删除数据
export function deleteVehicle(params) {
  return request({
    url: '/vehicle/delete',
    method: 'get',
    params: params
  })
}

// 车辆白名单 - 修改数据
export function updateVehicle(data) {
  return request({
    url: '/vehicle/update',
    method: 'post',
    data
  })
}
