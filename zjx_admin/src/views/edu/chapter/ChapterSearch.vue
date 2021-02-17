<template>
  <!--查询表单-->
  <div style="margin-left:15px">
    <el-form>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">章节名字：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.title" placeholder="章节名字" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">课程id：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.courseId" placeholder="课程id" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">章节id：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.parentId" placeholder="章节id" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">排序,数字越大越重要：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.sort" placeholder="排序,数字越大越重要" size="medium"/>
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
  name: 'ChapterSearch',
  data() {
    return {
      searchData: {
        title: '',
        courseId: '',
        parentId: '',
        sort: ''
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
