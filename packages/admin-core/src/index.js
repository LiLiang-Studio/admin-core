/**
 * 核心模块
 */
import * as base from './base'

const isFunc = f => typeof f === 'function'

/**
 * 路由转换
 * 为每个路由的元数据中添加唯一标识
 * 以完整路径拼接的字符串作为唯一标识
 * @param {import('vue-router').RouteConfig[]} routes
 * @param {String} basePath
 */
const converter = (routes, basePath) => {
  routes.forEach(route => {
    let key = basePath ? `${basePath}/${route.path}` : route.path
    if (route.meta) {
      route.meta.key = key
    } else {
      route.meta = { key }
    }
    route.children && converter(route.children, key)
  })
  return routes
}

/**
 * 过滤路由
 * 干掉没有权限的路由
 * @param {import('vue-router').RouteConfig[]} routes 
 * @param {String[]} tags 
 */
const filterRoutes = (routes, tags) => {
  const rtnData = [], eachFn = (childs, parent) => {
    childs.forEach(_ => {
      let { children, ...item } = _, tag = _.meta && _.meta.permissionTag
      if (!tag || tags.indexOf(tag) > -1) {
        if (parent) {
          if (parent.children) {
            parent.children.push(item)
          } else {
            parent.children = [item]
          }
        } else {
          rtnData.push(item)
        }
        children && eachFn(children, item)
      }
    })
  }
  if (tags) {
    return eachFn(routes), converter(rtnData)
  }
  return converter(routes)
}

/**
 * 获取菜单
 * 提取需要添加到菜单中的路由
 * @param {import('vue-router').RouteConfig[]} routes 
 * @returns {import('vue-router').RouteConfig[]} 路由配置数组
 */
const getMenus = routes => {
  const menus = [], eachFn = (routes, menu) => {
    routes.forEach(route => {
      let { children, ...item } = route
      if (route.meta && route.meta.notMenu) return
      if (menu) {
        menu.children ? menu.children.push(item) : menu.children = [item]
      } else {
        menus.push(item)
      }
      route.children && eachFn(route.children, item)
    })
  }
  return eachFn(routes), menus
}

/**
 * 创建核心vuex状态模块
 * @param {import('vue-router').default} router 
 * @returns {import('vuex').StoreOptions} Store模块
 */
const createCoreStore = router => {
  return {
    namespaced: true,
    state: {
      modal: {},
      routes: [],
      menus: [],
      homeComponent: null
    },
    mutations: {
      // 控制对话框的显示和隐藏
      SHOW_MODAL(state, obj = {}) {
        state.modal = { ...state.modal, ...obj }
      },
      // 添加菜单
      ADD_MENUS(state, routes) {
        router.addRoutes(routes)
        state.routes = state.routes.concat(routes)
        state.menus = state.menus.concat(getMenus(routes))
        state.menus.sort((a, b) => {
          let aIndex = a.meta.index, bIndex = b.meta.index
          return aIndex > bIndex ? 1 : aIndex < bIndex ? -1 : 0
        })
      },
      // 设置首页组件 首页组件的设置部分，不久后可能会移出核心模块
      SET_HOME_COMPONENT(state, component) {
        state.homeComponent = component
      }
    },
    actions: {
      // 隐藏活动对话框
      HIDE_ACTIVE_MODAL({ state, commit }) {
        // 如果存在打开的对话框 我们关闭最后1个打开的
        // 返回布尔值会在某种情况下得到意想不到的错误，还是返回承诺吧
        return new Promise((resolve, reject) => {
          let keys = Object.keys(state.modal).filter(_ => state.modal[_]),
            len = keys.length
          if (len) {
            return commit('SHOW_MODAL', { [keys[len - 1]]: false }), resolve()
          }
          reject()
        })
      }
    }
  }
}

/**
 * 模块加载器
 * 一个模块加载失败，不应该阻止后续模块的加载
 * @param {import('vue').VueConstructor} Vue 
 * @param {import('vuex').Store} store 
 * @param {import('vue-router').default} router
 */
const moduleLoader = (Vue, store, router) => {
  const loader = (module, tags, index = 1000) => {
    return module().then(({ default: mod }) => {
      if (isFunc(mod)) {
        mod = mod({ Vue, store, router })
      }
      if (mod.store) {
        store.registerModule(mod.name, mod.store)
      }
      if (mod.routes) {
        mod.routes.forEach(_ => {
          if (_.meta) {
            _.meta.index = index
          } else {
            _.meta = { index }
          }
        })
        store.commit('core/ADD_MENUS', filterRoutes(mod.routes, tags))
      }
      if (!store.state.homeComponent && mod.home && mod.home.component) {
        let hasPermission = !mod.home.permissionTag || tags && tags.indexOf(mod.home.permissionTag) > -1
        if (hasPermission) store.commit('core/SET_HOME_COMPONENT', mod.home.component)
      }
    })
  }
  return (modules, tags) => Promise.all(
    Object.keys(modules).map((k, index) => {
      return loader(modules[k], tags, index)
        .catch(() => console.log(`模块: ${k} 加载失败`))
    })
  )
}

/**
 * 核心插件注册函数
 * @param {import('vue').VueConstructor} Vue
 */
const core = (Vue, { store, router }) => {
  store.registerModule('core', createCoreStore(router))
  Vue.prototype.$adminCore = {
    ...base,
    filterRoutes,
    getRoute: base.getRoute(router),
    moduleLoader: moduleLoader(Vue, store, router)
  }
}

/**
 * 支持导航控制的模态框混合
 * @param {String} key
 * @param {String} prefix
 * @returns {import('vue').ComponentOptions} Vue组件选项
 */
const navModal = (key, prefix = '') => {
  let visible = 'visible', onShow = 'onShow'
  if (prefix) {
    visible = `${prefix.toLowerCase()}Visible`
    onShow = `on${prefix[0].toUpperCase() + prefix.slice(1).toLowerCase()}Show`
  }
  return {
    computed: {
      vnodeTag() {
        return this.$vnode.tag
      },
      [visible]() {
        return this.$store.state.core.modal[this.vnodeTag]
      }
    },
    methods: {
      [onShow](visible) {
        this.$store.commit('core/SHOW_MODAL', { [this.vnodeTag]: visible })
      }
    }
  }
}

core.navModal = navModal

export default core

export { navModal, filterRoutes }

export * from './base'