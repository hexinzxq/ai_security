<template>
  <el-card
    :class="
      isPolluted === 1
        ? item.deviceState === 1
          ? 'el-card-broken'
          : 'el-card-alert'
        : item.deviceState === 1
          ? 'el-card-broken'
          : ''
    "
    @click.native="jumpToPage(item.id, item.name, item.status, item.number, clickType)"
    @mouseenter.native="handleEnterCard(item.deviceState, isPolluted, $event)"
    @mouseleave.native="handleLeaveCard(item.deviceState, isPolluted, $event)"
  >
    <div
      class="data-modal"
    ></div>
    <img
      :src="
        clickType === 'dust'
          ? require('@/assets/nav_header_images/city.png')
          : require('@/assets/nav_header_images/city.png')
      "
      class="type-image"
    >
    <div class="alert-times" v-if="message > 0">
      <span
        v-if="message > 99"
        class="alert-times-ellipse"
      >...</span>
      <span v-else>{{message}}</span>
    </div>
    <div class="type">{{type}}</div>
    <div class="data-wrapper">
      <span class="type-data">{{itemData}}</span>
      <span class="type-unit" v-if="clickType === 'dust'">
        <span>um/m</span>
        <sup>3</sup>
      </span>
      <span v-else class="type-unit">db</span>
    </div>
    <el-slider :value="progress"/>
  </el-card>
</template>

<script>
export default {
  name: 'EnvMachineCard',
  props: {
    isPolluted: {
      type: Number,
      default: 0
    },
    item: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: ''
    },
    clickType: {
      type: String,
      default: ''
    },
    message: {
      type: Number,
      default: 0
    },
    itemData: {
      type: Number,
      default: 0
    },
    progress: {
      type: Number,
      default: 0
    },
    backgroundImage: {
      type: String,
      default: ''
    },
    jumpStatus: {
      type: Number,
      default: 0
    }
  },
  methods: {
    // 跳转页面
    jumpToPage(id, name, status, message, type) {
      console.log('hihi');
      console.log(this.jumpStatus);
      if (this.jumpStatus > 0) {
        status = '1'
        this.$router.push({
          name: type === 'dust' ? 'EnvNoise' : 'EnvMeteorological',
          query: {
            id,
            name,
            status
          }
        })
      } else {
        this.$router.push({
          name: type === 'dust' ? 'EnvNoise' : 'EnvMeteorological',
          query: {
            id,
            name
          }
        })
      }
    },
    // 鼠标进入卡片样式
    handleEnterCard(state, type, e) {
      if (state === 1) {
        e.target.style.border = '1px solid #CECECE'
      } else if (type === 1) {
        e.target.style.border = '1px solid #E40000'
        e.target.childNodes[1].childNodes[0].style.backgroundColor = '#FF5D5D'
      } else {
        e.target.style.border = '1px solid #69DF98'
      }
      this.$emit('change-border-color', '#f5f5f5')
    },
    // 鼠标离开卡片样式
    handleLeaveCard(state, type, e) {
      e.target.style.border = null
      if (state === 1) {
        this.$emit('change-border-color', '#CECECE')
      } else if (type === 1) {
        this.$emit('change-border-color', '#E40000')
        e.target.childNodes[1].childNodes[0].style.backgroundColor = '#F54138'
      } else {
        this.$emit('change-border-color', '#69DF98')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .el-card {
    width: 24.5%;
    height: 90px;
    margin-right: 1%;
    position: relative;
    .type-image {
      width: 45px;
      height: 45px;
      position: absolute;
      right: 7px;
      top: 25px;
    }
    .alert-times {
      width: 16px;
      height: 16px;
      color: #fff;
      font-size: 14px;
      text-align: center;
      border-radius: 2px;
      position: absolute;
      top: 3px;
      right: 5px;
      background-color: #FF4E4E;
      .alert-times-ellipse {
        position: relative;
        top: -3px;
      }
    }
    .alert-times-broken {
      background-color: #CECECE;
    }
    .alert-times-alert{
      background-color: #FF5D5D;
    }
    .type {
      position: absolute;
      top: 5px;
      left: 10px;
      font-size: 12px;
      color: #A3A9AF;
    }
    .data-wrapper {
      width: 100%;
      position: absolute;
      top: 50px;
      left: 11px;
      .type-data {
        font-size: 16px;
      }
      .type-unit {
        font-size: 12px;
      }
    }
    ::v-deep .el-slider__runway {
      width: 74%;
      height: 3px;
      position: absolute;
      left: 0;
      bottom: 3px;
      margin: 8px 13%;
      .el-slider__bar {
        background-color: #69DF98 !important;
        height: 3px;
      }
      .el-slider__button-wrapper {
        display: none !important;
      }
    }
  }
  .el-card:last-of-type {
    margin-right: 0;
  }
  .el-card-alert {
    .alert-times {
      width: 16px;
      height: 16px;
      color: #fff;
      font-size: 14px;
      text-align: center;
      border-radius: 2px;
      position: absolute;
      top: 3px;
      right: 5px;
      background-color: #FF5D5D;
      .alert-times-ellipse {
        position: relative;
        top: -3px;
      }
    }
    .type {
      position: absolute;
      top: 5px;
      left: 10px;
      font-size: 12px;
      color: #fff;
    }
    ::v-deep .el-slider__runway {
      width: 74%;
      height: 3px;
      position: absolute;
      left: 0;
      bottom: 3px;
      margin: 8px 13%;
      .el-slider__bar {
        background-color: #A20202 !important;
        height: 3px;
      }
    }
    .data-modal {
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-color: #F54138;
    }
  }
  .el-card-broken {
    .alert-times {
      width: 16px;
      height: 16px;
      color: #fff;
      font-size: 14px;
      text-align: center;
      border-radius: 2px;
      position: absolute;
      top: 3px;
      right: 5px;
      background-color: #CECECE;
      .alert-times-ellipse {
        position: relative;
        top: -3px;
      }
    }
    .data-wrapper {
      width: 100%;
      position: absolute;
      top: 50px;
      left: 11px;
      .type-data {
        font-size: 16px;
        color: #A3A9AF;
      }
      .type-unit {
        font-size: 12px;
        color: #A3A9AF;
      }
    }
    ::v-deep .el-slider__runway {
      width: 74%;
      height: 3px;
      position: absolute;
      left: 0;
      bottom: 3px;
      margin: 8px 13%;
      .el-slider__bar {
        background-color: #CECECE !important;
        height: 3px;
      }
    }
    .data-modal {
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-color: rgba(195, 195, 195, 0.5);
    }
  }
</style>
