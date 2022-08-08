<template>
  <div>
    <div class="box-card">
      <div>
        <common-table
          ref="table"
          :data-flag="dataFlag"
          :table-data="tableData"
          :page-config="pageConfig"
          :top-search-config="topSearchConfig"
          :table-column-match="vehicleInfoField"
          :operation-cols="operationCols"
          :alter-flag="alterFlag"
          :tab-show="tabShow"
          :sync-button="syncButton"
          :export-button="exportButton"
          :delete-button="true"
          @handle-delete="handleDelete"
          @get-table-data="getTableData"
          @search-info="searchInfo"
          @syncData="handleSync"
          @exportData="handleExport"
        >
          <template #state="data">
            <i v-if="data.row.state === 0" class="el-icon-circle-check state-normal"></i>
            <span
              v-if="data.row.state === 0"
            >
              正常
            </span>
            <i v-if="data.row.state !== 0" class="el-icon-warning-outline state-broken"></i>
            <span
              v-if="data.row.state !== 0"
            >
              离线
            </span>
          </template>
          <template #statusOperationCols="data">
            <el-button
              v-if="currentType === 2 && data.row.stream"
              :disabled="!!data.row.state"
              type="text"
              @click="handleVideoStream(data.row, 'open')"
            >
              推送视频流
            </el-button>
            <el-button
              v-else-if="currentType === 2 && !data.row.stream"
              :disabled="!!data.row.state"
              type="text"
              @click="handleVideoStream(data.row, 'close')"
            >
              关闭视频流
            </el-button>
            <el-button
              v-else
              type="text"
              @click="handleEdit(data.row)"
            >编辑</el-button>
          </template>
        </common-table>
      </div>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="35%"
      destroy-on-close
      :modal-append-to-body="false"
      @close="closeForm"
    >
      <el-form
        ref="internatForm"
        :model="form"
        :rules="rulesForm"
        label-width="90px"
      >
        <el-form-item
          label="设备号"
          prop="equipmentId"
          :error="errorEquipmentId"
        >
          <el-input
            v-model="form.equipmentId"
            placeholder="请输入设备号"
            style="width: 302px"
            disabled
          />
        </el-form-item>
        <el-form-item
          v-if="type !== 1"
          label="接口地址"
          prop="address"
        >
          <el-input
            v-model="form.address"
            placeholder="请输入接口地址"
            style="width: 302px"
            disabled
          >
            <template slot="prepend">Http://</template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="点位名称"
          prop="pointName"
          :error="errorPointName"
        >
          <el-input
            v-model="form.pointName"
            placeholder="请输入点位名称"
            style="width: 302px"
          />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="closeForm">取 消</el-button>
        <el-button
          type="primary"
          :loading="loadingButton"
          @click="closeForm"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CommonTable from '@/components/CommonTable'
import { vehicleInfoField, cameraInfoField, gnssInfoField } from '@/utils/table-column-match'
import {
  serviceQuery,
  serviceAdd,
  serviceUpdate,
  serviceDelete,
  serviceExport,
  syncEnvMachine,
  syncGnssDevice,
  syncCamera,
  videoStream,
  getRealDeviceList,
} from '@/api/api'
// import { mapGetters } from 'vuex'
const defaultForm = {
  id: '',
  equipmentId: '',
  ip: '',
  password: '',
  address: '',
  pointName: '',
  deployment: '',
  remark: '',
  type: null
}
export default {
  name: 'ProductionEquipment',
  components: {
    CommonTable
  },
  props: {},
  data() {
    return {
      errorEquipmentId: '',
      errorPointName: '',
      loadingButton: false,
      title: '添加设备',
      form: { ...defaultForm },
      dialogVisible: false,
      rulesForm: {
        equipmentId: [
          {
            required: true,
            whitespace: true,
            message: '请输入设备号',
            trigger: ['blur']
          }
        ],
        ip: [
          {
            required: true,
            whitespace: true,
            message: '请输入设备ip',
            trigger: ['blur']
          }
        ],
        password: [
          {
            required: true,
            whitespace: true,
            message: '请输入设备密码',
            trigger: ['blur']
          }
        ],
        address: [
          {
            required: true,
            whitespace: true,
            message: '请输入接口地址',
            trigger: ['blur']
          }
        ],
        pointName: [
          {
            required: true,
            whitespace: true,
            message: '请输入点位名称',
            trigger: ['blur']
          }
        ],
        deployment: [
          {
            required: true,
            whitespace: true,
            message: '请输入算法布控',
            trigger: ['blur']
          }
        ],
        remark: [
          {
            required: true,
            whitespace: true,
            message: '请输入备注',
            trigger: ['blur']
          }
        ]
      },
      addButton: true,
      exportButton: true,
      syncButton: true,
      tabShow: true,
      tabData: ['环境一体机', 'GNSS', '摄像头'],
      vehicleInfoField,
      cameraInfoField,
      gnssInfoField,
      input3: '',
      tableData: [
        {
          equipmentId: '202208018891',
          pointName: '生产设备点位',
          ip: '192.168.1.164',
          rtsp: 'https://172.166.4.125:8050/rtsp',
          flv: 'https://172.166.4.125:8050/flv',
          address: '四川省成都市双流区',
          channel: '0',
          state: 'success'
        },
        {
          equipmentId: '202208018891',
          pointName: '生产设备点位',
          ip: '192.168.1.164',
          rtsp: 'https://172.166.4.125:8050/rtsp',
          flv: 'https://172.166.4.125:8050/flv',
          address: '四川省成都市双流区',
          channel: '0',
          state: 'success'
        },
        {
          equipmentId: '202208018891',
          pointName: '生产设备点位',
          ip: '192.168.1.164',
          rtsp: 'https://172.166.4.125:8050/rtsp',
          flv: 'https://172.166.4.125:8050/flv',
          address: '四川省成都市双流区',
          channel: '0',
          state: 'success'
        },
        {
          equipmentId: '202208018891',
          pointName: '生产设备点位',
          ip: '192.168.1.164',
          rtsp: 'https://172.166.4.125:8050/rtsp',
          flv: 'https://172.166.4.125:8050/flv',
          address: '四川省成都市双流区',
          channel: '0',
          state: 'success'
        },
        {
          equipmentId: '202208018891',
          pointName: '生产设备点位',
          ip: '192.168.1.164',
          rtsp: 'https://172.166.4.125:8050/rtsp',
          flv: 'https://172.166.4.125:8050/flv',
          address: '四川省成都市双流区',
          channel: '0',
          state: 'success'
        },
        {
          equipmentId: '202208018891',
          pointName: '生产设备点位',
          ip: '192.168.1.164',
          rtsp: 'https://172.166.4.125:8050/rtsp',
          flv: 'https://172.166.4.125:8050/flv',
          address: '四川省成都市双流区',
          channel: '0',
          state: 'success'
        },
        {
          equipmentId: '202208018891',
          pointName: '生产设备点位',
          ip: '192.168.1.164',
          rtsp: 'https://172.166.4.125:8050/rtsp',
          flv: 'https://172.166.4.125:8050/flv',
          address: '四川省成都市双流区',
          channel: '0',
          state: 'success'
        },
        {
          equipmentId: '202208018891',
          pointName: '生产设备点位',
          ip: '192.168.1.164',
          rtsp: 'https://172.166.4.125:8050/rtsp',
          flv: 'https://172.166.4.125:8050/flv',
          address: '四川省成都市双流区',
          channel: '0',
          state: 'success'
        },
        {
          equipmentId: '202208018891',
          pointName: '生产设备点位',
          ip: '192.168.1.164',
          rtsp: 'https://172.166.4.125:8050/rtsp',
          flv: 'https://172.166.4.125:8050/flv',
          address: '四川省成都市双流区',
          channel: '0',
          state: 'success'
        }
      ],
      loading: false,
      dataFlag: true,
      pageConfig: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
        flex: 'flex-end'
      },
      // 操作列
      operationCols: [
        {
          // 插槽名
          prop: 'statusOperationCols',
          label: '操作',
          width: '110px',
          align: 'left',
          fixed: 'right',
          slot: true
        }
      ],
      topSearchConfig: {
        gutterList: 20,
        eleComponents: [
          {
            type: 'select',
            // 左边字段名称 可传可不传
            label: '设备号',
            placeholder: '请选择设备号',
            options: [],
            // 控件name可传可不传
            name: 'equipmentId',
            // 样式可传可不传
            style: {
              marginLeft: '20px'
            },
            // 每列所占的份额  一共24
            // 每个屏幕各个字段所占份额
            lg: 6,
            md: 6,
            sm: 6,
            xl: 6
          },
          {
            type: 'btn',
            // xl: 4,
            lg: 6,
            md: 6,
            sm: 6,
            xl: 6,
            style: {},
            btnList: [
              {
                name: '查询',
                btnType: 'primary',
                callback: (values) => { }
              },
              {
                name: '重置',
                btnType: 'default',
                callback: (values) => { }
              }
            ]
          }
        ]
      },
      optionEquipmentId: [],
      alterFlag: true,
      paramsInfo: {
        current: 1,
        orderBy: '',
        params: {
          equipmentId: '',
          type: 0
        },
        size: 10
      },
      type: 0,
      currentType: 0
    }
  },
  computed: {
    // ...mapGetters(['equipment', 'gnssEquipment', 'cameraEquipment'])
  },
  created() {
    // getRealDeviceList().then(res => {
    //   this.optionEquipmentId = res.data.data
    // })
  },
  watch: {
    equipment(newVal) {
      this.topSearchConfig.eleComponents[0] = {
        ...this.topSearchConfig.eleComponents[0],
        ...{ options: [...newVal] }
      }
    },
    gnssEquipment(newVal) {
      this.topSearchConfig.eleComponents[0] = {
        ...this.topSearchConfig.eleComponents[0],
        ...{ options: [...newVal] }
      }
    },
    cameraEquipment(newVal) {
      this.topSearchConfig.eleComponents[0] = {
        ...this.topSearchConfig.eleComponents[0],
        ...{ options: [...newVal] }
      }
    }
  },
  mounted() {
    this.$refs.table.getShowCols(this.tableData, cameraInfoField)
    setTimeout(() => {
      this.$refs.table.loading = false
    }, 500)
    // this.$nextTick(() => {
    //   if (this.dataFlag) {
    //     // pagesize,pageNo,升降序等参数
    //     this.getTableData(this.paramsInfo)
    //     this.topSearchConfig.eleComponents[0] = {
    //       ...this.topSearchConfig.eleComponents[0],
    //       ...{ options: [...this.equipment] }
    //     }
    //   }
    // })
  },
  methods: {
    // 处理视频推流
    handleVideoStream(data, type) {
      videoStream({
        channel: data.channel,
        code: data.equipmentId,
        type
      }).then(res => {
        if (res.data.code === 200) {
          if (type === 'open') {
            this.$message.success('推送视频流成功')
            console.log(process.env.VUE_APP_FLV_URL);
          } else if (type === 'close') {
            this.$message.success('关闭视频流成功')
            console.log(process.env.VUE_APP_FLV_URL);
          }
          this.getDataAfterSync()
        } else {
          type === 'open' && this.$message.error(res.data.msg || '推送视频流失败')
          type === 'close' && this.$message.error(res.data.msg || '关闭视频流失败')
        }
      }).catch(e => {
        type === 'open' && this.$message.error(e.msg || '推送视频流失败')
        type === 'close' && this.$message.error(e.msg || '关闭视频流失败')
      })
    },
    // 同步后请求分页数据
    getDataAfterSync() {
      this.getTableData(
        {
          ...this.paramsInfo,
          current: this.pageConfig.currentPage
        }
      )
      if (this.type === 0) {
        this.$store.dispatch('config/serviceEnvQuery')
      } else if (this.type === 1) {
        this.$store.dispatch('config/serviceGnssQuery')
      } else if (this.type === 2) {
        this.$store.dispatch('config/serviceCameraQuery')
      }
    },
    // 设备同步
    handleSync() {
      return
      this.$confirm('是否确定同步设备数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.type === 0) {
          // 环境一体机设备同步
          syncEnvMachine().then(res => {
            if (res.data.code === 200) {
              this.$message.success('设备数据同步成功')
              this.getDataAfterSync()
            }
          }).catch(e => {
            this.$message.error(e.msg || '同步设备数据失败')
          })
        } else if (this.type === 1) {
          syncGnssDevice().then(res => {
            if (res.data.code === 200) {
              this.$message.success('设备数据同步成功')
              this.getDataAfterSync()
            }
          }).catch(e => {
            this.$message.error(e.msg || '同步设备数据失败')
          })
        } else if (this.type === 2) {
          syncCamera().then(res => {
            if (res.data.code === 200) {
              this.$message.success('设备数据同步成功')
              this.getDataAfterSync()
            }
          }).catch(e => {
            this.$message.error(e.msg || '同步设备数据失败')
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消同步'
        })
      });
    },
    handleExport() {
      // 获取选择的数据
      if (this.$refs.table.selectArr && this.$refs.table.selectArr.length > 0) {
        // 联调导出的接口
        serviceExport(
          this.$refs.table.selectArr
        )
          .then((res) => {
            this.$exportFun(res, '.xlsx')
          })
          .catch((e) => {
            this.$message.error(e.msg || '导出失败！')
          })
      } else {
        this.$message.warning('请至少选择一项！')
      }
    },
    handleEdit(row) {
      // 编辑
      this.title = '编辑设备'
      this.form = {
        ...defaultForm,
        id: row.id,
        equipmentId: row.equipmentId,
        ip: row.ip,
        password: row.password,
        address: row.address,
        pointName: row.pointName,
        deployment: row.deployment,
        remark: row.remark,
        type: this.type
      }
      this.dialogVisible = true
    },
    handleDelete(row) {
      // 联调删除的接口
      let ids = []
      if (row) {
        ids.push(row.id)
      } else {
        ids = this.$refs.table.selectArr
      }
      this.$confirm('是否确定删除记录，删除后无法撤销。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'del-box',
        type: 'error'
      }).then(() => {
        serviceDelete({
          ids: ids
        })
          .then(res => {
            if (res.data.success) {
              this.$message.success('删除成功！')
              this.getTableData(
                {
                  ...this.paramsInfo,
                  current: 1
                }
              )
              if (this.type === 0) {
                this.$store.dispatch('config/serviceEnvQuery')
              } else if (this.type === 1) {
                this.$store.dispatch('config/serviceGnssQuery')
              } else if (this.type === 2) {
                this.$store.dispatch('config/serviceCameraQuery')
              }
            } else {
              this.$message.error(res.data.msg || '删除失败！')
            }
          })
          .catch(e => {
            this.$message.error(e.msg || '删除失败！')
          })
      }).catch(() => {
      })
    },
    // 封装查询内容
    searchParams(filterParams) {
      const params = {
        equipmentId:
          filterParams && filterParams.equipmentId
            ? filterParams.equipmentId
            : '',
        type: this.type
      }
      return params
    },
    searchInfo(filterParams) {
      this.pageConfig.currentPage = 1
      this.paramsInfo = {
        size: this.pageConfig.pageSize,
        current: this.pageConfig.currentPage,
        orderBy: '',
        params: this.searchParams(filterParams)
      }
      this.getTableData(this.paramsInfo)
    },
    async getTableData(params, flag, filterParams, index) {
      // 从表格那边刷新一些搜索条件
      if (flag) {
        if (index === 0) {
          this.type = index
          this.topSearchConfig.eleComponents[0] = {
            ...this.topSearchConfig.eleComponents[0],
            ...{ options: [...this.equipment] }
          }
        } else if (index === 1) {
          this.type = 1
          this.topSearchConfig.eleComponents[0] = {
            ...this.topSearchConfig.eleComponents[0],
            ...{ options: [...this.gnssEquipment] }
          }
        } else if (index === 2) {
          this.type = 2
          this.topSearchConfig.eleComponents[0] = {
            ...this.topSearchConfig.eleComponents[0],
            ...{ options: [...this.cameraEquipment] }
          }
        }
        params = {
          size: params.pageSize,
          current: params.pageNum,
          orderBy: '',
          params: this.searchParams(filterParams)
        }
        this.paramsInfo = params
      }
      await serviceQuery(params)
        .then(res => {
          this.$refs.table.loading = false
          this.tableData = res.data.data.records
          this.pageConfig.total = res.data.data.total
          this.pageConfig.currentPage = res.data.data.current
          this.type === 2
            ? this.$refs.table.getShowCols(this.tableData, cameraInfoField)
            : this.type === 1
              ? this.$refs.table.getShowCols(this.tableData, gnssInfoField)
              : this.$refs.table.getShowCols(this.tableData, vehicleInfoField)
          this.currentType = this.type
        })
        .catch(e => {
          this.$message.error(e.msg || '请求失败！')
          this.$refs.table.loading = false
        })
    },
    addData() {
      this.title = '新增设备'
      this.form = { ...defaultForm, type: this.type }
      this.dialogVisible = true
    },
    closeForm() {
      this.title = '新增报警标准'
      this.loadingButton = false
      this.errorEquipmentId = ''
      this.errorPointName = ''
      this.form = { ...defaultForm }
      if (this.type === 0) {
        this.$store.dispatch('config/serviceEnvQuery')
      } else if (this.type === 1) {
        this.$store.dispatch('config/serviceGnssQuery')
      } else if (this.type === 2) {
        this.$store.dispatch('config/serviceCameraQuery')
      }
      this.dialogVisible = false
    },
    async confirmForm() {
      this.$refs.internatForm.validate(async(success, _info) => {
        if (success) {
          this.errorEquipmentId = ''
          this.loadingButton = true
          if (this.form.id) {
            // 修改接口
            await serviceUpdate(this.form)
              .then(res => {
                if (res.data.success) {
                  this.$message.success('修改成功！')
                  this.getTableData(this.paramsInfo)
                  this.closeForm()
                } else {
                  this.loadingButton = false
                  if (res.data.data.equipmentId) {
                    this.errorEquipmentId = res.data.data.equipmentId
                  } else if (res.data.data.pointName) {
                    this.errorPointName = res.data.data.pointName
                  } else {
                    this.$message.error(res.data.msg || '请求失败！')
                  }
                }
              })
              .catch(e => {
                this.loadingButton = false
                this.$message.error(e.msg || '请求失败！')
              })
          } else {
            // 新增接口
            const formData = {
              equipmentId: this.form.equipmentId,
              ip: this.form.ip,
              password: this.form.password,
              address: this.form.address,
              pointName: this.form.pointName,
              deployment: this.form.deployment,
              remark: this.form.remark,
              type: this.form.type
            }
            await serviceAdd(formData)
              .then(res => {
                if (res.data.success) {
                  this.$message.success('添加成功！')
                  this.$refs.table.resetForm()
                  this.closeForm()
                } else {
                  this.loadingButton = false
                  if (res.data.data.equipmentId) {
                    this.errorEquipmentId = res.data.data.equipmentId
                  } else if (res.data.data.pointName) {
                    this.errorPointName = res.data.data.pointName
                  } else {
                    this.$message.error(res.data.msg || '请求失败！')
                  }
                }
              })
              .catch(e => {
                this.loadingButton = false
                this.$message.error(e.msg || '请求失败！')
              })
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

.box-card {
  margin: 16px;
}

.title {
  border-bottom: 1px solid #d7d7d7;
  height: 50px;
  color: #20a0ff;
  line-height: 50px;
  background-color: #f7f7f7;
  margin-bottom: 20px;
}

.input-with-select {
  margin-left: 15px;
  width: 250px;
}
.state-normal {
  font-size: 25px;
  font-weight: bold;
  vertical-align: middle;
  margin-right: 3px;
  color: #1DC878;
}
.state-broken {
  font-size: 25px;
  font-weight: bold;
  vertical-align: middle;
  margin-right: 3px;
  color: #FF3B30;
}
.del-box {
  .el-message-box__btns {
    .el-button:nth-child(1) {
    }
    .el-button:nth-child(2) {
      margin-right:10px;
      background-color:#22a575 !important;
      border: 1px solid #22a575 !important;
    }
  }
}
::v-deep .el-button--text.is-disabled {
  color: #a0cfff !important;
}

::v-deep .tab {
  display: none !important;
}
</style>
