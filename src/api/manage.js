import request from '@/utils/request'
// 下载文件到excel
export function downFile(url, data, params) {
  return request({
    url: url,
    data,
    params,
    method: 'POST',
    responseType: 'blob'
  })
}
export function downFileGet(url, params) {
  return request({
    url: url,
    params,
    method: 'GET',
    responseType: 'blob'
  })
}
// 获取上传的文件（src内容不走axios拦截方式，需自定义）
export function fileInterceptor(params) {
//   let base64data
  return request({
    url: '/digital-mine/sys/oss/file/downFile',
    responseType: 'arraybuffer',
    params,
    method: 'GET'
  })
}
