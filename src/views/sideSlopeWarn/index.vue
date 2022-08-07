<template>
  <div>
    <!--    边坡报警信息-->
    <el-card
      v-loading="loading"
      class="box-card"
    >
      <el-row
        class="noise-box"
        :gutter="16"
      >
        <el-col
          v-for="(item, index) in dustData"
          :key="index"
          :lg="8"
          :xl="6"
        >
          <div
            :class="
              item.degree !== 'C0'
                ? item.deviceState === 1
                  ? 'equipmentOne equipmentOne-grey'
                  : 'equipmentOne equipmentOne-red'
                : item.deviceState === 1
                  ? 'equipmentOne equipmentOne-grey'
                  : 'equipmentOne equipmentOne-normal'
            "
            class="equipmentOne"
            @click="
              jumpToNoise(
                item.equipmentId,
                item.pointName,
                item.degree,
                item.message
              )
            "
          >
            <div
              :class="
                item.degree !== 'C0'
                  ? item.deviceState === 1
                    ? 'noise-box-content noise-box-content_black'
                    : 'noise-box-content noise-box-content_red'
                  : item.deviceState === 1
                    ? 'noise-box-content noise-box-content_grey_black back-color'
                    : 'noise-box-content'
              "
            >
              <div class="noise-box-title">
                <el-row :gutter="4">
                  <div
                    :class="
                      item.degree !== 'C0'
                        ? 'noise-box-title-box noise-box-title-box-info'
                        : 'noise-box-title-box'
                    "
                  >
                    <el-col
                      style="flex: 1"
                      :span="16"
                    >
                      <div class="noise-box-name">{{ item.pointName }}</div>
                      <div class="noise-box-name2">{{ item.equipmentId }}</div>
                    </el-col>
                    <el-col :span="8">
                      <div v-if="item.deviceState === 1">
                        <div class="noise-icon icon-black">
                          <div>{{ item.degree }}</div>
                        </div>
                      </div>
                      <div v-else>
                        <div
                          v-if="item.degree === 'C0'"
                          class="noise-icon"
                        >
                          <div>{{ item.degree }}</div>
                        </div>
                        <div
                          v-if="item.degree === 'C1'"
                          class="noise-icon icon-blue"
                        >
                          <div>{{ item.degree }}</div>
                        </div>
                        <div
                          v-if="item.degree === 'C2'"
                          class="noise-icon icon-orange"
                        >
                          <div>{{ item.degree }}</div>
                        </div>
                        <div
                          v-if="item.degree === 'C3'"
                          class="noise-icon icon-orange-deep"
                        >
                          <div>{{ item.degree }}</div>
                        </div>
                        <div
                          v-if="item.degree === 'C4'"
                          class="noise-icon icon-red"
                        >
                          <div>{{ item.degree }}</div>
                        </div>
                        <div
                          v-if="!item.degree"
                          class="loading-info"
                        >
                          <div class="load-container load8">
                            <div class="loader">Loading...</div>
                          </div>
                          <div class="loading-min">5min</div>
                        </div>
                      </div>
                    </el-col>
                  </div>
                </el-row>
              </div>
              <div
                :class="
                  item.degree !== 'C0'
                    ? item.deviceState === 1
                      ? 'noise-content-wrapper-broken'
                      : 'noise-content-wrapper-abnormal'
                    : 'noise-content-wrapper-normal'
                "
              >
                <div class="noise-box-content-flex">
                  <div class="noise-box-content-data">
                    <div class="noise-box-content-dataOne">
                      X水平(m)
                    </div>
                    <div class="noise-box-content-dataThree">
                      {{ item.horizontalX }}
                    </div>
                    <div class="noise-box-content-dataTow">
                      {{ item.relativeHorizontalX }}
                    </div>
                  </div>
                  <div class="noise-box-content-data">
                    <div class="noise-box-content-dataOne">
                      Y水平(m)
                    </div>
                    <div class="noise-box-content-dataThree">
                      {{ item.horizontalY }}
                    </div>
                    <div class="noise-box-content-dataTow">
                      {{ item.relativeHorizontalY }}
                    </div>
                  </div>
                  <div class="noise-box-content-data">
                    <div class="noise-box-content-dataOne">
                      高程(m)
                    </div>
                    <div class="noise-box-content-dataThree">
                      {{ item.altitude }}
                    </div>
                    <div class="noise-box-content-dataTow">
                      {{ item.relativeAltitude }}
                    </div>
                  </div>
                </div>
                <div class="time-counter">
                  <timer-bar
                    style="margin-top: 5px"
                    :total="item.type === 0 ? 30 : 10"
                    :createTime="dustData[index].createTime"
                    :update-times="updateTimes"
                    :device-state="item.deviceState"
                    :timer-color="
                      item.deviceState === 1
                        ? timerColorBroken
                        : item.degree !== 'C0'
                          ? timerColorAlert
                          : timerColor
                    "
                  ></timer-bar>
                </div>
              </div>
            </div>
            <div
              v-if="item.message > 0 && !(item.deviceState === 1)"
              class="center_box"
            >
              <div class="center_error">
                <span
                  v-if="item.message >= 9"
                  class="span_info"
                >...</span>
                <span v-else>{{ item.message }}</span>
              </div>
            </div>
            <div
              :class="[
                item.deviceState === 1
                  ? 'noise-box-bottom-top noise-box-bottom noise-box-bottom-black'
                  : 'noise-box-bottom-top noise-box-bottom',
                item.degree !== 'C0'
                  ? 'noise-box-bottom-top-abnormal'
                  : item.deviceState === 1
                    ? 'noise-box-bottom-top-abnormal'
                    : 'noise-box-bottom-top-normal'
              ]"
            >
              <div class="noise-box-bottom-flex">
                <div
                  :class="
                    item.degree !== 'C0'
                      ? 'noise-bottom-point noise-bottom-point-info'
                      : 'noise-bottom-point'
                  "
                />
                <span>上次更新时间</span>
              </div>

              <div class="noise-bottom-time">
                <el-tooltip
                  effect="dark"
                  :content="'上次设备数据采集时间: ' + item.monitoringTime"
                  placement="top">
                  <div>{{item.createTime}}</div>
                </el-tooltip>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { slopeMonitorAlarmInfo } from '@/api/api'
import websocketType from '@/constants/websocket'
import TimerBar from '@/components/TimerBar'
import { mapState } from 'vuex'
export default {
  name: 'SideSlopeWarn',
  components: {
    TimerBar
  },
  props: {},
  data() {
    return {
      dustData: [],
      optionsEquipment: [],
      optionsPoint: [],
      loading: true,
      isShow: false,
      total: 30,
      updateTimes: 0,
      firstTime: true,
      timerColor: {
        timerBack: 'rgb(101, 101, 101)',
        timerFont: '#22a575'
      },
      timerColorAlert: {
        timerBack: '#E3E2E2',
        timerFont: '#D83432'
      },
      timerColorBroken: {
        timerBack: 'rgb(101, 101, 101)',
        timerFont: 'rgb(101, 101, 101)'
      }
    }
  },
  computed: {
    ...mapState({
      websocketData: state => state.websocket.websocketData
    })
  },
  watch: {
    websocketData(newVal, oldVal) {
      if (newVal.type === websocketType['history']) {
        this.monitorAlarmInfo()
      }
    }
  },
  mounted() {
    this.monitorAlarmInfo()
  },
  methods: {
    formatTime(time) {
      if (time) {
        return time.split('-')[0] + '.' + time.split('-')[1] + '.' + time.split('-')[2]
      }
      return null
    },
    monitorAlarmInfo() {
      slopeMonitorAlarmInfo()
        .then(res => {
          if (res.status === 200) {
            if (res.data.data.slopeList.length > 0) {
              this.dustData = res.data.data.slopeList
            }
            this.loading = false
          } else {
            this.loading = false
            this.$message.error(res.data.msg || '请求失败！')
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error(err.msg || '请求失败！')
        })
        .finally(() => {
          if (this.firstTime) {
            this.firstTime = false
            return
          }
          this.updateTimes++
        })
    },
    jumpToNoise(id, name, degree, message) {
      const status = '1'
      if (message > 0) {
        this.$router.push({
          name: 'SideReality',
          query: {
            id,
            name,
            status
          }
        })
      } else {
        this.$router.push({
          name: 'SideReality',
          query: {
            id,
            name
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./src/styles/card.scss";
@import "./src/styles/loading.scss";
::v-deep .el-card__body {
  padding: 16px;
}
.box-card-top {
  margin: 16px;
  height: 72px;
}
.box-card {
  margin: 16px;
  .equipmentOne {
    height: 262px;
    .noise-icon {
      margin-left: 15%;
      width: 4rem !important;
      height: 4rem !important;
      div {
        color: #ffffff;
        font-weight: 700;
        font-size: 1.6rem;
      }
    }
    .icon-blue {
      background-color: #4080ff !important;
    }
    .icon-orange {
      background-color: #e6a23c !important;
    }
    .icon-orange-deep {
      background-color: #ff7d00 !important;
    }
    .icon-red {
      background-color: #f53f3f !important;
    }
    .noise-box-content_red,
    .noise-box-content_black,
    .noise-box-content_grey_black {
      height: 215px !important;
    }
    .back-color {
      background-color: #fff;
    }
    .noise-content-wrapper-normal {
      background-color: rgb(249, 250, 249);
    }
    .noise-content-wrapper-abnormal {
      background: linear-gradient(#FE8980, #FE6F6D);
    }
    .noise-content-wrapper-broken {
      background-color: #B2B2B2;
    }
    .time-counter {
      width: 100%;
      height: 30px;
      position: relative;
      .time-viewer {
        font-size: 12px;
        position: absolute;
        right: 28px;
        bottom: 13px;
      }
      .time-viewer-normal {
        color: #22a575;
      }
      .time-viewer-abnormal {
        color: #B11D1D;
      }
      .left-time-bar {
        width: 100%;
        height: 12px;
        position: absolute;
        bottom: 0;
        line {
          stroke-width: 6px;
          stroke-linecap: round;
        }
        .line-background-black {
          stroke: rgb(101, 101, 101);
        }
        .line-background-grey {
          stroke: #E3E2E2;
        }
        .line-bar-normal {
          stroke: #22a575;
        }
        .line-bar-abnormal {
          stroke: #D83432;
        }
      }
    }
    .noise-box-content {
      height: 210px;
      .noise-box-content-data {
        width: 25% !important;
        .noise-box-content-dataTow {
          font-size: 1.6rem !important;
        }
      }
    }
    .noise-box-bottom-top-normal {
      margin-top: 10px;
    }
    .noise-box-bottom-top-abnormal {
      margin-top: 15px;
    }
    .loading-info {
      display: flex;
      .loading-min {
        position: absolute;
        line-height: 3.6em;
        margin-left: 0.8em;
      }
    }
  }
}
</style>
