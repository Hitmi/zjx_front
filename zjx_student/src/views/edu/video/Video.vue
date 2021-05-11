<template>
  <div>
    <!-- <script type="application/javascript"  charset="utf-8" src="https://player.alicdn.com/aliplayer/presentation/js/aliplayercomponents.min.js"/> -->
    <!-- 播放器 -->
    <div id="J_prismPlayer" class="prism-player" style="height:500px"/>
    <div class="chapterBox">
      <p class="videoSelectP">视频选集</p>
      <div v-for="(chapter,Index1) in this.chapterList" :key="chapter.id" >
        <p class="ChapterTitle">{{chapter.title}}</p>
        <div ref="Activate" v-for="(video,Index2) in chapter.children" :key="video.id" class="VideoSelectBox" @click="ChangeVideo(video.videoSourceId,Index1,Index2)" :class="{'VideoIsPlaying':Index2==index2&&Index1==index1}">
           <span class="videoPspan">p{{video.index}}</span>
           <span class="videoTitle">{{video.title}}</span>
           <span class="videoDuration">{{video.duration}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
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
      isPlayingVideoNum:0,
      index1:1,
      index2:2
    }
  },
  // 页面渲染之后执行
  mounted() {
    /* eslint-disable no-undef */
    this.getData();
    // this.ActivateDom();
  },
  created(){
  },
  methods: {
    getData(){
       this.getVideoData();
       this.getChapterData();
       this.setValue();
       this.ActivateDom();
    },
    setValue(){
      this.index1=this.$route.params.index1;
      this.index2=this.$route.params.index2;
    },
    getVideoData() {
      new Aliplayer({
      id: 'J_prismPlayer',
      width: '60%',
      height:'100%',
      // 支持播放地址播放,此播放优先级最高
      source: this.$route.params.videoSourceId,
      //source: 'http://zaijiaxue.codeyi.cn/sv/13cffdc6-178f9f6a30e/13cffdc6-178f9f6a30e.mp4',
      // vid: this.vid,
      // playauth: this.playauth,
      // 当播放私有加密流时需要设置
      encryptType: 1
    }, function(player) {
      console.log('播放器创建好了')
    })
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
     },
     ActivateDom(){
       console.log("1",this.$refs.Activate);
     },
     ChangeVideo(videoSourceId,index1,index2){
       this.$router.push({name:'Blank',params:{
        videoSourceId:videoSourceId,
        index1:index1,
        index2:index2,
        chapterId:this.$route.params.chapterId
      }});
     }
  }
}
</script>
<style >
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
.VideoIsPlaying{
  background-color: #fff;
   color: #409EFF; 
}
.videoDuration{
  float: right;
  /* color: #757575; */
}
.videoTitle{
  margin-left: 0px;
}
</style>
