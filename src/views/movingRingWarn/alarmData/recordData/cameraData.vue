<template>
  <div
    class="camera-wrapper"
    ref="cameraObj"
    @mouseenter="handleEnterBorder(item)"
    @mouseleave="handleLeaveBorder"
    @click="jumpToPage(item.id, item.name, item.status, item.number, $event)"
  >
    <div class="left">
      <div class="position">{{ item.name }}</div>
      <div class="device">{{ item.id }}</div>
      <div
        v-if="item.number > 0"
        :class="
          !cameraEquipmentPoint[index].flv
            ? 'alert-times alert-times-grey'
            : 'alert-times'
        "
      >
        <span
          v-if="item.number > 99"
        >...</span>
        <span v-else>{{ item.number }}</span>
      </div>
      <el-divider></el-divider>
      <div class="last-update">
        <div>上一次更新</div>
        <div class="last-time">{{ item.time }}</div>
      </div>
    </div>
    <div class="right">
      <div
        v-if="cameraEquipmentPoint[index].stream === 0"
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
        </video>
      </div>
      <div
        v-else
        class="error-hint"
      >
        <span>请推送视频流</span>
      </div>
    </div>
  </div>
</template>

<script>
import flvjs from 'flv.js/src' // 引入转flv格式插件
import { mapGetters } from 'vuex'
export default {
  name: 'CameraData',
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.item && this.setVideo()
    })
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight
        that.screenHeight = window.screenHeight
      })()
    }
  },
  computed: {
    ...mapGetters(['cameraEquipmentPoint'])
  },
  watch: {
    item(val) {
      this.$nextTick(() => {
        this.setVideo()
      })
    }
  },
  methods: {
    handleEnterBorder(item) {
      if (!this.cameraEquipmentPoint[this.index].flv) {
        this.$refs.cameraObj && (this.$refs.cameraObj.style.borderColor = '#D6D6D6')
      } else {
        this.$refs.cameraObj && (this.$refs.cameraObj.style.borderColor = '#69DF98')
      }
    },
    handleLeaveBorder() {
      this.$refs.cameraObj && (this.$refs.cameraObj.style.borderColor = '#f5f5f5')
    },
    jumpToPage(id, name, status, message, event) {
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
    },
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
        if (this.cameraEquipmentPoint[this.index].stream === 0 && this.cameraEquipmentPoint[this.index].flv) {
          const video = document.querySelectorAll('.video')
          Object.keys(this.item).forEach(o => {
            const videoElement = video[0]
            const url = this.cameraEquipmentPoint[this.index].flv
            videoElement && url && this.createPlayer(videoElement, url)
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .camera-wrapper {
    width: 100%;
    display: flex;
    cursor: pointer;
    position: relative;
    background: #ffffff;
    border: 1px solid #f5f5f5;
    box-sizing: border-box;
    box-shadow: 0px 4px 16px 0px rgba(167, 175, 183, 0.33);
    border-radius: 5px;
    margin-top: 16px;
    padding: 20px 1.2%;
    .left {
      flex: 1;
      .position {
        margin: 0 0 10px;
        font-size: 18px;
      }
      .device {
        margin: 0 0 10px;
        font-size: 14px;
      }
      .alert-times {
        width: 20px;
        height: 20px;
        color: #fff;
        font-size: 16px;
        text-align: center;
        border-radius: 2px;
        background-color: #FF4E4E;
      }
      .alert-times-grey {
        background-color: #A5A5A5;
      }
      ::v-deep .el-divider--horizontal {
        margin-top: 75px;
        flex: 1;
      }
      .last-update {
        position: absolute;
        bottom: 18px;
        font-size: 12px;
        color: #98A9BC;
        white-space: nowrap;
      }
    }
    .right {
      flex: 2;
      .video {
        width: 100%;
        height: 185px;
        -o-object-fit: fill;
        object-fit: fill;
        border-radius: 4px;
      }
      .error-hint {
        width: 100%;
        height: 100%;
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
    }
  }
</style>
