<template>
  <div>
    <div class="timer-wrapper" ref="timerWrapper">
      <div v-if="hint.length !== 0 && deviceState !== 1">
        <span>{{'数据加载中'}}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 50 50" class="svg-wrapper" xml:space="preserve" version="1.1">
          <path
            :style="{
              fill: timerColor.timerFont
            }
            "
            d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
            transform="rotate(275.098 25 25)">
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="0.6s"
              repeatCount="indefinite">
            </animateTransform>
          </path>
        </svg>
      </div>
      <span v-else-if="deviceState !== 1">{{ `下次数据更新 ${timeCounter} min` }}</span>
    </div>
    <div ref="svg_wrapper" :class="deviceState !== 1 ? '' : 'bar-without-time'">
      <svg width="100%" height="4" preserveAspectRatio="xMinYMin meet" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <line x1="1%" y1="2" x2="99%" y2="2" stroke="grey" stroke-width="4" stroke-linecap="round" ref="lineBack"></line>
        <line
          ref="lineFont"
          stroke="#22a575"
          stroke-width="4"
          stroke-linecap="round"
          x1="1%" y1="2" x2="99%" y2="2"
          :stroke-dasharray="strokeArray"
          :stroke-dashoffset="strokeDashoffset"
        ></line>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimerBar',
  props: {
    total: {
      type: Number,
      default: 0
    },
    createTime: {
      type: String,
      default: ''
    },
    updateTimes: {
      type: Number,
      default: 0
    },
    timerColor: {
      type: Object,
      default: () => {}
    },
    deviceState: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      strokeArray: 0,
      strokeDashoffset: 0,
      timeCounter: 30,
      leftTimeStamp: 0,
      timer: null,
      hint: ''
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.timerWrapper && (this.$refs.timerWrapper.style.color = this.timerColor.timerFont)
      this.$refs.lineBack && (this.$refs.lineBack.style.stroke = this.timerColor.timerBack)
      this.$refs.lineFont && (this.$refs.lineFont.style.stroke = this.timerColor.timerFont)
      this.initTimerBar()
    })
  },
  watch: {
    updateTimes(val) {
      this.$nextTick(() => {
        this.timer && clearInterval(this.timer)
        this.initTimerBar()
      })
    }
  },
  methods: {
    initTimerBar() {
      this.$nextTick(() => {
        if (this.$refs.lineBack) {
          this.strokeArray = this.$refs.lineBack.getTotalLength()
          this.strokeDashoffset = this.strokeArray
          const currentDate = new Date()
          this.leftTimeStamp = this.total * 60 - ((Date.parse(currentDate) - Date.parse(this.createTime)) / 1000)
          if (this.leftTimeStamp <= 0) {
            this.strokeDashoffset = 0
            this.hint = '数据加载中...'
            return
          }
          this.hint = ''
          this.timeCounter = (this.leftTimeStamp / 60) >> 0 // 去掉小数
          if (this.leftTimeStamp % 60 !== 0) this.timeCounter += 1
          this.strokeDashoffset = (this.leftTimeStamp / (this.total * 60)) * this.strokeArray
          this.timer = setInterval(() => {
            this.leftTimeStamp--
            if (this.leftTimeStamp <= 0) {
              this.strokeDashoffset = 0
              this.hint = '数据加载中...'
              clearInterval(this.timer)
            } else {
              this.strokeDashoffset = (this.leftTimeStamp / (this.total * 60)) * this.strokeArray
              this.leftTimeStamp % 60 === 0 && this.timeCounter--
            }
          }, 1000)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .timer-wrapper {
    float: right;
    font-size: 12px;
    padding-right: 5%;
    .svg-wrapper {
      enable-background:new 0 0 50 50;
      margin-bottom: -5px;
      margin-left: 5px;
      margin-top: -6px;
    }
  }
  .bar-without-time {
    padding-top: 15px;
  }
</style>
