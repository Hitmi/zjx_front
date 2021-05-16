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

      <el-table-column align="center" label="课程名" prop="title" width="150"/>
      <el-table-column align="center" label="任课教师" prop="teacherName" width="150"/>
      <el-table-column align="center" label="课程学分" prop="credit" width="200"/>
      <el-table-column align="center" label="课程 课时" prop="lessonNum" width="200"/>

      <el-table-column align="center" fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="get(scope.row)">查看</el-button>
          <el-button size="mini" type="info" @click="quit(scope.row)">退选</el-button>

        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :page-sizes="[10, 20, 50]"
      :total="total"
      layout="sizes, prev, pager, next, jumper, ->, total"
      style="padding: 30px 0; text-align: center"
      @current-change="changeCurrentPage"
      @size-change="changePageSize"/>

  </div>
</template>

<script>
import eduCourseApi from '@/api/edu/course'
import orderApi from '@/api/trade/order'

export default {
  name: 'Course',

  data() {
    return {
      list: [], // 列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 20, // 每页记录数
      BASE_API: process.env.BASE_API
    }
  },
  created() {
    this.getData()
  },

  methods: {
    // 调用api模块，加载  列表数据
    getData() {
      orderApi.pageList(this.page, this.limit).then(response => {
        this.list = response.data.list
        this.total = response.data.total
      })
    },
    // 获取课程详细信息
    get(row) {
      eduCourseApi.getById(row.courseId).then(response => {
      })
    },
    // 发送退课请求
    quit(row) {
      orderApi.remove(row.id).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
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
    }
  }
}
</script>
