<template>
  <!--弹出窗口，用于显示详细信息-->
  <div style="font-size: 16px">
    <!-- <el-row :span="4">
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
      <label>出生年月日：{{ teacher.birth }}</label>
    </el-row>
    <el-row>
      <label>{{ teacher }}</label>
    </el-row> -->
    <div class="TeacherAvatar">
      <el-image  :src="teacher.avatar" style="width: 100px; height: 100px" />
    </div>
    <div class="TextRow">
      <span>姓名：</span><span class="TextDetail">{{teacher.name}}</span>
    </div>
    <div class="TextRow">
      <span>性别：</span><span class="TextDetail" v-if="teacher.sex === 1">男</span><span class="TextDetail" v-else>女</span>
    </div>
    <div class="TextRow">
      <span>头衔：</span>
      <span class="TextDetail" v-if="teacher.level === 1">教授</span>
      <span class="TextDetail" v-if="teacher.level === 2">副教授</span>
      <span class="TextDetail" v-if="teacher.level === 3">讲师</span>
      <span class="TextDetail" v-if="teacher.level === 4">工程师</span>
      <span class="TextDetail" v-if="teacher.level === 5">高级工程师</span>
    </div>
    <div class="TextRow">
      <span>所属部门id：</span><span class="TextDetail">{{teacher.departmentId}}</span>
    </div>
        <div class="TextRow">
      <span>所属部门：</span><span class="TextDetail">{{departmentName}}</span>
    </div>
    <div class="TextRow">
      <span>出生年月日：</span><span class="TextDetail">{{teacher.birth}}</span>
    </div>
    <div class="TextRow">
      <span>个人信息介绍：</span><span class="TextDetail">{{teacher.intro}}</span>
    </div>
    <div>

    </div>
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
          username: '',
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
      departmentList: [], // 部门列表
      departmentName: ''
    }
  },
  mounted() {
     this.getDepartmentById(this.teacher.departmentId);
     
     //this.getDataById(this.teacher.id);  //教师的信息已经拿到 不需要了
  },
  methods: {
    // 获取部门信息
    getDepartment() {
      departmentApi.list().then(response => {
        this.departmentList = response.data.list
        console.log("部门信息",this.departmentList);
      })
    },
    // 根据教师id查询数据
    getDataById(id) {
      teacherApi.getById(id).then(response => {
        // this.teacher = response.data.item
        console.log(response);
      })
    },
    // 根据部门id查询部门信息
    getDepartmentById(id) {
      departmentApi.getById(id).then(response => {
        console.log("部门对象：",response);
        this.departmentName = response.data.item.name
        console.log("部门名:",this.departmentName);
        console.log("教师对象",this.teacher);
      })
    }
  }
}
</script>
<style>
.TeacherAvatar{
  text-align: center;
}
.TextRow{
  margin: 10px 0;
}
</style>