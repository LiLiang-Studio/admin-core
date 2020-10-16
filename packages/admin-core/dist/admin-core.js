/*!
 * admin-core.js v1.2.1
 * (c) 2019-2020 LiLiang
 * Released under the MIT License.
 */
var pad = function (val, len) { return (val + '').length < len ? pad('0' + val, len) : val; };

/**
 * 格式化日期
 * @param {Date|String|Number} d 
 * @param {String} format 
 */
var formatDate = function (d, format) {
  if ( format === void 0 ) format = 'yyyy-MM-dd HH:mm:ss';

  if (!d) { return '' }
  if (!(d instanceof Date)) { d = new Date(d); }
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var date = d.getDate();
  var day = d.getDay();
  var hours = d.getHours();
  var minutes = d.getMinutes();
  var seconds = d.getSeconds();
  var ms = d.getMilliseconds();
  var zone = d.getTimezoneOffset();
  var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var shortMonthNames = monthNames.map(function (_) { return _.slice(0, 3); });
  var shortDayNames = dayNames.map(function (_) { return _.slice(0, 3); });
  var fn = function (val) { return function () { return val; }; };
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
  ].reduce(function (acc, _) { return acc.replace(_[0], _[1]); }, format)
};

/**
 * 根据name获取父组件
 * @param {import('vue').default} vm 
 * @param {String} name 
 */
var getParentComponent = function (vm, name) {
  var par = vm.$parent;
  return par && (par.$options.name === name ? par : getParentComponent(par, name))
};

/**
 * 获取所有子组件
 * @param {import('vue').default} vm 
 * @param {String?} name 若提供 则获取所有指定name的子组件
 * @param {Boolean} flag 当基于name查找时，如果为真 则 查找到后 不再向下继续查找
 * @returns {import('vue').default[]} 子组件数组
 */
var getChildComponents = function (vm, name, flag) {
  return vm.$children.reduce(function (acc, _) {
    if (!name || _.$options.name === name) {
      acc.push(vm);
      if (name && flag) { return acc }
    }
    return acc.concat( (_.$children.length ? getChildComponents(_, name, flag) : []))
  }, [])
};

/**
 * 截取指定长度字符 按照1个汉字等于2个字符长度
 * @param {String} str 
 * @param {Number} byteLen 
 */
var getSubStr = function (str, byteLen) {
  // eslint-disable-next-line
  var num = 0, rtnStr = '', getLen = function (c) { return c.replace(/[^\x00-\xff]/g, '**').length; };
  for (var i = 0, len = str.length; i < len; i++) {
    var char = str.charAt(i);
    var tempLen = num + getLen(char);
    if (tempLen > byteLen) { return rtnStr }
    rtnStr += char;
    num = tempLen;
  }
  return rtnStr
};

/**
 * 获取尺寸 如果为数值或数值字符串 添加px单位 否则 直接返回
 * @param {String | Number} size
 */
var getSize = function (size) { return size && isNaN(size) ? size : ((+size) + "px"); };

/**
 * 获取路由
 * 该方法为解决：页面加载时 我们无法通过this.$route获取到正确的动态加载的路由
 * @param {import('vue-router').default} router
 */
var getRoute = function (router) { return function () {
  return router.resolve(router.mode === 'hash' ? location.hash.slice(1) : location.pathname).route
}; };

var REG_PORT = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
var REG_IP = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
var REG_IP_PORT = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;

/**
 * 创建IP验证规则
 * @param {{
 *   trigger: String, 
 *   required: Boolean, 
 *   port: Boolean,
 *   msg: String,
 *   regmsg: String, 
 *   remoteMethod: Function
 * }} options
 */
var createIpRule = function (options) {
  if ( options === void 0 ) options = {};

  var trigger = options.trigger; if ( trigger === void 0 ) trigger = null;
  var required = options.required; if ( required === void 0 ) required = true;
  var port = options.port;
  var msgPrefix = port ? '（含端口号）' : '';
  var msg = options.msg || ("请输入IP地址" + msgPrefix);
  var regmsg = options.regmsg || ("请输入合法的IP地址" + msgPrefix);
  return [
    {
      trigger: trigger,
      required: required,
      validator: function validator(rule, value, callback) {
        if (value) {
          if ((port ? REG_IP_PORT : REG_IP).test(value)) {
            options.remoteMethod ? options.remoteMethod(rule, value, callback) : callback();
          } else {
            callback(new Error(regmsg));
          }
        } else {
          required ? callback(new Error(msg)) : callback();
        }
      }
    }
  ]
};

/**
 * 创建端口验证规则
 * @param {{
 *   trigger: String, 
 *   required: Boolean,
 *   msg: String,
 *   regmsg: String, 
 *   remoteMethod: Function
 * }} options 
 */
var createPortRule = function (options) {
  if ( options === void 0 ) options = {};

  var trigger = options.trigger; if ( trigger === void 0 ) trigger = null;
  var required = options.required; if ( required === void 0 ) required = true;
  return [
    {
      trigger: trigger,
      required: required,
      validator: function validator(rule, value, callback) {
        if (value) {
          if (REG_PORT.test(value)) {
            options.remoteMethod ? options.remoteMethod(rule, value, callback) : callback();
          } else {
            callback(new Error(options.regmsg || '请输入合法的端口号'));
          }
        } else {
          required ? callback(new Error(options.msg || '请输入端口号')) : callback();
        }
      }
    }
  ]
};

var base = /*#__PURE__*/Object.freeze({
  __proto__: null,
  formatDate: formatDate,
  getParentComponent: getParentComponent,
  getChildComponents: getChildComponents,
  getSubStr: getSubStr,
  getRoute: getRoute,
  getSize: getSize,
  createIpRule: createIpRule,
  createPortRule: createPortRule
});

/**
 * 核心模块
 */
function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }

var isFunc = function (f) { return typeof f === 'function'; };

/**
 * 路由转换
 * 为每个路由的元数据中添加唯一标识
 * 以完整路径拼接的字符串作为唯一标识
 * @param {import('vue-router').RouteConfig[]} routes
 * @param {String} basePath
 */
var converter = function (routes, basePath) {
  routes.forEach(function (route) {
    var key = basePath ? (basePath + "/" + (route.path)) : route.path;
    if (route.meta) {
      route.meta.key = key;
    } else {
      route.meta = { key: key };
    }
    route.children && converter(route.children, key);
  });
  return routes
};

/**
 * 过滤路由
 * 干掉没有权限的路由
 * @param {import('vue-router').RouteConfig[]} routes 
 * @param {String[]} tags 
 */
var filterRoutes = function (routes, tags) {
  var rtnData = [], eachFn = function (childs, parent) {
    childs.forEach(function (_) {
      var children = _.children;
      var rest = objectWithoutProperties( _, ["children"] );
      var item = rest;
      var tag = _.meta && _.meta.permissionTag;
      if (!tag || tags.indexOf(tag) > -1) {
        if (parent) {
          if (parent.children) {
            parent.children.push(item);
          } else {
            parent.children = [item];
          }
        } else {
          rtnData.push(item);
        }
        children && eachFn(children, item);
      }
    });
  };
  if (tags) {
    return eachFn(routes), converter(rtnData)
  }
  return converter(routes)
};

/**
 * 获取菜单
 * 提取需要添加到菜单中的路由
 * @param {import('vue-router').RouteConfig[]} routes 
 * @returns {import('vue-router').RouteConfig[]} 路由配置数组
 */
var getMenus = function (routes) {
  var menus = [], eachFn = function (routes, menu) {
    routes.forEach(function (route) {
      var children = route.children;
      var rest = objectWithoutProperties( route, ["children"] );
      var item = rest;
      if (route.meta && route.meta.notMenu) { return }
      if (menu) {
        menu.children ? menu.children.push(item) : menu.children = [item];
      } else {
        menus.push(item);
      }
      route.children && eachFn(route.children, item);
    });
  };
  return eachFn(routes), menus
};

/**
 * 创建核心vuex状态模块
 * @param {import('vue-router').default} router 
 * @returns {import('vuex').StoreOptions} Store模块
 */
var createCoreStore = function (router) {
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
      SHOW_MODAL: function SHOW_MODAL(state, obj) {
        if ( obj === void 0 ) obj = {};

        state.modal = Object.assign({}, state.modal, obj);
      },
      // 添加菜单
      ADD_MENUS: function ADD_MENUS(state, routes) {
        router.addRoutes(routes);
        state.routes = state.routes.concat(routes);
        state.menus = state.menus.concat(getMenus(routes));
        state.menus.sort(function (a, b) {
          var aIndex = a.meta.index, bIndex = b.meta.index;
          return aIndex > bIndex ? 1 : aIndex < bIndex ? -1 : 0
        });
      },
      // 设置首页组件 首页组件的设置部分，不久后可能会移出核心模块
      SET_HOME_COMPONENT: function SET_HOME_COMPONENT(state, component) {
        state.homeComponent = component;
      }
    },
    actions: {
      // 隐藏活动对话框
      HIDE_ACTIVE_MODAL: function HIDE_ACTIVE_MODAL(ref) {
        var state = ref.state;
        var commit = ref.commit;

        // 如果存在打开的对话框 我们关闭最后1个打开的
        // 返回布尔值会在某种情况下得到意想不到的错误，还是返回承诺吧
        return new Promise(function (resolve, reject) {
          var obj;

          var keys = Object.keys(state.modal).filter(function (_) { return state.modal[_]; }),
            len = keys.length;
          if (len) {
            return commit('SHOW_MODAL', ( obj = {}, obj[keys[len - 1]] = false, obj )), resolve()
          }
          reject();
        })
      }
    }
  }
};

/**
 * 模块加载器
 * 一个模块加载失败，不应该阻止后续模块的加载
 * @param {import('vue').VueConstructor} Vue 
 * @param {import('vuex').Store} store 
 * @param {import('vue-router').default} router
 */
var moduleLoader = function (Vue, store, router) {
  var loader = function (module, tags, index) {
    if ( index === void 0 ) index = 1000;

    return module().then(function (ref) {
      var mod = ref.default;

      if (isFunc(mod)) {
        mod = mod({ Vue: Vue, store: store, router: router });
      }
      if (mod.store) {
        store.registerModule(mod.name, mod.store);
      }
      if (mod.routes) {
        mod.routes.forEach(function (_) {
          if (_.meta) {
            _.meta.index = index;
          } else {
            _.meta = { index: index };
          }
        });
        store.commit('core/ADD_MENUS', filterRoutes(mod.routes, tags));
      }
      if (!store.state.homeComponent && mod.home && mod.home.component) {
        var hasPermission = !mod.home.permissionTag || tags && tags.indexOf(mod.home.permissionTag) > -1;
        if (hasPermission) { store.commit('core/SET_HOME_COMPONENT', mod.home.component); }
      }
    })
  };
  return function (modules, tags) { return Promise.all(
    Object.keys(modules).map(function (k, index) {
      return loader(modules[k], tags, index)
        .catch(function () { return console.log(("模块: " + k + " 加载失败")); })
    })
  ); }
};

/**
 * 核心插件注册函数
 * @param {import('vue').VueConstructor} Vue
 */
var core = function (Vue, ref) {
  var store = ref.store;
  var router = ref.router;

  store.registerModule('core', createCoreStore(router));
  Vue.prototype.$adminCore = Object.assign({}, base,
    {filterRoutes: filterRoutes,
    getRoute: getRoute(router),
    moduleLoader: moduleLoader(Vue, store, router)});
};

/**
 * 支持导航控制的模态框混合
 * @param {String} key
 * @param {String} prefix
 * @returns {import('vue').ComponentOptions} Vue组件选项
 */
var navModal = function (key, prefix) {
  var obj, obj$1;

  if ( prefix === void 0 ) prefix = '';
  var visible = 'visible', onShow = 'onShow';
  if (prefix) {
    visible = (prefix.toLowerCase()) + "Visible";
    onShow = "on" + (prefix[0].toUpperCase() + prefix.slice(1).toLowerCase()) + "Show";
  }
  return {
    computed: ( obj = {
      vnodeTag: function vnodeTag() {
        return this.$vnode.tag
      }
    }, obj[visible] = function () {
        return this.$store.state.core.modal[this.vnodeTag]
      }, obj ),
    methods: ( obj$1 = {}, obj$1[onShow] = function (visible) {
        var obj;

        this.$store.commit('core/SHOW_MODAL', ( obj = {}, obj[this.vnodeTag] = visible, obj ));
      }, obj$1 )
  }
};

core.navModal = navModal;

export default core;
export { createIpRule, createPortRule, filterRoutes, formatDate, getChildComponents, getParentComponent, getRoute, getSize, getSubStr, navModal };
