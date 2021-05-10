<template>
  <div>
    <!-- 播放器 -->
    <div id="J_prismPlayer" class="prism-player" style="height:500px"/>
    <div class="chapterBox">
      <p class="videoSelectP">视频选集</p>
      <div v-for="chapter in this.chapterList" :key="chapter.id">
        <p class="ChapterTitle">{{chapter.title}}</p>
        <div v-for="video in chapter.children" :key="video.id" class="VideoSelectBox">
           <span class="videoPspan">p{{video.index}}</span>
           <span class="videoTitle">{{video.title}}</span>
           <span class="videoDuration">{{video.duration}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import courseApi from '@/api/edu/course'
import chapterApi from '@/api/edu/chapter'
export default {
  data() {
    return {
      vid: '',
      playauth: '',
      CourseId:'',
      chapterList:[],
      videoNum:0,
      isPlayingVideoNum:0
    }
  },
  created() {
    this.getData();
  },
  // 页面渲染之后执行
  mounted() {
    /* eslint-disable no-undef */
    new Aliplayer({
      id: 'J_prismPlayer',
      width: '60%',
      height:'100%',
      // 支持播放地址播放,此播放优先级最高
      source: 'http://zaijiaxue.codeyi.cn/sv/13cffdc6-178f9f6a30e/13cffdc6-178f9f6a30e.mp4',
      // vid: this.vid,
      // playauth: this.playauth,
      // 当播放私有加密流时需要设置
      encryptType: 1
    }, function(player) {
      console.log('播放器创建好了。')
    })
  },
  methods: {
    getData(){
       this.getVideoData();
       this.getChapterData();
    },
    getVideoData() {
      // 得到视频id
      this.vid = this.$route.params.videoId;
      console.log("vid:",this.vid);
    },
   // 根据课程id获取章节列表
    getChapterData:function(){
      console.log("params:",this.$route.params);
      this.CourseId=this.$route.params.chapterId;
      console.log(this.CourseId);
      return  chapterApi.getByCourseId(this.CourseId).then(response => {
        this.chapterList = response.data.list;
         //videoNum的计算
         for (let i=0;i<this.chapterList.length;i++)
         {
            //  this.videoNum+=this.chapterList[i].children.length;
             for (let j=0;j<this.chapterList[i].children.length;j++){
                this.chapterList[i].children[j].index=++this.videoNum;
             }
         }
         console.log("num：",this.videoNum);
          console.log('章节列表：', response.data.list);
      });
     }
  }
}
</script>
<style>
@import url("https://g.alicdn.com/de/prismplayer/2.8.2/skins/default/aliplayer-min.css");
.prism-player{
  position: absolute;
  left: 85px;
  top: 70px;
  margin: auto;
  /* background-color: rebeccapurple; */
  border-radius: 10px;
}
.chapterBox{
  position: absolute;
  right: 30px;
  top: 70px;
  width: 300px;
  height: 500px;
  background-color: rgb(244,244,244);
  padding: 0 20px;
  overflow-y:auto;
}
.videoSelectP{
  font-weight: 500;
  font-size: 18px;
  text-align: center;
}
.ChapterTitle{
  font-weight: 500;
  font-size: 17px;
}
.VideoSelectBox{
  margin: 10px 10px;
  /* background-color: #fff;
  color: #03a0d6; */
  line-height: 30px;
  cursor:pointer;
}
.VideoSelectBox:hover{
   background-color: #fff;
  color: #03a0d6; 
}
.videoDuration{
  float: right;
  color: #757575;
}
.videoTitle{
  margin-left: 0px;
}
</style>
