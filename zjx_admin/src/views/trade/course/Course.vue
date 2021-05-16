<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-button type="success"  @click="selectlist" class="btn01" size="mini"
      >批量选择可选课程</el-button
    >
    <el-table
      ref="multipleTable"
      :data="list"
      border stripe
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="100"> </el-table-column>
      <el-table-column prop="sequence" label="序号" width="60">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="id" label="课程id" width="200" align="center" />
      <el-table-column prop="cover" label="封面" width="150" align="center">
        <template slot-scope="scope">
          <el-image :src="scope.row.cover" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="课程名" width="300" align="center" />
      <el-table-column
        prop="teacher"
        label="授课教师"
        width="200"
        align="center"
      />
      <el-table-column
        prop="department"
        label="部门"
        width="300"
        align="center"
      />
      <!-- <el-table-column
        prop="lessonNum"
        label="课时"
        width="150"
        align="center"
      />
      <el-table-column prop="credit" label="学分" width="150" align="center" /> -->
      <!-- <el-table-column
        prop="stock"
        label="可选人数"
        width="150 "
        align="center"
      /> -->

      <el-table-column label="操作" width="250" fixed="right" align="center">
        <template slot-scope="scope">
          <!--取到当前单元格-->
          <el-button
            size="mini"
            type="info"
            @click="showDialog(scope.row.id)"
            style="width: 70px; background-color: rgb(144, 147, 153)"
            >查看</el-button
          >
          <el-button type="text" @click="onsubmit(scope)" size="mini"
            >做为可选课程</el-button
          >

          <el-dialog
            title="设置库存和时间段"
            :visible.sync="dialogVisible"
            :append-to-body="true"
            width="40%"
            style="text-align: center"
          >
            <el-form>
              <el-form-item label="可选人数" :label-width="formLabelWidth">
                <el-input
                  v-model="stock"
                  autocomplete="off"
                  class="stockinput"
                ></el-input>
              </el-form-item>
            </el-form>
            <div class="block">
              <span
                style="
                  color: rgb(102, 104, 107);
                  font-weight: 700;
                  padding: 5px;
                "
              >
                选课时间段</span
              >
              <el-date-picker
                v-model="value1"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                class="date"
              >
                <!--注意value1是不变的-->
              </el-date-picker>
            </div>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="onsubmit2(scope)"
                >确 定</el-button
              >
            </div>
          </el-dialog>
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
      width="650px"
      center
    >
      <course-detail :course="course" />
    </el-dialog>
  </div>
</template>

<script>
import courseApi from "@/api/trade/course"; //显示包括固定信息和动态的时间，库存信息
import courseApi2 from "@/api/edu/course"; //只显示固定信息
import CourseDetail from "@/views/trade/course/CourseDetail";

export default {
  components: { CourseDetail },

  data() {
    return {
      btn01: false,
      flag: false, //判断多选框有没有改变
      multipleSelection: [], //获取点击的几行
      value1: "", //选课时间段    是个数组
      value2: "", //传给后台的
      stock: "",
      dialogVisible: false, //作为选课的
      formLabelWidth: "120px",
      GenerateCourseForm: {
        //给后台传时间
        id: "",
        startData: "",
        endData: "",
        stock: "",
      },
      GenerateCourseListForm: {
        idList: [],
        startData: "",
        endData: "",
        stock: "",
      },
      list: [],
      // list: [], // 列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 10, // 每页记录数
      dialogTableVisible: false,
      BASE_API: process.env.BASE_API,
      // 讲师对象
      course: {
        title: "", //课程名
        teacher: "",
        lessonNum: "", //课时
        credit: "", //学分
        description: "",
      },
      pickForm: {
        id: "",
        courseId: "",
        courseTitle: "",
        teacherName: "",
      },
    };
  },
  created() {
    this.getData();
  },

  methods: {
    selectlist() {
      this.btn01 = true;
      if (this.flag) {
        this.dialogVisible = true;
        if (this.multipleSelection.length == 0) {
          this.dialogVisible = false;
        }
        console.log(this.multipleSelection); //这个函数要写
      } else {
      }
    },
    copyid(scope) {
      this.GenerateCourseForm.id = scope.row.id;
    },
    copyids() {
      for (var i = 0; i < this.multipleSelection.length; i++) {
        //复制获取的id列表
        this.GenerateCourseListForm.idList[i] = this.multipleSelection[i].id;
      }
    },
    copytime(scope) {
      this.GenerateCourseForm.startData = this.value1[0];
      this.GenerateCourseForm.endData = this.value1[1];
    },
    copytimes(scope) {
      this.GenerateCourseListForm.startData = this.value1[0];
      this.GenerateCourseListForm.endData = this.value1[1];
    },
    copystock() {
      this.GenerateCourseForm.stock = this.stock;
    },
    copystocks() {
      this.GenerateCourseListForm.stock = this.stock;
    },
    //打卡选择时间
    handleSelectionChange(val) {
      //列表改变时
      this.flag = true;
      this.multipleSelection = val;
    }, //多选
    onsubmit(scope) {
      this.copyid(scope); //复制时间
      this.dialogVisible = true;
    },
    onsubmit2(scope) {
      this.dialogVisible = false; //先退出
      console.log(this.value1);
      if (this.btn01) {
        //多选
        this.copyids();
        this.copytimes();
        this.copystocks();
        console.log(this.GenerateCourseListForm);
        courseApi
          .generateCourseList(this.GenerateCourseListForm)
          .then((res) => {
            console.log(res);
            this.$message({
              message: "操作成功",
              type: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        //点击确定输入的时间就拿到了
        this.copytime(scope);
        this.copystock();
        // console.log(this.GenerateCourseForm);
        // let list = JSON.parse(JSON.stringify(this.GenerateCourseForm));
        // console.log(list); //每一个对应的id都正确
        courseApi
          .generateCourse(this.GenerateCourseForm)
          .then((res) => {
            console.log(res);
            console.log(this.GenerateCourseForm);
            this.$message({
              message: "操作成功",
              type: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    updatecourse(GenerateCourseForm) {},
    // 显示详细信息弹窗
    showDialog(id) {
      courseApi2
        .getById(id)
        .then((res) => {
          this.course = res.data.item;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      this.$route.params.course = this.course; //在这里就把course的数据搞好，给子组件，因为子组件不能修改course
      // console.log(this.$route.params);   //路由跳转把id传给另一个
      this.dialogTableVisible = true;
    },
    // 调用api模块，加载  列表数据
    getData() {
      courseApi2
        .pageList(this.page, this.limit, this.searchObj)
        .then((response) => {
          console.log(response);
          this.list = response.data.list;
          this.total = response.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    filterData(data) {
      courseApi2.pageList(this.page, this.limit, data).then((response) => {
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
      this.limit = size;
      this.getData();
    },
    selectById(row) {
      this.pickForm.id = row.id;
      this.pickForm.courseId = row.courseId;
      this.pickForm.courseTitle = row.title;
      this.pickForm.teacherName = row.teacherName;
      courseApi.select(this.pickForm).then((response) => {
        this.$message(response.message);
      });
    },
  },
};
</script>
<style scoped>
.stockinput {
  width: 90%;
  margin-left: 0px;
}
.date {
  margin-left: 25px;
  width: 70%;
}
button {
  color: white;
  background-color: rgba(64, 158, 255);
  width: 100px;
  height: 35px;
  border-radius: 4px;
  border: 0.1px solid #f5f5f579;
  outline: none;
}
.btn01 {
  background-color: rgb(103, 194, 58);
  width: 150px;
  margin-bottom: 10px;
  margin-top: 10px;
}
.btn01:hover {
  background-color: white;
  color: rgb(103, 194, 58);
  width: 150px;
}
.block {
  text-align: center;
}
.dialog-footer {
  text-align: center;
}
</style>
