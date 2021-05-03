<template>
  <!--弹出窗口，用于显示详细信息-->
  <div style="text-align: center;font-size: 16px">
    <el-row>
      学生姓名：{{ student.name }}
    </el-row>
    <el-row>
      性别 1：男   2：女：{{ student.sex }}
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
    </el-row>
  </div>
</template>

<script>
import infoApi from '@/api/person/department'

export default {
  name: 'InfoDetail',
  props: {// 资料信息
    info: {
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
      infoApi.getById(id).then(response => {
        this.info = response.data.item
      })
    }
  }
}
</script>
