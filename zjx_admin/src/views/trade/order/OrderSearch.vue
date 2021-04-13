<template>
  <!--查询表单-->
  <div style="margin-left:15px">
    <el-form>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">订单号：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.orderNo" placeholder="订单号" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.courseId" placeholder="" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.courseTitle" placeholder="" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.teacherName" placeholder="" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.studentId" placeholder="" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.studentName" placeholder="" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">选课状态 1:已选 2:：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.status" placeholder="选课状态 1:已选 2:" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">逻辑删除 1（true）已删除， 0（false）未删除：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.isDeleted" placeholder="逻辑删除 1（true）已删除， 0（false）未删除" size="medium"/>
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
  name: 'OrderSearch',
  data() {
    return {
      searchData: {
        orderNo: '',
        courseId: '',
        courseTitle: '',
        teacherName: '',
        studentId: '',
        studentName: '',
        status: '',
        isDeleted: ''
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
