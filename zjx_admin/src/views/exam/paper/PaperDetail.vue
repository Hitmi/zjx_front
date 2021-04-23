<template>
  <!--弹出窗口，用于显示详细信息-->
  <div style="text-align: center;font-size: 16px">
    <el-row>
      创建者id：{{ paper.creatorId }}
    </el-row>
    <el-row>
      修改者id：{{ paper.updatorId }}
    </el-row>
    <el-row>
      试卷名称：{{ paper.name }}
    </el-row>
    <el-row>
      创建者名称：{{ paper.creator }}
    </el-row>
    <el-row>
      修改者名称：{{ paper.updator }}
    </el-row>
    <el-row>
      试卷描述：{{ paper.description }}
    </el-row>
    <el-row>
      考试时长：{{ paper.duration }}
    </el-row>
    <el-row>
      题目总数：{{ paper.questionCount }}
    </el-row>
    <el-row>
      单选题数量：{{ paper.singleCount }}
    </el-row>
    <el-row>
      多选题数量：{{ paper.multipleCount }}
    </el-row>
    <el-row>
      判断题数量：{{ paper.judgeCount }}
    </el-row>
    <el-row>
      考试开始时间：{{ paper.startTime }}
    </el-row>
    <el-row>
      考试截止时间：{{ paper.endTime }}
    </el-row>
    <el-row>
      是否启用 0:禁用 1:启用：{{ paper.active }}
    </el-row>
  </div>
</template>

<script>
import paperApi from '@/api/exam/paper'

export default {
  name: 'PaperDetail',
  props: {// 讲师对象
    paper: {
      type: Object,
      default: function() {
        return {
          id: '',
          creatorId: '',
          updatorId: '',
          name: '',
          creator: '',
          updator: '',
          description: '',
          duration: '',
          questionCount: '',
          singleCount: '',
          multipleCount: '',
          judgeCount: '',
          startTime: '',
          endTime: '',
          active: ''
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
      paperApi.getById(id).then(response => {
        this.paper = response.data.item
      })
    }
  }
}
</script>
