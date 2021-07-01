/**
 * @typedef {import('vue').default} Vue Vue组件实例
 * 
 * @typedef {import('vue').VueConstructor} VueConstructor Vue构造器
 * 
 * @typedef {import('vue-router').default} VueRouter VueRouter实例
 * 
 * @typedef {import('vue-router').RouteConfig} RouteConfig 路由配置
 * 
 * @typedef {import('vuex').Store} Store Store实例
 * 
 * @typedef {(rule, value, callback: (e?: Error) => void) => void} ValidatorFunction
 * 
 * @typedef RuleOption 验证规则选项
 * @property {string?} trigger
 * @property {boolean?} required
 * @property {string?} msg
 * @property {string?} regmsg
 * @property {ValidatorFunction?} callback
 * 
 * @typedef {RuleOption & { port?: boolean }} IpRuleOption IP验证规则选项
 * 
 * @typedef FormValidatorRuleOption 表单验证规则选项
 * @property {string} trigger
 * @property {boolean} required
 * @property {ValidatorFunction} validator
 * 
 * @typedef LibExportedOption 库导出选项
 * @property {string?} name
 * @property {RouteConfig[]} routes
 * @property {import('vuex').Module} store
 * 
 * @typedef {LibExportedOption | (Vue: Vue, store: Store, router: VueRouter) => LibExportedOption} LibExportResult
 */

import Vue from 'vue'

/** */
const isStr = v => typeof v === 'string'
const isFunc = v => typeof v === 'function'

/**
 * 前面填充0
 * @param {number|string} val
 * @param {number} len
 * @returns {number|string}
 */
const pad = (val, len) => (val + '').length < len ? pad('0' + val, len) : val

/**
 * 格式化日期
 * @param {Date|string|number} d
 * @param {string} format
 * @returns {string}
 */
export const formatDate = (d, format = 'yyyy-MM-dd HH:mm:ss') => {
  if (!(d && (d + '').trim())) return ''
  if (!(d instanceof Date)) {
    let date = new Date(d)
    if (isNaN(date)) {
      date = new Date(...(d + '').split(/-|:|\s/g).map(_ => +_))
      if (isNaN(date)) return d
      date.setMonth(date.getMonth() - 1)
    }
    d = date
  }
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const date = d.getDate()
  const day = d.getDay()
  const hours = d.getHours()
  const minutes = d.getMinutes()
  const seconds = d.getSeconds()
  const ms = d.getMilliseconds()
  const zone = d.getTimezoneOffset()
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const shortMonthNames = monthNames.map(_ => _.slice(0, 3))
  const shortDayNames = dayNames.map(_ => _.slice(0, 3))
  const fn = val => () => val
  return [
    [/yyyy/g, fn(year)], // 年份（四位）
    [/yy/g, fn((year + '').slice(2))], // 年份（两位）
    [/MMMM/g, fn(monthNames[month - 1])], // 月份（英文）
    [/MMM/g, fn(shortMonthNames[month - 1])], // 月份（英文简写）
    [/MM/g, fn(pad(month, 2))], // 月份（两位）
    [/M/g, fn(month)], // 月份（一位）
    [/dddd/g, fn(dayNames[day])], // 星期（英文）
    [/ddd/g, fn(shortDayNames[day])], // 星期（英文简写）
    [/dd/g, fn(pad(date, 2))], // 日期（两位）
    [/d/g, fn(date)], // 日期（一位）
    [/DD/g, fn('0' + day)], // 星期（两位）
    [/D/g, fn(day)], // 星期（一位）
    [/HH/g, fn(pad(hours, 2))], // 小时（24小时制两位）
    [/H/g, fn(hours)], // 小时（24小时制一位）
    [/hh/g, fn(pad(hours > 12 ? hours - 12 : hours, 2))], // 小时（12小时制两位）
    [/h/g, fn(hours > 12 ? hours - 12 : hours)], // 小时（12小时制一位）
    [/mm/g, fn(pad(minutes, 2))], // 分钟（两位）
    [/m/g, pad(minutes, 2)], // 分钟（一位）
    [/ss/g, fn(pad(seconds, 2))], // 秒钟（两位）
    [/s/g, fn(seconds)], // 秒钟（一位）
    [/SSS/g, fn(pad(ms, 3))], // 毫秒（三位）
    [/SS/g, fn(pad(Math.round(ms / 10), 2))], // 毫秒（两位）
    [/S/g, fn(Math.round(ms / 100))], // 毫秒（一位）
    [/A/g, fn(hours > 12 ? 'PM' : 'AM')], // 上午与下午（大写）
    [/a/g, fn(hours > 12 ? 'pm' : 'am')], // 上午与下午（小写）
    [/ZZ/g, fn((zone > 0 ? '-' : '+') + pad(Math.floor(Math.abs(zone) / 60) * 100 + Math.abs(zone) % 60, 4))] // 时区
  ].reduce((t, _) => t.replace(_[0], _[1]), format)
}

/**
 * 根据父组件名称，查找父组件
 * @param {Vue} vm
 * @param {string} name
 * @returns {Vue|undefined}
 */
export const getParentComponent = (vm, name) => {
  const parentComponent = vm.$parent
  return parentComponent && (
    parentComponent.$options.name === name
      ? parentComponent
      : getParentComponent(parentComponent, name)
  )
}

/**
 * 获取所有子组件
 * @param {Vue} vm
 * @param {string?} name 若不提供该参数，则查找所有子组件并忽略`flag`参数
 * @param {boolean?} flag 默认为深查找，该参数设为`true`，则为浅查找
 * @returns {Vue[]}
 */
export const getChildComponents = (vm, name, flag) => {
  const hasChild = (/** @type {Vue} */ vm) => vm.$children.length > 0
  const isMatch = (/** @type {Vue} */ vm) => vm.$options.name === name
  const each = (/** @type {(t: Vue[], vm: Vue) => Vue[]} */ fn) => (/** @type {Vue} */ vm) => vm.$children.reduce(fn, [])
  const fn = name
    ? flag
      ? each((t, _) => t.concat(isMatch(_) ? [_] : [], hasChild(_) ? fn(_) : []))
      : each((t, _) => t.concat(isMatch(_) ? [_] : hasChild(_) ? fn(_) : []))
    : each((t, _) => t.concat([_], hasChild(_) ? fn(_) : []))
  return fn(vm)
}

/**
 * 获取当前路径匹配的路由
 * @param {VueRouter} router
 */
export const getRoute = router => () => {
  return router.resolve(router.mode === 'hash' ? location.hash.slice(1) : location.pathname).route
}

const REG_PORT = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/
const REG_IP = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
const REG_IP_HAS_PORT = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/

/**
 * @param {IpRuleOption} options
 * @returns {FormValidatorRuleOption}
 */
export const createIpRule = (options = {}) => {
  const { trigger = null, required = true, port } = options
  const msgPrefix = port ? '（含端口号）' : ''
  const msg = options.msg || `请输入IP地址${msgPrefix}`
  const regmsg = options.regmsg || `请输入合法的IP地址${msgPrefix}`
  return {
    trigger,
    required,
    validator (rule, value, callback) {
      if (value) {
        if ((port ? REG_IP_HAS_PORT : REG_IP).test(value)) {
          options.callback ? options.callback(rule, value, callback) : callback()
        } else {
          callback(new Error(regmsg))
        }
      } else {
        required ? callback(new Error(msg)) : callback()
      }
    }
  }
}

/**
 * @param {RuleOption} options
 * @returns {FormValidatorRuleOption}
 */
export const createPortRule = (options = {}) => {
  const { trigger = null, required = true } = options
  return {
    trigger,
    required,
    validator (rule, value, callback) {
      if (value) {
        if (REG_PORT.test(value)) {
          options.callback ? options.callback(rule, value, callback) : callback()
        } else {
          callback(new Error(options.regmsg || '请输入合法的端口号'))
        }
      } else {
        required ? callback(new Error(options.msg || '请输入端口号')) : callback()
      }
    }
  }
}

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
    const script = document.createElement('script')
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
const addMenus = (routes, router) => {
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
export const moduleLoader = (store, router) => {
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
          console.log(`Module load error: ${e.message}`)
        })
    })
  )
}
