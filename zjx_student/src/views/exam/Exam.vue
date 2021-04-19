<template>
  <div class="app-container">
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

      <el-table-column prop="name" label="姓名" width="150" align="center"/>
      <el-table-column prop="sex" label="性别" width="100" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sex === 1">男</el-tag>
          <el-tag v-if="scope.row.sex === 2">女</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="birth" label="出生年月日" width="200" align="center"/>
      <el-table-column prop="graduateDate" label="毕业日期" width="200" align="center"/>
      <el-table-column prop="clazz" label="班级" width="150" align="center"/>
      <el-table-column prop="mobile" label="手机号" width="150" align="center"/>

      <el-table-column label="操作" width="250" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="showDialog(scope.row.id)">查看</el-button>
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
  </div>
</template>

<script>
import infoApi from '@/api/person/department'

export default {
  name: 'Exam',

  data() {
    return {
      list: [], // 列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      BASE_API: process.env.BASE_API
    }
  },
  created() {
    this.getData()
  },

  methods: {
    // 显示详细信息弹窗
    showDialog(id) {
      this.dialogTableVisible = true
      infoApi.getById(id).then(response => {
        this.student = response.data.item
      })
    },
    // 调用api模块，加载  列表数据
    getData() {
      console.log('getData>>>', this.searchObj)

      infoApi.pageList(this.page, this.limit, this.searchObj).then(response => {
        this.list = response.data.list
        this.total = response.data.total
      })
    },
    filterData(data) {
      console.log('filterData>>>', data)
      infoApi.pageList(this.page, this.limit, data).then(response => {
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
    }
  }
}
</script>
