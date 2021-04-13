<template>
  <!--查询表单-->
  <div style="margin-left:15px">
    <el-form>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">课程主讲老师id：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.teacherId" placeholder="课程主讲老师id" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">课程所属部门id：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.departmentId" placeholder="课程所属部门id" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">课程名：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.title" placeholder="课程名" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">课程总课时：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.lessonNum" placeholder="课程总课时" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">课程学分：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.credit" placeholder="课程学分" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">课程简介id：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.descriptionId" placeholder="课程简介id" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">课程封面：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.cover" placeholder="课程封面" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="5">
          <label style="line-height:2rem;width: 120px;">课程状态 1：启用 2：禁用：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.status" placeholder="课程状态 1：启用 2：禁用" size="medium"/>
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
  name: 'CourseSearch',
  data() {
    return {
      searchData: {
        teacherId: '',
        departmentId: '',
        title: '',
        lessonNum: '',
        credit: '',
        descriptionId: '',
        cover: '',
        status: '',
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
