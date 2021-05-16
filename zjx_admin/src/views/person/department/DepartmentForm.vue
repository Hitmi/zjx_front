<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <!--部门名-->
      <el-form-item label="部门名">
        <el-input v-model="department.name"/>
      </el-form-item>
      <!--父部门id-->
      <el-form-item label="父部门">
        <el-select v-model="department.parentId" placeholder="部门">
          <el-option
            v-for="item in departmentList"
            :key="item.id"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </el-form-item>
      <!--是否为某学科专业 0：不是学科专业 1：是学科专业-->
      <el-form-item label="是否为某学科专业">
        <el-select v-model="department.major" placeholder="是否为某学科专业">
          <el-option :value="false" label="否"/>
          <el-option :value="true" label="是"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
        <el-button type="primary" @click="cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import departmentApi from '@/api/person/department'

export default {
  name: 'DepartmentFrom',
  data() {
    return {
      // 数据
      department: {
        name: '',
        parentId: '',
        major: ''
      },
      saveBtnDisabled: false, // 按钮是否可用，默认可用
      departmentList: []
    }
  },

  created() {
    if (this.$route.params.id) {
      this.getDataById(this.$route.params.id)
    }
    this.getDepartment()
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
      if (!this.department.id) {
        this.saveData()
      } else {
        this.updateData()
      }
      this.saveBtnDisabled = false
    },

    // 数据新增
    saveData() {
      departmentApi.save(this.department).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/department/index' })
      }).catch(this.saveBtnDisabled = false)
    },

    // 数据更新
    updateData() {
      departmentApi.updateById(this.department).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/department/list' })
      })
    },
    // 根据id查询数据
    getDataById(id) {
      departmentApi.getById(id).then(response => {
        this.department = response.data.item
      })
    }
  }
}
</script>

<style scoped>
</style>
