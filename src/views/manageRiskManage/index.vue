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
            :table-column-match="vehicleInfoFieldManage"
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
import { vehicleInfoFieldManage } from '@/utils/table-column-match'
import { mapGetters, mapState } from 'vuex'
import { getMyDate } from '@/utils/format'

export default {
  name: 'ManageRiskManage',
  components: {
    CommonTable,
  },
  props: {},
  data() {
    return {
      id: '',
      alterFlag: true,
      vehicleInfoFieldManage,
      value: '',
      tableData: [
        {
          "equipmentId": "安全会议召开",
          "pointName": "风险管理",
          "monitoringTime": "关于厂区生产车间设备安全讨论",
          "pmOne": '确定生产车间设备使用规范',
          "pmTwo": '安全环保部',
          tsp:'2022.05.13'
        },
        {
          "equipmentId": "安全活动演练",
          "pointName": "风险管理",
          "monitoringTime": "关于厂区生产车间突发情况的演练",
          "pmOne": '对生产车间突发事件的处理进行演练',
          "pmTwo": '安全环保部',
          tsp:'2022.06.01'
        },
        {
          "equipmentId": "安全管理措施的抽查",
          "pointName": "风险管理",
          "monitoringTime": "关于《企业安全管理条例》执行的情况统计",
          "pmOne": '相关人员对厂区安全情况进行排查',
          "pmTwo": '生产安全部',
          tsp:'2022.07.22'
        },
        {
          "equipmentId": "安全紧急演练",
          "pointName": "风险管理",
          "monitoringTime": "关于地震、火灾等自然灾害紧急演练",
          "pmOne": '对厂区员工进行突发事件的处理措施进行演练',
          "pmTwo": '所有人员',
          tsp:'2022.08.13'
        },
        {
          "equipmentId": "安全教育培训",
          "pointName": "风险管理",
          "monitoringTime": "关于提高员工安全意识的培训",
          "pmOne": '普及员工安全意识',
          "pmTwo": '安全环保部',
          tsp:'2022.05.13'
        },
        {
          "equipmentId": "安全隐患排查",
          "pointName": "风险管理",
          "monitoringTime": "关于厂区运输安全隐患的排查",
          "pmOne": '对厂区运输车辆进行安全检查',
          "pmTwo": '厂区所有车辆',
          tsp:'2022.04.05'
        },
        {
          "equipmentId": "重大隐患排查",
          "pointName": "风险管理",
          "monitoringTime": "关于厂区生产车间设备全面检查",
          "pmOne": '对厂区生产设备进行评估检查',
          "pmTwo": '安全环保部',
          tsp:'2022.03.16'
        },
        {
          "equipmentId": "安全会议召开",
          "pointName": "风险管理",
          "monitoringTime": "关于下步安全生产的工作动员",
          "pmOne": '明确生产目标，规划生产时间',
          "pmTwo": '所有人员',
          tsp:'2022.03. 08'
        },
        {
          "equipmentId": "安全活动演练",
          "pointName": "风险管理",
          "monitoringTime": "关于森林防火的安全演练",
          "pmOne": '提高安全意识，冷静应对情况',
          "pmTwo": '安全环保部',
          tsp:'2022.09.08 '
        },
        {
          "equipmentId": "安全教育培训",
          "pointName": "风险管理",
          "monitoringTime": "关于企业信息安全教育培训",
          "pmOne": '提高员工素质，保护企业信息安全',
          "pmTwo": '所有人员',
          tsp:'2022.04.13'
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
            type: 'input',
            // 左边字段名称 可传可不传
            label: '活动名称',
            placeholder: '请输入活动名称',
            options: [],
            // 控件name可传可不传
            name: '',
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
    this.$refs.table.getShowCols(this.tableData, vehicleInfoFieldManage)
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
        this.$refs.table.getShowCols(this.tableData, vehicleInfoFieldManage)
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
