<template>
  <!--查询表单-->
  <div style="margin-left:15px">
    <el-form>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">课程ID：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.courseId" placeholder="课程ID" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">章节ID：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.chapterId" placeholder="章节ID" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">节点名称：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.title" placeholder="节点名称" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">云端视频资源：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.videoSourceId" placeholder="云端视频资源" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">原始文件名称：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.videoOriginalName" placeholder="原始文件名称" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">排序字段：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.sort" placeholder="排序字段" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">播放次数：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.playCount" placeholder="播放次数" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">是否可以试听：0收费 1免费：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.free" placeholder="是否可以试听：0收费 1免费" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">视频时长（秒）：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.duration" placeholder="视频时长（秒）" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">状态：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.status" placeholder="状态" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">视频源文件大小（字节）：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.size" placeholder="视频源文件大小（字节）" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">乐观锁：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.version" placeholder="乐观锁" size="medium"/>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getData()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'VideoSearch',
  data() {
    return {
      searchData: {
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
      }
    }
  },
  methods: {
    // 重置表单
    resetData() {
      this.searchData = {}
      this.$emit('click-get-data', this.searchData)
    },
    getData() {
      this.$emit('click-get-data', this.searchData)
    }
  }
}
</script>

<style scoped>
</style>
