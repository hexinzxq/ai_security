import request from '@/utils/request'

// 获取车辆信息
export function selectVehicleAccessControl(params) {
  return request({
    url: '/vehicleAccessControl/selectVehicleAccessControl',
    method: 'get',
    params: params
  })
}

// 获取人员信息
export function selectPersonnelAccessControl(params) {
  return request({
    url: '/vehicleAccessControl/selectPersonnelAccessControl',
    method: 'get',
    params: params
  })
}
