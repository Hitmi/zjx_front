<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="学生头像">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-error="handleAvatarError"
          :action="BASE_API + '/admin/oss/file/upload?module=avatar'"
          class="avatar-uploader">
          <img v-if="student.avatar" :src="student.avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>
      <!--学生姓名-->
      <el-form-item label="学生姓名">
        <el-input v-model="student.name"/>
      </el-form-item>
      <!--账号-->
      <el-form-item label="学生学号">
        <el-input v-model="student.username"/>
      </el-form-item>
      <!--密码-->
      <el-form-item label="密码">
        <el-input v-model="student.password" type="password"/>
      </el-form-item>
      <!--性别 1：男   2：女-->
      <el-form-item label="性别">
        <el-select v-model="student.sex">
          <el-option :value="1" label="男"/>
          <el-option :value="0" label="女"/>
        </el-select>
      </el-form-item>
      <!--出生年月日-->
      <el-form-item label="出生年月日">
        <el-date-picker v-model="student.birth" value-format="yyyy-MM-dd"/>
      </el-form-item>
      <!--毕业日期-->
      <el-form-item label="毕业日期">
        <el-date-picker v-model="student.graduateDate" value-format="yyyy-MM-dd"/>
      </el-form-item>
      <!--部门id-->
      <el-form-item label="所属部门">
        <el-select v-model="student.departmentId">
          <el-option
            v-for="item in departmentList"
            :key="item.id"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </el-form-item>
      <!--手机号-->
      <el-form-item label="手机号">
        <el-input v-model="student.mobile" placeholder="请输入内容"/>
      </el-form-item>
      <!--个性签名-->
      <el-form-item label="个性签名">
        <el-input v-model="student.sign" :rows="10" type="textarea"/>
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
import departmentApi from '@/api/person/department'

export default {
  name: 'StudentFrom',
  data() {
    return {
      // 数据
      student: {
        name: '',
        username: '',
        password: '',
        sex: '',
        birth: '',
        graduateDate: '',
        clazz: '',
        departmentId: '',
        mobile: '',
        wxId: '',
        avatar: 'https://oss.aliyuncs.com/aliyun_id_photo_bucket/default_handsome.jpg',
        sign: ''
      },
      BASE_API: process.env.BASE_API,
      saveBtnDisabled: false, // 按钮是否可用，默认可用
      departmentList: [] // 部门列表
    }
  },

  created() {
    this.getDepartment()
    if (this.$route.params.id) {
      this.getDataById(this.$route.params.id)
    }
  },
  methods: {
    // 获取部门信息
    getDepartment() {
      departmentApi.list().then(response => {
        this.departmentList = response.data.list
      })
    },
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
        this.$router.push({ path: '/student/index' })
      })
    },
    // 根据id查询数据
    getDataById(id) {
      studentApi.getById(id).then(response => {
        this.student = response.data.item
      })
    },
    // 上传成功回调
    handleAvatarSuccess(res, file) {
      // console.log(res)
      this.teacher.avatar = res.data.url
      // 强制重新渲染
      this.$forceUpdate()
    },
    // 上传校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      return isJPG && isLt10M
    },
    // 文件上传错误处理
    handleAvatarError() {
      console.log('error')
      this.$message.error('上传失败（http失败）')
    }
  }
}
</script>

<style scoped>
</style>
