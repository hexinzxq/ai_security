<template>
  <div class="box-card-info">
    <el-row
      class="noise-box"
      :gutter="15"
    >
      <el-col
        v-for="(item, index) in dustdata"
        :key="index"
        :span="ratioNum"
      >
        <div
          :class="
            item.status === 1
              ? item.deviceState === 1
                ? 'equipmentOne equipmentOne-grey'
                : 'equipmentOne equipmentOne-red'
              : item.deviceState === 1
                ? 'equipmentOne equipmentOne-grey'
                : 'equipmentOne equipmentOne-normal'
          "
          @click="jumpToNoise(item.id, item.name, item.status, item.number)"
        >
          <div
            :class="
              item.status === 1
                ? item.deviceState === 1
                  ? 'noise-box-content noise-box-content_black'
                  : 'noise-box-content noise-box-content_red'
                : item.deviceState === 1
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
                    <div v-if="item.deviceState === 1">
                      <div class="noise-icon icon-black">
                        <img
                          src="../../alarmData/img/noise-alarm-icno.png"
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
                          src="../../alarmData/img/noise-alarm-icno.png"
                          alt=""
                        >
                      </div>
                    </div>
                  </el-col>
                </div>
              </el-row>
            </div>
            <div class="noise-box-content-flex">
              <div class="noise-box-content-data">
                <div class="noise-box-content-dataOne">
                  PM2.5
                </div>
                <div class="noise-box-content-dataTow">{{ item.pm1 }}</div>
                <div class="line">
                  <el-slider
                    v-if="item.pmOnePolluted === 1"
                    v-model="item.pm1Progress"
                    class="slider_error"
                  />
                  <el-slider
                    v-else
                    v-model="item.pm1Progress"
                  />
                </div>
              </div>
              <div class="noise-box-content-data">
                <div class="noise-box-content-dataOne">
                  PM10
                </div>
                <div class="noise-box-content-dataTow">{{ item.pm2 }}</div>
                <div class="line">
                  <el-slider
                    v-if="item.pmTwoPolluted === 1"
                    v-model="item.pm2Progress"
                    class="slider_error"
                  />
                  <el-slider
                    v-else
                    v-model="item.pm2Progress"
                  />
                </div>
              </div>
              <div class="noise-box-content-data">
                <div class="noise-box-content-dataOne">
                  tsp
                </div>
                <div class="noise-box-content-dataTow">{{ item.tsp }}</div>
                <div class="line">
                  <el-slider
                    v-if="item.tspPolluted === 1"
                    v-model="item.tspProgress"
                    class="slider_error"
                  />
                  <el-slider
                    v-else
                    v-model="item.tspProgress"
                  />
                </div>
              </div>
            </div>
          </div>
          <img
            class="img_info"
            src="../img/alarm-bg.png"
          >
          <div
            v-if="item.number > 0 && !(item.deviceState === 1)"
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
              item.deviceState === 1
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
export default {
  name: 'DustData',
  props: {
    dustdata: {
      type: Array,
      default: () => {
        return []
      }
    },
    ratioNum: {
      type: Number,
      default: 12
    }
  },
  data() {
    return {
    }
  },
  created() {},
  methods: {
    noiseRouter() {
      this.$router.push('/env/noise')
    },
    jumpToNoise(id, name, status, message) {
      if (message > 0) {
        status = '1'
        this.$router.push({
          name: 'EnvNoise',
          query: {
            id,
            name,
            status
          }
        })
      } else {
        this.$router.push({
          name: 'EnvNoise',
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
.noise-box-content-data {
  width: 20% !important;
}
.loading-info {
  display: flex;
  .loading-min {
    position: absolute;
    line-height: 3.6em;
    margin-left: 0.8em;
  }
}
</style>
