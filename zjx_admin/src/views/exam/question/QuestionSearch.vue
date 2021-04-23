<template>
  <!--查询表单-->
  <div style="margin-left:15px">
    <el-form>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">试题题目,最多50汉字(100字节)：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.title" placeholder="试题题目,最多50汉字(100字节)" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">试题类型 0:单选 1:多选 2:判断：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.type" placeholder="试题类型 0:单选 1:多选 2:判断" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">试题答案：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.answer" placeholder="试题答案" size="medium"/>
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
  name: 'QuestionSearch',
  data() {
    return {
      searchData: {
        title: '',
        type: '',
        answer: ''
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
