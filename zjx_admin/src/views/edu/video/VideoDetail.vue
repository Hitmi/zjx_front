<template>
  <!--弹出窗口，用于显示详细信息-->
  <div style="text-align: center;font-size: 16px">
    <el-row>
      课程ID：{{ video.courseId }}
    </el-row>
    <el-row>
      章节ID：{{ video.chapterId }}
    </el-row>
    <el-row>
      节点名称：{{ video.title }}
    </el-row>
    <el-row>
      云端视频资源：{{ video.videoSourceId }}
    </el-row>
    <el-row>
      原始文件名称：{{ video.videoOriginalName }}
    </el-row>
    <el-row>
      排序字段：{{ video.sort }}
    </el-row>
    <el-row>
      播放次数：{{ video.playCount }}
    </el-row>
    <el-row>
      是否可以试听：0收费 1免费：{{ video.free }}
    </el-row>
    <el-row>
      视频时长（秒）：{{ video.duration }}
    </el-row>
    <el-row>
      状态：{{ video.status }}
    </el-row>
    <el-row>
      视频源文件大小（字节）：{{ video.size }}
    </el-row>
    <el-row>
      乐观锁：{{ video.version }}
    </el-row>
  </div>
</template>

<script>
import videoApi from '@/api/edu/video'

export default {
  name: 'VideoDetail',
  props: {// 讲师对象
    video: {
      type: Object,
      default: function() {
        return {
          id: '',
          courseId: '',
          chapterId: '',
          title: '',
          videoSourceId: '',
          videoOriginalName: '',
          sort: '',
          playCount: '',
          free: '',
          duration: '',
          status: '',
          size: '',
          version: ''
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
      videoApi.getById(id).then(response => {
        this.video = response.data.item
      })
    }
  }
}
</script>
