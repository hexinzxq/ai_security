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
