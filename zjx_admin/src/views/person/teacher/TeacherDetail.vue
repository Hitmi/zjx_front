<template>
  <!--弹出窗口，用于显示详细信息-->
  <div style="text-align: center;font-size: 16px">
    <el-row :span="4">
      <el-image
        :src="teacher.avatar"
        style="width: 100px; height: 100px"/>
    </el-row>
    <el-row>
      <label>姓名：{{ teacher.name }}</label>
    </el-row>
    <el-row>
      <label>性别：</label>
      <label v-if="teacher.sex === 1">男</label>
      <label v-if="teacher.sex === 2">女</label>
    </el-row>
    <el-row>
      <label>出生年月日：{{ student.birth }}</label>
    </el-row>
  </div>
</template>

<script>
import teacherApi from '@/api/person/teacher'
import departmentApi from '@/api/person/department'

export default {
  name: 'TeacherDetail',
  props: {// 讲师对象
    teacher: {
      type: Object,
      default: function() {
        return {
          id: '',
          name: '',
          sex: 1,
          birth: '',
          departmentId: '',
          avatar: '',
          intro: '',
          level: ''
        }
      }
    }
  },
  data() {
    return {
      departmentList: [] // 部门列表
    }
  },
  created() {
    this.getDataById(this.$route.params.id)
  },
  methods: {
    // 获取部门信息
    getDepartment() {
      departmentApi.list().then(response => {
        this.departmentList = response.data.list
      })
    },
    // 根据id查询数据
    getDataById(id) {
      teacherApi.getById(id).then(response => {
        this.teacher = response.data.item
      })
    }
  }
}
</script>
