import './typedef'
import Vue from 'vue'
import * as base from './base'

const isStr = v => typeof v === 'string'
const isFunc = v => typeof v === 'function'

/**
 * 路由配置元数据添加key
 * @param {RouteConfig[]} routes
 * @param {string?} basePath
 */
const addRouteMetaKey = (routes, basePath) => {
  routes.forEach(route => {
    const key = basePath ? `${basePath}/${route.path}` : route.path
    if (route.meta) {
      route.meta.key = key
    } else {
      route.meta = { key }
    }
    route.children && addRouteMetaKey(route.children, key)
  })
  return routes
}

/**
 * 过滤掉没有权限的路由配置
 * @param {RouteConfig[]} routes
 * @param {string[]?} tags
 */
export const filterRoutes = (routes, tags) => {
  const rtnData = []
  const filter = (/** @type {RouteConfig[]} */ childs, /** @type {RouteConfig} */ parent) => {
    childs.forEach(route => {
      const { children, ...item } = route
      const tag = route.meta && route.meta.permissionTag
      if (!tag || tags.includes(tag)) {
        if (parent) {
          if (parent.children) {
            parent.children.push(item)
          } else {
            parent.children = [item]
          }
        } else {
          rtnData.push(item)
        }
        children && filter(children, item)
      }
    })
  }
  if (tags) {
    filter(routes)
    return addRouteMetaKey(rtnData)
  }
  return addRouteMetaKey(routes)
}

/**
 * 提取需要添加到菜单中的路由配置
 * @param {RouteConfig[]} routes
 */
const filterMenus = routes => {
  const /** @type {RouteConfig[]} */ menus = []
  const filter = (/** @type {RouteConfig[]} */ childs, /** @type {RouteConfig} */ parent) => {
    childs.forEach(route => {
      const { children, ...item } = route
      if (item.meta && item.meta.notMenu) return
      if (parent) {
        if (parent.children) {
          parent.children.push(item)
        } else {
          parent.children = [item]
        }
      } else {
        menus.push(item)
      }
      children && filter(children, item)
    })
  }
  filter(routes)
  return menus
}

/**
 * @param {string} url 
 */
const getLibName = url => {
  const dirs = url.split('/')
  let fileName = dirs.pop()
  if (fileName.startsWith('index.')) {
    fileName = dirs.pop() || fileName
  }
  return fileName.split('.')[0]
}

/**
 * umd库加载器
 * @param {string|{[key: string]: string}} url
 */
const umdLoader = url => {
  const src = isStr(url) ? url : url[Object.keys(url)[0]]
  return new Promise((resolve, reject) => {
    let script = document.createElement('script')
    script.onload = () => {
      const libName = getLibName(src)
      const lib = window[libName]
      if (lib) {
        resolve(lib)
      } else {
        reject(new Error(`The exported name <${libName}> was not found`))
      }
      script.onload = script.onerror = null
      script = null
    }
    script.onerror = reject
    script.src = src
    document.body.appendChild(script)
  })
}

/** @type {RouteConfig[]} */
const _menus = Vue.observable([])

export const getMenus = () => _menus

/**
 * 添加菜单
 * @param {RouteConfig[]} routes
 * @param {VueRouter} router
 */
export const addMenus = (routes, router) => {
  if (isFunc(router.addRoute)) {
    routes.forEach(route => {
      router.addRoute(route)
    })
  } else {
    router.addRoutes(routes)
  }
  _menus.push(...filterMenus(routes))
  _menus.sort((a, b) => a.meta.index - b.meta.index)
}

/**
 * 模块加载器
 * @param {Store} store
 * @param {VueRouter} router
 */
export const moduleLoader = ({ store, router } = {}) => {
  const loader = (module, tags, index = 1000) => {
    const /** @type {Promise<any>} */ modPromise = isStr(module) ? umdLoader(module) : module()
    return modPromise.then(({ default: _mod }) => {
      /** @type {LibExportedOption} */
      const mod = isFunc(_mod) ? _mod(Vue, store, router) : _mod
      if (mod.store) {
        store.registerModule(mod.name, mod.store)
      }
      if (mod.routes) {
        mod.routes.forEach(route => {
          if (route.meta) {
            route.meta.index = index
          } else {
            route.meta = { index }
          }
        })
        addMenus(filterRoutes(mod.routes, tags), router)
      }
    })
  }
  return (modules, tags) => Promise.all(
    Object.keys(modules).map((key, index) => {
      return loader(modules[key], tags, index)
        .catch((/** @type {Error} */ e) => {
          console.warn(`Module load error: ${e.message}`)
        })
    })
  )
}

/**
 * @param {VueConstructor} Vue
 */
export default (Vue, { store, router }) => {
  Vue.prototype.$adminCore = {
    ...base,
    filterRoutes,
    addMenus: routes => addMenus(routes, router),
    getMenus,
    getRoute: base.getRoute(router),
    moduleLoader: moduleLoader({ store, router })
  }
}

export * from './base'
