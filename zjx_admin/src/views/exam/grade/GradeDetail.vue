<template>
  <!--弹出窗口，用于显示详细信息-->
  <div style="text-align: center;font-size: 16px">
    <el-row>
      试卷id：{{ grade.paperId }}
    </el-row>
    <el-row>
      所属学生的id：{{ grade.studentId }}
    </el-row>
    <el-row>
      所属学生的姓名：{{ grade.studentName }}
    </el-row>
    <el-row>
      考试得分：{{ grade.score }}
    </el-row>
    <el-row>
      参加考试的时间：{{ grade.joinTime }}
    </el-row>
  </div>
</template>

<script>
import gradeApi from '@/api/exam/grade'

export default {
  name: 'GradeDetail',
  props: {// 讲师对象
    grade: {
      type: Object,
      default: function() {
        return {
          id: '',
          paperId: '',
          studentId: '',
          studentName: '',
          score: '',
          joinTime: ''
        }
      }
    }
  },
  data() {
    return {}
  },
  created() {
    this.getDataById(this.$route.params.id)
  },
  methods: {
    // 根据id查询数据
    getDataById(id) {
      gradeApi.getById(id).then(response => {
        this.grade = response.data.item
      })
    }
  }
}
</script>
