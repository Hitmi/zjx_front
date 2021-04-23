<template>
  <!--弹出窗口，用于显示详细信息-->
  <div style="text-align: center;font-size: 16px">
    <el-row>
      试题题目,最多50汉字(100字节)：{{ question.title }}
    </el-row>
    <el-row>
      试题类型 0:单选 1:多选 2:判断：{{ question.type }}
    </el-row>
    <el-row>
      试题答案：{{ question.answer }}
    </el-row>
  </div>
</template>

<script>
import questionApi from '@/api/exam/question'

export default {
  name: 'QuestionDetail',
  props: {// 讲师对象
    question: {
      type: Object,
      default: function() {
        return {
          id: '',
          title: '',
          type: '',
          answer: ''
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
      questionApi.getById(id).then(response => {
        this.question = response.data.item
      })
    }
  }
}
</script>
