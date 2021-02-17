<template>
  <!--弹出窗口，用于显示详细信息-->
  <div style="text-align: center;font-size: 16px">
    <el-row>
      章节名字：{{ chapter.title }}
    </el-row>
    <el-row>
      课程id：{{ chapter.courseId }}
    </el-row>
    <el-row>
      章节id：{{ chapter.parentId }}
    </el-row>
    <el-row>
      排序,数字越大越重要：{{ chapter.sort }}
    </el-row>
  </div>
</template>

<script>
import chapterApi from '@/api/edu/chapter'

export default {
  name: 'ChapterDetail',
  props: {// 讲师对象
    chapter: {
      type: Object,
      default: function() {
        return {
          id: '',
          title: '',
          courseId: '',
          parentId: '',
          sort: ''
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
      chapterApi.getById(id).then(response => {
        this.chapter = response.data.item
      })
    }
  }
}
</script>
