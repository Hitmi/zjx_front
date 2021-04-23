<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <!--试题题目,最多50汉字(100字节)-->
      <el-form-item label="试题题目,最多50汉字(100字节)">
        <el-input v-model="question.title"/>
      </el-form-item>
      <!--试题类型 0:单选 1:多选 2:判断-->
      <el-form-item label="试题类型 0:单选 1:多选 2:判断">
        <el-input v-model="question.type"/>
      </el-form-item>
      <!--试题答案-->
      <el-form-item label="试题答案">
        <el-input v-model="question.answer"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
        <el-button type="primary" @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import questionApi from '@/api/exam/question'

export default {
  name: 'QuestionForm',
  data() {
    return {
      // 数据
      question: {
        title: '',
        type: '',
        answer: ''
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
      if (!this.question.id) {
        this.saveData()
      } else {
        this.updateData()
      }
      this.saveBtnDisabled = false
    },

    // 数据新增
    saveData() {
      questionApi.save(this.question).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/question/index' })
      }).catch(this.saveBtnDisabled = false)
    },

    // 数据更新
    updateData() {
      questionApi.updateById(this.question).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/question/list' })
      })
    },
    // 根据id查询数据
    getDataById(id) {
      questionApi.getById(id).then(response => {
        this.question = response.data.item
      })
    }
  }
}
</script>

<style scoped>
</style>
