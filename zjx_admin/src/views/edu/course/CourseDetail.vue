<template>
  <!--弹出窗口，用于显示详细信息-->
  <div style="text-align: center;font-size: 16px">
    {{ course }}
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
          teacher: '',
          department: '',
          title: '',
          lessonNum: '',
          credit: '',
          description: '',
          cover: '',
          status: ''
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
