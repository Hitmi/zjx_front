<template>
  <!--弹出窗口，用于显示详细信息-->
  <div style="text-align: center;font-size: 16px">
    <el-row>
      课程id：{{ course.courseId }}
    </el-row>
    <el-row>
      课程名：{{ course.title }}
    </el-row>
    <el-row>
      课时：{{ course.lessonNum }}
    </el-row>
    <el-row>
      学分：{{ course.credit }}
    </el-row>
    <el-row>
      库存：{{ course.stock }}
    </el-row>
    <el-row>
      开始时间：{{ course.startData }}
    </el-row>
    <el-row>
      结束时间：{{ course.endData }}
    </el-row>
    <el-row>
      乐观锁：{{ course.version }}
    </el-row>
  </div>
</template>

<script>
import courseApi from '@/api/trade/course'

export default {
  name: 'CourseDetail',
  props: {// 讲师对象
    course: {
      type: Object,
      default: function() {
        return {
          id: '',
          courseId: '',
          title: '',
          lessonNum: '',
          credit: '',
          stock: '',
          startData: '',
          endData: '',
          version: ''
        }
      }
    }
  },
  data() {
    return {
    }
  },
  mounted() {
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
