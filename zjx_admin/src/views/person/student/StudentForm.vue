<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <!--学生姓名-->
      <el-form-item label="学生姓名">
        <el-input v-model="student.name"/>
      </el-form-item>
      <!--性别 1：男   2：女-->
      <el-form-item label="性别 1：男   2：女">
        <el-input v-model="student.sex"/>
      </el-form-item>
      <!--出生年月日-->
      <el-form-item label="出生年月日">
        <el-input v-model="student.birth"/>
      </el-form-item>
      <!--毕业日期-->
      <el-form-item label="毕业日期">
        <el-input v-model="student.graduateDate"/>
      </el-form-item>
      <!--班级-->
      <el-form-item label="班级">
        <el-input v-model="student.clazz"/>
      </el-form-item>
      <!--部门id-->
      <el-form-item label="部门id">
        <el-input v-model="student.departmentId"/>
      </el-form-item>
      <!--手机号-->
      <el-form-item label="手机号">
        <el-input v-model="student.mobile"/>
      </el-form-item>
      <!--微信openid-->
      <el-form-item label="微信openid">
        <el-input v-model="student.wxId"/>
      </el-form-item>
      <!--头像地址-->
      <el-form-item label="头像地址">
        <el-input v-model="student.avatar"/>
      </el-form-item>
      <!--个性签名-->
      <el-form-item label="个性签名">
        <el-input v-model="student.sign"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
        <el-button type="primary" @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import studentApi from '@/api/person/student'

export default {
  name: 'StudentFrom',
  data() {
    return {
      // 数据
      student: {
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
      if (!this.student.id) {
        this.saveData()
      } else {
        this.updateData()
      }
      this.saveBtnDisabled = false
    },

    // 数据新增
    saveData() {
      studentApi.save(this.student).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/student/index' })
      }).catch(this.saveBtnDisabled = false)
    },

    // 数据更新
    updateData() {
      studentApi.updateById(this.student).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/student/list' })
      })
    },
    // 根据id查询数据
    getDataById(id) {
      studentApi.getById(id).then(response => {
        this.student = response.data.item
      })
    }
  }
}
</script>

<style scoped>
</style>
