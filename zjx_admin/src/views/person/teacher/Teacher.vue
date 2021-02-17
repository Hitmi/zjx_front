<template>
  <div class="app-container">
    <!-- 工具按钮 -->
    <div style="margin-bottom: 10px">

      <el-button type="danger" size="mini" @click="batchRemove">批量删除</el-button>
      <router-link :to="'/teacher/create'">
        <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline">添加</el-button>
      </router-link>
      <el-button type="primary" size="mini" icon="el-icon-search" @click="showSearch = true">数据过滤</el-button>
      <a :href="BASE_API + '/admin/person/teacher/export'">
        <el-button size="mini" type="primary" icon="el-icon-download">下载数据</el-button>
      </a>
      <a href="/static/excelTemplate/TeacherList模板.xlsx">
        <el-button size="mini" type="primary" icon="el-icon-document-copy">下载模板</el-button>
      </a>
      <el-upload
        :limit="1"
        :file-list="fileList"
        :on-error="uploadError"
        :on-success="uploadSuccess"
        :action="BASE_API + '/admin/person/teacher/upload'"
        class="upload-demo"
        style="display:inline;">
        <el-button size="mini" type="primary" icon="el-icon-upload2">导入数据</el-button>
      </el-upload>
    </div>

    <!--查询表单-->
    <el-drawer
      :visible.sync="showSearch"
      direction="rtl"
      size="30%">
      <template v-slot="title">
        <h2 style="color: #409EFF"><i class="el-icon-search" style="margin-bottom: 30px"/>数据过滤</h2>
      </template>
      <teacher-search @click-get-data="getData"/>
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
      <el-table-column prop="name" label="姓名" width="100" align="center"/>
      <el-table-column prop="level" label="头衔" width="100" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.level === 1">教授</el-tag>
          <el-tag v-if="scope.row.level === 2">副教授</el-tag>
          <el-tag v-if="scope.row.level === 3">讲师</el-tag>
          <el-tag v-if="scope.row.level === 4">工程师</el-tag>
          <el-tag v-if="scope.row.level === 5">高级工程师</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="60" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sex === 1">男</el-tag>
          <el-tag v-if="scope.row.sex === 2">女</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="介绍" align="center"/>
      <el-table-column label="操作" width="250" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="showDialog(scope.row.id)">查看</el-button>
          <router-link :to="'/teacher/edit/'+scope.row.id">
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
      <teacher-detail :teacher="teacher"/>
    </el-dialog>

  </div>
</template>

<script>
import teacherApi from '@/api/person/teacher'
import departmentApi from '@/api/person/department'
import TeacherSearch from '@/views/person/teacher/TeacherSearch'
import TeacherDetail from '@/views/person/teacher/TeacherDetail'

export default {

  components: { TeacherDetail, TeacherSearch },

  data() {
    return {
      list: [], // 讲师列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      searchObj: {
        name: '',
        level: '',
        departmentId: ''
      }, // 查询表单
      multipleSelection: [], // 批量删除选中的记录列表
      departmentList: [], // 部门列表
      fileList: [],
      dialogTableVisible: false,
      BASE_API: process.env.BASE_API,
      // 讲师对象
      teacher: {
        id: '',
        name: '',
        sex: 1,
        birth: '',
        departmentId: '',
        avatar: '',
        intro: '',
        level: ''
      },
      showSearch: false
    }
  },

  created() {
    this.getDepartment()
    this.getData()
  },

  methods: {
    // 显示详细信息弹窗
    showDialog(id) {
      this.dialogTableVisible = true
      teacherApi.getById(id).then(response => {
        this.teacher = response.data.item
      })
    },
    // 导入excel失败后调用
    uploadError(err) {
      console.log(err)
    },
    // 导入excel成功后调用
    uploadSuccess() {
      this.fileList = []
      this.getData()
    },
    // 调用api模块，加载讲师列表
    getData(data) {
      teacherApi.pageList(this.page, this.limit, data).then(response => {
        this.list = response.data.list
        this.total = response.data.total
      })
    },
    // 获取部门信息
    getDepartment() {
      departmentApi.list().then(response => {
        this.departmentList = response.data.list
      })
    },
    // 改编页码
    changeCurrentPage(page) {
      console.log('changeCurrentPage:' + page)
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
        return teacherApi.removeById(id)
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
        return teacherApi.batchRemove(idList)
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
