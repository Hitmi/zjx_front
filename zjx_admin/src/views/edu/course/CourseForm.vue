<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <!--课程主讲老师id-->
      <el-form-item label="课程主讲老师id">
        <el-input v-model="course.teacherId"/>
      </el-form-item>
      <!--课程所属部门id-->
      <el-form-item label="课程所属部门id">
        <el-input v-model="course.departmentId"/>
      </el-form-item>
      <!--课程名-->
      <el-form-item label="课程名">
        <el-input v-model="course.title"/>
      </el-form-item>
      <!--课程总课时-->
      <el-form-item label="课程总课时">
        <el-input v-model="course.lessonNum"/>
      </el-form-item>
      <!--课程学分-->
      <el-form-item label="课程学分">
        <el-input v-model="course.credit"/>
      </el-form-item>
      <!--课程简介id-->
      <el-form-item label="课程简介id">
        <el-input v-model="course.descriptionId"/>
      </el-form-item>
      <!--课程封面-->
      <el-form-item label="课程封面">
        <el-input v-model="course.cover"/>
      </el-form-item>
      <!--课程状态 1：启用 2：禁用-->
      <el-form-item label="课程状态 1：启用 2：禁用">
        <el-input v-model="course.status"/>
      </el-form-item>
      <!--乐观锁-->
      <el-form-item label="乐观锁">
        <el-input v-model="course.version"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
        <el-button type="primary" @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import courseApi from '@/api/edu/course'

export default {
  name: 'CourseFrom',
  data() {
    return {
      // 数据
      course: {
        teacherId: '',
        departmentId: '',
        title: '',
        lessonNum: '',
        credit: '',
        descriptionId: '',
        cover: '',
        status: '',
        version: ''
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
      if (!this.course.id) {
        this.saveData()
      } else {
        this.updateData()
      }
      this.saveBtnDisabled = false
    },

    // 数据新增
    saveData() {
      courseApi.save(this.course).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/course/index' })
      }).catch(this.saveBtnDisabled = false)
    },

    // 数据更新
    updateData() {
      courseApi.updateById(this.course).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/course/list' })
      })
    },
    // 根据id查询数据
    getDataById(id) {
      courseApi.getById(id).then(response => {
        this.course = response.data.item
      })
    }
  }
}
</script>

<style scoped>
</style>
