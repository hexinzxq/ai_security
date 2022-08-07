<template>
  <div>
    <!--    报警信息-->
    <div>
      <el-card
        class="box-card"
        v-loading="loading"
      >
        <div class="box-title">环境一体机</div>
        <div class="card-wrapper">
          <env-machine-data
            class="box-card-item"
            v-for="item in dustdata"
            :key="item.id"
            :item="item"
            :update-times="updateTimes"
          ></env-machine-data>
        </div>
      </el-card>
      <el-card
        class="box-card"
        v-loading="loading"
        style="height: 315px"
      >
        <div class="box-title">摄像头</div>
        <div class="card-wrapper">
          <camera-data
            class="box-card-item"
            v-for="(item, index) in cleardata"
            :key="item.id"
            :item="item"
            :index="index"
          ></camera-data>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import EnvMachineData from '@/views/movingRingWarn/alarmData/recordData/envMachineData'
import CameraData from '@/views/movingRingWarn/alarmData/recordData/cameraData'
import { monitorAlarmInfo } from '@/api/api'
import { mapState } from 'vuex'
import websocketType from '@/constants/websocket'
export default {
  name: 'MovingRingWarn',
  components: {
    EnvMachineData,
    CameraData
    // NoiseData,
    // DustData,
    // ClearData
  },
  data() {
    return {
      optionsEquipment: [
        {
          label: '环境一体机',
          value: '0'
        },
        {
          label: '噪声设备',
          value: '1'
        },
        {
          label: '摄像头',
          value: '2'
        }
      ],
      value: '请选择',
      listShow: 1,
      cleardata: [],
      dustdata: [],
      noisedata: [],
      selectedData: [],
      loading: true,
      updateTimes: 0,
      firstTime: true
    }
  },
  computed: {
    ...mapState({
      websocketData: state => state.websocket.websocketData
    })
  },
  watch: {
    websocketData(newVal, oldVal) {
      console.log('hihi');
      console.log(newVal);
      if (newVal.type === websocketType['alarm']) {
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
        return time.split('-')[0] + '-' + time.split('-')[1] + '-' + time.split('-')[2]
      }
      return null
    },
    monitorAlarmInfo() {
      monitorAlarmInfo({
        type: 'admin'
      })
        .then((res) => {
          if (res.status === 200) {
            this.dustdata = []
            this.noisedata = []
            this.cleardata = []
            res.data.data.dustList.forEach((item, index) => {
              this.dustdata.push({
                id: item.equipmentId,
                name: item.pointName,
                pm1: item.pmOne,
                pm2: item.pmTwo,
                tsp: item.tsp,
                pm1Progress: item.pmOnePercent > 100 ? item.pmOnePercent - 100 : item.pmOnePercent,
                pmOnePolluted: item.pmOnePolluted,
                pmOneMessage: item.pmOneMessage,
                pm2Progress: item.pmTwoPercent > 100 ? item.pmTwoPercent - 100 : item.pmTwoPercent,
                pmTwoPolluted: item.pmTwoPolluted,
                pmTwoMessage: item.pmTwoMessage,
                tspProgress: item.tspPercent > 100 ? item.tspPercent - 100 : item.tspPercent,
                tspPolluted: item.tspPolluted,
                tspMessage: item.tspMessage,
                status: item.dustPolluted || 0,
                number: item.message,
                time: this.formatTime(item.monitoringTime),
                deviceState: item.deviceState
              })
            })
            res.data.data.noiseList.forEach((item, index) => {
              this.dustdata &&
              (this.dustdata[index].volume = item.volume)
              this.dustdata &&
              (this.dustdata[index].volumeProgress = item.noisePercent > 100 ? item.noisePercent - 100 : item.noisePercent)
              this.dustdata &&
              (this.dustdata[index].volumeMessage = item.message)
              this.dustdata &&
              (this.dustdata[index].volumePolluted = item.noisePolluted)
              // this.noisedata.push({
              //   id: item.equipmentId,
              //   name: item.pointName,
              //   pm1: item.volume,
              //   pm1Progress: item.noisePercent > 100 ? item.noisePercent - 100 : item.noisePercent,
              //   status: item.dustPolluted || 0,
              //   number: item.message,
              //   time: this.formatTime(item.monitoringTime),
              //   deviceState: item.deviceState
              // })
            })
            res.data.data.wayList.forEach((item, index) => {
              this.cleardata.push({
                id: item.equipmentId,
                name: item.pointName,
                pm1: item.volume,
                status: item.noisePolluted || 0,
                number: item.message,
                time: this.formatTime(item.monitoringTime)
              })
            })
            this.loading = false
          }
        })
        .catch((err) => {
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
    resetForm() {
      this.value = '请选择'
      this.listShow = 1
    },
    searchType() {
      switch (this.value) {
        case '0':
          this.listShow = 0
          this.selectedData = this.dustdata
          break
        case '1':
          this.listShow = 0
          this.selectedData = this.noisedata
          break
        case '2':
          this.listShow = 0
          this.selectedData = this.cleardata
          break

        default:
          this.selectedData.concat(
            this.dustdata,
            this.noisedata,
            this.cleardata
          )
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.box-card-top {
  height: 72px;
  margin: 16px 1% 0 1%;
  padding-top: 15px;
}
::v-deep .el-card__body{
  width: 100%;
  padding: 0 15px !important;
}
.box-card {
  margin: 12px 1% 0;
  width: 98%;
  padding-bottom: 15px;
  /*height: 540px;*/
  .box-title {
    height: 20px;
    line-height: 1;
    font-size: 18px;
    margin-top: 16px;
  }
  .card-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    .box-card-item {
      width: 32.5%;
      height: 227px;
      margin-right: 1%;
    }
    .box-card-item:nth-of-type(3n) {
      margin-right: 0;
    }
  }
}
.alarm-box {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  //::v-deep .el-col-12 {
  //  width: 46%;
  //}
}
</style>
