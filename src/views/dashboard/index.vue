<template>
  <div class="container">
    <div class="dashboard-container">
      <div class="echarts_box">
        <h2 class="title">人员风险展示</h2>
        <div id="echart1" style="width: 400px;height: 200px;">
        </div>
      </div>
      <div class="echarts_box">
        <h2 class="title">人员分布</h2>
        <div id="echart2" style="width: 400px;height: 200px;">
        </div>
      </div>
      <div class="echarts_box">
        <h2 class="title">设备风险展示</h2>
          <div id="echart3" style="width: 400px;height: 200px;">
          </div>
      </div>
      <div class="echarts_box">
        <h2 class="title"></h2>
          <div id="echart4" style="width: 400px;height: 200px;">
          </div>
      </div>
      <div class="echarts_box">
        <div class="title_type">
          <h2 class="title">装置风险展示</h2>
          <div class="type"><div class="circle"></div>正常</div>
          <div class="type"><div class="circle red"></div>异常</div>
        </div>
        <div class="word_box">
          <div class="word"> <div class="circle_word"><div class="circle"></div>启动异常</div><div>1个</div></div>
          <div class="word"><div class="circle_word"><div class="circle"></div>关闭异常</div><div>1个</div></div>
          <div class="word"><div class="circle_word"><div class="circle"></div>运行故障</div><div>1个</div></div>
          <div class="word"><div class="circle_word"><div class="circle"></div>停用</div><div>1个</div></div>
          <div class="word"><div class="circle_word"><div class="circle"></div>维修</div><div>1个</div></div>
          <div class="word"><div class="circle_word"><div class="circle"></div>工作时长</div><div>20天</div></div>
        </div>
      </div>
      <div class="echarts_box">
        <h2 class="title">物料风险展示</h2>
        <div style=" width:800px;display: flex;flex-flow: row nowrap">
          <div id="echart5" style="width: 400px;height: 200px;">
          </div>
        </div>

      </div>
      <div class="echarts_box">
        <h2 class="title">作业风险展示</h2>
          <div id="echart6" style="width: 400px;height: 200px;">
        </div>

      </div>
      <div class="echarts_box">
        <h2 class="title">环境风险展示</h2>
          <div id="echart7" style="width: 400px;height: 200px;">
          </div>

      </div>
    </div>
    <div class="echarts_box_special">
      <h2 class="title">管理风险展示</h2>
      <div id="echart8" style="width: 1000px;height: 400px;">
      </div>
    </div>
    <DashboardTable></DashboardTable>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import * as echarts from 'echarts';
import DashboardTable from './table/index(1)'
export default {
  name: 'Dashboard',
  components:{
    DashboardTable
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted(){
    this.initEchart1()
    this.initEchart2()
    this.initEchart3()
    this.initEchart4()
    this.initEchart5()
    this.initEchart6()
    this.initEchart7()
    this.initEchart8()
  },
  methods:{
    initEchart1(){
      let option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 5, name: '请假' },
              { value: 100, name: '正常' },
              { value: 2, name: '缺勤' },
              { value: 3, name: '加班' },
            ]
          }
        ]
      };
      var chartDom = document.getElementById('echart1');
      var myChart = echarts.init(chartDom);
      myChart.setOption(option)
      window.onresize = function() {
        myChart.resize();
      };
    },
    initEchart2(){
      let option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 2, name: '孕妇' },
              { value: 30, name: '新员工' },
              { value: 2, name: '转岗员工' },
              { value: 3, name: '受伤员工' },
            ]
          }
        ]
      };
      var chartDom = document.getElementById('echart2');
      var myChart = echarts.init(chartDom);
      myChart.setOption(option)
      window.onresize = function() {
        myChart.resize();
      };
    },
    initEchart3(){
      let option = {
        title:{
          text:'设备状态展示'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 2, name: '离线' },
              { value: 20, name: '正常' },
              { value: 1, name: '故障' },
            ]
          }
        ]
      };
      var chartDom = document.getElementById('echart3');
      var myChart = echarts.init(chartDom);
      myChart.setOption(option)
      window.onresize = function() {
        myChart.resize();
      };
    },
    initEchart4(){
      let option = {
        title:{
          text:'设备用电量情况'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 2, name: '用电超高' },
              { value: 30, name: '正常' },
            ]
          }
        ]
      };
      var chartDom = document.getElementById('echart4');
      var myChart = echarts.init(chartDom);
      myChart.setOption(option)
      window.onresize = function() {
        myChart.resize();
      };
    },
    initEchart5(){
      let option = {
        title:{
          text:'危险化学品储量展示'
        },
        xAxis: {
          type: 'category',
          data: ['氯气', '柴油', '白磷']
        },
        yAxis: {
          type: 'value',
          data:[10,50,100,200,300]
        },
        series: [
          {
            data: [150, 300, 5],
            type: 'line'
          }
        ]
      };
      var chartDom = document.getElementById('echart5');
      var myChart = echarts.init(chartDom);
      myChart.setOption(option)
      window.onresize = function() {
        myChart.resize();
      };
    },
    initEchart6(){
      let option =  {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '安全事件项',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
            label: {
              position: 'inner',
              fontSize: 14
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 20, name: '较轻', selected: true },
              { value: 100, name: '一般' },
              { value: 10, name: '严重' },

            ]
          },
          {
            name: '安全事件项',
            type: 'pie',
            radius: ['45%', '60%'],
            labelLine: {
              length: 30
            },
            label: {
              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              backgroundColor: '#F6F8FC',
              borderColor: '#8C8D8E',
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: {
                  color: '#6E7079',
                  lineHeight: 22,
                  align: 'center'
                },
                hr: {
                  borderColor: '#8C8D8E',
                  width: '100%',
                  borderWidth: 1,
                  height: 0
                },
                b: {
                  color: '#4C5058',
                  fontSize: 14,
                  fontWeight: 'bold',
                  lineHeight: 33
                },
                per: {
                  color: '#fff',
                  backgroundColor: '#4C5058',
                  padding: [3, 4],
                  borderRadius: 4
                }
              }
            },
            data: [
              { value: 10, name: '其他违规风险项' },
              { value: 10, name: '作业场所防护措施疏漏' },
              { value: 6, name: '运输作业违规行为' },
              { value: 5, name: '矿井危险气体浓度超标' },
              { value: 20, name: '大型机械作业操作违规' },
            ]
          }
        ]
      };
      var chartDom = document.getElementById('echart6');
      var myChart = echarts.init(chartDom);
      myChart.setOption(option)
      window.onresize = function() {
        myChart.resize();
      };
    },
    initEchart7(){
      let option =  {
        title: {
          text: '环境风险',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{d}%'
        },
        // legend: {
        //   bottom: 10,
        //   left: 'center',
        //   data: ['恶劣天气', '自然灾害', '危险化学品泄漏', '油气泄露', '"三废"排放', '社会环境', '政治环境']
        // },
        series: [
          {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [
              { value: 735, name: '恶劣天气' },
              { value: 510, name: '自然灾害' },
              { value: 434, name: '危险化学品泄漏' },
              { value: 335, name: '"三废"排放' },
              { value: 335, name: '社会环境' },
              {  value: 335, name: '政治环境' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      var chartDom = document.getElementById('echart7');
      var myChart = echarts.init(chartDom);
      myChart.setOption(option)
      window.onresize = function() {
        myChart.resize();
      };
    } ,
    initEchart8(){
      const posList = [
        'left',
        'right',
        'top',
        'bottom',
        'inside',
        'insideTop',
        'insideLeft',
        'insideRight',
        'insideBottom',
        'insideTopLeft',
        'insideTopRight',
        'insideBottomLeft',
        'insideBottomRight'
      ];
      app.configParameters = {
        rotate: {
          min: -90,
          max: 90
        },
        align: {
          options: {
            left: 'left',
            center: 'center',
            right: 'right'
          }
        },
        verticalAlign: {
          options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
          }
        },
        position: {
          options: posList.reduce(function (map, pos) {
            map[pos] = pos;
            return map;
          }, {})
        },
        distance: {
          min: 0,
          max: 100
        }
      };
      app.config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function () {
          const labelOption = {
            rotate: app.config.rotate,
            align: app.config.align,
            verticalAlign: app.config.verticalAlign,
            position: app.config.position,
            distance: app.config.distance
          };
          myChart.setOption({
            series: [
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              }
            ]
          });
        }
      };
      const labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
          name: {}
        }
      };
      let option =  {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['活动得分', '满分']
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: ['安全会议召开次数', '安全活动演练次数', '安全管理制度执行次数', '安全紧急演练次数', '安全教育培训次数', '安全隐患排查次数', '重大隐患排查次数']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '活动得分',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [10, 12, 18, 20, 14, 12, 24]
          },
          {
            name: '满分',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [17, 20, 25, 25, 20, 18, 25, 30]
          },
        ]
      };
      var chartDom = document.getElementById('echart8');
      var myChart = echarts.init(chartDom);
      myChart.setOption(option)
      window.onresize = function() {
        myChart.resize();
      };
    }

  }
}
</script>

<style lang="scss" scoped>
.dashboard-container{
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
}
.title_type{
  display: flex;
}
.type{
  margin-left: 5px;
  display: flex;
  align-items: center;
  .circle{
    width: 10px;
    height: 10px;
    background: #1DC878;
    border-radius: 50%;
    margin-right: 5px;
  }
  .circle.red{
    background: palevioletred;
  }
}
.word_box{
  width: 100%;
  height: 200px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;

  .word{
    text-align: center;
    font-size: 18px;
    width:120px ;
    height: 80px;
    border: 2px solid green;
    border-radius: 10px;
    .circle{
      width: 10px;
      height: 10px;
      background: #1DC878;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
  .circle_word{
    text-align: center;
    margin-left: 16px;
    margin-top: 20px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
  }
}
.echarts_box{
  margin-bottom: 20px;
  width: 400px;
  background: #fff;
}
.container{
  padding: 20px;
}
.echarts_box_special{
  width: 1000px;
  margin: 0 auto;
  overflow: auto;
}
</style>
