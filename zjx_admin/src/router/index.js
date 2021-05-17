import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '../views/layout/Layout'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
// 所有权限通用路由表
// 如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    meta: { title: '首页' },
    // hidden: true,
    children: [{
      path: 'dashboard',
      meta: { title: '首页' },
      component: () => import('@/views/dashboard/index')
    }]
  },
  // 人员管理
  {
    path: '/person',
    component: Layout,
    redirect: '/teacher/index',
    name: 'Person',
    meta: { title: '人员管理' },
    children: [
      {
        path: '/teacher/index',
        name: 'Teacher',
        component: () => import('@/views/person/teacher/Teacher'),
        meta: { title: '教师管理' }
      },
      {
        path: '/teacher/create',
        name: 'TeacherCreate',
        component: () => import('@/views/person/teacher/TeacherForm'),
        meta: { title: '添加教师' },
        hidden: true
      },
      {
        path: '/teacher/edit/:id',
        name: 'TeacherEdit',
        component: () => import('@/views/person/teacher/TeacherForm'),
        meta: { title: '编辑教师' },
        hidden: true
      },
      {
        path: '/teacher/detail/:id',
        name: 'TeacherDetail',
        component: () => import('@/views/person/teacher/TeacherDetail'),
        meta: { title: '教师详情' },
        hidden: true
      },
      {
        path: '/student/index',
        name: 'Student',
        component: () => import('@/views/person/student/Student'),
        meta: { title: '学生管理' }
      },
      {
        path: '/student/create',
        name: 'StudentCreate',
        component: () => import('@/views/person/student/StudentForm'),
        meta: { title: '添加学生' },
        hidden: true
      },
      {
        path: '/student/edit/:id',
        name: 'StudentEdit',
        component: () => import('@/views/person/student/StudentForm'),
        meta: { title: '编辑学生' },
        hidden: true
      },
      {
        path: '/student/detail/:id',
        name: 'StudentDetail',
        component: () => import('@/views/person/student/StudentDetail'),
        meta: { title: '学生详情' },
        hidden: true
      },
      {
        path: '/department/index',
        name: 'Department',
        component: () => import('@/views/person/department/Department'),
        meta: { title: '部门管理' }
      },
      {
        path: '/department/create',
        name: 'DepartmentCreate',
        component: () => import('@/views/person/department/DepartmentForm'),
        meta: { title: '添加部门' },
        hidden: true
      },
      {
        path: '/department/edit/:id',
        name: 'DepartmentEdit',
        component: () => import('@/views/person/department/DepartmentForm'),
        meta: { title: '编辑部门' },
        hidden: true
      }
    ]
  },
  // 教学管理
  {
    path: '/edu',
    component: Layout,
    redirect: '/course/index',
    name: 'Edu',
    meta: { title: '教学管理' },
    children: [
      {
        path: '/course/index',
        name: 'Course',
        component: () => import('@/views/edu/course/Course'),
        meta: { title: '课程管理' }
      },
      {
        path: '/course/create',
        name: 'CourseCreate',
        component: () => import('@/views/edu/course/CourseForm'),
        meta: { title: '添加课程' },
        hidden: true
      },
      {
        path: '/course/edit/:id',
        name: 'CourseEdit',
        component: () => import('@/views/edu/course/CourseForm'),
        meta: { title: '编辑课程' },
        hidden: true
      },
      {
        path: '/course/detail/:id',
        name: 'CourseDetail',
        component: () => import('@/views/edu/course/CourseDetail'),
        meta: { title: '课程详情' },
        hidden: true
      },
      {
        path: '/chapter/edit/:id',
        name: 'ChapterEdit',
        component: () => import('@/views/edu/course/CourseForm'),
        meta: { title: '编辑章节' },
        hidden: true
      }
    ]
  },
  // 选课中心
  {
    path: '/trade',
    component: Layout,
    redirect: '/takeCourse/index',
    name: 'Trade',
    meta: { title: '选课中心' },
    children: [
      {
        path: '/takeCourse/index',
        name: 'TakeCourse',
        component: () => import('@/views/trade/course/Course'),
        meta: { title: '可选课程' }
      },
      {
        path: '/order/index',
        name: 'Order',
        component: () => import('@/views/trade/order/Order'),
        meta: { title: '已选课程' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

// 实例化vue的时候只挂载constantRouter
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  // {
  //   path: '/permission',
  //   component: Layout,
  //   name: '权限测试',
  //   meta: { role: ['admin', 'super_editor'] }, // 页面需要的权限
  //   children: [
  //     {
  //       path: 'index',
  //       component: Permission,
  //       name: '权限测试页',
  //       meta: { role: ['admin', 'super_editor'] } // 页面需要的权限
  //     }]
  // },
  // { path: '*', redirect: '/404', hidden: true }
]
