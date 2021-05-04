<template>
  <!--弹出窗口，用于显示详细信息-->
  <div style="text-align: center;font-size: 16px">
    {{ course }}
  </div>
</template>

<script>

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
  }
}
</script>
