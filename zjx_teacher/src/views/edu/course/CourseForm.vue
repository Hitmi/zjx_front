<template>
  <div class="app-container">

    <!-- 步骤导航 -->
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="active" finish-status="success" simple style="margin-bottom: 40px">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="发布课程" />
    </el-steps>

    <!-- 步骤内容 -->
    <!-- step1：Info -->
    <info v-if="active === 0" />

    <!-- step2：ChapterIndex -->
    <chapter v-if="active === 1" />

    <!-- step3：Publish -->
    <publish v-if="active === 2 || active === 3" />

  </div>
</template>

<script>
import Info from '@/views/edu/course/components/Info'
import Chapter from '@/views/edu/course/components/Chapter' // 找Chapter.vue 或 Chapter/Index.vue
import Publish from '@/views/edu/course/components/Publish'
import courseApi from '@/api/edu/course'

export default {
  name: 'CourseFrom',

  components: { Info, Chapter, Publish }, // 注册子组件

  data() {
    return {
      active: 0,
      courseId: null,
      // 数据
      course: {
        teacher: '',
        department: '',
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
    // 通过获取路由名称 判断进入哪个步骤
    if (this.$route.name === 'CourseEdit') {
      this.courseId = this.$route.params.id
      this.active = 0
    } else if (this.$route.name === 'ChapterEdit') {
      this.courseId = this.$route.params.id
      this.active = 1
    }
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
      // courseApi.getById(id).then(response => {
      //   this.course = response.data.item
      // })
    }
  }
}
</script>

<style scoped>
</style>
