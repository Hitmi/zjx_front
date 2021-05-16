<template>
  <!--弹出窗口，用于显示详细信息-->
  <div style="font-size: 17px">
    <div class="TextRow">
      <span>学生姓名：</span><span class="TextDetail">{{student.name}}</span>
    </div>
    <div class="TextRow">
      <span>性别：</span>
      <span v-if="student.sex" class="TextDetail">男</span>
      <span v-else class="TextDetail">女</span>
    </div>
    <div class="TextRow">
      <span>出生年月日：</span><span class="TextDetail">{{student.birth}}</span>
    </div>
    <div class="TextRow">
      <span>毕业日期：</span><span class="TextDetail">{{student.graduateDate}}</span>
    </div>
    <!-- <div class="TextRow">
      <span>班级：</span><span class="TextDetail">{{student.clazz}}</span>
    </div> -->
    <div class="TextRow">
      <span>部门id：</span><span class="TextDetail">{{student.departmentId}}</span>
    </div>
    <div class="TextRow">
      <span>手机号：</span><span class="TextDetail">{{student.mobile}}</span>
    </div>
    <div class="TextRow">
      <span>个性签名：</span> <span class="TextDetail">{{student.sign}}</span>
    </div>
    <!-- <el-row>
      学生姓名：{{ student.name }}
    </el-row>
    <el-row>
      性别 1：男 0：女：{{ student.sex }}
    </el-row>
    <el-row>
      出生年月日：{{ student.birth }}
    </el-row>
    <el-row>
      毕业日期：{{ student.graduateDate }}
    </el-row>
    <el-row>
      班级：{{ student.clazz }}
    </el-row>
    <el-row>
      部门id：{{ student.departmentId }}
    </el-row>
    <el-row>
      手机号：{{ student.mobile }}
    </el-row>
    <el-row>
      微信openid：{{ student.wxId }}
    </el-row>
    <el-row>
      头像地址：{{ student.avatar }}
    </el-row>
    <el-row>
      个性签名：{{ student.sign }}
    </el-row> -->
  </div>
</template>

<script>

export default {
  name: 'StudentDetail',
  props: {// 讲师对象
    student: {
      type: Object,
      default: function() {
        return {
          id: '',
          name: '',
          sex: '',
          birth: '',
          graduateDate: '',
          clazz: '',
          departmentId: '',
          mobile: '',
          wxId: '',
          avatar: '',
          sign: ''
        }
      }
    }
  }
}
</script>
<style >
.TextRow{
  margin:  15px 0;
}
.TextDetail{
  margin-left: 20px;
  line-height: 20px;
}
</style>
