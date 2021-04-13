<template>
  <!--弹出窗口，用于显示详细信息-->
  <div style="text-align: center;font-size: 16px">
    <el-row>
      订单号：{{ order.orderNo }}
    </el-row>
    <el-row>
      ：{{ order.courseId }}
    </el-row>
    <el-row>
      ：{{ order.courseTitle }}
    </el-row>
    <el-row>
      ：{{ order.teacherName }}
    </el-row>
    <el-row>
      ：{{ order.studentId }}
    </el-row>
    <el-row>
      ：{{ order.studentName }}
    </el-row>
    <el-row>
      选课状态 1:已选 2:：{{ order.status }}
    </el-row>
    <el-row>
      逻辑删除 1（true）已删除， 0（false）未删除：{{ order.isDeleted }}
    </el-row>
  </div>
</template>

<script>
import orderApi from '@/api/trade/order'

export default {
  name: 'OrderDetail',
  props: {// 讲师对象
    order: {
      type: Object,
      default: function() {
        return {
          id: '',
          orderNo: '',
          courseId: '',
          courseTitle: '',
          teacherName: '',
          studentId: '',
          studentName: '',
          status: '',
          isDeleted: ''
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
      orderApi.getById(id).then(response => {
        this.order = response.data.item
      })
    }
  }
}
</script>
