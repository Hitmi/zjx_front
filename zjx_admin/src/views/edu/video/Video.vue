<template>
  <div class="app-container">
    <!--工具按钮-->
    <div style="margin-bottom: 10px">

      <el-button type="danger" size="mini" @click="batchRemove">批量删除</el-button>
      <router-link :to="'/video/create'">
        <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline">添加</el-button>
      </router-link>
      <el-button type="primary" size="mini" icon="el-icon-search" @click="searchVisible = true">数据过滤</el-button>
      <a :href="BASE_API + '/admin/edu/video/export'">
        <el-button size="mini" type="primary" icon="el-icon-download">下载数据</el-button>
      </a>
      <a href="/static/excelTemplate/VideoList模板.xlsx">
        <el-button size="mini" type="primary" icon="el-icon-document-copy">下载模板</el-button>
      </a>
      <el-upload
        :limit="1"
        :file-list="fileList"
        :on-error="uploadError"
        :on-success="uploadSuccess"
        :action="BASE_API + '/admin/edu/video/upload'"
        class="upload-demo"
        style="display:inline;">
        <el-button size="mini" type="primary" icon="el-icon-upload2">导入数据</el-button>
      </el-upload>
    </div>

    <!--查询表单-->
    <el-drawer
      :visible.sync="searchVisible"
      direction="rtl"
      size="30%">
      <template v-slot="title">
        <h2 style="color: #409EFF"><i class="el-icon-search" style="margin-bottom: 30px"/>数据过滤</h2>
      </template>
      <video-search @click-get-data="filterData"/>
    </el-drawer>

    <!-- 表格 -->
    <el-table :data="list" border stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection"/>
      <el-table-column
        label="#"
        width="50">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="courseId" label="课程ID" width="100" align="center"/>
      <el-table-column prop="chapterId" label="章节ID" width="100" align="center"/>
      <el-table-column prop="title" label="节点名称" width="100" align="center"/>
      <el-table-column prop="videoSourceId" label="云端视频资源" width="100" align="center"/>
      <el-table-column prop="videoOriginalName" label="原始文件名称" width="100" align="center"/>
      <el-table-column prop="sort" label="排序字段" width="100" align="center"/>
      <el-table-column prop="playCount" label="播放次数" width="100" align="center"/>
      <el-table-column prop="free" label="是否可以试听：0收费 1免费" width="100" align="center"/>
      <el-table-column prop="duration" label="视频时长（秒）" width="100" align="center"/>
      <el-table-column prop="status" label="状态" width="100" align="center"/>
      <el-table-column prop="size" label="视频源文件大小（字节）" width="100" align="center"/>
      <el-table-column prop="version" label="乐观锁" width="100" align="center"/>

      <el-table-column label="操作" width="250" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="showDialog(scope.row.id)">查看</el-button>
          <router-link :to="'/video/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button
            size="mini"
            type="danger"
            @click="removeById(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20]"
      style="padding: 30px 0; text-align: center"
      layout="sizes, prev, pager, next, jumper, ->, total"
      @current-change="changeCurrentPage"
      @size-change="changePageSize"/>

    <!--弹出窗口，用于显示详细信息-->
    <el-dialog :visible.sync="dialogTableVisible" title="详细信息" width="400px" center>
      <video-detail :video="video"/>
    </el-dialog>

  </div>
</template>

<script>
import videoApi from '@/api/edu/video'
import VideoSearch from '@/views/edu/video/VideoSearch'
import VideoDetail from '@/views/edu/video/VideoDetail'

export default {

  components: { VideoDetail, VideoSearch },

  data() {
    return {
      list: [], // 课程视频列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      searchObj: {
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
      }, // 查询表单
      multipleSelection: [], // 批量删除选中的记录列表
      fileList: [],
      dialogTableVisible: false,
      searchVisible: false,
      BASE_API: process.env.BASE_API,
      // 讲师对象
      video: {
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
  },
  created() {
    this.getData()
  },

  methods: {
    // 显示详细信息弹窗
    showDialog(id) {
      this.dialogTableVisible = true
      videoApi.getById(id).then(response => {
        this.video = response.data.item
      })
    },
    // 导入excel失败后调用
    uploadError(err) {
      console.log('uploadError', err)
    },
    // 导入excel成功后调用
    uploadSuccess(response) {
      console.log('uploadSuccess', response)
      this.fileList = []
      this.getData()
    },
    // 调用api模块，加载 课程视频 列表数据
    getData() {
      videoApi.pageList(this.page, this.limit, this.searchObj).then(response => {
        this.list = response.data.list
        this.total = response.data.total
      })
    },
    filterData(data) {
      videoApi.pageList(this.page, this.limit, data).then(response => {
        this.list = response.data.list
        this.total = response.data.total
      })
    },
    // 改编页码
    changeCurrentPage(page) {
      this.page = page
      this.getData()
    },

    // 改变每页记录数
    changePageSize(size) {
      console.log('changePageSize:' + size)
      this.limit = size
      this.getData()
    },

    // 重置表单
    resetData() {
      this.searchObj = {}
      this.getData()
    },

    // 删除记录
    removeById(id) {
      // 询问是否删除
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return videoApi.removeById(id)
      }).then(response => {
        // 刷新页面
        this.getData()
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
      }).catch((err) => {
        console.log(err)
        if (err === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      })
    },
    batchRemove() {
      console.log('removeRows......')

      if (this.multipleSelection.length === 0) {
        this.$message.warning('请选择要删除的记录！')
        return
      }

      this.$confirm('此操作将永久批量删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定，远程调用ajax
        // 遍历selection，将id取出放入id列表
        var idList = []
        this.multipleSelection.forEach(item => {
          idList.push(item.id)
        })
        // 调用api
        return videoApi.batchRemove(idList)
      }).then((response) => {
        this.getData()
        this.$message.success(response.message)
      }).catch(error => {
        if (error === 'cancel') {
          this.$message.info('取消删除')
        }
      })
    },
    // 当多选选项发生变化的时候调用
    handleSelectionChange(selection) {
      console.log(selection)
      this.multipleSelection = selection
    }
  }
}
</script>
