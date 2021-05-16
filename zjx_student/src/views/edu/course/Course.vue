<template>
  <div class="app-container containerNew">
    <!-- 课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333 ml45">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section v-if="list.length===0" class="no-data-wrap">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，老师正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->

          <!-- 数据列表 开始-->
          <article v-if="list.length>0" class="comm-course-list coursesBox">
            <ul id="bna" class="of">
              <li v-for="item in list" :key="item.id" class="coursesli">
                <router-link :to="'/chapter/view/'+item.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="item.cover" :alt="item.title" class="img-responsive">
                    <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+item.id" :title="item.title" class="course-title fsize18 c-333">{{ item.title }}</a>
                    <span class="teacherName">——{{item.teacherName}}</span>
                  </h3>
                    <div class="cc-mask">
                      <router-link :to="'/chapter/view/'+item.id">
                        <el-button type="primary" size="medium">开始学习</el-button>
                      </router-link>

                      <el-button type="info" size="medium" @click="showDialog(item.id)" class="fr">详情</el-button>
                    </div>
                  </section>

                </div>
                </router-link>
              </li>
            </ul>
            <div class="clear"/>
          </article>
          <!-- /数据列表 结束-->
        </div>
      </section>
    </section>
    <!-- /课程列表 结束 -->
    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[6,12,18]"
      style="padding: 30px 0; text-align: center"
      layout="sizes, prev, pager, next, jumper, ->, total"
      @current-change="changeCurrentPage"
      @size-change="changePageSize"/>
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
import studentCourseApi from '@/api/edu/studentcourse'
import courseApi from '@/api/edu/course'

export default {
  data() {
    return {
      list: [], // 列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 6, // 每页记录数
      dialogTableVisible: false,
      course:{}
    }
  },
  created() {
    this.getData()
  },

  methods: {
    // 显示详细信息弹窗
    showDialog(id) {
      this.dialogTableVisible = true;
      courseApi.getById(id).then(response => {
        console.log("详情api返回结果：",response);
        this.course = response.data.item
        console.log("课程信息:",this.course);
      })
    },
    // 调用api模块，加载  列表数据
    getData() {
      studentCourseApi.pageList(this.page, this.limit).then(response => {
        console.log("获取课程",response);
        this.list=response.data.list;
        this.total = response.data.total;
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

<style>
.fr{
  float: right;
}
.img-responsive {
  width: 300px;
}
.coursesli{
  list-style: none;
  background-color: #fff;
  width: 300px;
  display: inline-block;
  margin: 50px 65px;
}
.coursesli:hover{
  box-shadow:  0px 15px 30px rgba(0,0,0,0.1);
  transform: translateY(-2px);
 	transition: all 0.2s linear;
}
.coursesBox{
  border-top: 1px solid #f5f5f5;
  background-color: rgb(245,245,245,0.8);
}
.containerNew{
  padding: 0;
}
.ml45{
  margin-left: 45px;
}
.teacherName{
  margin-left: 10px;
}
.courseDetail{
  font-size: 17px;
  margin:15px 0;
}
.course-img img{
 width: 300px;
 height: 168.75px;
}
</style>
