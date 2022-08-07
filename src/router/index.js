import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/userManage',
    component: Layout,
    children: [{
      path: 'userManage',
      name: '用户管理',
      component: () => import('@/views/userManage/index'),
      meta: { title: '用户管理', icon: 'dashboard' }
    }]
  },

  {
    path: '/assetManagement',
    component: Layout,
    redirect: '/equipment',
    name: '资产管理',
    meta: { title: '资产管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/equipment',
        name: '设备管理',
        component: () => import('@/views/equipment/index'),
        meta: { title: '设备管理', icon: 'table' }
      },
      {
        path: '/device',
        name: '装置管理',
        component: () => import('@/views/devices/index'),
        meta: { title: '装置管理', icon: 'table' }
      },
      {
        path: '/material',
        name: '物料管理',
        component: () => import('@/views/material/index'),
        meta: { title: '物料管理', icon: 'table' }
      }
    ]
  },

  {
    path: '/jobManagement',
    component: Layout,
    children: [{
      path: 'JobManagement',
      name: '作业管理',
      component: () => import('@/views/jobManage/index'),
      meta: { title: '作业管理', icon: 'dashboard' }
    }]
  },

  {
    path: '/environment',
    component: Layout,
    children: [{
      path: 'Environment',
      name: '环境管理',
      component: () => import('@/views/environment/index'),
      meta: { title: '环境管理', icon: 'dashboard' }
    }]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/operate',
    name: '系统管理',
    meta: { title: '系統管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/operate',
        name: '操作日志',
        component: () => import('@/views/operateLog/index'),
        meta: { title: '操作日志', icon: 'table' }
      },
      {
        path: '/handle',
        name: '处理日志',
        component: () => import('@/views/handleLog/index'),
        meta: { title: '处理日志', icon: 'table' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
