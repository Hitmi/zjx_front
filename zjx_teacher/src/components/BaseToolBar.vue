<template>
  <!-- 工具按钮 -->
  <div style="margin-bottom: 10px">

    <el-button type="danger" size="mini" @click="this.$emit('batchClick')">批量删除</el-button>
    <router-link :to="route_to">
      <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline">添加</el-button>
    </router-link>
    <a :href="export_url">
      <el-button size="mini" type="primary" icon="el-icon-download">下载数据</el-button>
    </a>
    <a :href="download_url">
      <el-button size="mini" type="primary" icon="el-icon-download">下载模板</el-button>
    </a>
    <el-upload
      :limit="1"
      :file-list="file_list"
      :on-error="uploadError"
      :on-success="uploadSuccess"
      :action="upload_url"
      class="upload-demo"
      style="display:inline;">
      <el-button size="mini" type="primary">导入数据</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'BaseToolBar',
  props: {
    export_url: {
      type: String,
      default: ''
    },
    download_url: {
      type: String,
      default: ''
    },
    upload_url: {
      type: String,
      default: ''
    },
    route_to: {
      type: String,
      default: ''
    }

  },
  data() {
    return {
      file_list: []
    }
  },
  prop: ['export_url', 'download_url', 'upload_url', 'route_to'],
  methods: {
    // 导入excel失败后调用
    uploadError(response) {
      console.log(response)
    },
    // 导入excel成功后调用
    uploadSuccess(err) {
      console.log(err)
      this.fileList = []
    }
  }
}
</script>

<style scoped>

</style>
