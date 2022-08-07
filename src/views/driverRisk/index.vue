<template>
  <div class="aiSurveillanceVideo">
    <el-card class="topCard">
      <el-form ref="form" label-position="left" label-width="auto">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="车牌号" style="width: 100%">
              <el-select
                v-model="searchForm.vehicleNumber"
                style="width:100%"
                :clearable="true"
                :filterable="true"
                placeholder="请选择车牌号"
              >
                <el-option
                  v-for="(opt, index) in vehicleNumberArr"
                  :key="index"
                  :label="opt.label"
                  :value="opt.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态" style="width: 100%">
              <el-select
                v-model="searchForm.driverStatus"
                :clearable="true"
                style="width: 100%"
                placeholder="全部"
                class="state_select"
              >
                <el-option
                  v-for="(item, index) in stateType"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="车辆类型" style="width:100%">
              <el-select
                v-model="searchForm.vehicleType"
                style="width:100%"
                :clearable="true"
                placeholder="选择车辆"
                class="type_select"
              >
                <el-option
                  v-for="(item, index) in vehicleType"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="司机" style="width: 100%">
              <el-input
                v-model="searchForm.driverName"
                :clearable="true"
                style="width: 100%"
                placeholder="请输入司机姓名"
                class="driver_input"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="日期" style="width: 100%">
              <el-date-picker
                v-model="searchForm.dateRange"
                style="width: 100%"
                type="daterange"
                value-format="yyyy-MM-dd"
                format="yyyy.MM.dd"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                class="picker"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div>
              <el-button
                class="queryBtn"
                type="primary"
                @click="filterData"
              >查询</el-button>
              <el-button
                type="primary"
                class="resetBtn"
                @click="resetFilterParams"
              >重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <el-card class="videoCard">
      <div>
        <!-- 处理按钮 -->
        <div style="margin:4px 0 20px 0">
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
            margin-left: 16px;
            background: #fff;
            color: black;
            border-color: #ccc;
          "
            type="primary"
            @click="handleExport2()"
          >导出报告</el-button>
        </div>
        <!-- <el-button
          :class="{ exportBtn: btnFlag, disableBtn: !btnFlag }"
          :disabled="!btnFlag"
          style="
            margin-left: 16px;
            background: #fff;
            color: black;
            border-color: #ccc;
          "
          @click="batchDel()"
        >批量删除</el-button>
      </div> -->
        <el-row v-if="!isEmpty" :gutter="0" class="videobox">
          <el-col
            v-for="(item, index) in arr"
            :key="item.id"
            :xs="24"
            :sm="12"
            :md="12"
            :lg="8"
          >
            <div
              style="
              height: 441px;
              box-sizing: border-box;
              margin:8px;
              box-shadow: 0px 0px 8px -2px rgba(0, 0, 0, 0.2);
            "
            >
              <!-- 多个视频 isonly -->
              <div>
                <div
                  class="videoItem"
                  @mouseover="mouseover(index)"
                  @mouseleave="mouseleave(index)"
                >
                  <div class="videobox1">
                    <div class="checkboxOut" @click="checkboxClick(index, item)">
                      <div
                        id="checkbox"
                        class="checkbox"
                      />
                    </div>
                    <!-- <div class="video_time">
                      <span>{{ item.causeTime }}</span>
                    </div> -->
                    <div class="videoBox">
                      <video
                        id="video1"
                        class="video1"
                        preload="auto"
                        :controls="item.url?true:false"
                        :poster="item.coverId"
                        @click="playbtnclick(index)"
                      >
                        <source :src="item.url" type="video/mp4">
                        Your browser does not support HTML5 video.
                      </video>
                      <div v-if="!item.url" class="amplification" @click="amplificationFun(index)">
                        <img
                          class="amplification_img"
                          width="33px"
                          height="33px"
                          :src="require('@/assets/nav_header_images/city.png')"
                          alt=""
                        >
                      </div>
                    </div>

                    <div class="spanbox" style="overflow:hidden">
                      <div class="spanbox_item1">
                        <span class="spanstyle1">{{
                            item.warningContent?item.warningContent:'--'
                          }}</span>
                        <div
                          class="tag"
                        >
                          <el-tag
                            v-if="item.status === '未确认'"
                            class="tag-style"
                            color="#FF8100"
                            type="warning"
                          >{{ item.status }}</el-tag>
                          <el-tag
                            v-if="item.status === '未处理'"
                            class="tag-style"
                            color="#00A1F8"
                          >{{ item.status }}</el-tag>
                          <el-tag
                            v-if="item.status === '无需处理'"
                            class="tag-style"
                            color="#08DBB2"
                            type="info"
                          >{{ item.status }}</el-tag>
                          <el-tag
                            v-if="item.status === '已处理'"
                            class="tag-style"
                            color="#01D778"
                            type="success"
                          >{{ item.status }}</el-tag>
                        </div>
                        <!-- <span class="spanstyle8">{{ item.causeTime }}</span> -->
                      </div>
                      <div class="spanbox_item2">
                        <div class="left">
                          <span class="spanstyle3">{{ item.driverName?item.driverName:'--' }}</span>
                          <span class="span_s">|</span>

                          <span class="spanstyle4" style="opacity:0.6">{{
                              item.vehicleNumber?item.vehicleNumber:'--'
                            }}</span>
                          <span class="span_s">|</span>
                          <span
                            class="spanstyle6"
                            style="opacity:0.6"
                          >{{ item.equipment?item.equipment:'--' }}</span>
                          <span class="span_s">|</span>
                          <span class="spanstyle2">{{ item.warningNo?item.warningNo:'--' }}</span>
                        </div>
                        <!-- <div class="right">
                          <span
                            class="spanstyle6"
                            style="padding-right: 16px"
                          >{{ item.equipment }}</span>

                        </div> -->
                      </div>
                      <div class="spanbox_item3">
                        <el-button
                          v-if="item.status === '无需处理'"
                          type="primary"
                          class="resetBtn"
                          @click="resolveHandel(item, '处理事件', true)"
                        >查看记录</el-button>
                        <el-button
                          v-if="item.status === '已处理'"
                          type="primary"
                          class="resetBtn"
                          @click="resolveHandel(item, '已处理记录', false)"
                        >查看记录</el-button>
                        <el-button
                          v-if="item.status === '未处理'"
                          type="primary"
                          class="queryBtn"
                          @click="dealEvent(item)"
                        >处理</el-button>
                        <el-button
                          v-if="item.status === '未确认'"
                          class="queryBtn"
                          type="primary"
                          @click="confirmOperator(item, false)"
                        >确认</el-button>
                        <el-button
                          v-if="item.status === '未确认'"
                          type="primary"
                          class="resetBtn"
                          @click="noToDeal(item)"
                        >无需处理</el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 一个视频 -->
              <!-- <div v-else>
                <div
                  class="oneVideo"
                  @mouseenter="mouseenter(index)"
                  @mouseleave="mouseleave(index)"
                >
                  <div class="videobox1" @click="playbtnclick(index)">
                    <video
                      id="video1"
                      style="width: 100%; height: 100%; object-fit: fill"
                      poster="@/assets/index/wxcl.png"
                      preload="none"
                      controls="controls"
                    >
                      <source :src="item.src" type="video/mp4">
                      Your browser does not support HTML5 video.
                    </video>
                    <div id="scaleBox" class="scaleBox">
                      <div class="scale" @click="Scalingclick(index)" />
                    </div>
                  </div>

                  <div class="spanbox">
                    <span class="span1">{{ item.cameraname }}</span>
                    <span class="span2">{{ item.algorithmname }}</span>
                    <span class="span3">{{ item.position }}</span>
                  </div>
                </div>
              </div> -->
            </div>
          </el-col>
        </el-row>
        <div v-else style="text-align:center">
          当前数据为空
        </div>
        <div
          class="grid-content bg-purple pagination"
          :style="{ justifyContent: 'flex-end', width: '100%' }"
        >
          <el-pagination
            :current-page.sync="currentPage"
            :page-sizes="[9, 18, 27, 36]"
            layout="prev, pager, next,sizes,jumper"
            :total="total"
            :pager-count="5"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </el-card>
    <!-- 确认记录模态框 -->
    <el-dialog title="提示" :visible.sync="confirmVisible" width="30%">
      <span
        class="el-icon-info"
        style="color: orange; font-size: 20px; padding-right: 5px"
      />
      <span>是否确认记录?确认后无法撤销。</span>
      <span slot="footer" class="dialog-footer">
        <el-button class="resetBtn" @click="confirmVisible = false">取 消</el-button>
        <el-button
          type="primary"
          class="queryBtn"
          @click="handleConfirm"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 处理事件模态框 -->
    <el-dialog :title="handleTitle" :visible.sync="dealVisible" width="640px">
      <el-form
        ref="processed"
        v-loading="loading"
        label-width="80px"
        :model="modelData"
        element-loading-text="处理中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)"
      >
        <el-form-item label="事件">
          {{ modelData.warningContent ? modelData.warningContent : "--" }}
        </el-form-item>
        <el-form-item label="事件编号">
          {{ modelData.warningNo ? modelData.warningNo : "--" }}
        </el-form-item>
        <el-form-item v-show="!noDeal" label="确认人">
          {{ modelData.confirm ? modelData.confirm : "--" }}
        </el-form-item>
        <el-form-item label="设备号">
          {{ modelData.equipment ? modelData.equipment : "--" }}
        </el-form-item>
        <el-form-item label="发生时间">
          {{ modelData.causeTime ? modelData.causeTime : "--" }}
        </el-form-item>
        <el-form-item label="处理证明" prop="file">
          <el-upload
            ref="upload"
            :headers="headers"
            :action="handleUrl"
            :show-file-list="true"
            :auto-upload="false"
            :accept="acceptType"
            :file-list="fileList"
            :limit="1"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :on-error="uploadError"
            :on-success="
              (res) => {
                return uploadSuccess(res);
              }
            "
          >
            <el-button size="small" type="warning">浏览</el-button>
          </el-upload>
          <!-- <el-progress v-show="processFlag" :text-inside="true" :stroke-width="14" :percentage="percent" status="success" /> -->
        </el-form-item>
        <el-form-item label="处理记录" prop="handlerMark">
          <el-input
            v-model="modelData.handlerMark"
            type="textarea"
            maxlength="100"
            show-word-limit
            placeholder="请输入处理记录，无输入则默认已处理"
          /></el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="resetBtn" @click="dealVisible = false">取消</el-button>
        <el-button class="queryBtn" type="warning" @click="submitDeal">确认</el-button>
      </span>
    </el-dialog>
    <!-- 无需处理模态框和已处理模态框 -->
    <el-dialog
      :title="handleTitle"
      :visible.sync="processedFlag"
      width="640px"
      @close="cancelHandle()"
    >
      <el-form ref="processed" label-width="80px">
        <el-form-item label="事件">
          {{ modelData.warningContent ? modelData.warningContent : "--" }}
        </el-form-item>
        <el-form-item label="事件编号">
          {{ modelData.warningNo ? modelData.warningNo : "--" }}
        </el-form-item>
        <el-form-item label="确认人">
          {{ modelData.confirm ? modelData.confirm : "--" }}
        </el-form-item>
        <el-form-item label="设备号">
          {{ modelData.equipment ? modelData.equipment : "--" }}
        </el-form-item>
        <el-form-item label="发生时间">
          {{ modelData.causeTime ? modelData.causeTime : "--" }}
        </el-form-item>
        <el-form-item label="处理证明">
          <div v-if="viewFileType === 'img'">
            <el-image
              v-loading="imgLoading"
              element-loading-text="加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.1)"
              style="max-width: 150px; vertical-align: top; padding-right: 12px"
              :lazy="true"
              :src="viewImgUrl"
            />
            <a
              :href="viewImgUrl"
              style="
                  margin: 0 12px
                  padding: 3px 0;
                  color: #66b1ff;
                  border-bottom: 1px solid #66b1ff;
                "
              :downLoad="`${uploadInfo}`"
            >下载</a>
          </div>
          <div v-else-if="viewFileType === 'empty'">
            <span>无证明文件</span>
          </div>
          <div v-else-if="viewFileType === 'error'">
            <span>文件已损坏</span>
          </div>
          <div v-else>
            <span class="fileName">{{ uploadInfo }}</span>
            <span v-show="uploadInfo">
              <a
                :href="viewImgUrl"
                style="
                  padding: 3px 0;
                  color: #66b1ff;
                  border-bottom: 1px solid #66b1ff;
                "
                :downLoad="`${uploadInfo}`"
              >下载</a>
            </span>
          </div>
        </el-form-item>
        <el-form-item label="处理记录">
          {{ modelData.handlerMark ? modelData.handlerMark : "--" }}
        </el-form-item>
        <el-form-item label="处理人">
          {{ modelData.handler ? modelData.handler : "--" }}
        </el-form-item>
        <el-form-item label="处理时间">
          {{ modelData.handlerTime ? modelData.handlerTime : "--" }}
        </el-form-item>
      </el-form>
      <span v-if="noDeal" slot="footer" class="dialog-footer">
        <el-button
          type="warning"
          class="queryBtn"
          @click="revokeDeal(modelData.warningNo)"
        >撤销无需处理</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  handleVehicleWarning,
  getTableData,
  deleteActionsInData
} from '@/api/table'
import { TableMinxin } from '@/mixins/TableCommonMinxin'
import { fileInterceptor } from '@/api/manage'
export default {
  name: 'DriverRisk',
  mixins: [TableMinxin],
  data() {
    return {
      // 是否有数据标志
      isEmpty: false,
      // 所有车牌号
      vehicleNumberArr: [],
      // 数据总数 初始化
      total: 0,
      // 弹出模态框标题
      handleTitle: '已处理记录',
      // 处理模态框可见标志
      dealVisible: false,
      // 导出、批量删除按钮可用标志
      btnFlag: false,
      // 当前页码
      currentPage: 1,
      // 确认处理的那条数据
      confirmData: {},
      // 确认处理模态框显隐标志
      confirmVisible: false,
      // 是否为批量确认操作
      batchConfirmFlag: false,
      // 告警编号
      warningNos: [],
      // isActive: true
      stateType: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '未确认',
          label: '未确认'
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
          value: '已处理',
          label: '已处理'
        }
      ],
      // 搜索表单 参数
      searchForm: {
        driverStatus: '',
        // vehicleType: '',
        vehicleNumber: '',
        driverName: '',
        dateRange: []
      },
      isonly: false, // 是否只存在 一个 视频
      // 方法函数接口
      urlList: {
        // 给父链接则从父组件中请求  子链接传值则从子组件中请求
        tableDataUrl: 'digital-mine/driverWarning/findAll',
        batchConfirmUrl: 'digital-mine/driverWarning/confirmByWarningNos',
        exportXlsUrl: 'digital-mine/driverWarning/exportXls',
        handleUrl: 'digital-mine/driverWarning/handler',
        revokeUrl: 'digital-mine/driverWarning/cancelIgnore',
        confirmUrl: 'digital-mine/driverWarning/confirm',
        batchDeleteUrl: 'digital-mine/driverWarning/deleteByIds',
        findAllVehicleNumber: 'digital-mine/vehicle/getVehicleNumber'
      },
      // 所有视频数据信息
      arr: [],
      // 导出参数信息
      exportParams: {},
      // 导出数据选项index
      selectIndexArr: [],
      // 处理事件变量
      fileInfo: {},
      // 上传文件信息
      uploadInfo: '',
      // 上传文件列表
      fileList: [],
      // 无需处理标志
      noDeal: false,
      // 查看信息模态框信息
      modelData: {},
      // 无需处理和已处理可见性标志
      processedFlag: false,
      // 处理加载
      loading: false,
      // 预览文件类型
      viewFileType: 'img',
      // 预览图片 图片加载
      previewLoading: false,
      imgLoading: false,
      viewImgUrl: '',
      previewFlag: false,
      // 当前选择的数据id数组
      selectIds: [],
      pageSize: 9,
      pageNum: 1
    }
  },
  computed: {
    // permissionName() {
    //   return this.$store.state.app.userInfo.permissionName
    // }
  },
  created() {
    if (this.arr.length === 1) {
      this.isonly = true
      console.log(this.isonly)
    } else {
      this.isonly = false
      console.log(this.isonly)
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 检查浏览器是否支持
      const fullScreenEnabled = !!(
        document.fullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.msFullscreenEnabled ||
        document.webkitSupportsFullscreen ||
        document.webkitFullscreenEnabled ||
        document.createElement('video').webkitRequestFullScreen
      )
      // 获取全屏按钮
      const fullscreens = document.querySelectorAll('.amplification')
      // 不支持全屏时
      if (!fullScreenEnabled) {
        for (const item of fullscreens) {
          item.style.display = 'none'
        }
      }
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      if (this.$route.query.type) {
        // 设置类型状态赋值
        params.driverStatus = this.$route.query.type
        this.searchForm.driverStatus = this.$route.query.type
        params.startTime = this.$route.query.queryData[0]
        params.endTime = this.$route.query.queryData[1]
        this.searchForm.dateRange = this.$route.query.queryData
      }
      this.exportParams = { ...params }
      this.getAllVehicleNumber()
      this.getData(params)
    })
    // window.screenHeight = document.body.clientHeight;
    // var element = document.getElementsByClassName("aiSurveillanceVideo")[0];
    // element.style.height = window.screenHeight - 100 + "px";
  },
  methods: {
    // createPlayer(videoElement, url) {
    //   if (flvjs.isSupported()) {
    //     const player = flvjs.createPlayer({
    //       type: 'flv',
    //       isLive: true,
    //       url: url,
    //       hasAudio: false
    //     })
    //     player.attachMediaElement(videoElement)
    //     player.load()
    //     player.play()
    //       .then(() => {
    //         console.log('player')
    //       })
    //       .catch((error) => {
    //         console.log(error)
    //       })
    //   }
    // },
    // setVideo() {
    //   this.$nextTick(() => {
    //     const videos = document.querySelectorAll('.video1')
    //     this.arr.forEach((o, index) => {
    //       const videoElement = videos[index]
    //       const url = 'http://117.174.152.90:28000/live/017830892021_2_1.flv'
    //       videoElement && url && this.createPlayer(videoElement, url)
    //     })
    //   })
    // },
    // 获取所有车牌号
    getAllVehicleNumber() {
      getTableData(this.urlList.findAllVehicleNumber).then((res) => {
        for (const value of res.result) {
          this.vehicleNumberArr.push({ value })
        }
      })
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    // 清空勾选框
    clearCheckBox() {
      const checkClickArr = document.querySelectorAll('#checkbox')
      for (const item of checkClickArr) {
        item.classList.remove('checkbox1')
        item.style.border = ''
      }
      this.selectIndexArr = []
      this.selectIds = []
      this.warningNos = []
    },
    resetFilterParams() {
      this.searchForm = {
        driverStatus: '',
        // vehicleType: '',
        vehicleNumber: '',
        driverName: '',
        dateRange: []
      }
      this.btnFlag = false
      this.exportParams = {}
      this.clearCheckBox()
      this.currentPage = 1
      this.getData()
    },
    // 获取表格中的数据
    getFilterParams(copyParams, key) {
      // 当有一个字段属性为空值时去除该查询字段
      if (copyParams[key] === '' || copyParams[key] === null) {
        delete copyParams[key]
      }
    },
    filterData() {
      this.clearCheckBox()
      const copyParams = { ...this.searchForm }
      for (const key in copyParams) {
        this.getFilterParams(copyParams, key)
      }
      if (copyParams['dateRange'] && copyParams['dateRange'].length > 0) {
        copyParams.startTime = copyParams.dateRange[0]
        copyParams.endTime = copyParams.dateRange[1]
      }
      delete copyParams['dateRange']
      // 按钮禁用
      this.btnFlag = false
      this.currentPage = 1
      this.pageNum = 1
      this.exportParams = { ...copyParams }
      this.getData(this.exportParams)
    },
    // 批量删除
    batchDel() {
      if (this.selectIds.length < 1) {
        return
      }
      this.$confirm('是否删除司机告警信息? 确认删除后无法撤销。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'addBtn',
        cancelButtonClass: 'cancelBtn',
        iconClass: 'el-icon-warning errIcon',
        type: 'warning'
      }).then(() => {
        this.exportParams = {}
        deleteActionsInData(
          this.urlList.batchDeleteUrl,
          {},
          { ids: this.selectIds.join(',') }
        )
          .then((res) => {
            this.getData()
            this.$message.success(`删除了${this.selectIds.length}条数据`)
            // 删除成功后清除勾选数据信息
            this.selectIds = []
            this.warningNos = []
            this.selectIndexArr = []
            // 清除勾选框
            var myCheckbox = document.querySelectorAll('#checkbox')
            for (const item of myCheckbox) {
              item.classList.remove('checkbox1')
              item.style.border = ''
            }
          })
          .catch((res) => {
            this.$message.error('删除失败')
          })
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
    // 取消查看函数
    cancelHandle() {
      URL.revokeObjectURL(this.viewImgUrl)
      this.fileList = []
      this.modelData = {}
    },
    // 提交处理数据信息
    submitDeal() {
      // 判断是否已经提交  防止用户多次点击
      if (this.loading) return
      if (this.fileList.length > 0) {
        this.$refs.upload.submit()
      } else {
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
    // 上传失败回调函数
    uploadError(err, file, fileList) {
      this.$message.error(err.message)
      this.loading = false
      this.dealVisible = false
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
    // 处理事件模态框
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
    // 查看信息
    resolveHandel(data, title, flag) {
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
            this.$message.error('文件已损坏')
            this.viewFileType = 'error'
          })
      }
      this.modelData = { ...data }
      // console.log(this.modelData)
    },
    // 判断浏览器是否已经处于全屏模式
    isFullScreen() {
      return !!(
        document.fullscreen ||
        document.webkitIsFullScreen ||
        document.mozFullScreen ||
        document.msFullscreenElement ||
        document.fullscreenElement
      )
    },
    setFullscreenData(videoContainer, state) {
      videoContainer.setAttribute('data-fullscreen', !!state)
    },
    // 全屏播放
    amplificationFun(index) {
      var videoContainer = document.querySelectorAll('#video1')[index]
      if (this.isFullScreen()) {
        if (document.exitFullscreen) document.exitFullscreen()
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen()
        else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) document.msExitFullscreen()
        this.setFullscreenData(videoContainer, false)
      } else {
        if (videoContainer.requestFullscreen) {
          videoContainer.requestFullscreen()
        } else if (videoContainer.mozRequestFullScreen) {
          videoContainer.mozRequestFullScreen()
        } else if (videoContainer.webkitRequestFullScreen) {
          videoContainer.webkitRequestFullScreen()
        } else if (videoContainer.msRequestFullscreen) {
          videoContainer.msRequestFullscreen()
        }
        this.setFullscreenData(videoContainer, true)
      }
    },
    // flag 判断是批量还是单个
    confirmOperator(data, flag) {
      this.confirmVisible = true
      // 批量确认还是单个确认
      this.batchConfirmFlag = flag
      // 确认的那条数据
      this.confirmData = data
    },
    handleConfirm() {
      let params
      if (this.batchConfirmFlag) {
        params = {
          warningNos: this.warningNos.join(','),
          handlerMark: ''
        }
      } else {
        params = {
          warningNos: [this.confirmData.warningNo].join(','),
          handlerMark: ''
        }
      }
      handleVehicleWarning(this.urlList.batchConfirmUrl, params)
        .then((res) => {
          this.confirmVisible = false
          this.loading = false
          this.$message.success('已成功确认处理')
          this.clearCheckBox()
          this.getData(this.exportParams)
        })
        .catch((err) => {
          console.log(err)
          // this.$message.error(err.response.data.message)
        })
    },
    checkboxClick(index, item) {
      var myCheckbox = document.querySelectorAll('#checkbox')[index]
      if (this.selectIds.indexOf(item.id) === -1) {
        this.selectIds.push(item.id)
        this.warningNos.push(item.warningNo)
        this.selectIndexArr.push(index)
      } else {
        this.selectIds.splice(this.selectIds.indexOf(item.id), 1)
        this.warningNos.splice(this.warningNos.indexOf(item.warningNo), 1)
        this.selectIndexArr.splice(this.selectIndexArr.indexOf(index), 1)
      }
      this.btnFlag = this.warningNos.length > 0
      if (myCheckbox.className.indexOf('checkbox1') === -1) {
        myCheckbox.classList.add('checkbox1')
        myCheckbox.style.border = 'none'
      } else {
        myCheckbox.classList.remove('checkbox1')
        myCheckbox.style.border = ''
      }
      console.log(this.selectIndexArr)
    },
    getData(params) {
      getTableData(this.urlList.tableDataUrl, params)
        .then((res) => {
          // console.log(res)
          this.loading = false
          this.arr = res.result.records
          this.total = res.result.total
          console.log('num--', this.pageNum)
          if (this.total > 0) {
            console.log(this.total, (this.pageNum - 1) * this.pageSize, this.pageSize * this.pageNum)
            if (this.total <= (this.pageNum - 1) * this.pageSize) {
              this.isEmpty = true
            } else {
              this.isEmpty = false
            }
          } else {
            this.isEmpty = true
          }
          // this.setVideo()
        })
        .catch((e) => {
          this.isEmpty = true
          console.log(e)
        })
    },
    mouseover(index) {
      document.querySelectorAll('.checkboxOut')[index].style.display = 'block'
    },
    mouseleave(index) {
      var myCheckbox = document.querySelectorAll('#checkbox')[index]
      if (myCheckbox.classList.contains('checkbox1')) {
        document.querySelectorAll('.checkboxOut')[index].style.display = 'block'
      } else {
        document.querySelectorAll('.checkboxOut')[index].style.display = 'none'
      }
    },
    onSubmit() {
      console.log('submit!')
    },
    selectchange() {
      console.log('11111', this.value1)
    },
    playbtnclick(index) {
      // 播放对应的视频
      var myVideo = document.querySelectorAll('#video1')[index]
      if (myVideo.paused) {
        myVideo.play()
      } else {
        myVideo.pause()
      }
    },
    handleSizeChange(val) {
      this.clearCheckBox()
      this.loading = true
      this.pageSize = val
      this.pageNum = 1
      this.currentPage = 1
      const params = {
        ...this.exportParams,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      this.exportParams = { ...params }
      this.getData(this.exportParams)
    },
    handleCurrentChange(val) {
      // -----分页即查询 start~~~~
      const copyParams = { ...this.searchForm }
      for (const key in copyParams) {
        this.getFilterParams(copyParams, key)
      }
      if (copyParams['dateRange'] && copyParams['dateRange'].length > 0) {
        copyParams.startTime = copyParams.dateRange[0]
        copyParams.endTime = copyParams.dateRange[1]
      }
      delete copyParams['dateRange']
      this.exportParams = { ...copyParams }
      // ------end~~~ 后期需要删除直接删~~~
      this.clearCheckBox()
      this.loading = true
      this.pageNum = val
      const params = {
        ...this.exportParams,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      this.exportParams = { ...params }
      // console.log('params----', this.exportParams)
      this.getData(this.exportParams)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/common.scss";
::v-deep .el-card__body{
  padding: 16px;
  .el-form-item {
    margin-bottom: 5px !important;
  }
}
.aiSurveillanceVideo {
  width: 100%;
  // padding: 16px;
  background-color: #f5f5f5;
  // border: solid 1px purple;
  .topCard {
    // width: 100%;
    // height: 72px;
    align-items: center;
    margin: 16px;
    .video {
      width: 100%;
      // height: 72px;

      display: flex;
    }
  }
  .videoCard {
    margin: 16px;
    .video_btn {
      width: 100%;
      height: 40px;
      // border: solid 1px red;
      .video_btn_item1 {
        // width: 112px;
        // height: 40px;
        margin-right: 24px;
        border-radius: 4px;
        color: #000000;
        background-color: #ffd572;
        font-size: 16px;
        // border: none;
        // outline: none;
        // cursor: pointer;
        // &:active {
        //   background-color: #b49243;
        // }
      }
      .video_btn_item2 {
        // width: 112px;
        // height: 40px;
        margin-right: 16px;
        border-radius: 4px;
        background-color: #ebe4e4;
        color: #000000;
        font-size: 16px;
        // border: none;
        // outline: none;
        // cursor: pointer;
        // &:active {
        //   background-color: #b49243;
        // }
      }
      .video_btn_item3 {
        // width: 112px;
        // height: 40px;
        margin-right: 16px;
        border-radius: 4px;
        background-color: #ebe4e4;
        color: #000000;
        font-size: 16px;
        // border: none;
        // outline: none;
        // cursor: pointer;
        // &:active {
        //   background-color: #b49243;
        // }
      }
    }
    .videobox {
      .videoItem {
        // margin-top: 10px;
        // width: 100%;
        // height: 285px;
        .scaleBox {
          width: 100%;
          height: 20%;
          // margin-top: -10%;
          z-index: 2;
          visibility: hidden;
          display: flex;
          flex-direction: row-reverse;
          .scale {
            width: 10%;
            height: 100%;
            // border: solid 1px red;
            // background-image: url("../../../assets/4.png");
            background-size: 100%;
            background-repeat: no-repeat;
          }
        }
        .videobox1 {
          width: 100%;
          position: relative;
          .videoBox {
            position: relative;
          }
          .tag{
            position: absolute;
            right:16px;
            top: 16px;
          }
          // border: solid 1px red;
          .checkboxOut {
            display: none;
            width: 36px;
            height: 36px;
            // border: solid 2px #ffffff;
            background: rgba(0, 0, 0, 0.2);
            // opacity: 0.1;
            position: absolute;
            top: 0px;
            right: 0px;
            z-index: 1;
            .checkbox {
              width: 15px;
              height: 15px;
              border: solid 2px #ffffff;
              // opacity: 1 !important;
              box-sizing: border-box;
              position: absolute;
              top: 0px;
              right: 0px;
              bottom: 0;
              left: 0;
              margin: auto;
              z-index: 1;
            }
            .checkbox1 {
              // width: 36px;
              // height: 36px;
              // border: solid 1px #ffffff;
              position: absolute;
              top: 0px;
              right: 0px;
              bottom: 0;
              left: 0;
              margin: auto;
              z-index: 1;
              background-size: cover;
            }
          }

          .video1 {
            // z-index: -1;
            width: 100%;
            height: 285px;
            object-fit: fill;
            &::-webkit-media-controls-volume-control-container {
              display: none !important;
            }
          }
          .video1Dialog {
            width: 100%;
            height: 300px;
          }

          .amplification {
            width: 36px;
            height: 36px;
            // border: solid 2px #ffffff;
            // opacity: 1 !important;
            box-sizing: border-box;
            position: absolute;
            bottom:4px;
            right: 0px;
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
          // }
        }
        .spanbox {
          position: relative;
          height: 156px;
          padding: 18px 16px 16px 16px;
          color:#333;
          .spanbox_item1 {
            display: flex;
            justify-content: space-between;
            .spanstyle1 {
              display: block;
              font-size: 20px;
              font-weight: bold;
            }
            .spanstyle8 {
              display: block;
              font-size: 20px;
              font-weight: 400;
            }
          }
          .spanbox_item2 {
            word-wrap: break-word;
            word-break: break-all;
            margin-top: 20px;
            font-size: 16px;
            font-weight: 400;
            .left {
              width: 100%;
              // border: 1px solid #000000;
              .span_s {
                margin: 0 5px;
              }
            }
            // .right {
            //   width: 100%;
            //   text-align: right;
            //   // border: 1px solid #000000;
            //   .span_s {
            //     margin: 0 5px;
            //   }
            //   .spanstyle6 {
            //     font-size: 16px;
            //     font-weight: bold;
            //     // margin-left: 10px;
            //   }
            //   .spanstyle7 {
            //     font-size: 16px;
            //     margin-right: 10px;
            //   }
            // }
          }
          .spanbox_item3 {
            position: absolute;
            right:16px;
            bottom: 16px;
            height: 60px;
            line-height: 60px;
            .buttonstyle1 {
              // width: 80px;
              height: 40px;
              background-color: #ffd572;
              color: #000000;
              font-size: 16px;
              margin-right: 16px;
              border-radius: 4px;
              // border: none;
            }
            .buttonstyle2 {
              // width: 112px;
              height: 40px;
              margin-right: 16px;
              font-size: 16px;
              border-radius: 4px;
              // border: none;
            }
          }
        }
      }

      .oneVideo {
        position: absolute;
        z-index: 8;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        // border:solid 1px purple;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        .scaleBox {
          width: 100%;
          height: 5%;
          margin-top: -5%;
          z-index: 9;
          visibility: hidden;
          display: flex;
          flex-direction: row-reverse;
          // border: solid 1px red;
          .box4 {
            width: 100px;
            height: 100px;
            // border: solid 1px red;
            // background-image: url("../../../assets/3.png");
            background-size: 100%;
            background-repeat: no-repeat;
          }
        }
        .videobox1 {
          width: 100%;
          height: 95%;
          // border:solid 1px blue;
        }
      }
    }
    .video_time {
      position: absolute;
      top: 7px;
      left: 50%;
      transform: translateX(-50%);
      color: white;
    }
  }
}
::v-deep .pagination {
  display: flex;
  margin-top: 40px;
  .el-pager {
    .active {
      color: white !important;
      background: #22a575 !important;
    }
  }
}
</style>
