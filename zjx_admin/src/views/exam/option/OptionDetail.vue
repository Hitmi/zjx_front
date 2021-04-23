<template>
  <!--弹出窗口，用于显示详细信息-->
  <div style="text-align: center;font-size: 16px">
    <el-row>
      试题id：{{ option.questionId }}
    </el-row>
    <el-row>
      选项名称：{{ option.name }}
    </el-row>
    <el-row>
      选项内容：{{ option.content }}
    </el-row>
  </div>
</template>

<script>
import optionApi from '@/api/exam/option'

export default {
  name: 'OptionDetail',
  props: {// 讲师对象
    option: {
      type: Object,
      default: function() {
        return {
          id: '',
          questionId: '',
          name: '',
          content: ''
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
      optionApi.getById(id).then(response => {
        this.option = response.data.item
      })
    }
  }
}
</script>
