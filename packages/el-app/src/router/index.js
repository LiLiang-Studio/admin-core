import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
      meta: { title: '首页' }
    },
    {
      path: '/entry',
      component: () => import('../views/entry/Layout.vue'),
      meta: { layout: null },
      children: [
        {
          path: '',
          redirect: { name: 'login' }
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/entry/Login.vue'),
          meta: { title: '登录' }
        }
      ]
    }
  ]
})

/**
 * 获取路由标题
 * @param {import('vue-router').Route} route 路由对象
 */
const getTitle = route => router.resolve(route).route.matched.map(_ => _.meta.title).filter(_ => _).join(' - ') || '未命名页面'

router.afterEach(to => {
  document.title = `${process.env.VUE_APP_NAME} - ${getTitle(to)}`
})

export default router