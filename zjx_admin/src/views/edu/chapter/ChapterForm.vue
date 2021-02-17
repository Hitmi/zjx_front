<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <!--章节名字-->
      <el-form-item label="章节名字">
        <el-input v-model="chapter.title"/>
      </el-form-item>
      <!--课程id-->
      <el-form-item label="课程id">
        <el-input v-model="chapter.courseId"/>
      </el-form-item>
      <!--章节id-->
      <el-form-item label="章节id">
        <el-input v-model="chapter.parentId"/>
      </el-form-item>
      <!--排序,数字越大越重要-->
      <el-form-item label="排序,数字越大越重要">
        <el-input v-model="chapter.sort"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
        <el-button type="primary" @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import chapterApi from '@/api/edu/chapter'

export default {
  name: 'ChapterFrom',
  data() {
    return {
      // 数据
      chapter: {
        title: '',
        courseId: '',
        parentId: '',
        sort: ''
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
      if (!this.chapter.id) {
        this.saveData()
      } else {
        this.updateData()
      }
      this.saveBtnDisabled = false
    },

    // 数据新增
    saveData() {
      chapterApi.save(this.chapter).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/chapter/index' })
      }).catch(this.saveBtnDisabled = false)
    },

    // 数据更新
    updateData() {
      chapterApi.updateById(this.chapter).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/chapter/list' })
      })
    },
    // 根据id查询数据
    getDataById(id) {
      chapterApi.getById(id).then(response => {
        this.chapter = response.data.item
      })
    }
  }
}
</script>

<style scoped>
</style>
