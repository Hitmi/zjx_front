<template>
  <div class="app-container">

    <!-- 课程信息表单 -->
    <el-form label-width="120px">

      <el-form-item label="课程名">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
      </el-form-item>

      <!-- 课程讲师 -->
      <el-form-item label="课程主讲老师">
        <el-autocomplete
          v-model="teacherName"
          :fetch-suggestions="querySearchForTeacher"
          placeholder="请输入内容"
          value-key="name"
          @select="handleTeacherSelect"/>
      </el-form-item>

      <!-- 课程所属部门 -->
      <el-form-item label="课程所属部门">
        <el-autocomplete
          v-model="departmentName"
          :fetch-suggestions="querySearchForDepartment"
          placeholder="请输入内容"
          value-key="name"
          @select="handleDepartmentSelect"/>
      </el-form-item>

      <el-form-item label="总课时">
        <el-input :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
      </el-form-item>

      <el-form-item label="课程学分">
        <el-input :min="0" v-model="courseInfo.credit" controls-position="right" placeholder="请填写课程的学分"/>
      </el-form-item>

      <!-- 课程简介-->
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description"/>
      </el-form-item>

      <!-- 课程封面 -->
      <el-form-item label="课程封面">
        <el-upload
          :show-file-list="false"
          :on-success="handleCoverSuccess"
          :before-upload="beforeCoverUpload"
          :on-error="handleCoverError"
          :action="ALIYUN_API + '/admin/aliyun/oss/upload?module=cover'"
          class="cover-uploader">
          <img v-if="courseInfo.cover" :src="courseInfo.cover">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>
    </el-form>

    <div style="text-align:center">
      <el-button :disabled="saveBtnDisabled" type="primary" @click="saveAndNext()">保存并下一步</el-button>
    </div>
  </div>
</template>

<script>
import courseApi from '@/api/edu/course'
import teacherApi from '@/api/person/teacher'
import departmentApi from '@/api/person/department'
// 富文本编辑器
import Tinymce from '@/components/Tinymce'
import { isEmpty } from '@/utils/validate'

export default {

  components: { Tinymce },

  data() {
    return {
      BASE_API: process.env.BASE_API,
      ALIYUN_API: process.env.ALIYUN_API,
      saveBtnDisabled: false, // 按钮是否禁用
      teacherName: '',
      departmentName: '',
      courseInfo: {// 表单数据
        title: '',
        credit: 0,
        lessonNum: 0,
        // 以下解决表单数据不全时insert语句非空校验
        teacherId: '',
        departmentId: '',
        cover: 'https://codeyi.oss-cn-beijing.aliyuncs.com/img/20210218191743.png',
        description: ''
      },
      teacherList: [], // 讲师列表
      departmentList: [] // 一级分类
    }
  },

  created() {
    // courseId来源于父组件
    if (this.$parent.courseId) { // 回显
      this.fetchCourseInfoById(this.$parent.courseId)
    }
    this.initDepartmentList()
    this.initTeacherList()
  },

  methods: {
    // 根据教师id和部门id获取教师名和部门名
    getNameById() {
      teacherApi.getById(this.courseInfo.teacherId).then(response => {
        this.teacherName = response.data.item.name
      })
      departmentApi.getById(this.courseInfo.departmentId).then(response => {
        this.departmentName = response.data.item.name
      })
    },
    // 远程搜索输入框选择某项时的event
    handleTeacherSelect(item) {
      this.courseInfo.teacherId = item.id
    },
    handleDepartmentSelect(item) {
      this.courseInfo.departmentId = item.id
    },
    // 远程搜索信息
    querySearchForDepartment(queryString, cb) {
      const departments = this.departmentList
      const results = queryString ? departments.filter(this.createFilter(queryString)) : departments
      cb(results)
    },
    querySearchForTeacher(queryString, cb) {
      const teachers = this.teacherList
      const results = queryString ? teachers.filter(this.createFilter(queryString)) : teachers
      cb(results)
    },
    createFilter(queryString) {
      return (item) => {
        return (item.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // 根据id获取课程基本信息
    fetchCourseInfoById(id) {
      courseApi.getUpdate(id).then(response => {
        this.courseInfo = response.data.item
        console.log(this.courseInfo);
        this.getNameById()
      })
    },

    // 获取讲师列表
    initTeacherList() {
      teacherApi.list().then(response => {
        this.teacherList = response.data.list
      })
    },

    // 获取课程分类列表
    initDepartmentList() {
      departmentApi.list().then(response => {
        this.departmentList = response.data.list
      })
    },

    // 保存并下一步
    saveAndNext() {
      this.saveBtnDisabled = true
      if (isEmpty(this.courseInfo.teacherId) || isEmpty(this.courseInfo.departmentId)) {
        this.$message.error('任课教师和所属部门应该从建议列表中选择')
        this.saveBtnDisabled = false
      } else {
        console.log(this.courseInfo.teacherId);
        if (!this.$parent.courseId) {
          this.saveData()
        } else {
          this.updateData()
        }
      }
    },

    // 保存课程信息
    saveData() {
      courseApi.save(this.courseInfo).then(response => {
        this.$message.success(response.message)
        console.log(response);
        this.$parent.courseId = response.data.courseId // 获取courseId
        this.$parent.active = 1 // 下一步 访问父组件的成员 $parent
      }).catch(() => {
        this.saveBtnDisabled = true
      })
    },

    // 更新课程信息
    updateData() {
      courseApi.updateById(this.courseInfo).then(response => {
        this.$message.success(response.message)
        this.$parent.active = 1
      }).catch(() => {
        this.saveBtnDisabled = true
      })
    },

    // 上传成功回调
    handleCoverSuccess(res, file) {
      if (res.success) {
        // console.log(res)
        this.courseInfo.cover = res.data.url
        // 强制重新渲染
        this.$forceUpdate()
      } else {
        this.$message.error('上传失败1（非20000）')
      }
    },

    // 上传校验
    beforeCoverUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    // 错误处理
    handleCoverError() {
      console.log('error')
      this.$message.error('上传失败（http错误）')
    }
  }
}
</script>

<style>
.tinymce-container {
  position: relative;
  line-height: normal;
}

.cover-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.cover-uploader .el-upload:hover {
  border-color: #409EFF;
}
.cover-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 640px;
  height: 357px;
  line-height: 357px;
  text-align: center;
}
.cover-uploader img {
  width: 640px;
  height: 357px;
  display: block;
}
</style>
