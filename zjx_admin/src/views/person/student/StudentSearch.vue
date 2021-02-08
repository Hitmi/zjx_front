<template>
  <!--查询表单-->
  <div style="margin-left:15px">
    <el-form>
      <el-form-item>
        <el-col :span="3">
          <label style="line-height:2rem;width: 120px;">学生姓名：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.name" placeholder="学生姓名" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="3">
          <label style="line-height:2rem;width: 120px;">性别 1：男   2：女：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.name" placeholder="性别 1：男   2：女" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="3">
          <label style="line-height:2rem;width: 120px;">出生年月日：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.name" placeholder="出生年月日" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="3">
          <label style="line-height:2rem;width: 120px;">毕业日期：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.name" placeholder="毕业日期" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="3">
          <label style="line-height:2rem;width: 120px;">班级：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.name" placeholder="班级" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="3">
          <label style="line-height:2rem;width: 120px;">部门id：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.name" placeholder="部门id" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="3">
          <label style="line-height:2rem;width: 120px;">手机号：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.name" placeholder="手机号" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="3">
          <label style="line-height:2rem;width: 120px;">微信openid：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.name" placeholder="微信openid" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="3">
          <label style="line-height:2rem;width: 120px;">头像地址：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.name" placeholder="头像地址" size="medium"/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="3">
          <label style="line-height:2rem;width: 120px;">个性签名：</label>
        </el-col>
        <el-col :span="11">
          <el-input v-model="searchData.name" placeholder="个性签名" size="medium"/>
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
  name: 'StudentSearch',
  data() {
    return {
      searchData: {
        name: '',
        sex: '',
        birth: '',
        graduateDate: '',
        clazz: '',
        departmentId: '',
        mobile: '',
        wxId: '',
        avatar: '',
        sign: ''
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
