<template>
  <div>
    <!--		噪声污染-->
    <div class="box-card">
      <common-table
        ref="table"
        :data-flag="dataFlag"
        :table-data="tableData"
        :page-config="pageConfig"
        :top-search-config="topSearchConfig"
        :table-column-match="vehicleInfoField"
        :operation-cols="operationCols"
        :alter-flag="alterFlag"
        :export-button="exportButton"
        @get-table-data="getTableData"
        @search-info="searchInfo"
        @exportData="handleExport"
      >
        <template #volume="data">
          <el-popover
            v-if="data.row.noisePolluted === 1"
            placement="top-start"
            title=""
            trigger="hover"
            :content="
              '预警值：' + data.row.volumeMin + '-' + data.row.volumeLimit + ''
            "
          >
            <el-button
              slot="reference"
              type="text"
              class="deal-btn-red no-border"
            >
              <span>{{ data.row.volume }}
                <img
                  src="../../assets/nav_header_images/city.png"
                  alt=""
                  class="alert-img"
                ></span>
            </el-button>
          </el-popover>
          <span v-else>{{ data.row.volume }}</span>
        </template>
        <template #noisePolluted="data">
          <span :noisePolluted="data.row.noisePolluted">{{
              data.row.noisePolluted === 0 ? "否" : "是"
            }}</span>
        </template>
        <template #noiseHandle="data">
          <el-button
            v-if="data.row.noiseHandle === 0"
            :noise-handle="data.row.noiseHandle"
            class="button-null"
            @click="cancelButtonFocus"
          >
            无需处理
          </el-button>
          <el-button
            v-if="data.row.noiseHandle === 2"
            :noise-handle="data.row.noiseHandle"
            type="primary"
            plain
            @click="cancelButtonFocus"
          >
            已处理
          </el-button>
          <el-button
            v-if="data.row.noiseHandle === 1"
            :noise-handle="data.row.noiseHandle"
            type="danger"
            plain
            @click="cancelButtonFocus"
          >
            未处理
          </el-button>
        </template>
        <template #operation="data">
          <el-button
            v-if="data.row.noiseHandle === 1 || data.row.noiseHandle === 0"
            :class="
              data.row.noiseHandle === 0
                ? ''
                : 'deal-btn-red'
            "
            :disabled="data.row.noiseHandle === 0"
            type="text"
            :handle="data.row.noiseHandle"
            @click="handleIng(data.row, data.row.noiseHandle)"
          >
            处理
          </el-button>
          <el-button
            v-else-if="data.row.noiseHandle === 2"
            type="text"
            :handle="data.row.noiseHandle"
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
import { monitorQuery, serviceQuery, noiseExport, viewEvent } from '@/api/api'
import CommonTable from '@/components/CommonTable'
import { vehicleInfoField } from '@/utils/table-column-match'
import { mapGetters, mapState } from 'vuex'
import { getMyDate } from '@/utils/format'
export default {
  components: {
    CommonTable,
  },
  props: {},
  data() {
    return {
      alterFlag: true,
      exportButton: true,
      vehicleInfoField,
      mychart: '1',
      value1: '',
      value: '',
      tableData: [
        {
          equipmentId: '882190765',
          pointName: '噪声污染监测点',
          address: 'https://192.168.1.163:8080/api',
          state: 'success',
        },
        {
          equipmentId: '882190765',
          pointName: '噪声污染监测点',
          address: 'https://192.168.1.163:8080/api',
          state: 'success',
        },
        {
          equipmentId: '882190765',
          pointName: '噪声污染监测点',
          address: 'https://192.168.1.163:8080/api',
          state: 'success',
        },
        {
          equipmentId: '882190765',
          pointName: '噪声污染监测点',
          address: 'https://192.168.1.163:8080/api',
          state: 'success',
        },
        {
          equipmentId: '882190765',
          pointName: '噪声污染监测点',
          address: 'https://192.168.1.163:8080/api',
          state: 'success',
        },
        {
          equipmentId: '882190765',
          pointName: '噪声污染监测点',
          address: 'https://192.168.1.163:8080/api',
          state: 'success',
        },
        {
          equipmentId: '882190765',
          pointName: '噪声污染监测点',
          address: 'https://192.168.1.163:8080/api',
          state: 'success',
        },
        {
          equipmentId: '882190765',
          pointName: '噪声污染监测点',
          address: 'https://192.168.1.163:8080/api',
          state: 'success',
        },
        {
          equipmentId: '882190765',
          pointName: '噪声污染监测点',
          address: 'https://192.168.1.163:8080/api',
          state: 'success',
        },
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
          prop: 'operation',
          label: '操作',
          width: '80px',
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
            // 默认的value值
            defaultVal: '',
            placeholder: '请选择点位名称',
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
            label: '污染',
            // 默认的value值
            defaultVal: '',
            // 搜索字段绑定的值，必穿
            value: '',
            placeholder: '是否污染',
            style: {
              'margin-left': '-15px'
            },
            // 控件name可传可不传
            name: 'pollution',
            options: [
              {
                label: '是',
                value: '1'
              },
              {
                label: '否',
                value: '0'
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
      temperature: [],
      pollution: '',
      startTime: '',
      endTime: '',
      pointName: '',
      status: null
    }
  },
  computed: {
    ...mapState({
    })
  },
  watch: {
    $route(to, from) {
      this.$refs.table.resetForm()
      this.monitorQueryAll()
    },
  },
  created() {
    // this.topSearchConfig.eleComponents[0] = {
    //   ...this.topSearchConfig.eleComponents[0],
    // }
    // this.topSearchConfig.eleComponents[1] = {
    //   ...this.topSearchConfig.eleComponents[1],
    //   ...{ options: [...this.point] }
    // }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.table.loading = false
    }, 500)
    this.pageConfig.total = 10
    this.pageConfig.currentPage = 1
    this.$refs.table.getShowCols(this.tableData, vehicleInfoField)

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
    //   this.monitorQueryAll()
    // }
  },
  methods: {
    handleEdit(row) {
      // 编辑
      const params = {
        id: row.id,
        category: 1
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
        noiseExport(
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
    monitorQueryAll(filterParams) {
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
          noiseHandle: this.status,
          volume: '',
          startTime: this.startTime,
          endTime: this.endTime,
          pointName: this.pointName,
          noisePolluted: this.pollution
        }
      }
      monitorQuery(monitorData).then(response => {
        this.$refs.table.loading = false
        this.tableData = response.data.data.records
        this.pageConfig.total = response.data.data.total
        this.pageConfig.currentPage = response.data.data.current
        this.$refs.table.getShowCols(this.tableData, vehicleInfoField)
      })
      const monitorData1 = {
        current: 1,
        size: 10
      }
      // const optionsId = {
      //   value: '',
      //   label: ''
      // }
      serviceQuery(monitorData1).then(res => {
        // res.data.data.records.map(element => {
        //   optionsId.push(element.name)
        // })
        // this.topSearchConfig.eleComponents[0].options = optionsId
      })
    },
    currentChange(value) {
      this.pageConfig.currentPage = value
      this.monitorQueryAll()
    },
    getTableData(e, flag, filterParams) {
      this.pageConfig.pageSize = e.pageSize
      this.pageConfig.currentPage = e.pageNum
      if (filterParams) {
        this.monitorQueryAll(filterParams)
      } else {
        this.id = ''
        this.startTime = ''
        this.endTime = ''
        this.pointName = ''
        this.pollution = ''
        this.status = null
        this.monitorQueryAll()
      }
    },
    searchInfo(e) {
      this.id = ''
      this.pollution = ''
      this.pointName = ''
      this.startTime = ''
      this.endTime = ''
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
      if (e.status !== undefined && e.status !== null && e.status !== '') {
        this.status = Number(e.status)
      }
      this.pageConfig.currentPage = 1
      this.monitorQueryAll()
    },
    handleIng(row, state) {
      if (state === 0) return
    },
    closeForm() {
      this.monitorQueryAll()
    }
  }
}
</script>
<style scoped lang="scss">
.box-card {
  margin: 16px;
}
.alert-img {
  height: 18px;
  width: 18px;
  line-height: 1;
  position: relative;
  top: 3px;
  left: 16px
}
</style>
