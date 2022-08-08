<template>
  <!--	边坡-->
  <div>
    <div class="card-box">
      <common-table
        ref="table"
        :data-flag="dataFlag"
        :table-data="tableData"
        :page-config="pageConfig"
        :top-search-config="topSearchConfig"
        :table-column-match="vehicleInfoFieldSlope"
        :operation-cols="operationCols"
        :alter-flag="alterFlag"
        :export-button="exportButton"
        @get-table-data="getTableData"
        @search-info="searchInfo"
        @exportData="handleExport"
      >
        <template #degree="data">
          <el-tag
            v-if="data.row.degree === 'C0'"
            type="success"
          >{{
              data.row.degree
            }}</el-tag>
          <el-tag v-else-if="data.row.degree === 'C1'">{{
              data.row.degree
            }}</el-tag>
          <el-tag
            v-else-if="data.row.degree === 'C2'"
            type="warning"
            class="el-tag-warning"
          >{{ data.row.degree }}</el-tag>
          <el-tag
            v-else-if="data.row.degree === 'C3'"
            class="el-tag-info"
          >{{
              data.row.degree
            }}</el-tag>
          <el-tag
            v-else-if="data.row.degree === 'C4'"
            type="danger"
          >{{
              data.row.degree
            }}</el-tag>
        </template>
        <template #relativeHorizontalX="data">
          <el-popover
            placement="top-start"
            title=""
            trigger="hover"
            :content="'初始值：' + data.row.initialValueX + 'm'"
          >
            <el-button
              slot="reference"
              type="text"
              class="no-border"
            >
              <span style="color: #606266">{{
                  data.row.relativeHorizontalX
                }}</span>
            </el-button>
          </el-popover>
        </template>
        <template #relativeHorizontalY="data">
          <el-popover
            placement="top-start"
            title=""
            trigger="hover"
            :content="'初始值：' + data.row.initialValueY + 'm'"
          >
            <el-button
              slot="reference"
              type="text"
              class="no-border"
            >
              <span style="color: #606266">{{
                  data.row.relativeHorizontalY
                }}</span>
            </el-button>
          </el-popover>
        </template>
        <template #relativeAltitude="data">
          <el-popover
            placement="top-start"
            title=""
            trigger="hover"
            :content="'初始值：' + data.row.initialValueA + 'm'"
          >
            <el-button
              slot="reference"
              type="text"
              class="no-border"
            >
              <span style="color: #606266">{{
                  data.row.relativeAltitude
                }}</span>
            </el-button>
          </el-popover>
        </template>
        <template #state="data">
          <el-button
            v-if="data.row.state === 0"
            :dust-handle="data.row.state"
            class="button-null"
          >
            无需处理
          </el-button>
          <el-button
            v-if="data.row.state === 1"
            :dust-handle="data.row.state"
            type="danger"
            plain
          >
            未处理
          </el-button>
          <el-button
            v-if="data.row.state === 2"
            :dust-handle="data.row.state"
            type="primary"
            plain
          >
            已处理
          </el-button>
        </template>
        <template #operation="data">
          <el-button
            v-if="data.row.state === 1 || data.row.state === 0"
            :class="
              data.row.state === 0
                ? ''
                : 'deal-btn-red'
            "
            :disabled="data.row.state === 0"
            type="text"
            :handle="data.row.state"
            @click="handleIng(data.row, data.row.state)"
          >
            处理
          </el-button>
          <el-button
            v-else-if="data.row.state === 2"
            type="text"
            :handle="data.row.state"
            @click="handleEdit(data.row)"
          >
            查看
          </el-button>
          <span v-else>-</span>
        </template>
      </common-table>
    </div>
  </div>
</template>

<script>
import CommonTable from '@/components/CommonTable'
import { vehicleInfoFieldSlope } from '@/utils/table-column-match'
import { slopeMonitorQuery, slopeExport, viewEvent } from '@/api/api'
import { mapGetters, mapState } from 'vuex'
import { getMyDate } from '@/utils/format'
export default {
  name: 'HighSlopeMonitor',
  components: {
    CommonTable,
  },
  props: {},
  data() {
    return {
      dataFlag: true,
      vehicleInfoFieldSlope,
      tableData: [
        {
          "id": 211592,
          "equipmentFk": 22,
          "equipmentId": "510525101202GP09",
          "pointName": "稻香村滑坡GP09",
          "startTime": null,
          "endTime": null,
          "monitoringTime": "2022-08-08 09:48:17",
          "horizontalX": 3094533.6654,
          "horizontalY": 500779.9584,
          "altitude": 791.0823,
          "relativeHorizontalX": 0.0021,
          "relativeHorizontalY": 0.0002,
          "relativeAltitude": -0.0033,
          "initialValueX": 3094533.6633,
          "initialValueY": 500779.9582,
          "initialValueA": 791.0856,
          "state": 2,
          "stateStr": null,
          "degree": "C0",
          "eventId": "BP9923296886",
          "createTime": "2022-08-08 09:48:17",
          "updateTime": "2022-08-08 09:48:17"
        },
        {
          "id": 211594,
          "equipmentFk": 19,
          "equipmentId": "40020",
          "pointName": "稻香村滑坡GP12",
          "startTime": null,
          "endTime": null,
          "monitoringTime": "2022-08-08 09:48:17",
          "horizontalX": 3094140.0248,
          "horizontalY": 500574.5262,
          "altitude": 846.0144,
          "relativeHorizontalX": -0.0179,
          "relativeHorizontalY": 0.018,
          "relativeAltitude": 0.0112,
          "initialValueX": 3094140.0427,
          "initialValueY": 500574.5082,
          "initialValueA": 846.0032,
          "state": 1,
          "stateStr": null,
          "degree": "C0",
          "eventId": "BP9923296965",
          "createTime": "2022-08-08 09:48:17",
          "updateTime": "2022-08-08 09:48:17"
        },
        {
          "id": 211596,
          "equipmentFk": 20,
          "equipmentId": "510525101202GP15",
          "pointName": "稻香村滑坡GP15",
          "startTime": null,
          "endTime": null,
          "monitoringTime": "2022-08-08 09:48:17",
          "horizontalX": 3094388.0263,
          "horizontalY": 500960.1348,
          "altitude": 834.0325,
          "relativeHorizontalX": 0.1647,
          "relativeHorizontalY": -0.0866,
          "relativeAltitude": -0.0341,
          "initialValueX": 3094387.8616,
          "initialValueY": 500960.2214,
          "initialValueA": 834.0666,
          "state": 2,
          "stateStr": null,
          "degree": "C0",
          "eventId": "BP9923297006",
          "createTime": "2022-08-08 09:48:17",
          "updateTime": "2022-08-08 09:48:17"
        },
        {
          "id": 211593,
          "equipmentFk": 21,
          "equipmentId": "510525101202GP10",
          "pointName": "稻香村滑坡GP10",
          "startTime": null,
          "endTime": null,
          "monitoringTime": "2022-08-08 09:48:17",
          "horizontalX": 3094455.9699,
          "horizontalY": 500839.1143,
          "altitude": 810.014,
          "relativeHorizontalX": -0.0141,
          "relativeHorizontalY": 0.0154,
          "relativeAltitude": 0.0053,
          "initialValueX": 3094455.984,
          "initialValueY": 500839.0989,
          "initialValueA": 810.0087,
          "state": 0,
          "stateStr": null,
          "degree": "C0",
          "eventId": "BP9923296927",
          "createTime": "2022-08-08 09:48:17",
          "updateTime": "2022-08-08 09:48:17"
        },
        {
          "id": 211595,
          "equipmentFk": 23,
          "equipmentId": "510525101202GP13",
          "pointName": "稻香村滑坡GP13",
          "startTime": null,
          "endTime": null,
          "monitoringTime": "2022-08-08 09:48:17",
          "horizontalX": 3093980.6933,
          "horizontalY": 500723.9688,
          "altitude": 888.3445,
          "relativeHorizontalX": -0.0056,
          "relativeHorizontalY": 0.0144,
          "relativeAltitude": 0.0073,
          "initialValueX": 3093980.6989,
          "initialValueY": 500723.9544,
          "initialValueA": 888.3372,
          "state": 0,
          "stateStr": null,
          "degree": "C0",
          "eventId": "BP9923296970",
          "createTime": "2022-08-08 09:48:17",
          "updateTime": "2022-08-08 09:48:17"
        },
        {
          "id": 211588,
          "equipmentFk": 21,
          "equipmentId": "510525101202GP10",
          "pointName": "稻香村滑坡GP10",
          "startTime": null,
          "endTime": null,
          "monitoringTime": "2022-08-08 09:48:12",
          "horizontalX": 3094455.9699,
          "horizontalY": 500839.1143,
          "altitude": 810.014,
          "relativeHorizontalX": -0.0141,
          "relativeHorizontalY": 0.0154,
          "relativeAltitude": 0.0053,
          "initialValueX": 3094455.984,
          "initialValueY": 500839.0989,
          "initialValueA": 810.0087,
          "state": 1,
          "stateStr": null,
          "degree": "C0",
          "eventId": "BP9923291944",
          "createTime": "2022-08-08 09:48:12",
          "updateTime": "2022-08-08 09:48:12"
        },
        {
          "id": 211587,
          "equipmentFk": 22,
          "equipmentId": "510525101202GP09",
          "pointName": "稻香村滑坡GP09",
          "startTime": null,
          "endTime": null,
          "monitoringTime": "2022-08-08 09:48:12",
          "horizontalX": 3094533.6654,
          "horizontalY": 500779.9584,
          "altitude": 791.0823,
          "relativeHorizontalX": 0.0021,
          "relativeHorizontalY": 0.0002,
          "relativeAltitude": -0.0033,
          "initialValueX": 3094533.6633,
          "initialValueY": 500779.9582,
          "initialValueA": 791.0856,
          "state": 1,
          "stateStr": null,
          "degree": "C0",
          "eventId": "BP9923291807",
          "createTime": "2022-08-08 09:48:12",
          "updateTime": "2022-08-08 09:48:12"
        },
        {
          "id": 211589,
          "equipmentFk": 19,
          "equipmentId": "40020",
          "pointName": "稻香村滑坡GP12",
          "startTime": null,
          "endTime": null,
          "monitoringTime": "2022-08-08 09:48:12",
          "horizontalX": 3094140.0248,
          "horizontalY": 500574.5262,
          "altitude": 846.0144,
          "relativeHorizontalX": -0.0179,
          "relativeHorizontalY": 0.018,
          "relativeAltitude": 0.0112,
          "initialValueX": 3094140.0427,
          "initialValueY": 500574.5082,
          "initialValueA": 846.0032,
          "state": 1,
          "stateStr": null,
          "degree": "C0",
          "eventId": "BP9923291986",
          "createTime": "2022-08-08 09:48:12",
          "updateTime": "2022-08-08 09:48:12"
        },
        {
          "id": 211590,
          "equipmentFk": 23,
          "equipmentId": "510525101202GP13",
          "pointName": "稻香村滑坡GP13",
          "startTime": null,
          "endTime": null,
          "monitoringTime": "2022-08-08 09:48:12",
          "horizontalX": 3093980.6933,
          "horizontalY": 500723.9688,
          "altitude": 888.3445,
          "relativeHorizontalX": -0.0056,
          "relativeHorizontalY": 0.0144,
          "relativeAltitude": 0.0073,
          "initialValueX": 3093980.6989,
          "initialValueY": 500723.9544,
          "initialValueA": 888.3372,
          "state": 0,
          "stateStr": null,
          "degree": "C0",
          "eventId": "BP9923291992",
          "createTime": "2022-08-08 09:48:12",
          "updateTime": "2022-08-08 09:48:12"
        },
        {
          "id": 211591,
          "equipmentFk": 20,
          "equipmentId": "510525101202GP15",
          "pointName": "稻香村滑坡GP15",
          "startTime": null,
          "endTime": null,
          "monitoringTime": "2022-08-08 09:48:12",
          "horizontalX": 3094388.0265,
          "horizontalY": 500960.1348,
          "altitude": 834.0322,
          "relativeHorizontalX": 0.1649,
          "relativeHorizontalY": -0.0866,
          "relativeAltitude": -0.0344,
          "initialValueX": 3094387.8616,
          "initialValueY": 500960.2214,
          "initialValueA": 834.0666,
          "state": 2,
          "stateStr": null,
          "degree": "C0",
          "eventId": "BP9923292027",
          "createTime": "2022-08-08 09:48:12",
          "updateTime": "2022-08-08 09:48:12"
        }
      ],
      alterFlag: true,
      exportButton: true,
      // 操作列
      operationCols: [
        {
          prop: 'operation',
          label: '操作',
          width: '90px',
          align: 'left',
          fixed: 'right',
          slot: true
          // btnBox: [
          //   {
          //     name: '处理',
          //     type: 'text',
          //     size: 'mini',
          //     callback: (index, row) => {
          //       console.log(index, row)
          //       this.dataOne = row
          //       this.dialogVisible = true
          //     }
          //   }
          // ]
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
            // 默认的value值
            defaultVal: '',
            // 搜索字段绑定的值，必穿
            options: [],
            // 控件name可传可不传
            name: 'id',
            // 样式可传可不传
            style: {},
            // 每列所占的份额  一共24
            // 每个屏幕各个字段所占份额
            lg: 8,
            xl: 6
          },
          {
            type: 'select',
            // 左边字段名称 可传可不传
            label: '点位名称',
            placeholder: '请选择点位名称',
            // 默认的value值
            defaultVal: '',
            // 搜索字段绑定的值，必穿
            options: [],
            // 控件name可传可不传
            name: 'pointName',
            // 每列所占的份额  一共24
            // 每个屏幕各个字段所占份额
            lg: 8,
            xl: 6
          },
          {
            type: 'select',
            // 左边字段名称 可传可不传
            label: '等级',
            // 默认的value值
            defaultVal: '',
            // 搜索字段绑定的值，必穿
            value: '',
            placeholder: '请选择等级',
            // 控件name可传可不传
            name: 'degree',
            style: {
              'margin-left': '-15px'
            },
            options: [
              {
                label: 'C0',
                value: 'C0'
              },
              {
                label: 'C1',
                value: 'C1'
              },
              {
                label: 'C2',
                value: 'C2'
              },
              {
                label: 'C3',
                value: 'C3'
              },
              {
                label: 'C4',
                value: 'C4'
              }
            ],
            // 每列所占的份额  一共24
            // 每个屏幕各个字段所占份额
            lg: 8,
            xl: 6
          },
          {
            type: 'select',
            // 左边字段名称 可传可不传
            label: '状态',
            placeholder: '处理状态',
            // 默认的value值
            defaultVal: '',
            // 搜索字段绑定的值，必穿
            options: [
              {
                label: '无需处理',
                value: '0'
              },
              {
                label: '未处理',
                value: '1'
              },
              {
                label: '已处理',
                value: '2'
              }
            ],
            // 控件name可传可不传
            name: 'status',
            // 每列所占的份额  一共24
            // 每个屏幕各个字段所占份额
            lg: 8,
            xl: 6
          },
          {
            type: 'daterange',
            // 左边字段名称 可传可不传
            label: '日期',
            // 默认的value值
            defaultVal: '',
            // 搜索字段绑定的值，必穿
            value: '',
            // 控件name可传可不传
            name: 'vertiName',
            // 样式可传可不传
            callback: values => {
            },
            // 每列所占的份额  一共24
            // 每个屏幕各个字段所占份额
            lg: 8,
            xl: 6
          },

          {
            type: 'btn',
            // xl: 4,
            lg: 8,
            xl: 6,
            style: {
              'margin-left': '15px'
            },
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
      pageConfig: {
        pageSize: 10,
        total: 100,
        currentPage: 1,
        flex: 'flex-end'
      },
      degree: ''
    }
  },
  computed: {
  },
  watch: {
    $route(to, from) {
      this.$refs.table.resetForm()
      this.slopeMonitorQuery()
    },
  },
  created() {},
  mounted() {
    setTimeout(() => {
      this.$refs.table.loading = false
    }, 500)
    this.pageConfig.total = 10
    this.pageConfig.currentPage = 1
    this.$refs.table.getShowCols(this.tableData, vehicleInfoFieldSlope)
    // this.$route.query.id &&
    // (this.topSearchConfig.eleComponents[0].defaultVal = this.$route.query.id) &&
    // this.$refs.table.getFilterParams({
    //   value: this.$route.query.id,
    //   key: 'id'
    // })
    // this.$route.query.name &&
    // (this.topSearchConfig.eleComponents[1].defaultVal = this.$route.query.name) &&
    // this.$refs.table.getFilterParams({
    //   value: this.$route.query.name,
    //   key: 'pointName'
    // })
    // this.$route.query.status &&
    // (this.topSearchConfig.eleComponents[3].defaultVal = this.$route.query.status) &&
    // this.$refs.table.getFilterParams({
    //   value: this.$route.query.status,
    //   key: 'status'
    // })
    // this.$refs.table.submitFormInfo()
    // if (!(this.$route.query.id && this.$route.query.name)) {
    //   this.slopeMonitorQuery()
    // }
  },
  methods: {
    handleEdit(row) {
      return
      // 编辑
      const params = {
        id: row.id,
        category: 2
      }
      viewEvent(params).then(res => {
        if (res.data.code === 200) {

        } else {
          this.$message.error(res.data.msg || '获取数据失败')
        }
      }).catch(e => {
        this.$message.error(e.msg || '获取数据失败')
      })
      // const category = categoryType[row.category]
      // this.$refs.queryEvent.show('查看事件', { ...row, category: category })
    },
    handleExport() {
      // 获取选择的数据
      if (this.$refs.table.selectArr && this.$refs.table.selectArr.length > 0) {
        // 联调导出的接口
        slopeExport(
          this.$refs.table.selectArr
        )
          .then(res => {
            this.$exportFun(res, '.xlsx')
          })
          .catch(e => {
            this.$message.error(e.msg || '导出失败！')
          })
      } else {
        this.$message.warning('请至少选择一项！')
      }
    },
    TimeFormatter(date) {
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
    },
    slopeMonitorQuery(filterParams) {
      if (filterParams) {
        for (const key in filterParams) {
          if (filterParams[key]) {
            if (key === 'vertiName') {
              this.startTime = this.TimeFormatter(filterParams[key][0])
              this.endTime = this.TimeFormatter(filterParams[key][1])
            } else {
              this[key] = filterParams[key]
            }
          }
        }
      }
      const monitorData = {
        current: this.pageConfig.currentPage,
        size: this.pageConfig.pageSize,
        params: {
          equipmentId: this.id,
          operateTime: '',
          state: this.status,
          volume: '',
          startTime: this.startTime,
          endTime: this.endTime,
          pointName: this.pointName,
          isDanger: this.pollution,
          degree: this.degree
        }
      }
      slopeMonitorQuery(monitorData).then(res => {
        this.$refs.table.loading = false
        this.tableData = res.data.data.records
        this.pageConfig.total = res.data.data.total
        this.pageConfig.currentPage = res.data.data.current
        this.$refs.table.getShowCols(this.tableData, vehicleInfoFieldSlope)
      })
    },
    getTableData(e, flag, filterParams) {
      this.pageConfig.pageSize = e.pageSize
      this.pageConfig.currentPage = e.pageNum
      if (filterParams) {
        this.slopeMonitorQuery(filterParams)
      } else {
        this.id = ''
        this.startTime = ''
        this.degree = ''
        this.endTime = ''
        this.pointName = ''
        this.pollution = ''
        this.status = null
        this.slopeMonitorQuery()
      }
    },
    searchInfo(e) {
      this.id = ''
      this.startTime = ''
      this.degree = ''
      this.endTime = ''
      this.pointName = ''
      this.pollution = ''
      this.status = null
      if (
        e.vertiName !== undefined &&
        e.vertiName !== null &&
        e.vertiName !== ''
      ) {
        let date = ''
        let date1 = ''
        date = e.vertiName[0]
        date1 = e.vertiName[1]
        this.startTime = getMyDate(date)
        this.endTime = getMyDate(date1)
      }
      if (e.id !== undefined && e.id !== null && e.id !== '') {
        this.id = e.id
      }
      if (
        e.pointName !== undefined &&
        e.pointName !== null &&
        e.pointName !== ''
      ) {
        this.pointName = e.pointName
      }
      if (
        e.pollution !== undefined &&
        e.pollution !== null &&
        e.pollution !== ''
      ) {
        this.pollution = e.pollution
        if (this.pollution === '0') {
          this.pollution = 0
        } else {
          this.pollution = 1
        }
      }
      if (e.degree !== undefined && e.degree !== null && e.degree !== '') {
        this.degree = e.degree
      }
      if (e.status !== undefined && e.status !== null && e.status !== '') {
        this.status = Number(e.status)
      }
      this.pageConfig.currentPage = 1
      this.slopeMonitorQuery()
    },
    handleIng(row, state) {
      if (state === 0) return

    },
    closeForm() {
      this.slopeMonitorQuery()
    }
  }
}
</script>
<style lang="scss" scoped>
.picture-title {
  margin: 0px 20px;
  color: #20a0ff;
  font-size: 20px;
  font-weight: 600;
  height: 50px;
  border-bottom: 1px solid #bcbcbc;
  line-height: 50px;
}
.card-box {
  margin: 20px;
}
.el-tag-info {
  color: #ff7d00;
  background-color: #fff8f2;
  border-color: #fff8f2;
}
.el-tag-warning {
  color: #e6a23c;
  background-color: #fff8f2;
  border-color: #fff8f2;
}
</style>
