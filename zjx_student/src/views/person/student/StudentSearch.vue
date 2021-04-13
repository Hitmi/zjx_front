<template>
  <!--查询表单-->
  <div style="margin-left:15px">
    <el-form>
      <el-form-item>
        <el-col :span="7">
          <label style="line-height:2rem;width: 120px;">学生姓名：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.name" placeholder="学生姓名" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="7">
          <label style="line-height:2rem;width: 120px;">性别</label>
        </el-col>
        <el-col :span="11">
          <el-select v-model="searchData.sex" placeholder="性别">
            <el-option :value="1" label="男"/>
            <el-option :value="2" label="女"/>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="7">
          <label style="line-height:2rem;width: 120px;">毕业日期：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.graduateDate" placeholder="毕业日期" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="7">
          <label style="line-height:2rem;width: 120px;">班级：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.clazz" placeholder="班级" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="7">
          <label style="line-height:2rem;width: 120px;">所属部门：</label>
        </el-col>
        <el-col :span="11">
          <el-select v-model="searchData.departmentId" placeholder="部门">
            <el-option
              v-for="item in departmentList"
              :key="item.id"
              :label="item.name"
              :value="item.id"/>
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getData">查询</el-button>
        <el-button type="default" @click="resetData">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import departmentApi from '@/api/person/department'

export default {
  name: 'StudentSearch',
  data() {
    return {
      searchData: {
        name: '',
        sex: '',
        graduateDate: '',
        clazz: '',
        departmentId: ''
      },
      departmentList: []
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    // 获取部门信息
    getDepartment() {
      departmentApi.list().then(response => {
        this.departmentList = response.data.list
      })
    },
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
