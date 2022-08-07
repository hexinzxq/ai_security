<template>
  <div class="viewIndex banner">
    <common-table
      ref="table"
      :data-flag="dataFlag"
      :top-search-config="topSearchConfig"
      :table-data="tableData"
      :page-config="pageConfig"
      :operation-cols="operationCols"
    >
      <template #operBtn>
        <!-- 自定义顶部内容 -->
        <div class="btnBox">
          <el-button
            :class="{ confirmBtn: btnFlag, disableBtn: !btnFlag }"
            :disabled="!btnFlag"
            type="primary"
            @click="confirmOperator({}, true)"
          >批量确认</el-button>
          <el-button
            :class="{ exportBtn: btnFlag, disableBtn: !btnFlag }"
            :disabled="!btnFlag"
            style="
              margin-left: 25px;
              background: #fff;
              color: black;
              border-color: #ccc;
            "
            type="primary"
            @click="handleExport('table')"
          >批量导出</el-button>
        </div>
      </template>
      <!-- 报警状态 标签 -->
      <template #status="data">
        <el-tag v-if="data.row.status === '未确认'" type="warning">{{
          data.row.status
          }}</el-tag>
        <el-tag v-if="data.row.status === '未处理'">{{
          data.row.status
          }}</el-tag>
        <el-tag v-if="data.row.status === '无需处理'" type="info">{{
          data.row.status
          }}</el-tag>
        <el-tag v-if="data.row.status === '已处理'" type="success">{{
          data.row.status
          }}</el-tag>
      </template>
      <template #handleStatus="data">
        <el-link
          v-if="data.row.status === '无需处理'"
          class="linkBtn"
          type="primary"
          @click="resolveHandel(data.row, '无需处理记录', true)"
        >查看记录</el-link>
        <el-link
          v-if="data.row.status === '已处理'"
          class="linkBtn"
          type="primary"
          @click="resolveHandel(data.row, '已处理记录', false)"
        >查看记录</el-link>
        <el-link
          v-if="data.row.status === '未处理'"
          class="linkBtn"
          type="primary"
          @click="dealEvent(data.row)"
        >处理</el-link>
        <el-link
          v-if="data.row.status === '未确认'"
          class="linkBtn"
          type="primary"
          @click="confirmOperator(data.row, false)"
        >确认</el-link>
        <el-link
          v-if="data.row.status === '未确认'"
          class="linkBtn"
          type="primary"
          @click="noToDeal(data.row)"
        >无需处理</el-link>
      </template>
      <!-- 报警情况 -->
      <template #warningContent="data">
        <el-tooltip class="item" effect="dark" :content="data.row.speed+' km/h'" placement="top">
          <span>{{ data.row.warningContent }}</span>
        </el-tooltip>
      </template>
    </common-table>
  </div>
</template>
<script>
  import CommonTable from '@/components/CommonTable'
  // import { TableMinxin } from '@/mixins/TableCommonMinxin'
  import { mainEvent } from '@/utils/table-column-match'
  // import { fileInterceptor } from '@/api/manage'

  export default {
    name: 'VehicleRisk',
    components: {
      CommonTable
    },
    // mixins: [TableMinxin],
    data() {
      return {
        mainEvent,
        handleTitle: '已处理记录',
        // 无需处理和已处理模态框的显隐
        processedFlag: false,
        dealVisible: false,
        // 无需处理事件
        noDeal: false,
        confirmVisible: false,
        modelData: {},
        // 新增、编辑、查看
        isAdd: false,
        isEdit: false,
        isView: false,
        // modelConfig: {
        //   title: '处理事件',
        //   width: '40%',
        //   visibleFlag: false
        // },
        alterFlag: false,
        // 操作列
        operationCols: [
          {
            // 插槽名
            prop: 'handleStatus',
            label: '操作',
            fixed: 'right',
            slot: true
          }
        ],
        // 表格数据
        tableData: [
          {
            vehicleNumber:'2WJ-002',
            status:'未确认',
            warningNo:'CL8120709941',
            vehicleGps: '105.928226°E|27.966621°N',
            warningContent: '超速',
            causeTime:'2022-07-18 13:07:03',
          },
          {
            vehicleNumber:'2WJ-002',
            status:'未确认',
            warningNo:'CL8120709941',
            vehicleGps: '105.928226°E|27.966621°N',
            warningContent: '超速',
            causeTime:'2022-07-18 13:07:03',
          },
          {
            vehicleNumber:'2WJ-002',
            status:'未确认',
            warningNo:'CL8120709941',
            vehicleGps: '105.928226°E|27.966621°N',
            warningContent: '超速',
            causeTime:'2022-07-18 13:07:03',
          },
          {
            vehicleNumber:'2WJ-002',
            status:'未确认',
            warningNo:'CL8120709941',
            vehicleGps: '105.928226°E|27.966621°N',
            warningContent: '超速',
            causeTime:'2022-07-18 13:07:03',
          },
          {
            vehicleNumber:'2WJ-002',
            status:'未确认',
            warningNo:'CL8120709941',
            vehicleGps: '105.928226°E|27.966621°N',
            warningContent: '超速',
            causeTime:'2022-07-18 13:07:03',

          },
          {
            vehicleNumber:'2WJ-002',
            status:'未确认',
            warningNo:'CL8120709941',
            vehicleGps: '105.928226°E|27.966621°N',
            warningContent: '超速',
            causeTime:'2022-07-18 13:07:03',


          },
          {
            vehicleNumber:'2WJ-002',
            status:'未确认',
            warningNo:'CL8120709941',
            vehicleGps: '105.928226°E|27.966621°N',
            warningContent: '超速',
            causeTime:'2022-07-18 13:07:03',


          },
          {
            vehicleNumber:'2WJ-002',
            status:'未确认',
            warningNo:'CL8120709941',
            vehicleGps: '105.928226°E|27.966621°N',
            warningContent: '超速',
            causeTime:'2022-07-18 13:07:03',


          },
          {
            vehicleNumber:'2WJ-002',
            status:'未确认',
            warningNo:'CL8120709941',
            vehicleGps: '105.928226°E|27.966621°N',
            warningContent: '超速',
            causeTime:'2022-07-18 13:07:03',

          },
          {
            vehicleNumber:'2WJ-002',
            status:'未确认',
            warningNo:'CL8120709941',
            vehicleGps: '105.928226°E|27.966621°N',
            warningContent: '超速',
            causeTime:'2022-07-18 13:07:03',

          },
        ],
        // 表格相关配置
        tableConfig: { height: '' },
        // 顶部搜索配置
        topSearchConfig: {
          // 行之间的间距
          gutterList: 20,
          // labelWidth: '68px',
          // labelWidth: '80px',
          // 一行几个搜索字段 必传
          rowCount: 3,
          // 搜索框组件配置
          eleComponents: [
            // 每个对象为一列
            // 同一块布局中可以包含多个按钮
            {
              type: 'select',
              label: '关联车辆',
              clearable: true,
              value: '',
              name: 'vehicleNumber',
              placeholder: '请选择关联车辆',
              options: [],
              // xl: 4,
              lg: 6,
              md: 6,
              sm: 6,
              xl: 6,
              callback: (val) => {

              }
            },
            {
              // 类型必传
              type: 'select',
              value: '',
              options: [
                {
                  label: '全部',
                  value: ''
                },
                {
                  value: '未确认'
                },
                {
                  value: '未处理'
                },
                {
                  value: '无需处理'
                },
                {
                  value: '已处理'
                }
              ],
              // 左边字段名称 可传可不传
              label: '状态',
              // 控件name必传
              name: 'status',
              // 样式可传可不传
              style: {},
              // 占位内容 可传可不传
              placeholder: '全部',
              // 每列所占的份额  一共24
              // 每个屏幕各个字段所占份额
              lg: 6,
              md: 6,
              sm: 6,
              xl: 6,
              callback: (val) => {

              }
            },
            // 布局占位内容字段
            {
              type: 'date',
              dateType: 'daterange',
              label: '日期',
              clearable: true,
              style: {},
              value: '',
              name: 'dateRange',
              // xl: 16,
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
                  callback: (values) => {}
                },
                {
                  name: '重置',
                  btnType: 'danger',
                  callback: (values) => {}
                }
              ]
            }
          ]
        },
        pageConfig: {
          style: {},
          background: true,
          // 每页显示条目个数
          pageSize: 1,
          // 小型分页样式
          small: false,
          // width: "100%",
          // 分页按钮的对齐方式  flex-start  flex-end  center
          flex: 'flex-end',
          // 页码按钮的数量大于5的基数
          pagerCount: 5,
          // 当前页码
          currentPage: 1,
          total: 0,
          layout: 'prev, pager, next,sizes,jumper',
          pageSizes: [10, 20, 30, 40]
        },
        // 为true时父组件获取数据，false时只需传入对应url子组件即可自动获取数据
        dataFlag: true,
        urlList: {
          // 给父链接则从父组件中请求  子链接传值则从子组件中请求
          tableDataUrl: 'digital-mine/vehicleWarning/findAll',
          exportXlsUrl: 'digital-mine/vehicleWarning/exportXls',
          confirmUrl: 'digital-mine/vehicleWarning/confirm',
          batchConfirmUrl: 'digital-mine/vehicleWarning/confirmByWarningNos',
          handleUrl: 'digital-mine/vehicleWarning/handler',
          revokeUrl: 'digital-mine/vehicleWarning/cancelIgnore'
        },
        // 确认接口数据
        confirmData: {},
        fileList: [],
        // imageUrl: '',
        // 上传文件名称
        uploadInfo: '',
        // 上传文件信息
        fileInfo: {},
        // 查看图片路径
        viewImgUrl: '',
        previewFlag: false,
        // 预览图片类型
        viewFileType: 'img',
        percent: 0,
        processFlag: false,
        loading: false,
        previewLoading: false,
        imgLoading: false,
        batchConfirmFlag: false,
        btnFlag: false,
        exportParams: {}
      }
    },
    computed: {
      wsInfo() {
        return this.$store.state.app.wsInfo
      }
      // permissionName() {
      //   return this.$store.state.app.userInfo.permissionName
      // }
    },
    watch: {
      wsInfo(msg) {
        // websocket实时更新
        if (msg.data === 'heartBeat') return
        if (JSON.parse(msg.data).type ===  'warnings') {
          this.getData(this.exportParams)
        }
      }
    },
    mounted() {
      this.$refs.table.getShowCols(this.tableData, mainEvent)
      this.$refs.table.loading  =   false
      // // 父组件中调用接口获取后端数据
      // this.$nextTick(() => {
      //   if (this.dataFlag) {
      //     // pagesize,pageNo,升降序等参数
      //     // 判断路由参数是否存在
      //     const params = { }
      //     if (this.$route.query.type) {
      //       // 类型赋值
      //       params.status = this.$route.query.type
      //       this.topSearchConfig.eleComponents[1].value = this.$route.query.type
      //       // table组件搜索条件赋值
      //       this.$refs.table.confirmFilterParams.status = this.$route.query.type
      //
      //       // 时间赋值
      //       params.startTime = this.$route.query.queryData[0]
      //       params.endTime = this.$route.query.queryData[1]
      //       // 跳转过来搜索框默认值
      //       this.topSearchConfig.eleComponents[2].value = this.$route.query.queryData
      //       // 过滤参数赋值
      //       this.$refs.table.confirmFilterParams.dateRange = this.$route.query.queryData
      //     }
      //     // 跳转过后给状态赋值，不用过滤此处直接赋值
      //     this.exportParams = { ...params }
      //     this.getData(params)
      //   }
      // })
      // // 获取所有车牌号码
      // this.getAllVehicleNumber()
    },
    methods: {
      // 当触发重置、查询操作时重置当前页码
      resetCurrentPage() {
        this.pageConfig.currentPage = 1
      },
      handleRemove(file, fileList) {
        this.fileList = fileList
      },
      // 重置搜索条件
      resetSearchParams(params) {
        this.exportParams  = {}
        this.pageConfig.currentPage  =  1
        this.getData(params)
      },
      changeStatus(val) {
        this.btnFlag = val
      },
      // 取消查看函数
      cancelHandle() {
        URL.revokeObjectURL(this.viewImgUrl)
        this.fileList = []
        // this.modelData = {}
        this.loading = false
        this.dealVisible = false
      },
      // 提交处理数据信息
      submitDeal() {
        // 判断是否已经提交  防止用户多次点击
        if (this.loading) return
        if (this.fileList.length > 0) {
          this.$refs.upload.submit()
        } else {
          console.log(this.fileInfo)
          const params = {
            file: '',
            warningNo: this.modelData.warningNo,
            handlerMark: this.modelData.handlerMark
          }
          if (this.noDeal) {
            params.type = 'ignore'
            this.confirmWarning(params)
          } else {
            this.handlewarningCom(params)
          }
        }
        this.loading = true
      },
      // 上传文件列表
      handleChange(file, fileList) {
        // 截取文件后缀
        const fileName = file.name.lastIndexOf('.')
        const fileNameLength = file.name.length
        const fileFormat = file.name.substring(fileName + 1, fileNameLength)
        if (!this.acceptType.includes(fileFormat.toLowerCase())) {
          this.$message.error(`文件格式错误，只能是${this.acceptType}格式`)
          this.$refs.upload.clearFiles()
          return
        }
        this.uploadInfo = file.name
        this.fileInfo.name = file.raw.name
        this.fileInfo.type = file.raw.type
        // console.log(this.fileInfo)
        this.fileList = fileList
        // this.imageUrl = file.url
      },
      uploadError(err, file, fileList) {
        if (err.message.indexOf('Maximum') > -1) { this.$message.error('文件过大') }
        this.loading = false
        this.dealVisible = false
      },
      // 上传成功回调函数
      uploadSuccess(res) {
        // this.$message.success('上传成功!')
        this.fileInfo.responseId = res.result
        const params = {
          file: JSON.stringify(this.fileInfo),
          warningNo: this.modelData.warningNo,
          handlerMark: this.modelData.handlerMark
        }
        if (this.noDeal) {
          params.type = 'ignore'
          params.warningNos = [this.confirmData.warningNo].join(',')
          this.confirmWarning(params)
        } else {
          this.handlewarningCom(params)
        }
      },
      handlewarningCom(params) {
        // 处理回调函数
        handleVehicleWarning(this.urlList.handleUrl, params)
          .then((res) => {
            this.$message.success('已成功处理')
            this.loading = false
            this.dealVisible = false
            this.getData(this.exportParams)
          })
          .catch((err) => {
            this.$message.error(err)
          })
      },
      // 上传文件进度
      uploadProcess(event, file, fileList) {
        this.processFlag = true
        this.percent = Math.floor(event.percent)
      },
      // 初始化确认数据
      confirmOperator(data, flag) {
        this.batchConfirmFlag = flag
        this.handleTitle = '处理事件'
        this.noDeal = false
        this.confirmVisible = true
        this.confirmData = data
      },
      // 撤销无需处理
      revokeDeal(val) {
        const params = {
          warningNo: val
        }
        handleVehicleWarning(this.urlList.revokeUrl, params).then((res) => {
          this.$message.success('撤销成功')
          this.processedFlag = false
          this.getData(this.exportParams)
        })
      },
      // 无需处理事件
      noToDeal(data) {
        data.handlerMark = ''
        this.fileInfo = {}
        this.uploadInfo = ''
        this.fileList = []
        this.handleTitle = '无需处理事件'
        this.noDeal = true
        this.modelData = data
        this.dealVisible = true
        this.viewImgUrl = ''
      },
      // 确认事件处理函数
      handleConfirm() {
        let params
        if (this.batchConfirmFlag) {
          const warningNos = []
          for (const item of this.$refs.table.selectInfo) {
            warningNos.push(item.warningNo)
          }
          params = {
            warningNos: warningNos.join(','),
            handlerMark: ''
          }
        } else {
          params = {
            warningNos: [this.confirmData.warningNo].join(','),
            file: '',
            handlerMark: ''
          }
        }
        this.batchConfirm(params)
      },
      // 确认操作函数调用
      confirmWarning(params) {
        handleVehicleWarning(this.urlList.confirmUrl, params).then((res) => {
          this.confirmVisible = false
          this.loading = false
          this.dealVisible = false
          this.$message.success('已成功确认处理')
          this.getData(this.exportParams)
        })
      },
      batchConfirm(params) {
        handleVehicleWarning(this.urlList.batchConfirmUrl, params)
          .then((res) => {
            this.confirmVisible = false
            this.loading = false
            this.dealVisible = false
            this.$message.success('已成功确认处理')
            this.getData(this.exportParams)
          })
          .catch((err) => {
            console.log(err)
            // this.$message.error(err.response.data.message)
          })
      },
      dealEvent(data) {
        if (this.isJson(data.handlerFile)) {
          this.fileInfo = JSON.parse(data.handlerFile)
          this.uploadInfo = this.fileInfo.name
        } else {
          this.fileInfo = {}
          this.uploadInfo = ''
        }
        // 处理时候清空处理记录
        data.handlerMark = ''
        this.fileList = []
        this.dealVisible = true
        this.noDeal = false
        this.modelData = data
        this.handleTitle = '处理事件'
        this.processedFlag = false
      },
      // 查看信息
      resolveHandel(data, title, flag) {
        // console.log(data)
        // 预览成功标志
        this.previewLoading = true
        this.noDeal = flag
        this.handleTitle = title
        // 已处理
        this.processedFlag = true
        this.viewImgUrl = ''
        let fileInfo = {}
        if (this.isJson(data.handlerFile)) {
          fileInfo = JSON.parse(data.handlerFile)
          if (fileInfo.type || fileInfo.name) {
            this.confirmFileType(fileInfo.type)
            this.uploadInfo = fileInfo.name
          } else {
            this.viewFileType = 'empty'
          }
        } else {
          this.viewFileType = 'empty'
        }
        // 当存在图片时获取图片
        if (fileInfo.responseId) {
          // 获取预览图片
          fileInterceptor({ id: fileInfo.responseId })
            .then((res) => {
              let blob
              if (this.viewFileType === 'img') {
                this.imgLoading = false
                blob = new Blob([res], {
                  type: 'image/jpeg;charset=utf-8'
                })
              } else {
                blob = new Blob([res], {
                  type: 'application/pdf;charset=utf-8'
                })
              }
              this.previewLoading = false
              this.viewImgUrl = URL.createObjectURL(blob)
            })
            .catch((err) => {
              console.log(err)
              this.$message.error('文件已损坏!')
              this.viewFileType = 'error'
            })
        }
        this.modelData = { ...data }
        // console.log(this.modelData)
      },
      // 判断查看文件类型
      confirmFileType(type) {
        if (/(gif|jpg|jpeg|png)$/.test(type.toLowerCase())) {
          // 图片类型则加载图片
          this.imgLoading = true
          this.viewFileType = 'img'
        } else {
          this.viewFileType = 'pdf'
        }
      },
      // 表格数据请求接口
      getData(params) {
        getMainTableData(this.urlList.tableDataUrl, params)
          .then((res) => {
            this.$refs.table.loading = false
            this.tableData = res.result.records
            for (const index in this.tableData) {
              this.tableData[index].index = index
            }
            this.pageConfig.total = res.result.total
            this.$refs.table.getShowCols(this.tableData, mainEvent)
            // this.pageConfig.total = this.urlTableData.length;
          })
          .catch((e) => {
            console.log(e)
          })
      },
      // 获取搜索字段内容
      getSearchInfo(filterParams) {
        this.exportParams = { ...filterParams }
        if (this.exportParams['dateRange']) {
          this.exportParams.startTime = this.exportParams.dateRange[0]
          this.exportParams.endTime = this.exportParams.dateRange[1]
          delete this.exportParams['dateRange']
        }
        this.getData(this.exportParams)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "~@/styles/common.scss";
</style>
