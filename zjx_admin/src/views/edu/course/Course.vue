<template>
  <div class="app-container">
    <!--工具按钮-->
    <div style="margin-bottom: 10px">

      <el-button type="danger" size="mini" @click="batchRemove">批量删除</el-button>
      <router-link :to="'/course/create'">
        <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline">添加</el-button>
      </router-link>
      <el-button type="primary" size="mini" icon="el-icon-search" @click="showsearch">数据过滤</el-button>
    </div>

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

      <el-table-column prop="cover" label="封面" width="100" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.cover"/>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="课程名" width="200" align="center"/>
      <el-table-column prop="teacher" label="主讲老师" width="100" align="center"/>
      <el-table-column prop="department" label="课程所属部门" width="100" align="center"/>
      <el-table-column prop="status" label="课程状态" width="100" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0">启用</el-tag>
          <el-tag v-if="scope.row.status === 2">禁用</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="500" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="showDialog(scope.row.id)">查看</el-button>
          <router-link :to="'/course/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改课程信息</el-button>
          </router-link>
          <router-link :to="'/chapter/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改章节信息</el-button>
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
    <!-- <el-dialog :visible.sync="dialogTableVisible" title="详细信息" width="400px" center>
      <course-detail :course="course"/>
    </el-dialog> -->
     <el-dialog
  title="课程详情"
  :visible.sync="dialogTableVisible"
  width="50%">
     <div class="courseDetail">
       <span>课程名称：{{course.title}}</span>
     </div>
     <div class="courseDetail">
       <span>主讲老师：{{course.teacher}}</span>
     </div>
     <div class="courseDetail">
       <span>课程学分：{{course.credit}}</span>
     </div>
     <div class="courseDetail">
       <span>课时：{{course.lessonNum}}</span>
     </div>
     <div class="courseDetail">
       <span>课程描述：{{course.description}}</span>
     </div>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import courseApi from '@/api/edu/course'
import CourseSearch from '@/views/edu/course/CourseSearch'
import CourseDetail from '@/views/edu/course/CourseDetail'

export default {

  components: { CourseDetail, CourseSearch },

  data() {
    return {
      list: [], // 列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      searchObj: {
        title: '',
        status: ''
      }, // 查询表单
      multipleSelection: [], // 批量删除选中的记录列表
      fileList: [],
      dialogTableVisible: false,
      searchVisible: true,
      BASE_API: process.env.BASE_API,
      // 讲师对象
      course: {
        id: '',
        teacher: '',
        department: '',
        title: '',
        lessonNum: '',
        credit: '',
        description: '',
        cover: '',
        status: ''
      }
    }
  },
  created() {
    this.getData()
  },

  methods: {
    showsearch(){
      this.searchVisible=true;
    },
    // 显示详细信息弹窗
    showDialog(id) {
      this.dialogTableVisible = true
      courseApi.getById(id).then(response => {
        this.course = response.data.item
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
    // 调用api模块，加载  列表数据
    getData() {
      courseApi.pageList(this.page, this.limit, this.searchObj).then(response => {
        this.list = response.data.list
        this.total = response.data.total
      })
    },
    filterData(data) {
      courseApi.pageList(this.page, this.limit, data).then(response => {
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
        return courseApi.removeById(id)
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
        return courseApi.batchRemove(idList)
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
<style scoped>
.courseDetail{
  font-size: 17px;
  margin:15px 0;
}
</style>