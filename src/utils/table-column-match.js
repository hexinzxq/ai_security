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
    label: '设备号',
    // 列的最小宽度
    minWidth: '50px'
  },
  pointName: {
    label: '点位名称',
    minWidth: '60px'
  },
  monitoringTime: {
    // 列名
    label: '监测时间',
    // 列的最小宽度
    // minWidth: '190px'
  },
  pmOne: {
    label: 'PM2.5',
    slot: true,
    minWidth: '40px'
  },
  pmTwo: {
    // 列名
    label: 'PM10',
    // 列的最小宽度
    slot: true,
    minWidth: '40px'
  },
  tsp: {
    label: 'TSP',
    slot: true,
    minWidth: '40px'
  },
  dustPolluted: {
    label: '是否污染',
    slot: true,
    minWidth: '45px'
  },
  dustHandle: {
    // 列名
    label: '状态',
    // 列的最小宽度
    slot: true,
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

export const materialColumn = {
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
    label: '设备编码',
    // 列的最小宽度
    minWidth: '65px'
  },
  pointName: {
    label: '设备名称',
    minWidth: '65px'
  },
  ip: {
    label: '设备ip',
    minWidth: '65px'
  },
  address: {
    label: '接口地址',
    minWidth: '80px'
  },
  state: {
    // 列名
    label: '状态',
    // 列的最小宽度
    minWidth: '55px',
    prop: 'state',
    slot: true
  },
  todayWarn: {
    label: '今日报警次数',
    minWidth: '80px'
  },
  todayLeak: {
    label: '今日泄漏次数',
  },
  todayStart: {
    label: '今日启动次数',
  },
  algorithm: {
    label: '算法布控',
    minWidth: '80px'
  },
  currentV: {
    label: '当前电压',
  },
  currentI: {
    label: '当前电流',
  },
  passageway: {
    label: '通道',
    minWidth: '80px'
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
