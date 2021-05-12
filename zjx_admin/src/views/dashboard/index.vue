<template>
  <div>
    <div class="dateSelect">
      <el-date-picker
        v-model="datelist"
        type="monthrange"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        value-format="yyyy-MM"
      >
      </el-date-picker>
      <el-button type="primary" class="SelectButton" @click="handleClick">查询</el-button>
    </div>
    <div class="echartsDescribe">
       <div class="echartsText">
         <span >学生登录数据统计</span>
       </div>
        <div class="echartsText">
         <span>视频上传数据统计</span>
       </div>
        <div class="echartsText">
        <span>视频播放数据统计</span>
       </div>
    </div>
    <div class="echartsBox">
      <div class="Echart" id="loginNum">
      </div>
      <div class="Echart" id="VideoNum">
      </div>
      <div class="Echart" id="VideoViewNum">
      </div>
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
      login_xData: ['2021-05-02','2021-05-03',],
      login_yData: [100,200],
      VideoView_xData: ['2021-05-02','2021-05-03',],
      VideoView_yData: [100,200],
      Video_xData: ['2021-05-02','2021-05-03'],
      Video_yData: [100,200],
      begin: "2020-05-11",
      end: "2021-05-11",
      datelist:"",
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    //this.echartsInit();
  },
  methods: {
    handleClick(){
      console.log(this.datelist);
      this.begin=this.datelist[0];
      this.end=this.datelist[1];
      console.log(this.begin,this.end);
      this.getData();
    },
    getData() {
      HomeApi.getData(this.begin, this.end).then((res) =>{
        console.log("返回图标数据为:",res);
        // 进行图表数据的赋值
        this.login_xData=res.data.item.loginNum.xData;
        this.login_yData=res.data.item.loginNum.yData;
        this.Video_xData=res.data.item.videoNum.xData;
        this.Video_yData=res.data.item.videoNum.yData;
        this.VideoView_xData=res.data.item.videoViewNum.xData;
        this.VideoView_yData=res.data.item.videoViewNum.yData;
        this.echartsInit();
      });
    },
    //初始化echarts
    echartsInit() {
      //柱形图
      //因为初始化echarts 的时候，需要指定的容器 id='main'
      this.$echarts.init(document.getElementById("loginNum")).setOption({
        xAxis: {
          type: "category",
          data: this.login_xData
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.login_yData,
            type: "line",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220)",
            },
          },
        ],
      });
     this.$echarts.init(document.getElementById("VideoNum")).setOption({
        xAxis: {
          type: "category",
          data: this.login_xData
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.login_yData,
            type: "line",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)",
            },
          },
        ],
      });
       this.$echarts.init(document.getElementById("VideoViewNum")).setOption({
        xAxis: {
          type: "category",
          data: this.login_xData
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.login_yData,
            type: "line",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)",
            },
          },
        ],
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
.dateSelect{
  text-align: center;
  margin: 30px 0;
}
.dateSelect .el-date-editor /deep/ .el-range-separator {
  width: 10%;
}
.SelectButton{
  margin-left: 50px;
}
.Echart{
  display: inline-block;
  width: 400px;
  height: 500px;
  margin-left: 30px;
}
.echartsBox{
   position: relative;
}
.echartsText{
  display: inline-block;
  width: 400px;
  margin-left: 30px;
}
.echartsText span{
  margin-left: 10px;
  line-height: 15px;
  font-size: 18px;
}
</style>
