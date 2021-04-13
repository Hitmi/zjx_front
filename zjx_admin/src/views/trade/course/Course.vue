<template>
  <div class="app-container">

    <!-- 表格 -->
    <el-table :data="list" border stripe>
      <el-table-column
        label="#"
        width="50">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="课程名" width="300" align="center"/>
      <el-table-column prop="teacherName" label="授课教师" width="200" align="center"/>
      <el-table-column prop="lessonNum" label="课时" width="150" align="center"/>
      <el-table-column prop="credit" label="学分" width="150" align="center"/>
      <el-table-column prop="stock" label="库存" width="150 " align="center"/>

      <el-table-column label="操作" width="250" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="showDialog(scope.row.id)">查看</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="selectById(scope.row)">选择
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
      <course-detail :course="course"/>
    </el-dialog>

  </div>
</template>

<script>
import courseApi from '@/api/trade/course'
import CourseDetail from '@/views/trade/course/CourseDetail'

export default {

  components: { CourseDetail },

  data() {
    return {
      list: [], // 列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      dialogTableVisible: false,
      BASE_API: process.env.BASE_API,
      // 讲师对象
      course: {
        id: '',
        courseId: '',
        title: '',
        lessonNum: '',
        credit: '',
        stock: '',
        startData: '',
        endData: '',
        version: ''
      },
      pickForm: {
        id: '',
        courseId: '',
        courseTitle: '',
        teacherName: ''
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
      courseApi.getById(id).then(response => {
        this.course = response.data.item
      })
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
      this.limit = size
      this.getData()
    },
    selectById(row) {
      this.pickForm.id = row.id
      this.pickForm.courseId = row.courseId
      this.pickForm.courseTitle = row.title
      this.pickForm.teacherName = row.teacherName
      courseApi.select(this.pickForm).then(response => {
        this.$message(response.message)
      })
    }
  }
}
</script>
