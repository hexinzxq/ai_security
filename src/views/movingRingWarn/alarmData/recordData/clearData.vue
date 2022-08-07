<template>
  <div class="box-card-info">
    <el-row
      class="noise-box"
      :gutter="15"
    >
      <el-col
        v-for="(item, index) in cleardata"
        :key="index"
        :span="ratioNum"
      >
        <div
          :class="
            item.status === 1
              ? isShow
                ? 'equipmentOne equipmentOne-grey'
                : 'equipmentOne equipmentOne-red'
              : isShow
                ? 'equipmentOne equipmentOne-grey'
                : 'equipmentOne equipmentOne-normal'
          "
          @click="jumpToNoise(item.id, item.name, item.status, item.number)"
        >
          <div
            :class="
              item.status === 1
                ? isShow
                  ? 'noise-box-content noise-box-content_black'
                  : 'noise-box-content noise-box-content_red'
                : isShow
                  ? 'noise-box-content noise-box-content_grey_black'
                  : 'noise-box-content'
            "
          >
            <div class="noise-box-title">
              <el-row :gutter="4">
                <div
                  :class="
                    item.status === 1
                      ? 'noise-box-title-box noise-box-title-box-info'
                      : 'noise-box-title-box'
                  "
                >
                  <el-col
                    style="flex: 1"
                    :span="16"
                  >
                    <div class="noise-box-name">{{ item.id }}</div>
                    <div class="noise-box-name2">{{ item.name }}</div>
                  </el-col>
                  <el-col :span="8">
                    <div v-if="isShow">
                      <div class="noise-icon icon-black">
                        <img
                          src="../../alarmData/img/icon_car.png"
                          alt=""
                        >
                      </div>
                    </div>
                    <div v-else>
                      <div
                        v-if="!item.status && item.status !== 0"
                        class="loading-info"
                      >
                        <div class="load-container load8">
                          <div class="loader">Loading...</div>
                        </div>
                        <div class="loading-min">5min</div>
                      </div>
                      <div
                        v-else
                        :class="
                          item.status === 1
                            ? 'noise-icon noise-icon-error'
                            : 'noise-icon'
                        "
                      >
                        <img
                          src="../../alarmData/img/icon_car.png"
                          alt=""
                        >
                      </div>
                    </div>
                  </el-col>
                </div>
              </el-row>
            </div>
            <div class="noise-box-content-flex">
              <div
                v-if="state"
                style="width: 100%"
              >
                <video
                  class="video"
                  muted
                  preload="auto"
                  autoplay
                  controls
                  width="100%"
                  height="100%"
                >
                  <!--                  <source src="@/assets/common/test.mp4" type="video/mp4">-->
                </video>
              </div>
              <div
                v-if="!state"
                class="error-hint"
              >
                <span>信号中断或者机器发生故障</span>
              </div>
            </div>
          </div>
          <div
            v-if="item.number > 0 && !isShow"
            class="center_box"
          >
            <div class="center_error">
              <span
                v-if="item.number > 99"
                class="span_info"
              >...</span>
              <span v-else>{{ item.number }}</span>
            </div>
          </div>
          <div
            :class="
              isShow
                ? 'noise-box-bottom noise-box-bottom-black'
                : 'noise-box-bottom'
            "
          >
            <div class="noise-box-bottom-flex">
              <div
                :class="
                  item.status === 1
                    ? 'noise-bottom-point noise-bottom-point-info'
                    : 'noise-bottom-point'
                "
              />
              <span>上次更新时间</span>
            </div>
            <div class="noise-bottom-time">{{ item.time }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import flvjs from 'flv.js/src' // 引入转flv格式插件
export default {
  name: 'DustData',
  props: {
    cleardata: {
      type: Array,
      default: () => {
        return []
      }
    },
    ratioNum: {
      type: Number,
      default: 24
    }
  },
  data() {
    return {
      isShow: false,
      playerArr: [],
      state: true,
      screenHeight: document.body.clientHeight
    }
  },
  watch: {
    cleardata(val) {
      this.$nextTick(() => {
        this.setVideo()
      })
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.cleardata.length > 0 && this.setVideo()
    })
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight
        that.screenHeight = window.screenHeight
      })()
    }
  },
  beforeDestroy() {
    this.playerArr.forEach(item => {
      item.close()
      item = null
    })
  },
  methods: {
    // flv格式
    createPlayer(videoElement, url) {
      // 配置播放器的属性
      if (flvjs.isSupported()) {
        const player = flvjs.createPlayer({
          type: 'flv',
          isLive: true,
          url: url,
          hasAudio: false
        })
        player.attachMediaElement(videoElement)
        player.load()
        const playPromise = player.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              player.play()
            })
            .catch(() => {})
        }
      }
    },
    setVideo() {
      this.$nextTick(() => {
        const video = document.querySelectorAll('.video')
        this.cleardata.forEach((item, index) => {
          Object.keys(item).forEach(o => {
            const videoElement = video[index]
            const url = process.env.VUE_APP_FLV_URL
            videoElement && url && this.createPlayer(videoElement, url)
          })
        })
      })
    },
    noiseRouter() {
      this.$router.push('/env/noise')
    },
    jumpToNoise(id, name, status, message) {
      if (message > 0) {
        status = '1'
        this.$router.push({
          name: 'EnvPollution',
          query: {
            id,
            name,
            status
          }
        })
      } else {
        this.$router.push({
          name: 'EnvPollution',
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
.noise-box-content-flex {
  height: 130px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  .video {
    width: 100%;
    height: 128px;
    -o-object-fit: fill;
    object-fit: fill;
    border-radius: 4px;
  }
}
.loading-info {
  display: flex;
  .loading-min {
    position: absolute;
    line-height: 3.6em;
    margin-left: 0.8em;
  }
}
.error-hint {
  width: 100%;
  background-color: #515151;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
//音量按钮
video::-webkit-media-controls-mute-button {
  display: none;
}
video::-webkit-media-controls-toggle-closed-captions-button {
  display: none;
}
//音量的控制条
video::-webkit-media-controls-volume-slider {
  display: none;
}
//播放按钮
video::-webkit-media-controls-play-button {
  display: none;
}
//进度条
video::-webkit-media-controls-timeline {
  display: none;
}
//观看的当前时间
video::-webkit-media-controls-current-time-display{
  display: none;
}
//剩余时间
video::-webkit-media-controls-time-remaining-display {
  display: none;
}
</style>
