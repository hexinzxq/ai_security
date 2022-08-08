<template>
  <div class="wrapper">
    <common-table
      ref="logTableC"
      :data-flag="dataFlag"
      :top-search-config="topSearchConfig"
      :table-data="tableData"
      :page-config="pageConfig"
      :params="paramsProps"
      @search-info="getSearchInfo"
    >
      <template #operBtn>
        <div class="operation-btn">
          <el-button type="primary" :disabled="$refs.logTableC&&$refs.logTableC.selectArr&&$refs.logTableC.selectArr.length===0" @click="handleExport">批量导出</el-button>
        </div>
      </template>
      <template #timeRange="data">
        <el-time-picker
          v-model="data.row.timeRange"
          is-range
          format="hh:mm"
          value-format="hh:mm"
          range-separator="-"
          disabled
          style="width: 100%"
        />
      </template>
      <template #picUrl="data">
        <div class="pic-container">
          <img src="../../assets/nav_header_images/city.png" class="avatar">
        </div>
      </template>
    </common-table>
  </div>
</template>

<script>
import CommonTable from '@/components/CommonTable'
import { logOperateField } from '@/utils/table-column-match'
import { getTableData } from '@/api/table'
import Moment from 'moment'
import defaultSettings from '@/settings'
const { exportUrl } = defaultSettings
// import SubmitForm from '../../alert/guard/SubmitForm.vue'
// import { exportCommonMethod } from '@/utils/index'
export default {
  name: 'OperateLog',
  components: {
    CommonTable,
    // SubmitForm
  },
  data() {
    return {
      viewFileType: 'img', // 查看的附件数据类型
      currentItem: {}, // 当前行数据
      dialogSubmitDetail: false, // 是否展示处理详情
      paramsProps: {},
      dialogVisible: false,
      dialogName: '',
      isAdd: false,
      targetData: {},
      // 由本组件获取数据，再传入common-table
      dataFlag: true,
      // 表格数据
      tableData: [
        {
          num: 1,
          eventCode: 'event001',
          eventType: '边坡位移',
          deviceName: 'GNS88763212',
          eventTime: '2022-07-26 10:28:08',
          eventRecord: '已处理',
          eventHandler: '王华',
          eventHandleTime: '2022-07-26 14:28:08'
        },
        {
          num: 1,
          eventCode: 'event001',
          eventType: '边坡位移',
          deviceName: 'GNS88763212',
          eventTime: '2022-07-26 10:28:08',
          eventRecord: '已处理',
          eventHandler: '王华',
          eventHandleTime: '2022-07-26 14:28:08'
        },
        {
          num: 1,
          eventCode: 'event001',
          eventType: '边坡位移',
          deviceName: 'GNS88763212',
          eventTime: '2022-07-26 10:28:08',
          eventRecord: '已处理',
          eventHandler: '王华',
          eventHandleTime: '2022-07-26 14:28:08'
        },
        {
          num: 1,
          eventCode: 'event001',
          eventType: '边坡位移',
          deviceName: 'GNS88763212',
          eventTime: '2022-07-26 10:28:08',
          eventRecord: '已处理',
          eventHandler: '王华',
          eventHandleTime: '2022-07-26 14:28:08'
        },
        {
          num: 1,
          eventCode: 'event001',
          eventType: '边坡位移',
          deviceName: 'GNS88763212',
          eventTime: '2022-07-26 10:28:08',
          eventRecord: '已处理',
          eventHandler: '王华',
          eventHandleTime: '2022-07-26 14:28:08'
        },
        {
          num: 1,
          eventCode: 'event001',
          eventType: '边坡位移',
          deviceName: 'GNS88763212',
          eventTime: '2022-07-26 10:28:08',
          eventRecord: '已处理',
          eventHandler: '王华',
          eventHandleTime: '2022-07-26 14:28:08'
        },
        {
          num: 1,
          eventCode: 'event001',
          eventType: '边坡位移',
          deviceName: 'GNS88763212',
          eventTime: '2022-07-26 10:28:08',
          eventRecord: '已处理',
          eventHandler: '王华',
          eventHandleTime: '2022-07-26 14:28:08'
        },
        {
          num: 1,
          eventCode: 'event001',
          eventType: '边坡位移',
          deviceName: 'GNS88763212',
          eventTime: '2022-07-26 10:28:08',
          eventRecord: '已处理',
          eventHandler: '王华',
          eventHandleTime: '2022-07-26 14:28:08'
        },
        {
          num: 1,
          eventCode: 'event001',
          eventType: '边坡位移',
          deviceName: 'GNS88763212',
          eventTime: '2022-07-26 10:28:08',
          eventRecord: '已处理',
          eventHandler: '王华',
          eventHandleTime: '2022-07-26 14:28:08'
        },
        {
          num: 1,
          eventCode: 'event001',
          eventType: '边坡位移',
          deviceName: 'GNS88763212',
          eventTime: '2022-07-26 10:28:08',
          eventRecord: '已处理',
          eventHandler: '王华',
          eventHandleTime: '2022-07-26 14:28:08'
        },
      ],
      // 分页配置
      pageConfig: {
        style: {},
        background: true,
        // 每页显示条目个数
        pageSize: 10,
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
        layout: 'prev, pager, next,sizes, jumper',
        pageSizes: [10, 20, 30, 40]
      },
      // 搜索框配置
      topSearchConfig: {
        // 行之间的间距
        gutterList: 20,
        rowCount: 2,
        // labelWidth: '80px',
        // 搜索框组件配置
        eleComponents: [
          {
            type: 'select',
            label: '事件类型',
            options: [
              {
                value: '烟火识别'
              },
              {
                value: '入侵监测'
              }
            ],
            value: '',
            name: 'type',
            placeholder: '请选择事件类型',
            lg: 6,
            md: 6,
            sm: 6,
            xl: 4
          },
          {
            // 类型必传
            type: 'daterange',
            // 左边字段名称 可传可不传
            label: '发生时间',
            // 搜索字段绑定的值，必穿
            value: '',
            // 控件name可传可不传
            name: 'happendate',
            // 样式可传可不传
            // style: { width: '200px' },
            // 占位内容 可传可不传
            // 每列所占的份额  一共24
            // 每个屏幕各个字段所占份额
            lg: 8,
            md: 8,
            sm: 8,
            xl: 6
          },
          {
            // 类型必传
            type: 'daterange',
            // 左边字段名称 可传可不传
            label: '操作时间',
            // 搜索字段绑定的值，必穿
            value: '',
            // 控件name可传可不传
            name: 'handledate',
            // // 样式可传可不传
            // style: { width: '200px' },
            // 占位内容 可传可不传
            // 每列所占的份额  一共24
            // 每个屏幕各个字段所占份额
            lg: 8,
            md: 8,
            sm: 8,
            xl: 6
          },
          {
            // 类型必传
            type: 'input',
            // 左边字段名称 可传可不传
            label: '设备名称',
            // 搜索字段绑定的值，必穿
            placeholder: '请输入设备名称',
            value: '',
            // 控件name可传可不传
            name: 'deviceName',
            // // 样式可传可不传
            // style: { width: '300px' },
            // 占位内容 可传可不传
            // 每列所占的份额  一共24
            // 每个屏幕各个字段所占份额
            lg: 6,
            md: 6,
            sm: 6,
            xl: 4
          },
          {
            type: 'btn',
            lg: 4,
            md: 4,
            sm: 4,
            xl: 3,
            style: { marginRight: '-250px' },
            btnList: [
              {
                name: '查询',
                btnType: 'primary',
                callback: (values) => {}
              },
              {
                name: '重置',
                callback: (values) => {}
              }
            ]
          }
        ]
      },
      urlList: {
        tableDataUrl: '/log/eventLogList'
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.logTableC.getShowCols(this.tableData, logOperateField)
      setTimeout(() => {
        this.$refs.logTableC.loading = false
      }, 500)
      if (this.dataFlag) {
        const params = {
          pageNum: 1,
          pageSize: 10
        }
        // this.getData(params)
        this.paramsProps = {}
      }
    })
  },
  methods: {
    // 关闭处理详情模态框
    handleSubmitDClose() {
      this.dialogSubmitDetail = false
      // const page = {
      //   pageNum: 1,
      //   pageSize: 10
      // }
      const page = {
        pageNum: this.$refs.logTableC.pageNum,
        pageSize: this.$refs.logTableC.pageSize
      }
      // this.getData(page)
    },
    // 查看处理详情
    handleView(item) {
      this.dialogSubmitDetail = true
      this.currentItem = item
      this.resolveHandel(item)
    },
    // 查看信息
    resolveHandel(data) {
      let fileInfo = ''
      if (data.recordFile) {
        fileInfo = data.recordFile.substring(data.recordFile.lastIndexOf('/') + 1)
        if (fileInfo) {
          const type = fileInfo.split('.')[1]
          this.confirmFileType(type)
        } else {
          this.viewFileType = 'empty'
        }
      } else {
        this.viewFileType = 'empty'
      }
    },
    // 判断查看文件类型
    confirmFileType(type) {
      if (/(gif|jpg|jpeg|png|jfif)$/.test(type.toLowerCase())) {
        // 图片类型则加载图片
        this.imgLoading = true
        this.viewFileType = 'img'
      } else if (/(pdf)$/.test(type.toLowerCase())) {
        this.viewFileType = 'pdf'
      } else {
        this.viewFileType = 'other'
      }
    },
    // 导出
    handleExport() {
      const data = this.$refs.logTableC && this.$refs.logTableC.selectArr
      const ids = data.toString()
      // const params = {
      //   ids: data.toString(),
      //   type: 2
      // }
      // downFile('/event/export', params).then((data) => {
      //   this.exportCommonMethod(data, '导出')
      // })
      const link = document.createElement('a')
      const url = `${exportUrl}/event/export?ids=${ids}&type=7`
      link.style.display = 'none'
      link.href = url
      // link.setAttribute('download', fileName + '.xls')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link) // 下载完成移除元素
      window.URL.revokeObjectURL(url) // 释放掉blob对象
    },
    // 表格数据请求接口
    // getData(params) {
    //   this.$refs.logTableC && (this.$refs.logTableC.loading = true)
    //   // this.tableData = []
    //   getTableData(this.urlList.tableDataUrl, params)
    //     .then((res) => {
    //       this.tableData = res.result && res.result.records
    //       this.pageConfig.total = res.result && res.result.total
    //       this.$refs.logTableC && (this.$refs.logTableC.loading = false)
    //       this.$refs.logTableC.getShowCols(this.tableData, logField)
    //       this.tableData.map((item, index) => {
    //         item.num = index + 1
    //         item.id = item.eventId
    //       })
    //     })
    //     .catch((e) => {
    //       this.$refs.logTableC && (this.$refs.logTableC.loading = false)
    //       console.log(e)
    //     })
    // },
    getSearchInfo(filterParams) {
      // if (filterParams.date[0] === filterParams.date[1]) {
      //   data.startDate = Moment(filterParams.date[0]).format('YYYY-MM-DD-HH:mm:ss')
      //   data.endDate = Moment(filterParams.date[1]).format('YYYY-MM-DD')+ '24:24:24',
      // }
      // 获取筛选字段的值
      const data = {
        type: filterParams.type,
        deviceName: filterParams.deviceName,
        startTime1: filterParams.happendate && Moment(filterParams.happendate[0]).format('YYYY-MM-DD'),
        startTime2: filterParams.happendate && Moment(filterParams.happendate[1]).format('YYYY-MM-DD'),
        copeTime1: filterParams.handledate && Moment(filterParams.handledate[0]).format('YYYY-MM-DD'),
        copeTime2: filterParams.handledate && Moment(filterParams.handledate[1]).format('YYYY-MM-DD'),
        pageNum: 1,
        pageSize: 10
      }
      this.paramsProps = data
      // 获取筛选字段的值
      // this.getData(data)
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  ::v-deep .el-row{
    padding-left: 16px;
    padding-top: 25px;
  }
  // margin: 30px 30px 0 30px;
  .operation-btn {
    margin-bottom: 10px;
    padding-left: 16px;
  }
  .pic-container {
    width: 100%;
    height: 100%;
    text-align: left;
    .avatar {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
