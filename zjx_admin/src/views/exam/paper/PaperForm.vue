<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <!--创建者id-->
      <el-form-item label="创建者id">
        <el-input v-model="paper.creatorId"/>
      </el-form-item>
      <!--修改者id-->
      <el-form-item label="修改者id">
        <el-input v-model="paper.updatorId"/>
      </el-form-item>
      <!--试卷名称-->
      <el-form-item label="试卷名称">
        <el-input v-model="paper.name"/>
      </el-form-item>
      <!--创建者名称-->
      <el-form-item label="创建者名称">
        <el-input v-model="paper.creator"/>
      </el-form-item>
      <!--修改者名称-->
      <el-form-item label="修改者名称">
        <el-input v-model="paper.updator"/>
      </el-form-item>
      <!--试卷描述-->
      <el-form-item label="试卷描述">
        <el-input v-model="paper.description"/>
      </el-form-item>
      <!--考试时长-->
      <el-form-item label="考试时长">
        <el-input v-model="paper.duration"/>
      </el-form-item>
      <!--题目总数-->
      <el-form-item label="题目总数">
        <el-input v-model="paper.questionCount"/>
      </el-form-item>
      <!--单选题数量-->
      <el-form-item label="单选题数量">
        <el-input v-model="paper.singleCount"/>
      </el-form-item>
      <!--多选题数量-->
      <el-form-item label="多选题数量">
        <el-input v-model="paper.multipleCount"/>
      </el-form-item>
      <!--判断题数量-->
      <el-form-item label="判断题数量">
        <el-input v-model="paper.judgeCount"/>
      </el-form-item>
      <!--考试开始时间-->
      <el-form-item label="考试开始时间">
        <el-input v-model="paper.startTime"/>
      </el-form-item>
      <!--考试截止时间-->
      <el-form-item label="考试截止时间">
        <el-input v-model="paper.endTime"/>
      </el-form-item>
      <!--是否启用 0:禁用 1:启用-->
      <el-form-item label="是否启用 0:禁用 1:启用">
        <el-input v-model="paper.active"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
        <el-button type="primary" @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import paperApi from '@/api/exam/paper'

export default {
  name: 'PaperForm',
  data() {
    return {
      // 数据
      paper: {
        creatorId: '',
        updatorId: '',
        name: '',
        creator: '',
        updator: '',
        description: '',
        duration: '',
        questionCount: '',
        singleCount: '',
        multipleCount: '',
        judgeCount: '',
        startTime: '',
        endTime: '',
        active: ''
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
      if (!this.paper.id) {
        this.saveData()
      } else {
        this.updateData()
      }
      this.saveBtnDisabled = false
    },

    // 数据新增
    saveData() {
      paperApi.save(this.paper).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/paper/index' })
      }).catch(this.saveBtnDisabled = false)
    },

    // 数据更新
    updateData() {
      paperApi.updateById(this.paper).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/paper/list' })
      })
    },
    // 根据id查询数据
    getDataById(id) {
      paperApi.getById(id).then(response => {
        this.paper = response.data.item
      })
    }
  }
}
</script>

<style scoped>
</style>
