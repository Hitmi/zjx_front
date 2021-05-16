<template>
  <div class="app-container">

    <!-- 表格 -->
    <el-table :data="list" border stripe>
      <el-table-column
        label="序号"
        width="50">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

<<<<<<< HEAD
      <el-table-column prop="title" label="课程名" width="150" align="center"/>
      <el-table-column prop="teacherName" label="任课教师" width="150" align="center"/>
      <el-table-column prop="credit" label="课程学分" width="200" align="center" />
      <el-table-column prop="lessonNum" label="课程课时" width="200" align="center" />
      <el-table-column prop="startData" label="开始时间" width="200" align="center" />
      <el-table-column prop="endData" label="结束时间" width="200" align="center" />
      <el-table-column prop="stock" label="剩余可选" width="200" align="center" />
=======
      <el-table-column align="center" label="课程名" prop="title" width="150"/>
      <el-table-column align="center" label="任课教师" prop="teacherName" width="150"/>
      <el-table-column align="center" label="课程学分" prop="credit" width="200"/>
      <el-table-column align="center" label="课程课时" prop="lessonNum" width="200"/>
      <el-table-column align="center" label="剩余可选" prop="stock" width="200"/>
>>>>>>> e4986a1aa0c9ef0a1d7c05f2c6bc4ea5b426dc8b

      <el-table-column align="center" fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="select(scope.row)">选择</el-button>
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
import courseApi from '@/api/trade/course'

export default {
  name: 'Course',

  data() {
    return {
      list: [], // 列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 20, // 每页记录数
      BASE_API: process.env.BASE_API,
      // 选课信息
      pickForm: {
        id: '',
        courseTitle: '',
        courseId: '',
        teacherName: ''
      }
    }
  },
  created() {
    this.getData()
  },

  methods: {
    // 调用api模块，加载  列表数据
    getData() {
      courseApi.pageList(this.page, this.limit).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        console.log(response);
      })
    },
    // 发送选课请求
    select(row) {
      // todo 选择按钮置为60s禁用

      // todo 对row数据做一个抽取封装成pickForm

      courseApi.select(row).then(response => {
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
      console.log('changePageSize:' + size)
      this.limit = size
      this.getData()
    }
  }
}
</script>
