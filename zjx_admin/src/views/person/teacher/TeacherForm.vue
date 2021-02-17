<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-error="handleAvatarError"
          :action="BASE_API + '/admin/oss/file/upload?module=avatar'"
          class="avatar-uploader">
          <img v-if="teacher.avatar" :src="teacher.avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>
      <el-form-item label="教师姓名">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="teacher.username"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="teacher.password" type="password"/>
      </el-form-item>
      <!--性别-->
      <el-form-item label="性别">
        <el-select v-model="teacher.sex">
          <el-option :value="1" label="男"/>
          <el-option :value="2" label="女"/>
        </el-select>
      </el-form-item>
      <!--出生年月日-->
      <el-form-item label="出生年月日">
        <el-date-picker v-model="teacher.birth" value-format="yyyy-MM-dd"/>
      </el-form-item>
      <el-form-item label="部门">
        <el-select v-model="teacher.departmentId">
          <el-option
            v-for="item in departmentList"
            :key="item.id"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level">
          <el-option :value="1" label="教授"/>
          <el-option :value="2" label="副教授"/>
          <el-option :value="3" label="讲师"/>
          <el-option :value="4" label="工程师"/>
          <el-option :value="5" label="高级工程师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="介绍">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="cancel()">取消</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from '@/api/person/teacher'
import departmentApi from '@/api/person/department'
import { isEmpty, isPastTime } from '@/utils/validate'

export default {

  data() {
    return {
      // 讲师对象
      teacher: {
        id: '',
        name: '',
        sex: 1,
        birth: '',
        departmentId: '',
        avatar: 'https://oss.aliyuncs.com/aliyun_id_photo_bucket/default_handsome.jpg',
        intro: '',
        level: '',
        username: '',
        password: ''
      },
      saveBtnDisabled: false, // 默认按钮可用
      BASE_API: process.env.BASE_API,
      departmentList: [] // 部门列表
    }
  },

  created() {
    this.getDepartment()
    if (this.$route.params.id) {
      this.fetchDataById(this.$route.params.id)
    }
  },

  methods: {
    // 获取部门信息
    getDepartment() {
      departmentApi.list().then(response => {
        this.departmentList = response.data.list
      })
    },
    cancel() {
      this.$router.back(-1)
    },
    saveOrUpdate() {
      this.saveBtnDisabled = true
      if (isEmpty(this.teacher.name)) {
        this.$message({
          message: '姓名不能为空',
          type: 'error'
        })
      } else if (isPastTime(this.birth)) {
        this.$message({
          message: '出生年月日必须为一天前的时间',
          type: 'error'
        })
      } else {
        if (!this.teacher.id) {
          this.saveData()
        } else {
          this.updateData()
        }
      }
      this.saveBtnDisabled = false
    },

    // 数据保存
    saveData() {
      teacherApi.save(this.teacher).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/teacher/index' })
      }).catch(this.saveBtnDisabled = false)
    },

    // 数据更新
    updateData() {
      teacherApi.updateById(this.teacher).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/teacher/list' })
      })
    },

    // 根据id查询数据
    fetchDataById(id) {
      teacherApi.getById(id).then(response => {
        this.teacher = response.data.item
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

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar-uploader img {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
