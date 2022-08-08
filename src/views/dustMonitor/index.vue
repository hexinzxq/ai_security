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
          "id": 54312,
          "equipmentId": "40183947",
          "pointName": "矿区出入口1号机",
          "equipmentFk": 3,
          "monitoringTime": "2022-08-08 09:40:02",
          "pmOne": 0,
          "pmTwo": 10,
          "volume": 66,
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
          "pmTwoLimit": 300,
          "pmTwoMin": 0,
          "volumeLimit": 300,
          "volumeMin": 0,
          "pmOnePercent": 0,
          "pmTwoPercent": 3,
          "noisePercent": 22,
          "dustEventId": "YC9922801614",
          "noiseEventId": "ZS9922801614",
          "startTime": null,
          "endTime": null,
          "createTime": "2022-08-08 09:40:02",
          "updateTime": "2022-08-08 09:40:02",
          "tsp": 12,
          "tspPolluted": 0,
          "tspLimit": 200,
          "tspMin": 1,
          "tspPercent": 6
        },
        {
          "id": 54313,
          "equipmentId": "40183974",
          "pointName": "加工区挡墙",
          "equipmentFk": 5,
          "monitoringTime": "2022-08-08 09:40:02",
          "pmOne": 0,
          "pmTwo": 10,
          "volume": 64.5,
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
          "noisePercent": 21,
          "dustEventId": "YC9922801626",
          "noiseEventId": "ZS9922801626",
          "startTime": null,
          "endTime": null,
          "createTime": "2022-08-08 09:40:02",
          "updateTime": "2022-08-08 09:40:02",
          "tsp": 12,
          "tspPolluted": 0,
          "tspLimit": 300,
          "tspMin": 0,
          "tspPercent": 4
        },
        {
          "id": 54310,
          "equipmentId": "40183947",
          "pointName": "矿区出入口1号机",
          "equipmentFk": 3,
          "monitoringTime": "2022-08-08 09:30:01",
          "pmOne": 0,
          "pmTwo": 10,
          "volume": 64.8,
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
          "pmTwoLimit": 300,
          "pmTwoMin": 0,
          "volumeLimit": 300,
          "volumeMin": 0,
          "pmOnePercent": 0,
          "pmTwoPercent": 3,
          "noisePercent": 21,
          "dustEventId": "YC9922201324",
          "noiseEventId": "ZS9922201324",
          "startTime": null,
          "endTime": null,
          "createTime": "2022-08-08 09:30:01",
          "updateTime": "2022-08-08 09:30:01",
          "tsp": 12,
          "tspPolluted": 0,
          "tspLimit": 200,
          "tspMin": 1,
          "tspPercent": 6
        },
        {
          "id": 54311,
          "equipmentId": "40183974",
          "pointName": "加工区挡墙",
          "equipmentFk": 5,
          "monitoringTime": "2022-08-08 09:30:01",
          "pmOne": 0,
          "pmTwo": 10,
          "volume": 45.5,
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
          "noisePercent": 15,
          "dustEventId": "YC9922201340",
          "noiseEventId": "ZS9922201340",
          "startTime": null,
          "endTime": null,
          "createTime": "2022-08-08 09:30:01",
          "updateTime": "2022-08-08 09:30:01",
          "tsp": 12,
          "tspPolluted": 0,
          "tspLimit": 300,
          "tspMin": 0,
          "tspPercent": 4
        },
        {
          "id": 54309,
          "equipmentId": "40183974",
          "pointName": "加工区挡墙",
          "equipmentFk": 5,
          "monitoringTime": "2022-08-08 09:20:02",
          "pmOne": 1,
          "pmTwo": 11,
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
          "dustEventId": "YC9921601638",
          "noiseEventId": "ZS9921601638",
          "startTime": null,
          "endTime": null,
          "createTime": "2022-08-08 09:20:02",
          "updateTime": "2022-08-08 09:20:02",
          "tsp": 13,
          "tspPolluted": 0,
          "tspLimit": 300,
          "tspMin": 0,
          "tspPercent": 4
        },
        {
          "id": 54308,
          "equipmentId": "40183947",
          "pointName": "矿区出入口1号机",
          "equipmentFk": 3,
          "monitoringTime": "2022-08-08 09:20:02",
          "pmOne": 0,
          "pmTwo": 10,
          "volume": 64.8,
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
          "pmTwoLimit": 300,
          "pmTwoMin": 0,
          "volumeLimit": 300,
          "volumeMin": 0,
          "pmOnePercent": 0,
          "pmTwoPercent": 3,
          "noisePercent": 21,
          "dustEventId": "YC9921601626",
          "noiseEventId": "ZS9921601626",
          "startTime": null,
          "endTime": null,
          "createTime": "2022-08-08 09:20:02",
          "updateTime": "2022-08-08 09:20:02",
          "tsp": 12,
          "tspPolluted": 0,
          "tspLimit": 200,
          "tspMin": 1,
          "tspPercent": 6
        },
        {
          "id": 54307,
          "equipmentId": "40183974",
          "pointName": "加工区挡墙",
          "equipmentFk": 5,
          "monitoringTime": "2022-08-08 09:10:01",
          "pmOne": 0,
          "pmTwo": 10,
          "volume": 50.8,
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
          "noisePercent": 16,
          "dustEventId": "YC9921001035",
          "noiseEventId": "ZS9921001035",
          "startTime": null,
          "endTime": null,
          "createTime": "2022-08-08 09:10:01",
          "updateTime": "2022-08-08 09:10:01",
          "tsp": 12,
          "tspPolluted": 0,
          "tspLimit": 300,
          "tspMin": 0,
          "tspPercent": 4
        },
        {
          "id": 54306,
          "equipmentId": "40183947",
          "pointName": "矿区出入口1号机",
          "equipmentFk": 3,
          "monitoringTime": "2022-08-08 09:10:01",
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
          "dustHandle": 0,
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
          "dustEventId": "YC9921001019",
          "noiseEventId": "ZS9921001019",
          "startTime": null,
          "endTime": null,
          "createTime": "2022-08-08 09:10:01",
          "updateTime": "2022-08-08 09:10:01",
          "tsp": 12,
          "tspPolluted": 0,
          "tspLimit": 200,
          "tspMin": 1,
          "tspPercent": 6
        },
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
          "dustHandle": 0,
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
        }
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
            label: '设备号',
            placeholder: '请选择设备号',
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
            type: 'select',
            // 左边字段名称 可传可不传
            label: '点位名称',
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
            value: '1',
            style: {
              'margin-left': '-15px'
            },
            placeholder: '是否污染',
            // 控件name可传可不传
            name: 'pollution',
            options: [{
              label: '是',
              value: '1'
            },
              {
                label: '否',
                value: '0'
              }],
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
            callback: (values) => {
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
