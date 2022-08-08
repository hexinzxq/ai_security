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
        :table-column-match="vehicleInfoFieldNoise"
        :operation-cols="operationCols"
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
</template>

<script>
import { monitorQuery, serviceQuery, noiseExport, viewEvent } from '@/api/api'
import CommonTable from '@/components/CommonTable'
import { vehicleInfoFieldNoise } from '@/utils/table-column-match'
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
      vehicleInfoFieldNoise,
      mychart: '1',
      value1: '',
      value: '',
      tableData: [
        {
          "id": 54304,
          "equipmentId": "40183947",
          "pointName": "矿区出入口1号机",
          "equipmentFk": 3,
          "monitoringTime": "2022-08-08 09:00:01",
          "pmOne": 0,
          "pmTwo": 10,
          "volume": 51.6,
          "pmOnePolluted": 0,
          "pmTwoPolluted": 0,
          "noisePolluted": 0,
          "dustPolluted": 0,
          "dustPollutedStr": null,
          "noisePollutedStr": null,
          "dustHandleStr": null,
          "noiseHandleStr": null,
          "state": 0,
          "dustHandle": 1,
          "noiseHandle": 0,
          "pmOneLimit": 300,
          "pmOneMin": 0,
          "pmTwoLimit": 300,
          "pmTwoMin": 0,
          "volumeLimit": 300,
          "volumeMin": 0,
          "pmOnePercent": 0,
          "pmTwoPercent": 3,
          "noisePercent": 17,
          "dustEventId": "YC9920401417",
          "noiseEventId": "ZS9920401417",
          "startTime": null,
          "endTime": null,
          "createTime": "2022-08-08 09:00:01",
          "updateTime": "2022-08-08 09:00:01",
          "tsp": 12,
          "tspPolluted": 0,
          "tspLimit": 200,
          "tspMin": 1,
          "tspPercent": 6
        },
        {
          "id": 54305,
          "equipmentId": "40183974",
          "pointName": "加工区挡墙",
          "equipmentFk": 5,
          "monitoringTime": "2022-08-08 09:00:01",
          "pmOne": 0,
          "pmTwo": 10,
          "volume": 52.3,
          "pmOnePolluted": 0,
          "pmTwoPolluted": 0,
          "noisePolluted": 0,
          "dustPolluted": 0,
          "dustPollutedStr": null,
          "noisePollutedStr": null,
          "dustHandleStr": null,
          "noiseHandleStr": null,
          "state": 0,
          "dustHandle": 0,
          "noiseHandle": 0,
          "pmOneLimit": 300,
          "pmOneMin": 0,
          "pmTwoLimit": 200,
          "pmTwoMin": 0,
          "volumeLimit": 300,
          "volumeMin": 0,
          "pmOnePercent": 0,
          "pmTwoPercent": 5,
          "noisePercent": 17,
          "dustEventId": "YC9920401436",
          "noiseEventId": "ZS9920401436",
          "startTime": null,
          "endTime": null,
          "createTime": "2022-08-08 09:00:01",
          "updateTime": "2022-08-08 09:00:01",
          "tsp": 12,
          "tspPolluted": 0,
          "tspLimit": 300,
          "tspMin": 0,
          "tspPercent": 4
        },
        {
          "id": 54303,
          "equipmentId": "40183974",
          "pointName": "加工区挡墙",
          "equipmentFk": 5,
          "monitoringTime": "2022-08-08 08:50:02",
          "pmOne": 0,
          "pmTwo": 2,
          "volume": 70.3,
          "pmOnePolluted": 0,
          "pmTwoPolluted": 0,
          "noisePolluted": 0,
          "dustPolluted": 0,
          "dustPollutedStr": null,
          "noisePollutedStr": null,
          "dustHandleStr": null,
          "noiseHandleStr": null,
          "state": 0,
          "dustHandle": 1,
          "noiseHandle": 0,
          "pmOneLimit": 300,
          "pmOneMin": 0,
          "pmTwoLimit": 200,
          "pmTwoMin": 0,
          "volumeLimit": 300,
          "volumeMin": 0,
          "pmOnePercent": 0,
          "pmTwoPercent": 1,
          "noisePercent": 23,
          "dustEventId": "YC9919802418",
          "noiseEventId": "ZS9919802418",
          "startTime": null,
          "endTime": null,
          "createTime": "2022-08-08 08:50:02",
          "updateTime": "2022-08-08 08:50:02",
          "tsp": 2,
          "tspPolluted": 0,
          "tspLimit": 300,
          "tspMin": 0,
          "tspPercent": 0
        },
        {
          "id": 54302,
          "equipmentId": "40183947",
          "pointName": "矿区出入口1号机",
          "equipmentFk": 3,
          "monitoringTime": "2022-08-08 08:50:02",
          "pmOne": 0,
          "pmTwo": 10,
          "volume": 64.7,
          "pmOnePolluted": 0,
          "pmTwoPolluted": 0,
          "noisePolluted": 0,
          "dustPolluted": 0,
          "dustPollutedStr": null,
          "noisePollutedStr": null,
          "dustHandleStr": null,
          "noiseHandleStr": null,
          "state": 0,
          "dustHandle": 2,
          "noiseHandle": 0,
          "pmOneLimit": 300,
          "pmOneMin": 0,
          "pmTwoLimit": 300,
          "pmTwoMin": 0,
          "volumeLimit": 300,
          "volumeMin": 0,
          "pmOnePercent": 0,
          "pmTwoPercent": 3,
          "noisePercent": 21,
          "dustEventId": "YC9919802401",
          "noiseEventId": "ZS9919802401",
          "startTime": null,
          "endTime": null,
          "createTime": "2022-08-08 08:50:02",
          "updateTime": "2022-08-08 08:50:02",
          "tsp": 12,
          "tspPolluted": 0,
          "tspLimit": 200,
          "tspMin": 1,
          "tspPercent": 6
        },
        {
          "id": 54301,
          "equipmentId": "40183974",
          "pointName": "加工区挡墙",
          "equipmentFk": 5,
          "monitoringTime": "2022-08-08 08:40:02",
          "pmOne": 0,
          "pmTwo": 10,
          "volume": 58,
          "pmOnePolluted": 0,
          "pmTwoPolluted": 0,
          "noisePolluted": 0,
          "dustPolluted": 0,
          "dustPollutedStr": null,
          "noisePollutedStr": null,
          "dustHandleStr": null,
          "noiseHandleStr": null,
          "state": 0,
          "dustHandle": 0,
          "noiseHandle": 0,
          "pmOneLimit": 300,
          "pmOneMin": 0,
          "pmTwoLimit": 200,
          "pmTwoMin": 0,
          "volumeLimit": 300,
          "volumeMin": 0,
          "pmOnePercent": 0,
          "pmTwoPercent": 5,
          "noisePercent": 19,
          "dustEventId": "YC9919202309",
          "noiseEventId": "ZS9919202309",
          "startTime": null,
          "endTime": null,
          "createTime": "2022-08-08 08:40:02",
          "updateTime": "2022-08-08 08:40:02",
          "tsp": 12,
          "tspPolluted": 0,
          "tspLimit": 300,
          "tspMin": 0,
          "tspPercent": 4
        },
        {
          "id": 54300,
          "equipmentId": "40183947",
          "pointName": "矿区出入口1号机",
          "equipmentFk": 3,
          "monitoringTime": "2022-08-08 08:40:02",
          "pmOne": 1,
          "pmTwo": 11,
          "volume": 64.1,
          "pmOnePolluted": 0,
          "pmTwoPolluted": 0,
          "noisePolluted": 0,
          "dustPolluted": 0,
          "dustPollutedStr": null,
          "noisePollutedStr": null,
          "dustHandleStr": null,
          "noiseHandleStr": null,
          "state": 0,
          "dustHandle": 2,
          "noiseHandle": 0,
          "pmOneLimit": 300,
          "pmOneMin": 0,
          "pmTwoLimit": 300,
          "pmTwoMin": 0,
          "volumeLimit": 300,
          "volumeMin": 0,
          "pmOnePercent": 0,
          "pmTwoPercent": 3,
          "noisePercent": 21,
          "dustEventId": "YC9919202296",
          "noiseEventId": "ZS9919202296",
          "startTime": null,
          "endTime": null,
          "createTime": "2022-08-08 08:40:02",
          "updateTime": "2022-08-08 08:40:02",
          "tsp": 13,
          "tspPolluted": 0,
          "tspLimit": 200,
          "tspMin": 1,
          "tspPercent": 6
        },
        {
          "id": 54299,
          "equipmentId": "40183974",
          "pointName": "加工区挡墙",
          "equipmentFk": 5,
          "monitoringTime": "2022-08-08 08:30:02",
          "pmOne": 0,
          "pmTwo": 1,
          "volume": 51.3,
          "pmOnePolluted": 0,
          "pmTwoPolluted": 0,
          "noisePolluted": 0,
          "dustPolluted": 0,
          "dustPollutedStr": null,
          "noisePollutedStr": null,
          "dustHandleStr": null,
          "noiseHandleStr": null,
          "state": 0,
          "dustHandle": 0,
          "noiseHandle": 0,
          "pmOneLimit": 300,
          "pmOneMin": 0,
          "pmTwoLimit": 200,
          "pmTwoMin": 0,
          "volumeLimit": 300,
          "volumeMin": 0,
          "pmOnePercent": 0,
          "pmTwoPercent": 0,
          "noisePercent": 17,
          "dustEventId": "YC9918602459",
          "noiseEventId": "ZS9918602459",
          "startTime": null,
          "endTime": null,
          "createTime": "2022-08-08 08:30:02",
          "updateTime": "2022-08-08 08:30:02",
          "tsp": 1,
          "tspPolluted": 0,
          "tspLimit": 300,
          "tspMin": 0,
          "tspPercent": 0
        },
        {
          "id": 54298,
          "equipmentId": "40183947",
          "pointName": "矿区出入口1号机",
          "equipmentFk": 3,
          "monitoringTime": "2022-08-08 08:30:02",
          "pmOne": 0,
          "pmTwo": 10,
          "volume": 64,
          "pmOnePolluted": 0,
          "pmTwoPolluted": 0,
          "noisePolluted": 0,
          "dustPolluted": 0,
          "dustPollutedStr": null,
          "noisePollutedStr": null,
          "dustHandleStr": null,
          "noiseHandleStr": null,
          "state": 0,
          "dustHandle": 1,
          "noiseHandle": 0,
          "pmOneLimit": 300,
          "pmOneMin": 0,
          "pmTwoLimit": 300,
          "pmTwoMin": 0,
          "volumeLimit": 300,
          "volumeMin": 0,
          "pmOnePercent": 0,
          "pmTwoPercent": 3,
          "noisePercent": 21,
          "dustEventId": "YC9918602445",
          "noiseEventId": "ZS9918602445",
          "startTime": null,
          "endTime": null,
          "createTime": "2022-08-08 08:30:02",
          "updateTime": "2022-08-08 08:30:02",
          "tsp": 12,
          "tspPolluted": 0,
          "tspLimit": 200,
          "tspMin": 1,
          "tspPercent": 6
        },
        {
          "id": 54297,
          "equipmentId": "40183974",
          "pointName": "加工区挡墙",
          "equipmentFk": 5,
          "monitoringTime": "2022-08-08 08:20:01",
          "pmOne": 1,
          "pmTwo": 2,
          "volume": 46.9,
          "pmOnePolluted": 0,
          "pmTwoPolluted": 0,
          "noisePolluted": 0,
          "dustPolluted": 0,
          "dustPollutedStr": null,
          "noisePollutedStr": null,
          "dustHandleStr": null,
          "noiseHandleStr": null,
          "state": 0,
          "dustHandle": 0,
          "noiseHandle": 0,
          "pmOneLimit": 300,
          "pmOneMin": 0,
          "pmTwoLimit": 200,
          "pmTwoMin": 0,
          "volumeLimit": 300,
          "volumeMin": 0,
          "pmOnePercent": 0,
          "pmTwoPercent": 1,
          "noisePercent": 15,
          "dustEventId": "YC9918000918",
          "noiseEventId": "ZS9918000918",
          "startTime": null,
          "endTime": null,
          "createTime": "2022-08-08 08:20:01",
          "updateTime": "2022-08-08 08:20:01",
          "tsp": 2,
          "tspPolluted": 0,
          "tspLimit": 300,
          "tspMin": 0,
          "tspPercent": 0
        },
        {
          "id": 54296,
          "equipmentId": "40183947",
          "pointName": "矿区出入口1号机",
          "equipmentFk": 3,
          "monitoringTime": "2022-08-08 08:20:01",
          "pmOne": 0,
          "pmTwo": 10,
          "volume": 66.3,
          "pmOnePolluted": 0,
          "pmTwoPolluted": 0,
          "noisePolluted": 0,
          "dustPolluted": 0,
          "dustPollutedStr": null,
          "noisePollutedStr": null,
          "dustHandleStr": null,
          "noiseHandleStr": null,
          "state": 0,
          "dustHandle": 1,
          "noiseHandle": 0,
          "pmOneLimit": 300,
          "pmOneMin": 0,
          "pmTwoLimit": 300,
          "pmTwoMin": 0,
          "volumeLimit": 300,
          "volumeMin": 0,
          "pmOnePercent": 0,
          "pmTwoPercent": 3,
          "noisePercent": 22,
          "dustEventId": "YC9918000904",
          "noiseEventId": "ZS9918000904",
          "startTime": null,
          "endTime": null,
          "createTime": "2022-08-08 08:20:01",
          "updateTime": "2022-08-08 08:20:01",
          "tsp": 12,
          "tspPolluted": 0,
          "tspLimit": 200,
          "tspMin": 1,
          "tspPercent": 6
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
      status: 0
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
    this.$refs.table.getShowCols(this.tableData, vehicleInfoFieldNoise)

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
      return
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
