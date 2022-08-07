import request from '@/utils/request'
// 模块列表
export function listModule(params) {
  return request({
    url: '/log/listModule',
    method: 'get',
    params: params
  })
}
