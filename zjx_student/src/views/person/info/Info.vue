<template>
  <div class="app-container">
    <!--工具按钮-->
    <div style="margin-bottom: 10px">
      <a :href="BASE_API + '/admin/person/info/export'">
        <el-button size="mini" type="primary" icon="el-icon-download"
          >下载数据</el-button
        >
      </a>
    </div>

    <!-- 表格 -->
    <el-table :data="list" border stripe>
      <el-table-column prop="avatar" label="头像" width="150" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.avatar" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="150" align="center" />
      <el-table-column prop="sex" label="性别" width="100" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.sex === 1">男</el-tag>
          <el-tag v-if="scope.row.sex === 0">女</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="intro"
        label="个人介绍"
        width="750"
        align="center"
      />
      <el-table-column label="操作" width="150" fixed="right" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="showdetails(scope.row)"
            >查看</el-button
          >
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
      @size-change="changePageSize"
    />

    <!--弹出窗口，用于显示详细信息-->
    <el-dialog
      :visible.sync="dialogTableVisible"
      title="详细信息"
      width="800px"
      center
    >
      <!--查看的内容-->
      <form action="">
        <table>
          <tr class="rows">
            <td class="cows1">姓名 :</td>
            <td class="cows2">{{ form.name }}</td>
          </tr>
          <tr class="rows">
            <td class="cows1">性别 :</td>
            <td class="cows2">
              <span v-if="form.sex == 1">男</span><span v-else>女</span>
            </td>
          </tr>
          <tr class="rows">
            <td class="cows1">学号 :</td>
            <td class="cows2">{{ form.username }}</td>
          </tr>
          <tr class="rows">
            <td class="cows1">所在班级 :</td>
            <td class="cows2">{{ form.department }}</td>
          </tr>
          <tr class="rows">
            <td class="cows1">出生日期 :</td>
            <td class="cows2">{{ form.birth }}</td>
          </tr>
          <tr class="rows">
            <td class="cows1">毕业日期 :</td>
            <td class="cows2">{{ form.graduateDate }}</td>
          </tr>
          <tr class="rows">
            <td class="cows1">手机号 :</td>
            <td class="cows2">{{ form.mobile }}</td>
          </tr>
        </table>
      </form>
    </el-dialog>
  </div>
</template>

<script>
import studentApi from "@/api/person/student";
import teacherApi from "@/api/person/teacher";

import departmentApi from "@/api/person/department";
import InfoDetail from "@/views/person/info/InfoDetail";

export default {
  components: { InfoDetail },

  data() {
    return {
      form: {
        name: "", //姓名
        sex: "", //性别
        username: "", //学号
        departmentId: "", //班级号
        department: "", //班级名称
        birth: "", //出生年月
        graduateDate: "", //毕业日期
        mobile: "", //手机号
      },
      list: [], // 列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      info: {},
      dialogTableVisible: false,
      BASE_API: process.env.BASE_API,
    };
  },
  created() {
    this.getData();
  },

  methods: {
    // 显示详细信息弹窗,根据username长度决定查老师还是学生,
    async showdetails(row) {
      await this.showDialog(row);
      await this.getdepartmentname(row); //异步获取班级名字
    },
    showDialog(row) {
      // console.log(row.username);
      this.dialogTableVisible = true;
      if (row.username.length === 6) {
        // 教师
        teacherApi.getById(row.id).then((response) => {
          // ...
        });
      } else if (row.username.length === 12) {
        // 学生
        return studentApi.getById(row.id).then((response) => {
          // ...
          console.log(response);
          this.form.name = response.data.item.name;
          this.form.sex = response.data.item.sex;
          this.form.username = response.data.item.username;
          this.form.departmentId = response.data.item.departmentId;
          this.form.graduateDate = response.data.item.graduateDate;
          this.form.mobile = response.data.item.mobile;
          this.form.birth = response.data.item.birth;
        });
      }
    },
    getdepartmentname(row) {
      // console.log(row);
      return departmentApi.getById(this.form.departmentId).then((response) => {
        this.form.department = response.data.item.name;
      });
    },
    // 调用api模块，加载  列表数据
    getData() {
      console.log("getData>>>", this.searchObj);

      departmentApi.getDatumList(this.page, this.limit).then((response) => {
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    // 改编页码
    changeCurrentPage(page) {
      this.page = page;
      this.getData();
    },

    // 改变每页记录数
    changePageSize(size) {
      console.log("changePageSize:" + size);
      this.limit = size;
      this.getData();
    },
  },
};
</script>
<style scoped>
table {
  width: 100%;
}
.rows {
  width: 100%;
  border: 1px solid black;
}
.cows1 {
  width: 50%;
  padding-right: 10px;
  text-align: right;
}
.cows2 {
  width: 50%;
}
</style>
