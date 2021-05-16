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
    children: [{
      path: 'dashboard',
      meta: { title: '首页' },
      component: () => import('@/views/dashboard/index')
    }]
  },
  // 信息公开：学生和教师信息
  {
    path: '/person',
    component: Layout,
    redirect: '/info/index',
    name: 'Person',
    meta: { title: '信息公开' },
    children: [
      {
        path: '/info/index',
        name: 'Info',
        component: () => import('@/views/person/info/Info'),
        meta: { title: '信息列表' }
      }
    ]
  },

  // 课程学习
  {
    path: '/edu',
    component: Layout,
    redirect: '/course/index',
    name: 'Edu',
    meta: { title: '课程学习' },
    children: [
      {
        path: '/course/index',
        name: 'Course',
        component: () => import('@/views/edu/course/Course'),
        meta: { title: '课程列表' }
      },
      {
        path: '/chapter/view/:id',
        name: 'ChapterEdit',
        component: () => import('@/views/edu/chapter/Chapter'),
        meta: { title: '课程章节' },
        hidden: true
      },
      {
        path: '/video/view/:id',
        name: 'VideoView',
        component: () => import('@/views/edu/video/Video'),
        meta: { title: '观看课程' },
        hidden: true
      },
      {
        path:'/video/view/blank/:id',
        name:'Blank',
        component: ()=> import('@/views/blank'),
        meta: {title: '空白页'},
        hidden: true
      }
    ]
  },
  // 选课中心
  {
    path: '/trade',
    component: Layout,
    redirect: '/trade/index',
    name: 'Trade',
    meta: { title: '选课' },
    children: [
      {
        path: '/trade/index',
        name: 'TradeIndex',
        component: () => import('@/views/trade/course/Course'),
        meta: { title: '选课中心' }
      }
    ]
  },
  // 个人资料设置
  {
    path: '/setting',
    component: Layout,
    name: 'Setting',
    redirect: '/setting/index',
    meta: { title: '设置' },
    children: [
      {
        path: '/setting/index',
        name: 'Setting',
        component: () => import('@/views/setting/Setting'),
        meta: { title: '个人设置' }
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
