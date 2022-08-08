// 设备管理表头数据
export const deviceField = {
  // 特殊列
  specialCols: [
    {
      prop: 'selection',
      label: '',
      width: '',
      align: 'center'
    }
  ],
  serialNumber: {
    // 列名
    label: '设备编码',
    // 列的最小宽度
    minWidth: ''
  },
  name: {
    label: '设备名称',
    minWidth: ''
  },
  ip: {
    label: '设备IP',
    minWidth: '90'
  },
  // password: {
  //   label: '设备密码',
  //   minWidth: ''
  // },
  rtsp: {
    label: 'rtsp地址',
    minWidth: '100'
  },
  flv: {
    label: 'flv地址',
    minWidth: '120'
  },
  region: {
    label: '区域',
    minWidth: ''
  },
  // specificLocation: {
  //   label: '具体位置',
  //   minWidth: ''
  // },
  appName: {
    label: '算法布控',
    minWidth: ''
  },
  channel: {
    label: '通道',
    width: 75
  },
  activeStatus: {
    label: '状态',
    width: 90,
    slot: true
  }
}
export const productionInfoField = {
  // 特殊列
  specialCols: [
    {
      prop: 'selection',
      label: '',
      width: '',
      align: 'center'
    }
  ],
  equipmentId: {
    // 列名
    label: '设备编号',
    // 列的最小宽度
    minWidth: ''
  },
  pointName: {
    label: '设备名称',
    minWidth: ''
  },
  type: {
    label: '设备类型',
    minWidth: '90'
  },
  year: {
    label: '设备年限状态',
    minWidth: '100'
  },
  run: {
    label: '设备运行状态',
    minWidth: '120'
  },
  v: {
    label: '设备电压',
    minWidth: '120'
  },
  speed: {
    label: '设备转速',
    minWidth: '120'
  },
  i: {
    label: '设备电流',
    minWidth: ''
  },
  runtime: {
    label: '设备运行时间',
    minWidth: ''
  },
  Inspection: {
    label: '设备巡检情况',
    minWidth: ''
  },
  standbyMachine: {
    label: '是否有备用机',
    width: 75
  },
  sameDevices: {
    label: '同点位是否有相同设备',
    width: 90,
  },
  occurTime: {
    label: '发生时间',
    width: 90,
  }
}
export const materialColumn = {
  // 特殊列
  specialCols: [
    {
      prop: 'selection',
      label: '',
      width: '40px',
      align: 'left'
    },
  ],
  equipmentId: {
    // 列名
    label: '危险品编号',
    // 列的最小宽度
    minWidth: '65px'
  },
  pointName: {
    label: '危险品名称',
    minWidth: '65px'
  },
  type: {
    // 列名
    label: '危险品类型',
    // 列的最小宽度
    minWidth: '65px',
  },
  unit: {
    label: '危险品单位',
    minWidth: '65px'
  },
  currentStorage: {
    label: '当前储量',
    minWidth: '65px'
  },
  maxStorage: {
    label: '最大储量',
    minWidth: '65px'
  },
  location: {
    label: '存储地点',
    minWidth: '80px'
  },
  temperature: {
    label: '温度',
    minWidth: '80px'
  },
  smoke: {
    label: '烟感',
    minWidth: '80px'
  },
  water: {
    label: '水浸',
    minWidth: '80px'
  },
  concentration: {
    label: '危险气体浓度',
    minWidth: '80px'
  },
  checkName: {
    label: '检查名称',
    minWidth: '80px'
  },
  remarks: {
    label: '备注',
    minWidth: '80px'
  },
  checkTime: {
    label: '检查时间',
    minWidth: '80px'
  },
}
export const mainEventService = {
  // 特殊列
  specialCols: [
    {
      prop: 'selection',
      label: '',
      width: '',
      align
    },
  ],
  deviceNum: {
    label: '装置编号',
    minWidth: '56px'
  },
  name: {
    label: '装置名称',
    minWidth: '78px'
  },
  type: {
    label: '装置类型',
    minWidth: '120px'
  },
  runtime: {
    label: '装置运行时间',
    minWidth: '120px',
  },
  load: {
    label: '装置运行负荷',
    minWidth: '58px'
  },
  warnTime: {
    label: '装置报警次数',
    minWidth: '98px'
  },
  problem: {
    label: '装置故障情况',
    minWidth: '98px'
  },
  destroyRisk: {
    label: '装置损坏风险',
    minWidth: '98px'
  },
  occurTime: {
    label: '发生时间',
    minWidth: '98px'
  },
}
let align = 'center'
export const mainEvent = {
  // 特殊列
  specialCols: [
    {
      prop: 'selection',
      label: '',
      width: '',
      align
    },
    {
      prop: 'index',
      label: '序号',
      width: '',
      fixed: 'left',
      // fixed:'left',
      align
    }
  ],
  vehicleNumber: {
    label: '关联车辆',
    minWidth: '56px'
  },
  warningNo: {
    label: '事件编号',
    minWidth: '78px'
  },
  vehicleGps: {
    label: 'GPS定位',
    minWidth: '120px'
    // 自定义列内容
    // slot:true
    // sortable:true
  },
  warningContent: {
    label: '报警情况',
    minWidth: '120px',
    slot: true
  },
  status: {
    label: '状态',
    slot: true,
    minWidth: '58px'
  },
  causeTime: {
    label: '发生时间',
    minWidth: '98px'
  }
}
export const vehicleInfoFieldNoise = {
  // 特殊列
  specialCols: [
    {
      prop: 'selection',
      label: '',
      width: '50px',
      fixed: 'left',
      align: 'left'
    },
    {
      prop: 'index',
      label: '序号',
      width: '60',
      fixed: 'left',
      // fixed:'left',
      align: 'left'
    }
  ],
  equipmentId: {
    // 列名
    label: '风险事件',
    // 列的最小宽度
    minWidth: '50px'
  },
  pointName: {
    label: '风险源类型',
    minWidth: '60px'
  },
  monitoringTime: {
    // 列名
    label: '风险预防措施',
    // 列的最小宽度
    // minWidth: '190px'
  },
  pmOne: {
    label: '现场处置措施',
    minWidth: '40px'
  },
  pmTwo: {
    // 列名
    label: '上报部门',
    // 列的最小宽度
    minWidth: '40px'
  },
  tsp: {
    label: '部门联系方式',
    minWidth: '40px'
  },
  dustPolluted: {
    label: '应急责任人',
    minWidth: '45px'
  },
  dustHandle: {
    // 列名
    label: '责任人联系方式',
    // 列的最小宽度
    minWidth: '70px'
  },
  time: {
  // 列名
  label: '风险发生时间',
    // 列的最小宽度
    minWidth: '70px'
},
  word: {
    // 列名
    label: '附件',
    // 列的最小宽度
    minWidth: '70px'
  },
}

export const vehicleInfoFieldManage = {
  // 特殊列
  specialCols: [
    {
      prop: 'selection',
      label: '',
      width: '50px',
      fixed: 'left',
      align: 'left'
    },
    {
      prop: 'index',
      label: '序号',
      width: '60',
      fixed: 'left',
      // fixed:'left',
      align: 'left'
    }
  ],
  equipmentId: {
    // 列名
    label: '活动名称',
    // 列的最小宽度
    minWidth: '50px'
  },
  pointName: {
    label: '活动类型',
    minWidth: '60px'
  },
  monitoringTime: {
    // 列名
    label: '活动主题',
    // 列的最小宽度
    // minWidth: '190px'
  },
  pmOne: {
    label: '活动内容',
    minWidth: '40px'
  },
  pmTwo: {
    // 列名
    label: '参与部门',
    // 列的最小宽度
    minWidth: '40px'
  },
  tsp: {
    label: '活动时间',
    minWidth: '40px'
  },
}

export const vehicleInfoFieldWork = {
  // 特殊列
  specialCols: [
    {
      prop: 'selection',
      label: '',
      width: '50px',
      fixed: 'left',
      align: 'left'
    },
    {
      prop: 'index',
      label: '序号',
      width: '60',
      fixed: 'left',
      // fixed:'left',
      align: 'left'
    }
  ],
  equipmentId: {
    // 列名
    label: '作业编号',
    // 列的最小宽度
    minWidth: '50px'
  },
  pointName: {
    label: '作业名称',
    minWidth: '60px'
  },
  address:{
    label: '作业地点',
    minWidth: '60px'
  },
  user: {
    // 列名
    label: '管理人员',
    // 列的最小宽度
    // minWidth: '190px'
  },
  joinUser: {
    label: '参与人员',
    minWidth: '40px'
  },
  pmTwo: {
    // 列名
    label: '违规行为数量',
    // 列的最小宽度
    minWidth: '40px'
  },
  tsp: {
    label: '其他风险因素',
    minWidth: '40px'
  },
  dustPolluted: {
    label: '备注',
    minWidth: '45px'
  },
  dustHandle: {
    // 列名
    label: '作业内容',
    minWidth: '70px'
  },
  startTime: {
    // 列名
    label: '作业开始时间',
    // 列的最小宽度
    minWidth: '70px'
  },
  endTime: {
    // 列名
    label: '作业结束时间',
    // 列的最小宽度
    minWidth: '70px'
  }
}

// 人员白名单管理表头数据
export const peopleField = {
  // 特殊列
  specialCols: [
    {
      prop: 'selection',
      label: '',
      width: 50,
      align: 'center'
    }
  ],
  num: {
    label: '序号',
    minWidth: ''
  },
  name: {
    label: '姓名',
    minWidth: ''
  },
  // worksheetCode: {
  //   label: '工号',
  //   minWidth: ''
  // },
  // occupation: {
  //   label: '职业',
  //   minWidth: ''
  // },
  // phone: {
  //   label: '联系方式',
  //   minWidth: ''
  // },
  // personID: {
  //   label: '身份证',
  //   width: '170'
  // },
  // timeRange: {
  //   label: '时间段',
  //   width: '200',
  //   slot: true
  // },
  picUrl: {
    label: '照片',
    width: '200',
    slot: true
  }
}

// 车辆白名单管理表头数据
export const carField = {
  // 特殊列
  specialCols: [
    {
      prop: 'selection',
      label: '',
      width: 50,
      align: 'center'
    }
  ],
  num: {
    label: '序号',
    minWidth: ''
  },
  lpn: {
    label: '车牌号',
    minWidth: ''
  },
  carType: {
    label: '车辆类型',
    minWidth: ''
  },
  ownerName: {
    label: '司机名称',
    minWidth: ''
  },
  // jobID: {
  //   label: '工号',
  //   minWidth: ''
  // },
  phone: {
    label: '联系方式',
    minWidth: ''
  }
  // timeRange: {
  //   label: '时间段',
  //   width: '200',
  //   slot: true
  // },
  // picUrl: {
  //   label: '照片',
  //   width: '',
  //   slot: true
  // }
}

// 角色管理表头数据
export const roleField = {
  // 特殊列
  specialCols: [
    {
      prop: 'selection',
      label: '',
      width: '',
      align: 'center'
    }
  ],
  roleID: {
    // 列名
    label: '序号',
    // 列的最小宽度
    minWidth: ''
  },
  roleName: {
    label: '角色名称',
    minWidth: ''
  },
  roleState: {
    label: '角色状态',
    minWidth: ''
  }
}

// 矿区门禁管理车辆表头数据
export const mineVehicleField = {
  // 特殊列
  specialCols: [
    {
      prop: 'selection',
      label: '',
      width: '',
      align: 'center'
    }
  ],
  num: {
    label: '序号',
    minWidth: ''
  },
  time: {
    label: '时间',
    minWidth: ''
  },
  lpn: {
    label: '车牌号',
    minWidth: ''
  },
  ownerName: {
    label: '司机姓名',
    minWidth: ''
  },
  // mineWorkNumber: {
  //   label:'工号',
  //   minWidth:''
  // },
  phone: {
    label: '联系方式',
    minWidth: ''
  },
  mineSource: {
    label: '来源',
    minWidth: ''
  }
}

// 矿区门禁管理人员进出统计表头数据
export const minePeopleField = {
  // 特殊列
  specialCols: [
    {
      prop: 'selection',
      label: '',
      width: '',
      align: 'center'
    }
  ],
  num: {
    label: '序号',
    minWidth: ''
  },
  time: {
    label: '时间',
    minWidth: ''
  },
  name: {
    label: '姓名',
    minWidth: ''
  },
  // occupation: {
  //   label: '职务',
  //   minWidth: ''
  // },
  // worksheetCode: {
  //   label: '工号',
  //   minWidth: ''
  // },
  // phone: {
  //   label: '联系方式',
  //   minWidth: ''
  // },
  mineSource: {
    label: '来源',
    minWidth: ''
  }
}
// 事件
export const logField = {
  // 特殊列
  specialCols: [
    {
      prop: 'selection',
      label: '',
      width: '',
      align: 'center'
    }
  ],
  num: {
    label: '序号',
    width: 75
  },
  eventCode: {
    label: '事件编号',
    minWidth: ''
  },
  eventType: {
    label: '事件类型',
    minWidth: ''
  },
  // occupation: {
  //   label: '职务',
  //   minWidth: ''
  // },
  deviceName: {
    label: '设备名称',
    minWidth: ''
  },
  eventTime: {
    label: '发生时间',
    minWidth: 150
  },
  eventRecord: {
    label: '处理记录',
    minWidth: ''
  },
  eventHandler: {
    label: '处理人',
    minWidth: ''
  },
  eventHandleTime: {
    label: '处理时间',
    minWidth: 150
  }
}

// 事件
export const logOperateField = {
  // 特殊列
  specialCols: [
    {
      prop: 'selection',
      label: '',
      width: '',
      align: 'center'
    }
  ],
  num: {
    label: '序号',
    width: 75
  },
  eventCode: {
    label: '事件编号',
    minWidth: ''
  },
  eventType: {
    label: '事件类型',
    minWidth: ''
  },
  // occupation: {
  //   label: '职务',
  //   minWidth: ''
  // },
  deviceName: {
    label: '设备名称',
    minWidth: ''
  },
  eventTime: {
    label: '发生时间',
    minWidth: 150
  },
  eventRecord: {
    label: '操作记录',
    minWidth: ''
  },
  eventHandler: {
    label: '处理人',
    minWidth: ''
  },
  eventHandleTime: {
    label: '操作时间',
    minWidth: 150
  }
}

// 操作日志
export const journalField = {
  // 特殊列
  specialCols: [
    {
      prop: 'selection',
      label: '',
      width: 100,
      align: 'center'
    }
  ],
  num: {
    label: '序号',
    minWidth: 80
  },
  operationModule: {
    label: '操作模块',
    minWidth: ''
  },
  createTime: {
    label: '操作时间',
    minWidth: ''
  },
  operationContext: {
    label: '操作内容',
    minWidth: ''
  },
  operator: {
    label: '操作人',
    minWidth: ''
  }
}

// 用户管理
export const userInfoField = {
  // 特殊列
  specialCols: [
    {
      prop: 'selection',
      label: '',
      width: 50,
      align: 'center'
    },
    {
      prop: 'num',
      label: '序号',
      width: '',
      fixed: 'left',
      // fixed:'left',
      align: 'left'
    }
  ],
  name: {
    // 列名
    label: '姓名',
    // 列的最小宽度
    minWidth: ''
  },
  roleName: {
    label: '权限',
    minWidth: ''
  },
  dept: {
    // 列名
    label: '部门',
    // 列的最小宽度
    minWidth: ''
  },
  station: {
    label: '岗位',
    minWidth: ''
  },
  prove: {
    label: '联系方式',
    minWidth: ''
  },
  isDelete: {
    // 列名
    label: '账户状态',
    // 列的最小宽度
    slot: true
  }
}

export const userInfoFieldNone = {
  // 特殊列
  specialCols: [
    {
      prop: 'selection',
      label: '',
      width: '',
      align: 'center'
    },
    {
      prop: 'num',
      label: '序号',
      width: '',
      fixed: 'left',
      // fixed:'left',
      align: 'center'
    }
  ],
  name: {
    // 列名
    label: '姓名',
    // 列的最小宽度
    minWidth: ''
  },
  roleName: {
    label: '权限',
    minWidth: ''
  },
  dept: {
    // 列名
    label: '部门',
    // 列的最小宽度
    minWidth: ''
  },
  station: {
    label: '岗位',
    minWidth: ''
  },
  prove: {
    label: '联系方式',
    minWidth: ''
  }
}


export const vehicleInfoField = {
  // 特殊列
  specialCols: [
    {
      prop: 'selection',
      label: '',
      width: '40px',
      align: 'left'
    },
    {
      prop: 'index',
      label: '序号',
      width: '70px',
      fixed: 'left',
      // fixed:'left',
      align: 'left'
    }
  ],
  equipmentId: {
    // 列名
    label: '设备号',
    // 列的最小宽度
    minWidth: '45px'
  },
  pointName: {
    label: '点位名称',
    minWidth: '45px'
  },
  address: {
    label: '接口地址',
    minWidth: '80px'
  },
  state: {
    // 列名
    label: '状态',
    // 列的最小宽度
    minWidth: '35px',
    prop: 'state',
    slot: true
  }
}

export const userColumn = {
  // 特殊列
  specialCols: [
    {
      prop: 'selection',
      label: '',
      width: '40px',
      align: 'left'
    },
  ],
  employeeNum: {
    // 列名
    label: '员工号',
    // 列的最小宽度
    minWidth: '65px'
  },
  name: {
    label: '姓名',
    minWidth: '65px'
  },
  phone: {
    label: '手机号',
    minWidth: '65px'
  },
  employeeType: {
    label: '考勤状态',
    minWidth: '65px'
  },
  department: {
    label: '部门',
    minWidth: '80px'
  },
  position: {
    label: '职位',
    minWidth: '80px'
  },
  isSpecial: {
    label: '特殊工种',
    minWidth: '80px'
  },
  special: {
    label: '备注',
    minWidth: '65px'
  },
}

export const vehicleInfoFieldSlope = {
  // 特殊列
  specialCols: [
    {
      prop: 'selection',
      label: '',
      width: '40px',
      align: 'left'
    },
    {
      prop: 'index',
      label: '序号',
      width: '55px',
      fixed: 'left',
      // fixed:'left',
      align: 'left'
    }
  ],
  equipmentId: {
    // 列名
    label: '设备号',
    // 列的最小宽度
    minWidth: '100px'
  },
  pointName: {
    label: '点位名称',
    minWidth: '70px'
  },
  monitoringTime: {
    label: '监测时间',
    // minWidth: '110px'
  },
  relativeHorizontalX: {
    label: 'X水平相对初始值（m）',
    minWidth: '90px',
    slot: true
  },
  relativeHorizontalY: {
    label: 'Y水平相对初始值（m）',
    minWidth: '90px',
    slot: true
  },
  relativeAltitude: {
    // 列名
    label: '高程相对初始值（m）',
    // 列的最小宽度
    minWidth: '90px',
    slot: true
  },
  degree: {
    // 列名
    label: '等级',
    // 列的最小宽度
    slot: true,
    minWidth: '60px'
  },
  state: {
    label: '状态',
    slot: true,
    minWidth: '90px'
  }
}

export const gnssInfoField = {
  // 特殊列
  specialCols: [
    {
      prop: 'selection',
      label: '',
      width: '40px',
      align: 'left'
    },
    {
      prop: 'index',
      label: '序号',
      width: '70px',
      fixed: 'left',
      // fixed:'left',
      align: 'left'
    }
  ],
  equipmentId: {
    // 列名
    label: '设备号',
    // 列的最小宽度
    minWidth: '45px'
  },
  pointName: {
    label: '点位名称',
    minWidth: '45px'
  },
  state: {
    // 列名
    label: '状态',
    // 列的最小宽度
    minWidth: '35px',
    prop: 'state',
    slot: true
  }
}

export const cameraInfoField = {
  specialCols: [
    {
      prop: 'selection',
      label: '',
      width: '40px',
      align: 'left'
    }
  ],
  equipmentId: {
    // 列名
    label: '设备号',
    // 列的最小宽度
    minWidth: ''
  },
  pointName: {
    label: '点位名称',
    minWidth: ''
  },
  ip: {
    label: '设备ip',
    minWidth: ''
  },
  rtsp: {
    label: 'rtsp',
    minWidth: ''
  },
  flv: {
    label: 'flv',
    minWidth: ''
  },
  address: {
    label: '区域',
    minWidth: ''
  },
  channel: {
    label: '通道',
    minWidth: ''
  },
  state: {
    // 列名
    label: '状态',
    // 列的最小宽度
    minWidth: '',
    prop: 'state',
    slot: true
  }
}
