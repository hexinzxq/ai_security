<template>
  <div class="env-machine-wrapper"
       @mouseenter="handleEnterBorder(item)"
       @mouseleave="handleLeaveBorder"
       ref="envObj"
  >
    <div class="header">
      <span class="header-title machine-area">{{ item.name }}</span>
      <span class="header-title machine-name">{{ item.id }}</span>
      <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" class="circle">
        <circle class="circle-background" r="20" cx="20" cy="20" fill="#F2F4F6"/>
        <circle
          :class="
            item.deviceState === 1
              ? 'circle-core-broken'
              : 'circle-core'"
          r="10" cx="20" cy="20"
        />
      </svg>
      <el-divider></el-divider>
    </div>
    <div class="content">
      <div class="last-update">{{'上一次更新  ' + item.time}}</div>
      <div class="card-data-wrapper">
        <env-machine-card
          type="PM2.5"
          click-type="dust"
          :item="item"
          :item-data="item.pm1"
          :message="item.pmOneMessage"
          :progress="item.pm1Progress"
          :is-polluted="item.pmOnePolluted"
          :jump-status="item.pmOneMessage || item.pmTwoMessage || item.tspMessage"
          @change-border-color="handleChangeColor"
        ></env-machine-card>
        <env-machine-card
          type="PM10"
          click-type="dust"
          :item="item"
          :item-data="item.pm2"
          :message="item.pmTwoMessage"
          :progress="item.pm2Progress"
          :is-polluted="item.pmTwoPolluted"
          :jump-status="item.pmOneMessage || item.pmTwoMessage || item.tspMessage"
          @change-border-color="handleChangeColor"
        ></env-machine-card>
        <env-machine-card
          type="tsp"
          click-type="dust"
          :item="item"
          :item-data="item.tsp"
          :message="item.tspMessage"
          :progress="item.tspProgress"
          :is-polluted="item.tspPolluted"
          :jump-status="item.pmOneMessage || item.pmTwoMessage || item.tspMessage"
          @change-border-color="handleChangeColor"
        ></env-machine-card>
        <env-machine-card
          type="噪声"
          click-type="noise"
          :item="item"
          :item-data="item.volume"
          :message="item.volumeMessage"
          :progress="item.volumeProgress"
          :is-polluted="item.volumePolluted"
          :jump-status="item.volumeMessage"
          @change-border-color="handleChangeColor"
        ></env-machine-card>
      </div>
    </div>
    <div class="footer">
      <div
        class="next-update"
        :class="
          item.deviceState === 1
            ? 'next-update-broken'
            : 'next-update'"
      >
        <timer-bar
          v-if="item.deviceState !== 1"
          :total="total"
          :create-time="item.time"
          :update-times="updateTimes"
          :timer-color="timerColor"
          class="timer-bar"
        ></timer-bar>
        <span v-else class="broken-text">下次数据更新 3min</span>
      </div>
    </div>
  </div>
</template>

<script>
import TimerBar from '@/components/TimerBar'
import EnvMachineCard from '@/components/EnvMachineCard'
export default {
  name: 'EnvMachineData',
  components: {
    TimerBar,
    EnvMachineCard
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    envMachineData: {
      type: Array,
      default: () => []
    },
    updateTimes: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      timerColor: {
        timerBack: '#ffffff',
        timerFont: '#69DF98'
      },
      total: 3
    }
  },
  methods: {
    handleChangeColor(color) {
      this.$refs.envObj && (this.$refs.envObj.style.borderColor = color)
    },
    handleEnterBorder(item) {
      if (item.deviceState === 1) {
        this.$refs.envObj && (this.$refs.envObj.style.borderColor = '#CECECE')
      } else if (item.status === 1 || item.volumePolluted === 1) {
        this.$refs.envObj && (this.$refs.envObj.style.borderColor = '#E40000')
      } else {
        this.$refs.envObj && (this.$refs.envObj.style.borderColor = '#69DF98')
      }
    },
    handleLeaveBorder() {
      this.$refs.envObj && (this.$refs.envObj.style.borderColor = '#f5f5f5')
    }
  }
}
</script>

<style scoped lang="scss">
@import "./src/styles/card.scss";
@import "./src/styles/loading.scss";
.env-machine-wrapper {
  width: 100%;
  cursor: pointer;
  position: relative;
  background: #ffffff;
  border: 1px solid #f5f5f5;
  box-sizing: border-box;
  box-shadow: 0px 4px 16px 0px rgba(167, 175, 183, 0.33);
  border-radius: 5px;
  margin-top: 16px;
  padding: 0 1.5%;
  .header {
    width: 100%;
    height: 24.6%;
    position: relative;
    .header-title {
      display: inline-block;
      height: 100%;
      line-height: 56px;
    }
    .machine-area {
      font-size: 20px;
      margin-right: 3%;
    }
    .machine-name {
      font-size: 14px;
    }
    .circle {
      position: absolute;
      right: -5px;
      top: 6px;
    }
    .circle-background {
      fill: #F2F4F6;
    }
    .circle-core {
      fill: #6CCFBB;
    }
    .circle-core-broken {
      fill: #A6A6A6
    }
    ::v-deep .el-divider--horizontal {
      margin: -8px 0 0 0;
      width: 93%;
    }
  }
  .content {
    height: 145px;
    padding-top: 7px;
    .last-update {
      font-size: 14px;
      color: #98A9BC;
    }
    .card-data-wrapper {
      margin-top: 16px;
      display: flex;
    }
  }
  .footer {
    margin-top: 1px;
    width: 110%;
    margin-left: -5%;
    height: 26px;
    font-size: 12px;
    .timer-bar {
      margin-top: -1px;
    }
    .broken-text {
      float: right;
      margin-right: 5%;
    }
    .next-update {
      color: #22a575;
    }
    .next-update-broken {
      color: #000;
    }
  }
}
</style>
