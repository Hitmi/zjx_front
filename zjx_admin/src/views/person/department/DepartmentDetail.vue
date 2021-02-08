<template>
  <!--弹出窗口，用于显示详细信息-->
  <div style="text-align: center;font-size: 16px">
    <el-row>
      部门名：{{ department.name }}
    </el-row>
    <el-row>
      父部门id：{{ department.parentId }}
    </el-row>
    <el-row>
      是否为某学科专业 0/1{{ department.major }}
    </el-row>
  </div>
</template>

<script>
import departmentApi from '@/api/person/department'

export default {
  name: 'DepartmentDetail',
  props: {// 讲师对象
    department: {
      type: Object,
      default: function() {
        return {
          id: '',
          name: '',
          parentId: '',
          major: ''
        }
      }
    }
  },
  data() {
    return {
    }
  },
  created() {
    this.getDataById(this.$route.params.id)
  },
  methods: {
    // 根据id查询数据
    getDataById(id) {
      departmentApi.getById(id).then(response => {
        this.department = response.data.item
      })
    }
  }
}
</script>
