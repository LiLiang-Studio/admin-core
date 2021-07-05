/*!
 * admin-core.js v2.0.0
 * (c) 2019-2021 LiLiang
 * Released under the MIT License.
 */
import Vue from 'vue';

/**
 * 前面填充0
 * @param {number|string} val
 * @param {number} len
 * @returns {number|string}
 */
var pad = function (val, len) { return (val + '').length < len ? pad('0' + val, len) : val; };

/**
 * 格式化日期
 * @param {Date|string|number} d
 * @param {string} format
 * @returns {string}
 */
var formatDate = function (d, format) {
  if ( format === void 0 ) format = 'yyyy-MM-dd HH:mm:ss';

  if (!(d && (d + '').trim())) { return '' }
  if (!(d instanceof Date)) {
    var date$1 = new Date(d);
    if (isNaN(date$1)) {
      date$1 = new (Function.prototype.bind.apply( Date, [ null ].concat( (d + '').split(/-|:|\s/g).map(function (_) { return +_; })) ));
      if (isNaN(date$1)) { return d }
      date$1.setMonth(date$1.getMonth() - 1);
    }
    d = date$1;
  }
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
  ].reduce(function (t, _) { return t.replace(_[0], _[1]); }, format)
};

/**
 * 根据父组件名称，查找父组件
 * @param {Vue} vm
 * @param {string} name
 * @returns {Vue|undefined}
 */
var getParentComponent = function (vm, name) {
  var parentComponent = vm.$parent;
  return parentComponent && (
    parentComponent.$options.name === name
      ? parentComponent
      : getParentComponent(parentComponent, name)
  )
};

/**
 * 获取所有子组件
 * @param {Vue} vm
 * @param {string?} name 若不提供该参数，则查找所有子组件并忽略`flag`参数
 * @param {boolean?} flag 默认为深查找，该参数设为`true`，则为浅查找
 * @returns {Vue[]}
 */
var getChildComponents = function (vm, name, flag) {
  var hasChild = function (/** @type {Vue} */ vm) { return vm.$children.length > 0; };
  var isMatch = function (/** @type {Vue} */ vm) { return vm.$options.name === name; };
  var each = function (/** @type {(t: Vue[], vm: Vue) => Vue[]} */ fn) { return function (/** @type {Vue} */ vm) { return vm.$children.reduce(fn, []); }; };
  var fn = name
    ? flag
      ? each(function (t, _) { return t.concat(isMatch(_) ? [_] : [], hasChild(_) ? fn(_) : []); })
      : each(function (t, _) { return t.concat(isMatch(_) ? [_] : hasChild(_) ? fn(_) : []); })
    : each(function (t, _) { return t.concat([_], hasChild(_) ? fn(_) : []); });
  return fn(vm)
};

/**
 * 获取当前路径匹配的路由
 * @param {VueRouter} router
 */
var getRoute = function (router) { return function () {
  return router.resolve(router.mode === 'hash' ? location.hash.slice(1) : location.pathname).route
}; };

var REG_PORT = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
var REG_IP = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
var REG_IP_HAS_PORT = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;

/**
 * @param {IpRuleOption} options
 * @returns {FormValidatorRuleOption}
 */
var createIpRule = function (options) {
  if ( options === void 0 ) options = {};

  var trigger = options.trigger; if ( trigger === void 0 ) trigger = null;
  var required = options.required; if ( required === void 0 ) required = true;
  var port = options.port;
  var msgPrefix = port ? '（含端口号）' : '';
  var msg = options.msg || ("请输入IP地址" + msgPrefix);
  var regmsg = options.regmsg || ("请输入合法的IP地址" + msgPrefix);
  return {
    trigger: trigger,
    required: required,
    validator: function validator (rule, value, callback) {
      if (value) {
        if ((port ? REG_IP_HAS_PORT : REG_IP).test(value)) {
          options.callback ? options.callback(rule, value, callback) : callback();
        } else {
          callback(new Error(regmsg));
        }
      } else {
        required ? callback(new Error(msg)) : callback();
      }
    }
  }
};

/**
 * @param {RuleOption} options
 * @returns {FormValidatorRuleOption}
 */
var createPortRule = function (options) {
  if ( options === void 0 ) options = {};

  var trigger = options.trigger; if ( trigger === void 0 ) trigger = null;
  var required = options.required; if ( required === void 0 ) required = true;
  return {
    trigger: trigger,
    required: required,
    validator: function validator (rule, value, callback) {
      if (value) {
        if (REG_PORT.test(value)) {
          options.callback ? options.callback(rule, value, callback) : callback();
        } else {
          callback(new Error(options.regmsg || '请输入合法的端口号'));
        }
      } else {
        required ? callback(new Error(options.msg || '请输入端口号')) : callback();
      }
    }
  }
};

var base = /*#__PURE__*/Object.freeze({
  __proto__: null,
  formatDate: formatDate,
  getParentComponent: getParentComponent,
  getChildComponents: getChildComponents,
  getRoute: getRoute,
  createIpRule: createIpRule,
  createPortRule: createPortRule
});

function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }

var isStr = function (v) { return typeof v === 'string'; };
var isFunc = function (v) { return typeof v === 'function'; };

/**
 * 路由配置元数据添加key
 * @param {RouteConfig[]} routes
 * @param {string?} basePath
 */
var addRouteMetaKey = function (routes, basePath) {
  routes.forEach(function (route) {
    var key = basePath ? (basePath + "/" + (route.path)) : route.path;
    if (route.meta) {
      route.meta.key = key;
    } else {
      route.meta = { key: key };
    }
    route.children && addRouteMetaKey(route.children, key);
  });
  return routes
};

/**
 * 过滤掉没有权限的路由配置
 * @param {RouteConfig[]} routes
 * @param {string[]?} tags
 */
var filterRoutes = function (routes, tags) {
  var rtnData = [];
  var filter = function (/** @type {RouteConfig[]} */ childs, /** @type {RouteConfig} */ parent) {
    childs.forEach(function (route) {
      var children = route.children;
      var rest = objectWithoutProperties( route, ["children"] );
      var item = rest;
      var tag = route.meta && route.meta.permissionTag;
      if (!tag || tags.includes(tag)) {
        if (parent) {
          if (parent.children) {
            parent.children.push(item);
          } else {
            parent.children = [item];
          }
        } else {
          rtnData.push(item);
        }
        children && filter(children, item);
      }
    });
  };
  if (tags) {
    filter(routes);
    return addRouteMetaKey(rtnData)
  }
  return addRouteMetaKey(routes)
};

/**
 * 提取需要添加到菜单中的路由配置
 * @param {RouteConfig[]} routes
 */
var filterMenus = function (routes) {
  var /** @type {RouteConfig[]} */ menus = [];
  var filter = function (/** @type {RouteConfig[]} */ childs, /** @type {RouteConfig} */ parent) {
    childs.forEach(function (route) {
      var children = route.children;
      var rest = objectWithoutProperties( route, ["children"] );
      var item = rest;
      if (item.meta && item.meta.notMenu) { return }
      if (parent) {
        if (parent.children) {
          parent.children.push(item);
        } else {
          parent.children = [item];
        }
      } else {
        menus.push(item);
      }
      children && filter(children, item);
    });
  };
  filter(routes);
  return menus
};

/**
 * @param {string} url 
 */
var getLibName = function (url) {
  var dirs = url.split('/');
  var fileName = dirs.pop();
  if (fileName.startsWith('index.')) {
    fileName = dirs.pop() || fileName;
  }
  return fileName.split('.')[0]
};

/**
 * umd库加载器
 * @param {string|{[key: string]: string}} url
 */
var umdLoader = function (url) {
  var src = isStr(url) ? url : url[Object.keys(url)[0]];
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.onload = function () {
      var libName = getLibName(src);
      var lib = window[libName];
      if (lib) {
        resolve(lib);
      } else {
        reject(new Error(("The exported name <" + libName + "> was not found")));
      }
      script.onload = script.onerror = null;
      script = null;
    };
    script.onerror = reject;
    script.src = src;
    document.body.appendChild(script);
  })
};

/** @type {RouteConfig[]} */
var _menus = Vue.observable([]);

var getMenus = function () { return _menus; };

/**
 * 添加菜单
 * @param {RouteConfig[]} routes
 * @param {VueRouter} router
 */
var addMenus = function (routes, router) {
  if (isFunc(router.addRoute)) {
    routes.forEach(function (route) {
      router.addRoute(route);
    });
  } else {
    router.addRoutes(routes);
  }
  _menus.push.apply(_menus, filterMenus(routes));
  _menus.sort(function (a, b) { return a.meta.index - b.meta.index; });
};

/**
 * 模块加载器
 * @param {Store} store
 * @param {VueRouter} router
 */
var moduleLoader = function (ref) {
  if ( ref === void 0 ) ref = {};
  var store = ref.store;
  var router = ref.router;

  var loader = function (module, tags, index) {
    if ( index === void 0 ) index = 1000;

    var /** @type {Promise<any>} */ modPromise = isStr(module) ? umdLoader(module) : module();
    return modPromise.then(function (ref) {
      var _mod = ref.default;

      /** @type {LibExportedOption} */
      var mod = isFunc(_mod) ? _mod(Vue, store, router) : _mod;
      if (mod.store) {
        store.registerModule(mod.name, mod.store);
      }
      if (mod.routes) {
        mod.routes.forEach(function (route) {
          if (route.meta) {
            route.meta.index = index;
          } else {
            route.meta = { index: index };
          }
        });
        addMenus(filterRoutes(mod.routes, tags), router);
      }
    })
  };
  return function (modules, tags) { return Promise.all(
    Object.keys(modules).map(function (key, index) {
      return loader(modules[key], tags, index)
        .catch(function (/** @type {Error} */ e) {
          console.warn(("Module load error: " + (e.message)));
        })
    })
  ); }
};

/**
 * @param {VueConstructor} Vue
 */
function index (Vue, ref) {
  var store = ref.store;
  var router = ref.router;

  Vue.prototype.$adminCore = Object.assign({}, base,
    {filterRoutes: filterRoutes,
    addMenus: function (routes) { return addMenus(routes, router); },
    getMenus: getMenus,
    getRoute: getRoute(router),
    moduleLoader: moduleLoader({ store: store, router: router })});
}

export default index;
export { addMenus, createIpRule, createPortRule, filterRoutes, formatDate, getChildComponents, getMenus, getParentComponent, getRoute, moduleLoader };
