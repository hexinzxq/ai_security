import request from '@/utils/request'

// 获取flv视频流
export function getFlvVideo(data) {
  return request({
    url: '/replayTheater/getRtspUrl',
    method: 'post',
    data
  })
}
// 获取一天的时间
export function getOneDay(params) {
  return request({
    url: '/replayTheater/getVideoList',
    method: 'get',
    params
  })
}
// 获取所有摄像头信息
export function getAllMonitor(params) {
  return request({
    url: '/device/monitoring',
    method: 'get',
    params
  })
}
// 杀流
export function skillStream(params) {
  return request({
    url: '/replayTheater/videoStreamKill',
    method: 'get',
    params
  })
}
//
export function pushStream() {
  return request({
    url: '/device/autoRepushVideoStream',
    method: 'get'
  })
}
// 获取channel列表
export function channelList() {
  return request({
    url: '/replayTheater/getChannelList',
    method: 'get'
  })
}
