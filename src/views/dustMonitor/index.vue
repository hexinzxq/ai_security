<template>
  <div>
    <!--		扬尘污染-->
    <div class="box-card">
      <div>
        <div class="box-card">
          <common-table
            ref="table"
            :data-flag="dataFlag"
            :table-data="tableData"
            :page-config="pageConfig"
            :top-search-config="topSearchConfig"
            :table-column-match="vehicleInfoFieldNoise"
            :alter-flag="alterFlag"
            :export-button="exportButton"
            @get-table-data="getTableData"
            @search-info="searchInfo"
            @exportData="handleExport"
          >
            <!-- 自定义列的插槽写法，加入了提示窗，data指列名为pmOne的一列数据 -->
            <template #pmOne="data">
              <el-popover
                v-if="data.row.pmOnePolluted === 1"
                placement="top-start"
                title=""
                trigger="hover"
                :content="'预警值：'+ data.row.pmOneMin+'-'+ data.row.pmOneLimit+''"
              >
                <el-button
                  slot="reference"
                  type="text"
                  class="deal-btn-red no-border"
                >
                <span>{{ data.row.pmOne }}
                  <img
                    src="../../assets/common/warning.svg"
                    alt=""
                    class="alert-img"
                  ></span>
                </el-button>
              </el-popover>
              <span v-else>{{ data.row.pmOne }}</span>
            </template>
            <template #pmTwo="data">
              <el-popover
                v-if="data.row.pmTwoPolluted === 1"
                placement="top-start"
                title=""
                trigger="hover"
                :content="'预警值：'+ data.row.pmTwoMin+'-'+ data.row.pmTwoLimit+''"
              >
                <el-button
                  slot="reference"
                  type="text"
                  class="deal-btn-red no-border"
                >
                <span>{{ data.row.pmTwo }}
                  <img
                    src="../../assets/common/warning.svg"
                    alt=""
                    class="alert-img"
                  ></span>
                </el-button>
              </el-popover>
              <span v-else>{{ data.row.pmTwo }}</span>
            </template>
            <template #tsp="data">
              <el-popover
                v-if="data.row.tspPolluted === 1"
                placement="top-start"
                title=""
                trigger="hover"
                :content="'预警值：'+ data.row.tspMin+'-'+ data.row.tspLimit+''"
              >
                <el-button
                  slot="reference"
                  type="text"
                  class="deal-btn-red no-border"
                >
                <span>{{ data.row.tsp }}
                  <img
                    src="../../assets/common/warning.svg"
                    alt=""
                    class="alert-img"
                  ></span>
                </el-button>
              </el-popover>
              <span v-else>{{ data.row.tsp }}</span>
            </template>
            <template #dustPolluted="data">
            <span
              :dustPolluted="data.row.dustPolluted"
            >{{ data.row.dustPolluted === 0 ? '否' : '是' }}</span>
            </template>
            <template #dustHandle="data">
              <el-button
                v-if="data.row.dustHandle === 0"
                :dust-handle="data.row.dustHandle"
                class="button-null"
              >
                无需处理
              </el-button>
              <el-button
                v-if="data.row.dustHandle === 1"
                :dust-handle="data.row.dustHandle"
                type="danger"
                plain
              >
                未处理
              </el-button>
              <el-button
                v-if="data.row.dustHandle === 2"
                :dust-handle="data.row.dustHandle"
                type="primary"
                plain
              >
                已处理
              </el-button>
            </template>
            <template #operation="data">
              <el-button
                v-if="data.row.dustHandle === 1 || data.row.dustHandle === 0"
                :class="
                data.row.dustHandle === 0
                  ? ''
                  : 'deal-btn-red'
              "
                :disabled="data.row.dustHandle === 0"
                type="text"
                :handle="data.row.dustHandle"
                @click="handleIng(data.row, data.row.dustHandle)"
              >
                处理
              </el-button>
              <el-button
                v-else-if="data.row.dustHandle === 2"
                type="text"
                :handle="data.row.dustHandle"
                @click="handleEdit(data.row)"
              >
                查看
              </el-button>
              <span v-else>-</span>
            </template>
          </common-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { monitorQuery, monitorExport, viewEvent } from '@/api/api'
import CommonTable from '@/components/CommonTable'
import { vehicleInfoFieldNoise } from '@/utils/table-column-match'
import { mapGetters, mapState } from 'vuex'
import { getMyDate } from '@/utils/format'

export default {
  name: 'DustMonitor',
  components: {
    CommonTable,
  },
  props: {},
  data() {
    return {
      id: '',
      alterFlag: true,
      vehicleInfoFieldNoise,
      value: '',
      tableData: [
        {
          "equipmentId": "油气泄漏",
          "pointName": "化学风险",
          "monitoringTime": "做好化学品的三防措施，人员培训等",
          "pmOne": '迅速关闭阀门，疏散人群，防止扩散',
          "pmTwo": '街道',
          tsp:'0258886332',
          dustPolluted:'张三',
          dustHandle:'15251918733',
          time:'2020/2/2 13:00:00',
          word:'w.excel'
        },
        {
          "equipmentId": "山地滑坡",
          "pointName": "自然灾害引发的风险",
          "monitoringTime": "加强自然灾害危害性的教育",
          "pmOne": '积极展开抢险救援、人员安置处理等工作',
          "pmTwo": '生态环境部门',
          tsp:'0258881113',
          dustPolluted:'李四',
          dustHandle:'13958391121',
          time:'2020/2/3 13:00:00',
          word:'t.excel'
        },
        {
          "equipmentId": "社会动荡",
          "pointName": "政治环境风险",
          "monitoringTime": "做好人员的安抚和宣传工作",
          "pmOne": '安抚人员',
          "pmTwo": '相关管理部门',
          tsp:'0258881113',
          dustPolluted:'李四',
          dustHandle:'13958391121',
          time:'2020/2/3 13:00:00',
          word:'t.excel'
        },
        {
          "equipmentId": "油气泄漏",
          "pointName": "化学风险",
          "monitoringTime": "做好化学品的三防措施，人员培训等",
          "pmOne": '迅速关闭阀门，疏散人群，防止扩散',
          "pmTwo": '街道',
          tsp:'0258886332',
          dustPolluted:'张三',
          dustHandle:'15251918733',
          time:'2020/2/2 13:00:00',
          word:'w.excel'
        },
        {
          "equipmentId": "山地滑坡",
          "pointName": "自然灾害引发的风险",
          "monitoringTime": "加强自然灾害危害性的教育",
          "pmOne": '积极展开抢险救援、人员安置处理等工作',
          "pmTwo": '生态环境部门',
          tsp:'0258881113',
          dustPolluted:'李四',
          dustHandle:'13958391121',
          time:'2020/2/3 13:00:00',
          word:'t.excel'
        },
        {
          "equipmentId": "社会动荡",
          "pointName": "政治环境风险",
          "monitoringTime": "做好人员的安抚和宣传工作",
          "pmOne": '安抚人员',
          "pmTwo": '相关管理部门',
          tsp:'0258881113',
          dustPolluted:'李四',
          dustHandle:'13958391121',
          time:'2020/2/3 13:00:00',
          word:'t.excel'
        },
        {
          "equipmentId": "油气泄漏",
          "pointName": "化学风险",
          "monitoringTime": "做好化学品的三防措施，人员培训等",
          "pmOne": '迅速关闭阀门，疏散人群，防止扩散',
          "pmTwo": '街道',
          tsp:'0258886332',
          dustPolluted:'张三',
          dustHandle:'15251918733',
          time:'2020/2/2 13:00:00',
          word:'w.excel'
        },
        {
          "equipmentId": "山地滑坡",
          "pointName": "自然灾害引发的风险",
          "monitoringTime": "加强自然灾害危害性的教育",
          "pmOne": '积极展开抢险救援、人员安置处理等工作',
          "pmTwo": '生态环境部门',
          tsp:'0258881113',
          dustPolluted:'李四',
          dustHandle:'13958391121',
          time:'2020/2/3 13:00:00',
          word:'t.excel'
        },
        {
          "equipmentId": "社会动荡",
          "pointName": "政治环境风险",
          "monitoringTime": "做好人员的安抚和宣传工作",
          "pmOne": '安抚人员',
          "pmTwo": '相关管理部门',
          tsp:'0258881113',
          dustPolluted:'李四',
          dustHandle:'13958391121',
          time:'2020/2/3 13:00:00',
          word:'t.excel'
        },
        {
          "equipmentId": "油气泄漏",
          "pointName": "化学风险",
          "monitoringTime": "做好化学品的三防措施，人员培训等",
          "pmOne": '迅速关闭阀门，疏散人群，防止扩散',
          "pmTwo": '街道',
          tsp:'0258886332',
          dustPolluted:'张三',
          dustHandle:'15251918733',
          time:'2020/2/2 13:00:00',
          word:'w.excel'
        },
      ],
      // 操作列
      exportButton: true,
      operationCols: [
        {
          prop: 'operation',
          label: '操作',
          minWidth: '40px',
          align: 'left',
          fixed: 'right',
          slot: true
        }
      ],
      pointName: '',
      topSearchConfig: {
        gutterList: 20, // 左右结构间距
        eleComponents: [
          {
            type: 'select',
            // 左边字段名称 可传可不传
            label: '风险源类型',
            placeholder: '请选择风险源类型',
            // 默认的value值
            defaultVal: '',
            // 搜索字段绑定的值，必穿
            options: [],
            // 控件name可传可不传
            name: 'id',
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
      loading: true,
      dataFlag: true,
      startTime: '',
      endTime: '',
      pageConfig: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
        flex: 'flex-end'
      },
      pm2_5: [],
      pm10: [],
      noise: [],
      tsp: [],
      fileList: [],
      pollution: '',
      status: null,
      readImgUrl: null
    }
  },
  computed: {
    ...mapGetters(['equipment', 'point']),
  },
  watch: {
    '$route'(to, from) {
      this.$refs.table.resetForm()
      this.monitorQueryAll()
    },
  },
  created() {
  },
  mounted() {
    this.$refs.table.getShowCols(this.tableData, vehicleInfoFieldNoise)
    setTimeout(() => {
      this.$refs.table.loading = false
    }, 500)
    // this.$route.query.id && (this.topSearchConfig.eleComponents[0].defaultVal = this.$route.query.id) && this.$refs.table.getFilterParams({ value: this.$route.query.id, key: 'id' })
    // this.$route.query.name && (this.topSearchConfig.eleComponents[1].defaultVal = this.$route.query.name) && this.$refs.table.getFilterParams({ value: this.$route.query.name, key: 'pointName' })
    // this.$route.query.status && (this.topSearchConfig.eleComponents[3].defaultVal = this.$route.query.status) && this.$refs.table.getFilterParams({ value: this.$route.query.status, key: 'status' })
    // this.$refs.table.submitFormInfo()
    // if (!(this.$route.query.id && this.$route.query.name)) {
    //   this.monitorQueryAll()
    // }
  },
  methods: {
    handleEdit(row) {
      return
      // 编辑
      const params = {
        id: row.id,
        category: 0
      }
      viewEvent(params).then(res => {
        if (res.data.code === 200) {

        } else {
          this.$message.error(res.data.msg || '获取数据失败')
        }
      }).catch(e => {
        this.$message.error(e.msg || '获取数据失败')
      })
    },
    handleExport() {
      // 获取选择的数据
      if (this.$refs.table.selectArr && this.$refs.table.selectArr.length > 0) {
        // 联调导出的接口
        monitorExport(
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
          dustHandle: this.status,
          volume: '',
          startTime: this.startTime,
          endTime: this.endTime,
          pointName: this.pointName,
          dustPolluted: this.pollution
        }
      }
      monitorQuery(monitorData).then((response) => {
        this.$refs.table.loading = false
        this.tableData = response.data.data.records
        this.pageConfig.total = response.data.data.total
        this.pageConfig.currentPage = response.data.data.current
        this.$refs.table.getShowCols(this.tableData, vehicleInfoFieldNoise)
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
      if (e.vertiName !== undefined && e.vertiName !== null && e.vertiName !== '') {
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
      if (e.pointName !== undefined && e.pointName !== null && e.pointName !== '') {
        this.pointName = e.pointName
      }
      if (e.pollution !== undefined && e.pollution !== null && e.pollution !== '') {
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
<style lang="scss" scoped>
.box-card {
  margin: 16px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.charts {
  border: 1px solid #e4e4e4;
  margin-top: 50px
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
