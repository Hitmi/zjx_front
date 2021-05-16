<template>
  <!-- 工具按钮 -->
  <div style="margin-bottom: 10px">

    <el-button size="mini" type="danger" @click="this.$emit('batchClick')">批量删除</el-button>
    <router-link :to="route_to">
      <el-button icon="el-icon-circle-plus-outline" size="mini" type="primary">添加</el-button>
    </router-link>
    <a :href="export_url">
      <el-button icon="el-icon-download" size="mini" type="primary">下载数据</el-button>
    </a>
    <a :href="download_url">
      <el-button icon="el-icon-download" size="mini" type="primary">下载模板</el-button>
    </a>
    <el-upload
      :action="upload_url"
      :file-list="file_list"
      :limit="1"
      :on-error="uploadError"
      :on-success="uploadSuccess"
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
