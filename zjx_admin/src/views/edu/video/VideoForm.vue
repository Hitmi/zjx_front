<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <!--课程ID-->
      <el-form-item label="课程ID">
        <el-input v-model="video.courseId"/>
      </el-form-item>
      <!--章节ID-->
      <el-form-item label="章节ID">
        <el-input v-model="video.chapterId"/>
      </el-form-item>
      <!--节点名称-->
      <el-form-item label="节点名称">
        <el-input v-model="video.title"/>
      </el-form-item>
      <!--云端视频资源-->
      <el-form-item label="云端视频资源">
        <el-input v-model="video.videoSourceId"/>
      </el-form-item>
      <!--原始文件名称-->
      <el-form-item label="原始文件名称">
        <el-input v-model="video.videoOriginalName"/>
      </el-form-item>
      <!--排序字段-->
      <el-form-item label="排序字段">
        <el-input v-model="video.sort"/>
      </el-form-item>
      <!--播放次数-->
      <el-form-item label="播放次数">
        <el-input v-model="video.playCount"/>
      </el-form-item>
      <!--是否可以试听：0收费 1免费-->
      <el-form-item label="是否可以试听：0收费 1免费">
        <el-input v-model="video.free"/>
      </el-form-item>
      <!--视频时长（秒）-->
      <el-form-item label="视频时长（秒）">
        <el-input v-model="video.duration"/>
      </el-form-item>
      <!--状态-->
      <el-form-item label="状态">
        <el-input v-model="video.status"/>
      </el-form-item>
      <!--视频源文件大小（字节）-->
      <el-form-item label="视频源文件大小（字节）">
        <el-input v-model="video.size"/>
      </el-form-item>
      <!--乐观锁-->
      <el-form-item label="乐观锁">
        <el-input v-model="video.version"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
        <el-button type="primary" @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import videoApi from '@/api/edu/video'

export default {
  name: 'VideoFrom',
  data() {
    return {
      // 数据
      video: {
        courseId: '',
        chapterId: '',
        title: '',
        videoSourceId: '',
        videoOriginalName: '',
        sort: '',
        playCount: '',
        free: '',
        duration: '',
        status: '',
        size: '',
        version: ''
      },
      saveBtnDisabled: false // 按钮是否可用，默认可用
    }
  },

  created() {
    if (this.$route.params.id) {
      this.getDataById(this.$route.params.id)
    }
  },
  methods: {
    // 取消按钮，回退路由
    cancel() {
      this.$router.back(-1)
    },
    // 保存按钮，新增或更新
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (!this.video.id) {
        this.saveData()
      } else {
        this.updateData()
      }
      this.saveBtnDisabled = false
    },

    // 数据新增
    saveData() {
      videoApi.save(this.video).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/video/index' })
      }).catch(this.saveBtnDisabled = false)
    },

    // 数据更新
    updateData() {
      videoApi.updateById(this.video).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/video/list' })
      })
    },
    // 根据id查询数据
    getDataById(id) {
      videoApi.getById(id).then(response => {
        this.video = response.data.item
      })
    }
  }
}
</script>

<style scoped>
</style>
