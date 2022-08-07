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
            name: '人员管理',
            meta: { title: '人员管理' }
          }
        ]
      },
      {
        path: '/materialRiskManage',
        component: () => import('@/views/materialRiskManage/index'), // Parent router-view
        redirect: '/materialRiskManage/materialManage',
        name: '物料风险管理',
        meta: { title: '物料风险管理' },
        children: [
          {
            path: '/materialManage',
            component: () => import('@/views/materialManage/index'),
            name: '物料管理',
            meta: { title: '物料管理' }
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
            name: '生产设备',
            meta: { title: '生产设备' }
          },
          {
            path: '/environmentEquipment',
            component: () => import('@/views/environmentEquipment/index'),
            name: '环境设备',
            meta: { title: '环境设备' }
          }
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
            name: '车辆告警情况',
            meta: { title: '车辆告警情况' }
          },
          {
            path: '/driverRisk',
            component: () => import('@/views/driverRisk/index'),
            name: '司机告警情况',
            meta: { title: '司机告警情况' }
          }
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
            name: '监控报警',
            meta: { title: '监控报警' }
          },
          {
            path: '/sideSlopeWarn',
            component: () => import('@/views/sideSlopeWarn/index'),
            name: '边坡报警',
            meta: { title: '边坡报警' }
          },
          {
            path: '/movingRingWarn',
            component: () => import('@/views/movingRingWarn/index'),
            name: '动环报警',
            meta: { title: '动环报警' }
          }
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
            name: '扬尘污染监测',
            meta: { title: '扬尘污染监测' }
          },
          {
            path: '/noiseMonitor',
            component: () => import('@/views/noiseMonitor/index'),
            name: '噪声污染监测',
            meta: { title: '噪声污染监测' }
          },
          {
            path: '/highSlopeMonitor',
            component: () => import('@/views/highSlopeMonitor/index'),
            name: '高边坡位移监测',
            meta: { title: '高边坡位移监测' }
          }
        ]
      }
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
