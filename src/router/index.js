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
    path: '/riskManage',
    component: Layout,
    redirect: '/riskManage/employeeRiskManage/employeeManage',
    name: '风险管理',
    meta: {
      title: '风险管理',
      icon: 'nested'
    },
    children: [
      {
        path: '/employeeRiskManage',
        component: () => import('@/views/employeeRiskManage/index'), // Parent router-view
        name: '人员风险管理',
        meta: { title: '人员风险管理' },
        children: [
          {
            path: '/employeeManage',
            component: () => import('@/views/userManage/index'),
            name: '人员风险管理',
            meta: { title: '人员风险管理' }
          }
        ]
      },
      {
        path: '/materialRiskManage',
        component: () => import('@/views/materialRiskManage/index'), // Parent router-view
        redirect: '/materialRiskManage/materialManage',
        name: '危险品风险管理',
        meta: { title: '危险品风险管理' },
        children: [
          {
            path: '/materialManage',
            component: () => import('@/views/materialManage/index'),
            name: '危险品风险管理',
            meta: { title: '危险品风险管理' }
          }
        ]
      },
      {
        path: '/equipmentRiskManage',
        component: () => import('@/views/equipmentRiskManage/index'), // Parent router-view
        name: '设备风险管理',
        meta: { title: '设备风险管理' },
        children: [
          {
            path: '/productionEquipment',
            component: () => import('@/views/productionEquipment/index'),
            name: '设备风险管理',
            meta: { title: '设备风险管理' }
          },
        ]
      },
      {
        path: '/devicesRiskManage',
        component: () => import('@/views/devicesRiskManage/index'), // Parent router-view
        redirect: '/devicesRiskManage/vehicleRisk',
        name: '装置风险管理',
        meta: { title: '装置风险管理' },
        children: [
          {
            path: '/vehicleRisk',
            component: () => import('@/views/vehicleRisk/index'),
            name: '装置风险管理',
            meta: { title: '装置风险管理' }
          },
        ]
      },
      {
        path: '/jobRiskManage',
        component: () => import('@/views/jobRiskManage/index'), // Parent router-view
        redirect: '/jobRiskManage/videoWarn',
        name: '作业风险管理',
        meta: { title: '作业风险管理' },
        children: [
          {
            path: '/videoWarn',
            component: () => import('@/views/videoWarn/index'),
            name: '作业风险管理',
            meta: { title: '作业风险管理' }
          },
        ]
      },
      {
        path: '/environmentRiskManage',
        component: () => import('@/views/environmentRiskManage/index'), // Parent router-view
        redirect: '/environmentRiskManage/dustMonitor',
        name: '环境风险管理',
        meta: { title: '环境风险管理' },
        children: [
          {
            path: '/dustMonitor',
            component: () => import('@/views/dustMonitor/index'),
            name: '环境风险管理',
            meta: { title: '环境风险管理' }
          },
        ]
      },
      {
        path: '/manageRiskManage',
        component: () => import('@/views/manageRiskManage/index'), // Parent router-view
        redirect: '/environmentRiskManage/dustMonitor',
        name: '管理风险管理',
        meta: { title: '管理风险管理' },
        children: [
          {
            path: '/manageMonitor',
            component: () => import('@/views/manageRiskManage/index'),
            name: '管理风险管理',
            meta: { title: '管理风险管理' }
          },
        ]
      },
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/operate',
    name: '系统管理',
    meta: { title: '系統管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/operate',
        name: '操作日志',
        component: () => import('@/views/operateLog/index'),
        meta: { title: '操作日志', icon: 'link' }
      },
      {
        path: '/handle',
        name: '处理日志',
        component: () => import('@/views/handleLog/index'),
        meta: { title: '处理日志', icon: 'form' }
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
