<template>
  <div class="app-container">
    <!--工具按钮-->
    <div style="margin-bottom: 10px">
      <!-- <a :href="BASE_API + '/admin/person/setting/export'">
        <el-button size="mini" type="primary" icon="el-icon-download">下载数据</el-button>
      </a> -->
    </div>

    <!-- 表格 -->
    <el-table :data="list" border stripe>
      <el-table-column prop="avatar" label="头像" width="150" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="150" align="center"/>
      <el-table-column prop="sex" label="性别" width="100" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sex === 1">男</el-tag>
          <el-tag v-else>女</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="个人介绍" width="750" align="center"/>
      <el-table-column label="操作" width="150" fixed="right" align="center">
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

    <!--弹出窗口，用于显示详细信息-->
    <el-dialog :visible.sync="dialogTableVisible" title="详细信息" width="650px" center>
      <info-detail :teacher="teacher"/>
    </el-dialog>

  </div>
</template>

<script>
import departmentApi from '@/api/person/department'
import InfoDetail from '@/views/person/info/InfoDetail'
import teacherApi from '@/api/person/teacher'
export default {

  components: { InfoDetail },

  data() {
    return {
      list: [], // 列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      dialogTableVisible: false,
      teacher:{},
      BASE_API: process.env.BASE_API
    }
  },
  created() {
    this.getData()
  },

  methods: {
    // 显示详细信息弹窗
    showDialog(id) {
      console.log(id);
      this.dialogTableVisible = true
      teacherApi.getById(id).then(response => {
        console.log(response);
        this.teacher = response.data.item
      })
    },
    // 调用api模块，加载  列表数据
    getData() {
      departmentApi.getDatumList(this.page, this.limit).then(response => {
         console.log(response);
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
    }
  }
}
</script>
