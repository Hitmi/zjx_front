<template>
  <div>
    <script type="application/javascript" defer charset="utf-8" src="https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js"/>
    <!-- 阿里云视频播放器组件 -->
    <script type="application/javascript" defer charset="utf-8" src="https://player.alicdn.com/aliplayer/presentation/js/aliplayercomponents.min.js"/>

    <!-- 播放器 -->
    <div id="J_prismPlayer" class="prism-player"/>
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
      chapterList:[]
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
      width: '40%',
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
      // this.getVideoData();
       this.getChapterData();
    },
    getVideoData() {
      // 得到视频id
      this.vid = this.$route.params.videoId;
      // 根据视频id获取播放凭证
     return courseApi.getPlayAuth(this.vid).then(response => {
        this.playauth = response.data.playAuth
        console.log('vid>>>', this.vid)
        console.log('playauth>>>', this.playauth)
      });
    },
   // 根据课程id获取章节列表
    getChapterData:function(){
      console.log("params:",this.$route.params);
      this.CourseId=this.$route.params.chapterId;
      console.log(this.CourseId);
      return  chapterApi.getByCourseId(this.CourseId).then(response => {
        this.chapterList = response.data.list;
         console.log('章节列表：', response.data.list)
      });
     }
  }
}
</script>
<style>
@import url("https://g.alicdn.com/de/prismplayer/2.8.2/skins/default/aliplayer-min.css");
.prism-player{
  position: absolute;
  left: 0;
  margin: auto;
  /* background-color: rebeccapurple; */
  border-radius: 10px;
}
</style>
