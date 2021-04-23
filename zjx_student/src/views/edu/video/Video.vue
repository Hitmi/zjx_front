<template>
  <div>
    <link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.2/skins/default/aliplayer-min.css">

    <script type="application/javascript" defer charset="utf-8" src="https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js"/>
    <!-- 阿里云视频播放器组件 -->
    <script type="application/javascript" defer charset="utf-8" src="https://player.alicdn.com/aliplayer/presentation/js/aliplayercomponents.min.js"/>

    <!-- 播放器 -->
    <div id="J_prismPlayer" class="prism-player"/>
  </div>
</template>

<script>
import courseApi from '@/api/edu/course'

export default {
  data() {
    return {
      vid: '',
      playauth: ''
    }
  },
  created() {
    this.getData()
  },
  // 页面渲染之后执行
  mounted() {
    /* eslint-disable no-undef */
    new Aliplayer({
      id: 'J_prismPlayer',
      width: '40%',
      // 支持播放地址播放,此播放优先级最高
      // source: 'http://zaijiaxue.codeyi.cn/sv/2c47bac7-178efb29fb3/2c47bac7-178efb29fb3.mp4'
      vid: this.vid,
      playauth: this.playauth,
      // 当播放私有加密流时需要设置
      encryptType: 1
    }, function(player) {
      console.log('播放器创建好了。')
    })
  },
  methods: {
    getData() {
      // 得到视频id
      this.vid = this.$route.params.id
      // 根据视频id获取播放凭证
      courseApi.getPlayAuth(this.vid).then(response => {
        this.playauth = response.data.playAuth
        console.log('vid>>>', this.vid)
        console.log('playauth>>>', this.playauth)
      })
    }
  }
}
</script>
<style>
.prism-player{
  position: absolute;
  top: 200px;
  left: 0;
  right: 10px;
  bottom: 10px;
  margin: auto;
  background-color: rebeccapurple;
  border-radius: 10px;
}
</style>
