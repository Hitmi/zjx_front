<template>
  <div>
    <div class="dateSelect">
      <el-date-picker
        v-model="valueList"
        type="monthrange"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        value-format="yyyy-MM"
      >
      </el-date-picker>
      <el-button type="primary" class="SelectButton" @click="handleClick"
        >查询</el-button
      >？？？？？
    </div>
    <div class="echartsBox">
      <div class="Echart" id="loginNum"></div>
      <div class="Echart" id="VideoNum"></div>
      <div class="Echart" id="VideoViewNum"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HomeApi from "@/api/home";
export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name", "roles"]),
  },
  data() {
    return {
      login_xData: ["2021-05-02", "2021-05-03"],
      login_yData: [100, 200],
      VideoView_xData: ["2021-05-02", "2021-05-03"],
      VideoView_yData: [100, 200],
      Video_xData: ["2021-05-02", "2021-05-03"],
      Video_yData: [100, 200],
      begin: "2020-05-11",
      end: "2021-05-11",
      valueList: "",
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    //this.echartsInit();
  },
  methods: {
    handleClick() {
      console.log(this.valueList);
      this.begin = this.valueList[0];
      this.end = this.valueList[1];
      console.log(this.begin, this.end);
      this.getData();
    },
    getData() {
      HomeApi.getData(this.begin, this.end).then((res) => {
        console.log("返回图标数据为:", res);
        // 进行图表数据的赋值
        this.login_xData = res.data.item.loginNum.xData;
        this.login_yData = res.data.item.loginNum.yData;
        this.Video_xData = res.data.item.videoNum.xData;
        this.Video_yData = res.data.item.videoNum.yData;
        this.VideoView_xData = res.data.item.videoViewNum.xData;
        this.VideoView_yData = res.data.item.videoViewNum.yData;
        this.echartsInit();
      });
    },
    //初始化echarts
    echartsInit() {
      //登录数据统计
      this.$echarts.init(document.getElementById("loginNum")).setOption({
        title: {
        text: '登录数据统计',
        left:20
    },
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        left: '10%',
        right: '4%',
        bottom: '10%',
        containLabel: false
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.login_xData
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            type:'line',
            areaStyle: {normal: {
                                color: new this.$echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#409eff'},
                                            {offset: 0.5, color: '#b3d8ff'},
                                            {offset: 1, color: '#d9ecff'}
                                        ]
                                )
                            }},
            data:this.login_yData,
             itemStyle:{
              normal:{
                color:"#409eff",
              lineStyle:{
                color:"#409eff"
              }
              },
            },
        }
    ]
   });
      //上传视频数据统计
      this.$echarts.init(document.getElementById("VideoNum")).setOption({
        title: {
        text: '上传视频数据统计',
        left:20
    },
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        left: '10%',
        right: '4%',
        bottom: '10%',
        containLabel: false
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.Video_xData
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            type:'line',
            areaStyle: {normal: {
                                color: new this.$echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#409eff'},
                                            {offset: 0.5, color: '#b3d8ff'},
                                            {offset: 1, color: '#d9ecff'}
                                        ]
                                )
                            }},
            data:this.Video_yData,
             itemStyle:{
              normal:{
                color:"#409eff",
              lineStyle:{
                color:"#409eff"
              }
              },
            },
        }
    ]
   });
   //视频播放量数据统计
   this.$echarts.init(document.getElementById("VideoViewNum")).setOption({
        title: {
        text: '视频播放量数据统计',
        left:20
    },
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        left: '10%',
        right: '4%',
        bottom: '10%',
        containLabel: false
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.VideoView_xData
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            type:'line',
            areaStyle: {normal: {
                                color: new this.$echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#409eff'},
                                            {offset: 0.5, color: '#b3d8ff'},
                                            {offset: 1, color: '#d9ecff'}
                                        ]
                                )
                            }},
            data:this.VideoView_yData,
             itemStyle:{
              normal:{
                color:"#409eff",
              lineStyle:{
                color:"#409eff"
              }
              },
            },
        }
    ]
   });
     
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dateSelect {
  text-align: center;
  margin: 30px 0 60px 0;
}
.dateSelect .el-date-editor /deep/ .el-range-separator {
  width: 10%;
}
.SelectButton {
  margin-left: 50px;
}
.Echart {
  display: inline-block;
  width: 410px;
  height: 500px;
  margin-left: 30px;
}
</style>
