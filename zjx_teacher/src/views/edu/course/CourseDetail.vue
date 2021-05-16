<template>
  <!--弹出窗口，用于显示详细信息-->
   <div style="text-align: left;font-size: 16px ;">

    <el-row style="width:100%;">
      <td class="attribute">课程名：</td> <td class="value">{{ course.title }}</td> 
    </el-row>
        <el-row style="width:100%;">
       <td class="attribute">主讲老师：</td> <td class="value" >{{ course.teacher}}</td>
    </el-row>
    <el-row style="width:100%;">
      <td class="attribute">课时：</td><td class="value">{{ course.lessonNum }}</td>
    </el-row>
    <el-row style="width:100%;">
      <td class="attribute">学分：</td><td class="value">{{ course.credit }}</td>
    </el-row>
        <el-row style="width:100%;">
      <td class="attribute">课程描述：</td><td class="value">{{ course.description }}</td>
    </el-row>
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
<style scoped>
.attribute{
  width: 100px;
  text-align: right;
  padding: 10px;
}
.value{
  width: 400px;
  text-align: left;
  padding: 10px;
}
</style>