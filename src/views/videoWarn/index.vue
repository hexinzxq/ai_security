<template>
  <div class="monitoringmanagement">
    <div class="header">
      <div v-if="isShowHeader" class="searchHeader">
        <el-form
          ref="ruleForm1"
          :model="ruleForm1"
          :rules="rules"
          label-width="90px"
          class="demo-ruleForm"
        >
          <el-form-item label="告警事件" prop="eventName" class="stateRule">
            <el-select
              v-model="ruleForm1.eventName"
              placeholder="请选择事件"
              @change="selectchange"
            >
              <el-option
                v-for="item in event"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="处理状态" prop="state" class="stateRule">
            <el-select
              v-model="ruleForm1.state"
              placeholder="请选择状态"
              @change="selectchange"
            >
              <el-option
                v-for="item in stateList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间" prop="date" class="cdateContent">
            <el-date-picker
              v-model="ruleForm1.date"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item class="button">
            <el-button
              type="primary"
              size="small"
              @click="findBtn('ruleForm1')"
            >查询</el-button>
            <el-button
              size="small"
              @click="resetBtn('ruleForm1')"
            >重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-divider class="outerDivider" />
    <div v-loading="loading">
      <div v-if="tableList && tableList.length > 0" class="senter">
        <div class="downloadBtnBoxStyle">
          <el-button
            type="primary"
            :disabled="!currentDownloadArray"
            @click="confirmationRecord"
          >批量确认</el-button>
          <!-- <el-button :disabled="!currentDownloadArray" @click="downLoadFile">批量下载</el-button> -->
          <el-button
            type="primary"
            :disabled="!currentDownloadArray"
            @click="handleExport"
          >导出报告</el-button>
          <el-button
            type="primary"
            @click="handleExportByType"
          >批量导出</el-button>
        </div>
        <ul class="ulstyle">
          <li
            v-for="(item, index) in tableList"
            id="liItem"
            :key="index"
            class="inactiveitem"
          >
            <div
              id="alarmVideoBox"
              class="alarmVideoBox"
              @mouseover="mouseover(index)"
              @mouseleave="mouseleave(index)"
            >
              <!-- <div id="downloadBtn" class="downloadBtn" @click="downloadBtn(index)" /> -->
              <div
                id="downloadBtn"
                class="downloadBtn"
                @click="downloadBtn(index)"
              >
                <div id="checkbox" class="checkbox" />
              </div>
              <div
                v-show="!item.eventVideo"
                id="scalingBtn"
                class="scalingBtn"
                @click="scalingBtn(item, index)"
              >
                <img
                  class="amplification_img"
                  width="33px"
                  height="33px"
                  :src="require('@/assets/nav_header_images/city.png')"
                  alt=""
                >
              </div>
              <div id="videBox" class="videBox">
                <video
                  v-if="item.eventVideo"
                  id="alarmVideo"
                  class="videoContent"
                  style="width: 100%; height: 255px; object-fit: fill"
                  preload="auto"
                  controlsList="nodownload noplaybackrate"
                  controls
                  muted
                  autoplay
                  :poster="item.picture"
                >
                  <source :src="item.eventVideo" type="video/mp4">
                </video>
                <div v-else>
                  <img
                    class="videoContent"
                    style="width: 100%; height: 255px; object-fit: fill"
                    :src="item.picture"
                  >
                </div>
              </div>
            </div>

            <div v-if="isShowHeader" class="alarmContentBox">
              <div class="alarmBox">
                <span class="eventSpan">{{ item.eventType }}</span>
                <div
                  id="stateBtn"
                  :class="
                    item.eventState === '未处理'
                      ? 'stateBtnW'
                      : item.eventState === '已处理'
                        ? 'stateBtnY'
                        : item.eventState === '未确认'
                          ? 'stateBtnWQ'
                          : 'stateBtnWX'
                  "
                >
                  <span>{{ item.eventState }}</span>
                </div>
              </div>
              <div>
                <span class="positionSpan">{{ item.deviceRegion || '--' }}</span>
                <span class="spanstyleSplit">|</span>
                <span class="idSpan">{{ item.deviceName || '--' }}</span>
                <span class="spanstyleSplit">|</span>
                <span class="idSpan">{{ item.eventCode || '--' }}</span>
              </div>
            </div>

            <div v-if="isShowHeader" class="alarmBtnBox">
              <el-button
                v-show="item.eventState === '未确认'"
                size="mini"
                @click="handelNoSubmit(item)"
              >无需处理</el-button>
              <el-button
                v-show="item.eventState === '未确认'"
                size="mini"
                type="primary"
                @click="handelQueren(item)"
              >确认</el-button>
              <el-button
                v-show="item.eventState === '未处理'"
                class="weiButton"
                size="mini"
                type="primary"
                @click="handelSubmit(item)"
              >处理</el-button>
              <el-button
                v-show="item.eventState === '无需处理'"
                size="mini"
                @click="handelNoSubmitDetail(item)"
              >查看详情</el-button>
              <el-button
                v-show="item.eventState === '已处理'"
                size="mini"
                @click="handelSubmitDetail(item)"
              >查看详情</el-button>
            </div>
            <el-dialog
              title="提示"
              :visible.sync="dialogQuerenVisible"
              width="28%"
            >
              <span>是否确认记录？确认后无法撤销。</span>
              <span slot="footer" class="dialog-footer">
                <el-button
                  @click="dialogQuerenVisible = false"
                >取 消</el-button>
                <el-button
                  type="primary"
                  @click="handleChangeTs()"
                >确 定</el-button>
              </span>
            </el-dialog>
          </li>
          <li v-if="isShowHeader" class="pagingBtnStyle">
            <div class="pagination">
              <el-pagination
                background
                style="overflow-x: auto"
                layout="prev, pager, next,sizes, jumper"
                :total="page.total"
                :current-page="currentpageNum"
                :page-sizes="page.pageSizes"
                :page-size="currentpageSize"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </li>
        </ul>
        <el-dialog
          title=""
          custom-class="modalGuard"
          :fullscreen="true"
          :visible="showScale"
          :destroy-on-close="true"
          :show-close="false"
          @close="handleCloseImg"
        >
          <img style="flex: 1; object-fit: fill" :src="currentPicture">
          <div
            id="scalingFullBtn"
            class="fullBtn"
            @click="scalingFullBtn()"
          >
            <img :src="require('@/assets/nav_header_images/city.png')">
          </div>
        </el-dialog>
        <!-- 无需处理 -->
        <noSubmit-form
          ref="noSubmit"
          :title="dialogNoSubmitName"
          :visible="dialogNoSubmitVisible"
          :data="currentItem"
          is-add="noSubmit"
          @close-callback="handleNoSubmitClose"
        />
        <!-- 无需处理详情 -->
        <noSubmit-form
          ref="noSubmitDetail"
          title="处理记录"
          :visible="dialogNoSubmitDetail"
          :data="currentItem"
          is-add="noSubmitDetail"
          :view-file-type="viewFileType"
          @close-callback="handleNoSubmitDClose"
        />
        <!-- 处理 -->
        <submit-form
          ref="submit"
          :title="dialogSubmitName"
          :visible="dialogSubmitVisible"
          :data="currentItem"
          is-add="submit"
          @close-callback="handleSubmitClose"
        />
        <!-- 处理详情 -->
        <submit-form
          ref="submitDetail"
          title="处理记录"
          :visible="dialogSubmitDDetail"
          :data="currentItem"
          is-add="submitDetail"
          :view-file-type="viewFileType"
          @close-callback="handleSubmitDClose"
        />
      </div>
      <div v-else class="emptyContent">暂无数据</div>
    </div>

    <!--根据类型批量导出的对话框-->
    <div class="export-dialog">
      <el-dialog
        title="批量导出"
        :visible.sync="exportDialogVisible"
        @close="handleClose"
      >
        <el-form ref="exportForm" :model="exportForm" :rules="exportRules" label-width="80px">
          <el-form-item label="时间范围" prop="dateValue">
            <el-date-picker
              v-model.sync="exportForm.dateValue"
              type="datetimerange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="告警类型" prop="type">
            <el-select v-model.sync="exportForm.type" placeholder="请选择告警类型">
              <el-option label="入侵监测" value="入侵监测"></el-option>
              <el-option label="烟火识别" value="烟火识别"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCancelExport">取 消</el-button>
          <el-button type="primary" @click="handleConfirmExport">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import NoSubmitForm from './NoSubmitForm.vue'
import SubmitForm from './SubmitForm.vue'
import Moment from 'moment'
import { listPage, changeStates, changeAllState, exportByType } from '@/api/guard'
import { saveImgZip } from '@/utils/packdownload'
import defaultSettings from '@/settings'
const { exportUrl } = defaultSettings
import { mapState } from 'vuex'

export default {
  name: 'VideoWarn',
  components: { NoSubmitForm, SubmitForm },
  data() {
    return {
      exportDialogVisible: false,
      exportForm: {
        dateValue: '',
        type: ''
      },
      exportRules: {
        dateValue: [
          { required: true, message: '请选择时间范围', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择告警类型', trigger: 'blur' }
        ]
      },
      currentPicture: '',
      showScale: false,
      playerArr: [],
      loading: false,
      roleCode: localStorage.getItem('roleCode'),
      currentDownloadArray: false,
      currentItem: {},
      ruleForm1: {
        eventName: '',
        state: '',
        date: ''
      },
      isAdd: '',
      dialogNoSubmitVisible: false, // 无需处理
      dialogSubmitVisible: false, // 处理
      dialogSubmitName: '处理事件',
      dialogNoSubmitName: '无需处理事件',
      dialogQuerenVisible: false, // 确认
      dialogSubmitDetail: false, // 确认详情
      dialogNoSubmitDetail: false, // 无需处理详情
      dialogSubmitDDetail: false, // 处理详情
      currentpageNum: 1, // 当前页码
      currentpageSize: 9, // 每页显示条数
      page: {
        pageSizes: [9, 18, 27, 36],
        total: 0
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      event: [
        {
          value: '入侵监测',
          label: '入侵监测'
        },
        {
          value: '烟火识别',
          label: '烟火识别'
        }
      ],
      stateListMain: [
        {
          value: '已处理',
          label: '已处理'
        },
        {
          value: '未处理',
          label: '未处理'
        },
        {
          value: '无需处理',
          label: '无需处理'
        },
        {
          value: '全部',
          label: '全部'
        }
      ],
      stateList: [
        {
          value: '已处理',
          label: '已处理'
        },
        {
          value: '未处理',
          label: '未处理'
        },
        {
          value: '未确认',
          label: '未确认'
        },
        {
          value: '无需处理',
          label: '无需处理'
        },
        {
          value: '全部',
          label: '全部'
        }
      ],
      data: '',
      alarmEvent: '',
      processStatus: '',
      isShowHeader: true,
      tableList: [],
      downloadvideoID: [], // 用于保存批量下载 视频的 ID
      rules: {},
      viewFileType: 'img'
    }
  },
  computed: {
    ...mapState({
      websocketData: (state) => state.websocket.websocketData
    })
  },
  watch: {
    websocketData(newVal, oldVal) {
      const page = {
        pageNum: this.currentpageNum,
        pageSize: this.currentpageSize
      }
      this.findBtn(page)
    }
  },
  created() {
    this.roleCode = localStorage.getItem('roleCode')
    const type = this.$route.query && this.$route.query.type
    this.ruleForm1.state = type
    const defaultEventName = this.$route.query && this.$route.query.typeTo
    // 数字孪生AI安全大屏跳转过来 - url上带上事件类型选择
    this.ruleForm1.eventName = defaultEventName || this.ruleForm1.eventName
    type && (this.ruleForm1.date = [sessionStorage.getItem('alertStartTime'), sessionStorage.getItem('alertEndTime')])
    const page = {
      pageNum: 1,
      pageSize: 9
      // state: '未确认'
    }
    if (defaultEventName) {
      page.type = defaultEventName
    }

    this.findBtn(page)
  },
  beforeDestroy() {
    this.playerArr.forEach((item) => {
      item.close()
      item = null
    })
  },
  methods: {
    // 根据选择的时间和类型批量导出
    handleExportByType() {
      this.exportDialogVisible = true
    },
    // 批量导出关闭回调
    handleClose() {
      this.$refs.exportForm.resetFields()
    },
    handleCancelExport() {
      this.exportDialogVisible = false
      this.$refs.exportForm.resetFields()
    },
    // 确认导出
    handleConfirmExport() {
      this.$refs.exportForm.validate((valid) => {
        if (valid) {
          const paramsObj = {}
          paramsObj.startTime = this.exportForm.dateValue[0]
          paramsObj.endTime = this.exportForm.dateValue[1]
          paramsObj.type = this.exportForm.type
          const urlArr = []
          exportByType(paramsObj).then((res) => {
            if (res.success === true) {
              if (res.result.length > 0) {
                res.result.forEach((item) => {
                  urlArr.push(item.pic)
                })
              } else {
                this.$message.warning('暂无数据')
                return
              }
              saveImgZip(urlArr)
            } else {
              this.$message.error(res.message)
            }
          }).catch((e) => {
            console.log(e)
          })
          this.exportDialogVisible = false
        } else {
          return false
        }
      })
    },
    // 鼠标移入
    mouseover(index) {
      document.querySelectorAll('#downloadBtn')[index].style.display = 'block'
    },
    // 鼠标移出
    mouseleave(index) {
      document.querySelectorAll('#downloadBtn')[index].className !==
        'activedownloadBtn' &&
        (document.querySelectorAll('#downloadBtn')[index].style.display =
          'none')
    },
    // 关闭图片预览模态框
    handleCloseImg() {
      this.showScale = false
    },
    isJson(value) {
      try {
        const obj = JSON.parse(value)
        return obj && typeof obj === 'object'
      } catch (error) {
        return false
      }
    },
    // 已处理 - 详情记录
    handelSubmitDetail(item) {
      this.dialogSubmitDDetail = true
      this.currentItem = item
      this.resolveHandel(item)
    },
    // 查看信息
    resolveHandel(data) {
      let fileInfo = ''
      if (data.recordFile) {
        fileInfo = data.recordFile.substring(
          data.recordFile.lastIndexOf('/') + 1
        )
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
    // 无需处理详情记录
    handelNoSubmitDetail(item) {
      this.dialogNoSubmitDetail = true
      this.currentItem = item
      this.resolveHandel(item)
    },
    // 无需处理
    handelNoSubmit(item) {
      this.dialogNoSubmitVisible = true
      this.currentItem = item
    },
    // 处理
    handelSubmit(item) {
      this.dialogSubmitVisible = true
      this.currentItem = item
    },
    // 关闭处理模态框
    handleSubmitClose() {
      this.dialogSubmitVisible = false
      const page = {
        pageNum: this.currentpageNum,
        pageSize: 9
      }
      this.findBtn(page)
    },
    // 关闭无需处理模态框
    handleNoSubmitClose() {
      this.dialogNoSubmitVisible = false
      const page = {
        pageNum: this.currentpageNum,
        pageSize: 9
      }
      this.findBtn(page)
    },
    // 关闭无需处理详情模态框
    handleNoSubmitDClose() {
      this.dialogNoSubmitDetail = false
      const page = {
        pageNum: this.currentpageNum,
        pageSize: 9
      }
      this.findBtn(page)
    },
    // 关闭处理详情模态框
    handleSubmitDClose() {
      this.dialogSubmitDDetail = false
      const page = {
        pageNum: this.currentpageNum,
        pageSize: 9
      }
      this.findBtn(page)
    },
    // 确认
    handelQueren(item) {
      this.dialogQuerenVisible = true
      this.currentItem = item
    },
    // 确认 - 确定
    handleChangeTs() {
      const params = {}
      params.states = '未处理'
      params.ids = this.currentItem.eventId
      changeStates(params)
        .then((res) => {
          this.dialogQuerenVisible = false
          this.$message({
            message: '更改成功',
            type: 'success'
          })
          this.$emit('close-callback')
          const page = {
            pageNum: this.currentpageNum,
            pageSize: 9
          }
          this.findBtn(page)
        })
        .catch()
    },
    handleSizeChange(val) {
      const page = {
        pageNum: this.currentpageNum,
        pageSize: val
      }
      this.currentpageSize = val
      this.findBtn(page)
    },
    handleCurrentChange(val) {
      const page = {
        pageNum: val,
        pageSize: this.currentpageSize
      }
      this.currentpageNum = val
      this.findBtn(page)
      this.currentDownloadArray = false
      this.tableList.map((item, index) => {
        item.download = false
        var downBtn = document.querySelectorAll('#downloadBtn')
        downBtn[index].className = 'downloadBtn'
      })
    },
    selectchange() {
      // 下拉选项框默认触发的事件
    },
    findBtn(page) {
      // 查询按钮
      this.loading = true
      const params = this.ruleForm1
      const data = {
        state: params.state && params.state === '全部' ? '' : params.state,
        type: params.eventName,
        startDate: params.date && Moment(params.date[0]).format('YYYY-MM-DD'),
        endDate: params.date && Moment(params.date[1]).format('YYYY-MM-DD')
        // roleCode: this.roleCode
      }
      data.pageNum = page.pageNum || 1
      data.pageSize = page.pageSize || this.currentpageSize
      listPage(data)
        .then((res) => {
          this.loading = false
          this.page.total = res.result.total
          this.tableList = res.result && res.result.records
          this.currentpageNum = res.result && res.result.current
        })
        .catch((e) => {
          console.log(e)
          this.loading = false
        })
    },
    resetBtn() {
      this.$router.push({ path: '/alert/guard', query: {}})
      // 重置按钮
      this.datavalue = ''
      this.alarmEvent = ''
      this.processStatus = ''
      this.ruleForm1 = {
        // state: '未确认'
      }
      this.currentpageNum = 1
      this.currentpageSize = 9
      const page = {
        pageNum: 1,
        pageSize: 9
        // state: '未确认'
      }
      this.findBtn(page)
      this.currentDownloadArray = false
      this.tableList.map((item, index) => {
        item.download = false
        var downBtn = document.querySelectorAll('#downloadBtn')
        downBtn[index].className = 'downloadBtn'
      })
    },
    // 导出报告
    handleExport() {
      const data = this.tableList
      const exportArray = []
      data.map((item) => {
        if (item.download === true) {
          exportArray.push(item.eventId)
        }
      })
      const ids = exportArray.toString()
      const link = document.createElement('a')
      const url = `${exportUrl}/event/export?ids=${ids}&type=2`
      link.style.display = 'none'
      link.href = url
      // link.setAttribute('download', fileName + '.xls')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link) // 下载完成移除元素
      window.URL.revokeObjectURL(url) // 释放掉blob对象
    },
    downLoadFile() {
      // 下载文件
      var downloadArray = []
      for (var item of this.tableList) {
        // 帅选出需要下载的视频
        if (item.download === true) {
          downloadArray.push(item.eventId)
          const link = document.createElement('a')
          link.href = item.eventVideo
          link.download = '下载结果.mp4'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link) // 下载完成移除元素
          window.URL.revokeObjectURL(item.eventVideo) // 释放掉blob对象
        }
      }
      this.currentDownloadArray = false
      this.tableList.map((item, index) => {
        item.download = false
        var downBtn = document.querySelectorAll('#downloadBtn')
        downBtn[index].className = 'downloadBtn'
      })
      // 筛选url直接下载
      // this.downloadvideoID = downloadArray
    },
    // 批量确认
    confirmationRecord() {
      let ids = []
      const states = []
      this.tableList.map((item, index) => {
        if (item.download === true) {
          states.push(item.eventState)
          if (index !== this.tableList.length - 1) {
            ids += item.eventId + ','
          } else {
            ids += item.eventId
          }
        }
      })
      const params = {}
      params.states = '未处理'
      params.ids = ids
      if (states.indexOf('未确认') > -1) {
        this.$confirm('是否确认记录？确认后无法撤销。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass: 'addBtn',
          iconClass: 'el-icon-warning errIcon',
          type: 'warning'
        }).then(() => {
          changeAllState(params)
            .then((res) => {
              const page = {
                pageNum: this.currentpageNum,
                pageSize: 9
              }
              this.findBtn(page)
              this.$message({
                message: '更改成功',
                type: 'success'
              })
              this.tableList.map((item, index) => {
                item.download = false
                var downBtn = document.querySelectorAll('#downloadBtn')
                downBtn[index].className = 'downloadBtn'
              })
              this.currentDownloadArray = false
            })
            .catch()
        })
      } else {
        this.$message({
          message: '请勾选未确认的事件!',
          type: 'warning'
        })
      }
    },
    // 缩小屏幕
    scalingFullBtn() {
      // 缩放按钮
      this.showScale = false
    },
    // 放大屏幕
    scalingBtn(item) {
      // 缩放按钮
      this.showScale = true
      this.currentPicture = item.picture
      // const allli = document.querySelectorAll('#liItem')

      // if (allli[index].className === 'inactiveitem') {
      //   allli[index].className = 'activeitem'
      //   this.isShowHeader = false // 隐藏头部内容
      // } else {
      //   allli[index].className = 'inactiveitem'
      //   this.isShowHeader = true // 显示头部内容
      // }
    },
    playVideo(index) {
      // 播放视频
      var myVideo = document.querySelectorAll('#alarmVideo')[index]
      if (myVideo.paused) {
        myVideo.play()
      } else {
        myVideo.pause()
      }
    },
    downloadBtn(index) {
      // 下载按钮
      var downBtn = document.querySelectorAll('#downloadBtn')
      if (downBtn[index].className === 'downloadBtn') {
        downBtn[index].className = 'activedownloadBtn'
        this.tableList[index].download = true
      } else {
        downBtn[index].className = 'downloadBtn'
        this.tableList[index].download = false
      }
      const arr = []
      this.tableList.map((item) => {
        arr.push(item.download)
      })
      if (arr.indexOf(true) > -1) {
        this.currentDownloadArray = true
      } else {
        this.currentDownloadArray = false
      }
    }
  }
}
</script>
<style lang="scss">
.modalGuard {
  .is-fullscreen {
    overflow: hidden;
  }
  .testColor {
    color: #fff;
    width: 23px;
    height: 23px;
  }
  .fullBtn {
    position: absolute;
    bottom: 0px;
    right: 0px;
    z-index: 5;
    width: 36px;
    padding: 8px;
    background: rgba(51, 51, 51, 0.3);
  }
  .el-dialog__header {
    padding: 0 !important;
  }
  .el-dialog__body {
    padding: 0 !important;
    img {
      width: 100%;
      object-fit: fill;
      display: block;
      //width: 23px;
      // transform: translate(-50%,-50%);
    }
  }
}
</style>
<style lang="scss" scoped>
video::-webkit-media-controls-mute-button {
  display: none !important;
  color: transparent !important;
  background: #fff !important;
  padding: 0px;
  &:hover {
    background: transparent !important;
    color: transparent !important;
    padding: 0px;
  }
}
.monitoringmanagement {
  .weiButton{
    width: 70px;
  }
  .el-button--mini {
    height: 40px !important;
  }
  .stateBtnY {
    width: 72px;
    height: 32px;
    border-radius: 0 0 0 8px;
    color: #fff;
    background-color: #00a4d9;
    padding: 5px 10px;
  }
  .stateBtnW {
    width: 72px;
    height: 32px;
    border-radius: 0 0 0 8px;
    color: #fff;
    background-color: #ff9940;
    padding: 5px 10px;
  }
  .stateBtnWX {
    width: 89px;
    height: 30px;
    border-radius: 0 0 0 8px;
    color: #fff;
    background-color: #228566;
    padding: 5px 10px;
  }
  .stateBtnWQ {
    width: 72px;
    height: 32px;
    border-radius: 0 0 0 8px;
    color: #fff;
    background-color: #ff4156;
    padding: 5px 10px;
  }
  .stateRule {
    .el-select {
      width: 140px;
    }
  }
  .cdateContent {
    .el-date-editor--daterange {
      width: 238px;
    }
  }
  .outerDivider {
    background-color: #f5f5f5;
  }
  .button {
    ::v-deep .el-form-item__content {
      margin-left: 20px !important;
    }
  }
  .el-divider--horizontal {
    display: block;
    height: 16px;
    width: 100%;
  }
  .spanstyleSplit {
    opacity: 0.6;
    color: #333333;
    margin-left: 8px;
    margin-right: 8px;
  }
  .alarmBox {
    .innerDivider {
      background-color: #333333 !important;
      font-weight: 400 !important;
      opacity: 0.6 !important;
    }
  }
  .emptyContent {
    margin-top: 20%;
    display: flex;
    justify-content: center;
  }
  .demo-ruleForm {
    display: inline-flex;
  }
  width: 100%;
  // border: solid 1px green;

  .header {
    width: 100%;
    height: 6%;
    // border: solid  1px blue;
    .searchHeader {
      display: flex;
      flex-direction: row;
      padding-left: 5px !important;
      padding-top: 20px !important;
     .el-form-item{
         margin-bottom:  0px !important;
     }
      .demo-input-suffix1 {
        // border: solid 1px red ;
        margin-top: 20px;
        margin-left: 10px;
      }
      .demo-input-suffix2 {
        margin-top: 20px;
        margin-left: 70px;
        // border: solid 1px red ;
      }
      .demo-input-suffix3 {
        margin-top: 20px;
        margin-left: 90px;
        // border: solid 1px red ;
      }
      .label {
        width: 40px;
        // height:20px;
      }
      .findBtn {
        height: 40px;
        width: 100px;
        margin-left: 50px;
        margin-top: 20px;
      }
      .resetBtn {
        height: 40px;
        width: 100px;
        margin-left: 20px;
        margin-top: 20px;
      }
    }
  }
  .senter {
    width: 100%;
    height: 93%;
    // height: 1000px;
    // border: solid 1px blue;
    .downloadBtnBoxStyle {
      margin-left: 24px;
      margin-bottom: 24px;
    }
    .ulstyle {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      padding-left: 16px;
      padding-bottom: 0;
      list-style-type: none;
      // border: solid 1px green;

      .inactiveitem {
        // 不活跃状态的 item 样式
        //  border: solid 1px red;
        //  height: 50%;
        height: 408px;
        width: 31.3%;
        //  float: left;
        display: inline-flex;
        border-radius: 4px;
        margin-right: 16px;
        margin-bottom: 16px;
        box-shadow: 0px 0px 8px 0px rgb(0 0 0 / 20%);
        flex-direction: column;
        .alarmVideoBox {
          // 告警视频盒子
          position: relative;
          .scalingBtn {
            width: 36px;
            height: 36px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            position: absolute;
            bottom: 4px;
            right: 0;
            z-index: 1;
            background: rgba(0, 0, 0, 0.3);
            .amplification_img {
              position: absolute;
              width: 15px;
              height: 15px;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              margin: auto;
            }
          }
          .downloadBtn {
            // 不活跃下载按钮样式
            display: none;
            width: 36px;
            height: 36px;
            // border: solid 2px #ffffff;
            background: rgba(0, 0, 0, 0.2);
            // opacity: 0.1;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 1;
            .checkbox {
              width: 15px;
              height: 15px;
              border: solid 2px #ffffff;
              // opacity: 1 !important;
              box-sizing: border-box;
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              margin: auto;
              z-index: 1;
            }
            // border:solid 1px red;
          }
          .activedownloadBtn {
            // 活跃 下载按钮样式
            display: none;
            width: 36px;
            height: 36px;
            // border: solid 2px #ffffff;
            background: rgba(0, 0, 0, 0.2);
            // opacity: 0.1;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 1;
            .checkbox {
              width: 15px;
              height: 15px;
              box-sizing: border-box;
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              margin: auto;
              z-index: 1;
              background-size: cover;
            }
          }

          .videBox {
            // video 播放器样式
            width: 100%;
            height: 100%;
            // border:solid 1px green;
          }
        }
        .alarmContentBox {
          // 告警信息盒子
          width: 94%;
          height: 18%;
          margin-left: 3%;
          margin-top: 24px;
          .alarmBox {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            margin-top: -10px;
            .eventTime {
              font-size: 14px;
              color: #000000;
              opacity: 0.75;
            }
          }
          // border:solid 1px blue;
          .eventSpan {
            font-size: 20px;
          }
          .positionSpan {
            font-size: 16px;
            // margin-left: 40px;
          }
          .idSpan {
            font-size: 16px;
            color: #333333;
            font-weight: 400;
            opacity: 0.6;
          }
        }
        .alarmBtnBox {
          width: 97%;
          height: 12%;
          justify-content: flex-end;
          display: flex;
          margin-bottom: 12px;
          // border:solid 1px blue;
        }
      }

      .activeitem {
        // 活跃状态 item 样式
        width: 97%;
        height: 93%;
        top: 3%;
        // left: 0;
        position: absolute;
        z-index: 8;
        background-color: #ffff;
        .alarmVideoBox {
          // border: solid 1px green;
          width: 100%;
          height: 93%;
          position: relative;
          // background-color: pink;
          .scalingBtn {
            width: 36px;
            height: 36px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            position: absolute;
            bottom: 4px;
            right: 0;
            z-index: 1;
            background: rgba(0, 0, 0, 0.3);
            .amplification_img {
              position: absolute;
              width: 15px;
              height: 15px;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              margin: auto;
            }
          }
          .videBox {
            // 播放器大小
            width: 100%;
            height: 100%;
            // border: solid 1px blue;
            .videoContent {
              border-radius: 4px;
              box-shadow: 0 0 8px 0 rgb(0 0 0 / 20%);
            }
          }
        }
        .alarmContentBox {
          width: 100%;
          height: 7%;
          display: flex;
          // border: solid 1px purple;
          .eventSpan {
            font-size: 40px;
          }
          .positionSpan {
            font-size: 40px;
            margin-left: 40px;
          }
          .span {
            margin-left: 50px;
            font-size: 40px;
          }
        }

        .pagingBtnStyle {
          display: none;
        }
      }

      .pagingBtnStyle {
        width: 100%;
        height: 6%;
        text-align: right;
        // position:absolute;
        // bottom: 0;
        // border: solid 1px green;
        .pagination {
          // width: 25%;
          // float:right;
          margin-top: 20px;
          margin-right: 20px;
          // border: solid 1px red;
        }
      }
    }
  }
}
::v-deep.el-dialog__wrapper {
  .modalGuard {
    .el-dialog__body {
      height: 100% !important;
      display: flex !important;
    }
  }
}
</style>
<style lang="scss" scoped>
::v-deep .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner {
  width: auto !important;
}
</style>
