<template>
  <div class="app-container">
    <!-- 步骤导航 -->
    <h2 style="text-align: center;">课程名</h2>
    <!-- 章节列表 -->
    <ul class="chapterList">
      <li v-for="chapter in chapterList" :key="chapter.id">
        <p>{{ chapter.title }}</p>
        <ul class="chapterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>{{ video.title }}
              <el-tag v-if="!video.videoSourceId" size="mini" type="danger">
                {{ '尚未上传视频' }}
              </el-tag>
              <span class="acts">
                <router-link :to="'/video/view/'+video.videoSourceId">
                  <el-button type="primary" size="mini">查看</el-button>
                </router-link>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import chapterApi from '@/api/edu/chapter'

// 1、引入组件

export default {
  data() {
    return {
      chapterList: [] // 章节嵌套列表
    }
  },

  created() {
    this.fetchNodeList()
  },

  methods: {

    // 获取后端章节列表数据
    fetchNodeList() {
      chapterApi.getByCourseId(this.$route.params.id).then(response => {
        console.log('getByCourseId>>', response.data.list)
        this.chapterList = response.data.list
      })
    }
  }
}
</script>

<style>
.chapterList{
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
}
.chapterList li{
  position: relative;
}
.chapterList p{
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.chapterList .acts {
    float: right;
    font-size: 14px;
}

.videoList{
  padding-left: 50px;
}
.videoList p{
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dashed #DDD;
}
</style>
