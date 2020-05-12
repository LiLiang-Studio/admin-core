import { name } from '../package.json'

export default [
  {
    path: `/${name}`,
    component: { render: h => h('router-view') },
    meta: {
      index: 1,
      title: '账户',
      icon: 'user'
    },
    children: [
      {
        path: 'groupManagement',
        component: { render: h => h('div') },
        meta: {
          title: '分组管理'
        }
      },
      {
        path: 'accountManagement',
        component: { render: h => h('div') },
        meta: {
          title: '账号管理'
        }
      },
      {
        path: 'accountSettings',
        component: { render: h => h('div') },
        meta: {
          title: '账号设置'
        }
      },
      {
        path: 'labelManagement',
        component: { render: h => h('div') },
        meta: {
          title: '标签管理'
        }
      }
    ]
  },
  {
    path: '/analysis',
    component: { render: h => h('div') },
    meta: { title: '统计报表', icon: 'data-analysis' }
  },
  {
    path: `/${name}2`,
    component: { render: h => h('router-view') },
    meta: {
      index: 1,
      title: '权限管理',
      icon: 'postcard'
    },
    children: [
      {
        path: 'tenant',
        component: { render: h => h('div') },
        meta: {
          title: '租户设置'
        }
      },
      {
        path: 'role',
        component: { render: h => h('div') },
        meta: {
          title: '角色管理'
        }
      },
      {
        path: 'log',
        component: { render: h => h('div') },
        meta: {
          title: '系统日志'
        }
      }
    ]
  },
  {
    path: '/demo',
    component: { render: h => h('router-view') },
    meta: { title: '工具演示', icon: 'notebook-1' },
    children: [
      {
        path: 'validate',
        component: () => import('./views/Validate.vue'),
        meta: { title: '验证器' }
      }
    ]
  }
]