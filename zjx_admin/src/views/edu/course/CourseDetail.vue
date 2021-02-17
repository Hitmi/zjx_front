<template>
  <!--弹出窗口，用于显示详细信息-->
  <div style="text-align: center;font-size: 16px">
    <el-row>
      课程主讲老师id：{{ course.teacherId }}
    </el-row>
    <el-row>
      课程所属部门id：{{ course.departmentId }}
    </el-row>
    <el-row>
      课程名：{{ course.title }}
    </el-row>
    <el-row>
      课程总课时：{{ course.lessonNum }}
    </el-row>
    <el-row>
      课程学分：{{ course.credit }}
    </el-row>
    <el-row>
      课程简介id：{{ course.descriptionId }}
    </el-row>
    <el-row>
      课程封面：{{ course.cover }}
    </el-row>
    <el-row>
      课程状态 1：启用 2：禁用：{{ course.status }}
    </el-row>
    <el-row>
      乐观锁：{{ course.version }}
    </el-row>
  </div>
</template>

<script>
import courseApi from '@/api/edu/course'

export default {
  name: 'CourseDetail',
  props: {// 讲师对象
    course: {
      type: Object,
      default: function() {
        return {
          id: '',
          teacherId: '',
          departmentId: '',
          title: '',
          lessonNum: '',
          credit: '',
          descriptionId: '',
          cover: '',
          status: '',
          version: ''
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
      courseApi.getById(id).then(response => {
        this.course = response.data.item
      })
    }
  }
}
</script>
