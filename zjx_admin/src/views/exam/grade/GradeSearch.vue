<template>
  <!--查询表单-->
  <div style="margin-left:15px">
    <el-form>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">试卷id：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.paperId" placeholder="试卷id" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">所属学生的id：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.studentId" placeholder="所属学生的id" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">所属学生的姓名：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.studentName" placeholder="所属学生的姓名" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">考试得分：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.score" placeholder="考试得分" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">参加考试的时间：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.joinTime" placeholder="参加考试的时间" size="medium"/>
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
  name: 'GradeSearch',
  data() {
    return {
      searchData: {
        paperId: '',
        studentId: '',
        studentName: '',
        score: '',
        joinTime: ''
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
