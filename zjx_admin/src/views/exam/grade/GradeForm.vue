<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <!--试卷id-->
      <el-form-item label="试卷id">
        <el-input v-model="grade.paperId"/>
      </el-form-item>
      <!--所属学生的id-->
      <el-form-item label="所属学生的id">
        <el-input v-model="grade.studentId"/>
      </el-form-item>
      <!--所属学生的姓名-->
      <el-form-item label="所属学生的姓名">
        <el-input v-model="grade.studentName"/>
      </el-form-item>
      <!--考试得分-->
      <el-form-item label="考试得分">
        <el-input v-model="grade.score"/>
      </el-form-item>
      <!--参加考试的时间-->
      <el-form-item label="参加考试的时间">
        <el-input v-model="grade.joinTime"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
        <el-button type="primary" @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import gradeApi from '@/api/exam/grade'

export default {
  name: 'GradeForm',
  data() {
    return {
      // 数据
      grade: {
        paperId: '',
        studentId: '',
        studentName: '',
        score: '',
        joinTime: ''
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
      if (!this.grade.id) {
        this.saveData()
      } else {
        this.updateData()
      }
      this.saveBtnDisabled = false
    },

    // 数据新增
    saveData() {
      gradeApi.save(this.grade).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/grade/index' })
      }).catch(this.saveBtnDisabled = false)
    },

    // 数据更新
    updateData() {
      gradeApi.updateById(this.grade).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/grade/list' })
      })
    },
    // 根据id查询数据
    getDataById(id) {
      gradeApi.getById(id).then(response => {
        this.grade = response.data.item
      })
    }
  }
}
</script>

<style scoped>
</style>
