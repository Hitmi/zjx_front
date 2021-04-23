<template>
  <!--查询表单-->
  <div style="margin-left:15px">
    <el-form>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">创建者id：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.creatorId" placeholder="创建者id" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">修改者id：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.updatorId" placeholder="修改者id" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">试卷名称：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.name" placeholder="试卷名称" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">创建者名称：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.creator" placeholder="创建者名称" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">修改者名称：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.updator" placeholder="修改者名称" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">试卷描述：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.description" placeholder="试卷描述" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">考试时长：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.duration" placeholder="考试时长" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">题目总数：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.questionCount" placeholder="题目总数" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">单选题数量：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.singleCount" placeholder="单选题数量" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">多选题数量：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.multipleCount" placeholder="多选题数量" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">判断题数量：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.judgeCount" placeholder="判断题数量" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">考试开始时间：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.startTime" placeholder="考试开始时间" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">考试截止时间：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.endTime" placeholder="考试截止时间" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">是否启用 0:禁用 1:启用：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.active" placeholder="是否启用 0:禁用 1:启用" size="medium"/>
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
  name: 'PaperSearch',
  data() {
    return {
      searchData: {
        creatorId: '',
        updatorId: '',
        name: '',
        creator: '',
        updator: '',
        description: '',
        duration: '',
        questionCount: '',
        singleCount: '',
        multipleCount: '',
        judgeCount: '',
        startTime: '',
        endTime: '',
        active: ''
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
