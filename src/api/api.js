import request from '@/utils/request'

// 噪声分页查询
export function noiseMonitorQueryAll(parameter) {
  return request({
    url: 'environment/monitor/paging',
    method: 'post',
    data: parameter
  })
}

// 扬尘分页查询
export function monitorQuery(parameter) {
  return request({
    url: 'environment/monitor/paging',
    method: 'post',
    data: parameter
  })
}
// 警报
export function alarmQuery(parameter) {
  return request({
    url: 'environment/alar/mrecord/paging',
    method: 'post',
    data: parameter
  })
}
// 道路污染记录
export function wayMonitorQuery(parameter) {
  return request({
    url: 'environment/way/monitor/paging',
    method: 'post',
    data: parameter
  })
}
// 边坡监测记录
export function slopeMonitorQuery(parameter) {
  return request({
    url: 'environment/slope/monitor/paging',
    method: 'post',
    data: parameter
  })
}
// 设备数据
export function serviceQuery(parameter) {
  return request({
    url: 'environment/service/paging',
    method: 'post',
    data: parameter
  })
}

// 添加设备
export function serviceAdd(parameter) {
  return request({
    url: 'environment/service/save',
    method: 'post',
    data: parameter
  })
}
// 修改设备
export function serviceUpdate(parameter) {
  return request({
    url: 'environment/service/update',
    method: 'post',
    data: parameter
  })
}
// 删除设备
export function serviceDelete(parameter) {
  return request({
    url: 'environment/service/delete',
    method: 'post',
    data: parameter
  })
}
// 设备标准
export function standardQuery(parameter) {
  return request({
    url: 'environment/standard/paging',
    method: 'post',
    data: parameter
  })
}
// GNSS设备数据初始值
export function gnssValueQuery(parameter) {
  return request({
    url: 'environment/gnss/value/paging',
    method: 'post',
    data: parameter
  })
}
// 日志数据
export function systemLog(parameter) {
  return request({
    url: 'environment/alarm/record/paging',
    method: 'post',
    data: parameter
  })
}
// 用户列表
export function getUsers(params) {
  return request({
    url: 'tAeUser/selectALL',
    method: 'get',
    params: params
  })
}
// 用户查询
export function getUsersQuery(params) {
  return request({
    url: 'tAeUser/selectALLByCPDB',
    method: 'get',
    params: params
  })
}
// 添加用户到权限 tAeUser/add
export function addUsersToTable(data) {
  return request({
    url: 'tAeUser/add',
    method: 'post',
    data: data
  })
}
// 编辑用户
export function updateUsersToTable(data) {
  return request({
    url: 'tAeUser/update',
    method: 'post',
    data: data
  })
}
// 删除用户
export function deleteToTable(params) {
  return request({
    url: 'tAeUser/delete',
    method: 'get',
    params: params
  })
}
// 获取角色
export function getRoleQuery(params) {
  return request({
    url: 'monitorRole/selectAllRole',
    method: 'get',
    params: params
  })
}
// 扬尘事件处理
export function alarmRecord(parameter) {
  return request({
    url: 'environment/alarm/record/handle',
    method: 'post',
    data: parameter
  })
}
// 扬尘文件上传
export function alarmRecordFile(parameter) {
  return request({
    url: 'environment/alarm/record/upload',
    method: 'post',
    data: parameter
  })
}

// 环境一体机设备删除
export function envEquipmentDelete(parameter) {
  return request({
    url: 'environment/standard/delete',
    method: 'post',
    data: parameter
  })
}

// 保存环境一体机
export function envEquipmentSave(parameter) {
  return request({
    url: 'environment/standard/save',
    method: 'post',
    data: parameter
  })
}

// 修改环境一体机
export function envEquipmentUpdate(parameter) {
  return request({
    url: 'environment/standard/update',
    method: 'post',
    data: parameter
  })
}

// gnns 设备删除
export function gnssValueDelete(parameter) {
  return request({
    url: 'environment/gnss/value/delete',
    method: 'post',
    data: parameter
  })
}

// 保存gnns
export function gnssValueSave(parameter) {
  return request({
    url: 'environment/gnss/value/save',
    method: 'post',
    data: parameter
  })
}

// 修改gnns
export function gnssValueUpdate(parameter) {
  return request({
    url: 'environment/gnss/value/update',
    method: 'post',
    data: parameter
  })
}

// 系统日志删除
export function alarmreDelete(parameter) {
  return request({
    url: 'environment/alarm/record/delete',
    method: 'post',
    data: parameter
  })
}

// 动态菜单
export function getUserMenu() {
  return request({
    url: 'monitorRole/selectMenuByUser',
    method: 'get'
  })
}

// 首页
// 预警处理情况
export function getAlarmCondition(parameter) {
  return request({
    url: 'environment/home/page/alarm/condition',
    method: 'post',
    data: parameter
  })
}
// 设备状态
export function deviceStatus() {
  return request({
    url: 'environment/home/page/device/status',
    method: 'post'
  })
}
// 边坡位移监测统计数据
export function slopeStatisticalData(parameter) {
  return request({
    url: 'environment/home/page/slope/statistical/data',
    method: 'post',
    data: parameter
  })
}
// 扬尘指标平均值
export function averageDust(parameter) {
  return request({
    url: 'environment/home/page/average/dust',
    method: 'post',
    data: parameter
  })
}
// 噪声平均值
export function averageNoise(parameter) {
  return request({
    url: 'environment/home/page/average/noise',
    method: 'post',
    data: parameter
  })
}

// 环境一体机报警标准数据导出
export function environmentExport(data) {
  return request({
    url: 'environment/standard/exportStandard',
    method: 'post',
    data: data,
    responseType: 'blob',
    timeout: 1000 * 60
  })
}

// GNSS数据导出
export function gnssExport(data) {
  return request({
    url: 'environment/gnss/value/exportGnss',
    method: 'post',
    data: data,
    responseType: 'blob',
    timeout: 1000 * 60
  })
}
// 用户管理导出
export function getUserExcel(data) {
  return request({
    url: 'tAeUser/exportUser',
    method: 'post',
    data: data,
    responseType: 'blob',
    timeout: 1000 * 60
  })
}

// 设备管理导出
export function serviceExport(data) {
  return request({
    url: 'environment/service/exportService',
    method: 'post',
    data: data,
    responseType: 'blob',
    timeout: 1000 * 60
  })
}
// 扬尘污染监测导出
export function monitorExport(data) {
  return request({
    url: 'environment/monitor/export',
    method: 'post',
    data: data,
    responseType: 'blob',
    timeout: 1000 * 60
  })
}
// 噪声污染监测导出
export function noiseExport(data) {
  return request({
    url: 'environment/monitor/exportNoise',
    method: 'post',
    data: data,
    responseType: 'blob',
    timeout: 1000 * 60
  })
}
// 道路监测导出
export function wayExport(data) {
  return request({
    url: 'environment/way/monitor/exportWay',
    method: 'post',
    data: data,
    responseType: 'blob',
    timeout: 1000 * 60
  })
}
// 高边坡位移监测数据导出
export function slopeExport(data) {
  return request({
    url: 'environment/slope/monitor/exportSlope',
    method: 'post',
    data: data,
    responseType: 'blob',
    timeout: 1000 * 60
  })
}

// 事件处理日志导出
export function eventLogExport(data) {
  return request({
    url: 'environment/alarm/record/export',
    method: 'post',
    data: data,
    responseType: 'blob',
    timeout: 1000 * 60
  })
}

// 动环报警信息
export function monitorAlarmInfo(parameter) {
  return request({
    url: 'environment/monitor/alarm/info',
    method: 'get',
    params: parameter
  })
}

// 边坡报警信息
export function slopeMonitorAlarmInfo(parameter) {
  return request({
    url: 'environment/slope/monitor/alarm/info',
    method: 'get',
    params: parameter
  })
}

// 获取当前token登录用户对应的用户名
export function analysisToken(parameter) {
  return request({
    url: 'monitorRole/analysisToken',
    method: 'get',
    params: parameter
  })
}

// 扬尘监测折线图
export function homePageDustStatisticalData(parameter) {
  return request({
    url: 'environment/home/page/dust/statistical/data',
    method: 'post',
    data: parameter
  })
}
// 噪声监测折线图
export function homePageNoiseStatisticalData(parameter) {
  return request({
    url: 'environment/home/page/noise/statistical/data',
    method: 'post',
    data: parameter
  })
}

// 操作日志
export function getSysLogList(parameter) {
  return request({
    url: 'envlog/sysLogList',
    method: 'get',
    params: parameter
  })
}
// 获取模块
export function getLogModule() {
  return request({
    url: 'envlog/listModule',
    method: 'get'
  })
}
// 操作日志导出
export function logExport(data) {
  return request({
    url: 'envlog/exportOperaLog',
    method: 'post',
    data: data,
    responseType: 'blob',
    timeout: 1000 * 60
  })
}

// 获取指标名
export function getIndexName() {
  return request({
    url: 'environment/standard/getIndexName',
    method: 'get'
  })
}

// 获取真实设备列表
export function getRealDeviceList() {
  return request({
    url: '/environment/equipment/getRealDeviceList',
    method: 'post'
  })
}

// 扬尘、噪声、道路、高边坡查看
export function viewEvent(parameter) {
  return request({
    url: 'environment/alarm/record/viewEvent',
    method: 'post',
    data: parameter
  })
}

// 获取部门信息
export function getDepartment() {
  return request({
    url: 'tAeUser/listDepartment',
    method: 'get'
  })
}

// 获取岗位信息
export function getPosition(parameter) {
  return request({
    url: 'tAeUser/listOccupation',
    method: 'get',
    params: parameter
  })
}

// 环境一体机设备同步
export function syncEnvMachine() {
  return request({
    url: 'environment/equipment/syncDeviceList',
    method: 'get'
  })
}

// GNSS设备同步
export function syncGnssDevice() {
  return request({
    url: 'environment/equipment/syncSlopeDeviceList',
    method: 'get'
  })
}

// 摄像头同步
export function syncCamera() {
  return request({
    url: 'environment/equipment/syncCameraDeviceList',
    method: 'get'
  })
}

// 视频推流
export function videoStream(data) {
  return request({
    url: 'environment/equipment/videoStream',
    method: 'post',
    data
  })
}

// 道路污染数量统计
export function pollutionStatics(data) {
  return request({
    url: 'environment/home/page/road/pollution/statistics',
    method: 'post',
    data
  })
}
