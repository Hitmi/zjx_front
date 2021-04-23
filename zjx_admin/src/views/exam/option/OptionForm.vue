<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <!--试题id-->
      <el-form-item label="试题id">
        <el-input v-model="option.questionId"/>
      </el-form-item>
      <!--选项名称-->
      <el-form-item label="选项名称">
        <el-input v-model="option.name"/>
      </el-form-item>
      <!--选项内容-->
      <el-form-item label="选项内容">
        <el-input v-model="option.content"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
        <el-button type="primary" @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import optionApi from '@/api/exam/option'

export default {
  name: 'OptionForm',
  data() {
    return {
      // 数据
      option: {
        questionId: '',
        name: '',
        content: ''
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
      if (!this.option.id) {
        this.saveData()
      } else {
        this.updateData()
      }
      this.saveBtnDisabled = false
    },

    // 数据新增
    saveData() {
      optionApi.save(this.option).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/option/index' })
      }).catch(this.saveBtnDisabled = false)
    },

    // 数据更新
    updateData() {
      optionApi.updateById(this.option).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/option/list' })
      })
    },
    // 根据id查询数据
    getDataById(id) {
      optionApi.getById(id).then(response => {
        this.option = response.data.item
      })
    }
  }
}
</script>

<style scoped>
</style>
