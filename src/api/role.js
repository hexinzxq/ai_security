import request from '@/utils/request'
// 分页查询用户列表
export function getUsers(params) {
  return request({
    url: 'role/queryUserByPage',
    method: 'get',
    params: params
  })
}
// 新增用户-角色关联
export function addUsersToTable(parameter) {
  return request({
    url: 'roleUser/addUserRole',
    method: 'post',
    data: parameter
  })
}
// 编辑用户
export function updateUsersToTable(data) {
  return request({
    url: 'roleUser/updateUserRole',
    method: 'post',
    data: data
  })
}
// 用户查询 - 拉取用户
export function getUsersQuery(params) {
  return request({
    url: 'roleUser/selectAllUser',
    method: 'get',
    params: params
  })
}
// 获取权限列表
export function getRoleQuery(params) {
  return request({
    url: 'role/selectAllRole',
    method: 'get',
    params: params
  })
}

// 删除
export function deleteUser(params) {
  return request({
    url: 'roleUser/deleteUser',
    method: 'get',
    params: params
  })
}

export function forbiddenUser(params) {
  return request({
    url: '/roleUser/forbiddenUser',
    method: 'get',
    params: params
  })
}

// 部门列表
export function listDepartment(params) {
  return request({
    url: '/roleUser/listDepartment',
    method: 'get',
    params: params
  })
}

// 职位列表
export function listOccupation(params) {
  return request({
    url: '/roleUser/listOccupation',
    method: 'get',
    params: params
  })
}
