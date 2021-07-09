/*!
 * admin-core.element.js v2.0.0
 * (c) 2019-2021 LiLiang
 * Released under the MIT License.
 */
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  name: 'CSubmenu',
  props: ['menu', 'size'],
  methods: {
    getRoute: function getRoute(item) {
      return this.$router.resolve(
        item.name ? { name: item.name } : item.meta.key
      ).route.fullPath
    },
    getLink: function getLink(item) {
      return item.meta.url ? { target: '__blank', href: item.meta.url } : { is: 'RouterLink', to: this.getRoute(item) }
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _vm.menu.children && _vm.menu.children.length
        ? _c(
            "el-submenu",
            {
              attrs: {
                "popper-class": "c-submenu_popper_" + _vm.size,
                index: _vm.menu.meta.key
              },
              scopedSlots: _vm._u(
                [
                  {
                    key: "title",
                    fn: function() {
                      return [
                        _vm.menu.meta.icon
                          ? _c("i", { class: "el-icon-" + _vm.menu.meta.icon })
                          : _vm._e(),
                        _vm._v(" "),
                        _c("span", [_vm._v(_vm._s(_vm.menu.meta.title))])
                      ]
                    },
                    proxy: true
                  }
                ],
                null,
                false,
                1209760248
              )
            },
            [
              _vm._v(" "),
              _vm._l(_vm.menu.children, function(item) {
                return [
                  item.children && item.children.length
                    ? _c("c-submenu", {
                        key: item.meta.key,
                        attrs: { menu: item, size: _vm.size }
                      })
                    : _c(
                        "a",
                        _vm._b(
                          { key: item.meta.key },
                          "a",
                          _vm.getLink(item),
                          false
                        ),
                        [
                          _c(
                            "el-menu-item",
                            { attrs: { index: item.meta.key } },
                            [_vm._v(_vm._s(item.meta.title))]
                          )
                        ],
                        1
                      )
                ]
              })
            ],
            2
          )
        : _c(
            "a",
            _vm._b({}, "a", _vm.getLink(_vm.menu), false),
            [
              _c(
                "el-menu-item",
                {
                  attrs: { index: _vm.menu.meta.key },
                  scopedSlots: _vm._u([
                    {
                      key: "title",
                      fn: function() {
                        return [_vm._v(_vm._s(_vm.menu.meta.title))]
                      },
                      proxy: true
                    }
                  ])
                },
                [
                  _vm.menu.meta.icon
                    ? _c("i", { class: "el-icon-" + _vm.menu.meta.icon })
                    : _vm._e()
                ]
              )
            ],
            1
          )
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

/**
 * 获取当前路径匹配的路由
 * @param {VueRouter} router
 */
var getRoute = function (router) { return function () {
  return router.resolve(router.mode === 'hash' ? location.hash.slice(1) : location.pathname).route
}; };

//
var script$1 = {
  name: 'CAside',
  components: { CSubmenu: __vue_component__ },
  props: {
    collapse: Boolean,
    menus: {
      type: Array,
      default: function () { return []; }
    },
    menuSize: {
      default: 'normal',
      validator: function (v) { return ['small', 'normal', 'large'].includes(v); }
    }
  },
  data: function data () {
    return { prefix: 'c-aside', defaultActive: undefined }
  },
  computed: {
    menuProps: function menuProps () {
      return {
        ref: 'Menu',
        uniqueOpened: true,
        defaultActive: this.defaultActive,
        collapse: this.collapse,
        class: ((this.prefix) + "_menu")
      }
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$once('hook:destroyed', this.$watch(
      function () { return [this$1.menus.length, this$1.collapse, this$1.$route.path]; },
      function (ref) {
        var _ = ref[0];
        var __ = ref[1];

        return _ > 0 && !__ && this$1.refreshMenu();
    },
      { immediate: true }
    ));
  },
  methods: {
    refreshMenu: function refreshMenu () {
      var this$1 = this;

      var route = getRoute(this.$router)();
      var menuRoute = route.matched[0];
      var index = menuRoute && menuRoute.meta.key;
      var key = route.matched.map(function (_) { return _.meta.key; }).filter(function (_) { return _ && !_.endsWith('/'); }).pop();
      this.defaultActive = key;
      index && this.$nextTick(function () {
        try {
          this$1.$refs.Menu.open(index);
          clearTimeout(this$1.tid);
          this$1.tid = setTimeout(function () {
            var activeElement = this$1.$el.querySelector('.router-link-active>li');
            activeElement && activeElement.scrollIntoViewIfNeeded();
          }, 300);
        } catch (e) {}
      });
    }
  }
};

function styleInject(css, ref) {
  if ( ref === void 0 ) { ref = {}; }
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".c-aside{height:100%;background:#414146;-webkit-box-shadow:2px 0 1px -1px rgba(0,0,0,.1),1px 0 1px 0 rgba(0,0,0,.06),1px 0 3px 0 rgba(0,0,0,.04);box-shadow:2px 0 1px -1px rgba(0,0,0,.1),1px 0 1px 0 rgba(0,0,0,.06),1px 0 3px 0 rgba(0,0,0,.04)}.c-aside_menu{width:220px}.c-aside_menu.el-menu{padding:8px 0;border-right:none}.c-aside_menu.el-menu.el-menu--collapse{width:64px}.c-aside .el-scrollbar{height:100%}.c-aside .el-scrollbar__wrap{overflow-x:hidden}.c-aside .el-menu--collapse>div>.el-submenu>.el-submenu__title .el-submenu__icon-arrow,.c-aside .el-menu--collapse>div>.el-submenu>.el-submenu__title span{display:none}.c-aside_normal .el-menu-item,.c-aside_normal .el-submenu .el-menu-item,.c-aside_normal .el-submenu__title,.c-submenu_popper_normal .el-menu-item,.c-submenu_popper_normal .el-submenu .el-menu-item,.c-submenu_popper_normal .el-submenu__title{height:48px;line-height:48px}.c-aside_small .el-menu-item,.c-aside_small .el-submenu .el-menu-item,.c-aside_small .el-submenu__title,.c-submenu_popper_small .el-menu-item,.c-submenu_popper_small .el-submenu .el-menu-item,.c-submenu_popper_small .el-submenu__title{height:42px;line-height:42px}";
styleInject(css_248z);

/* script */
var __vue_script__$1 = script$1;
/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "aside",
    { class: [_vm.prefix, _vm.prefix + "_" + _vm.menuSize] },
    [
      _c(
        "el-scrollbar",
        [
          _c(
            "el-menu",
            _vm._b({}, "el-menu", _vm.menuProps, false),
            _vm._l(_vm.menus, function(menu) {
              return _c("c-submenu", {
                key: menu.meta.key,
                attrs: { menu: menu, size: _vm.menuSize }
              })
            }),
            1
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//

var script$2 = {
  name: 'CBreadcrumb',
  data: function data () {
    return { prefix: 'c-breadcrumb' }
  },
  computed: {
    items: function items () {
      return this.$route.matched.filter(function (_) { return _.meta.title; })
    }
  }
};

var css_248z$1 = ".c-breadcrumb{margin-bottom:18px}.c-breadcrumb_back.el-link{font-size:20px;margin-right:6px}.c-breadcrumb .el-breadcrumb{display:inline-block;vertical-align:middle}.c-breadcrumb .el-breadcrumb__separator{margin:0 6px}";
styleInject(css_248z$1);

/* script */
var __vue_script__$2 = script$2;
/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.items.length > 1
    ? _c(
        "div",
        { class: _vm.prefix },
        [
          _vm.items.length > 2
            ? _c("el-link", {
                class: _vm.prefix + "_back",
                attrs: {
                  title: "返回",
                  icon: "el-icon-back",
                  underline: false
                },
                on: {
                  click: function($event) {
                    return _vm.$router.back()
                  }
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _c(
            "el-breadcrumb",
            { attrs: { separator: "/" } },
            _vm._l(_vm.items, function(item, index) {
              return _c("el-breadcrumb-item", { key: index }, [
                _c("span", [_vm._v(_vm._s(item.meta.title))])
              ])
            }),
            1
          )
        ],
        1
      )
    : _vm._e()
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  var __vue_inject_styles__$2 = undefined;
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$3 = {
  name: 'CHeader',
  inject: {
    frameLayout: { default: '' }
  },
  props: {
    topbarStyle: {},
    topbarClass: {}
  },
  data: function data () {
    return { prefix: 'c-header' }
  },
  computed: {
    showTabs: function showTabs () {
      return (this.frameLayout || {}).showTabs
    }
  }
};

var css_248z$2 = ".c-header{position:relative;z-index:10;background:#fff;-webkit-box-shadow:2px 2px 1px -1px rgba(0,0,0,.1),2px 1px 1px 0 rgba(0,0,0,.06),2px 1px 3px 0 rgba(0,0,0,.04);box-shadow:2px 2px 1px -1px rgba(0,0,0,.1),2px 1px 1px 0 rgba(0,0,0,.06),2px 1px 3px 0 rgba(0,0,0,.04)}.c-header.showTabs{-webkit-box-shadow:none;box-shadow:none;border-bottom:1px solid #e4e7ed}.c-header_topbar{height:52px;padding:0 16px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.c-header_left>*,.c-header_middle>*{vertical-align:middle}.c-header_middle{-webkit-box-flex:1;-ms-flex:1;flex:1;padding:0 10px}";
styleInject(css_248z$2);

/* script */
var __vue_script__$3 = script$3;
/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "header",
    { class: [_vm.prefix, { showTabs: _vm.showTabs }] },
    [
      _c(
        "div",
        {
          class: [_vm.prefix + "_topbar", _vm.topbarClass],
          style: _vm.topbarStyle
        },
        [
          _c("div", { class: _vm.prefix + "_left" }, [_vm._t("left")], 2),
          _vm._v(" "),
          _c("div", { class: _vm.prefix + "_middle" }, [_vm._t("middle")], 2),
          _vm._v(" "),
          _vm._t("right")
        ],
        2
      ),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  var __vue_inject_styles__$3 = undefined;
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$4 = {
  data: function data() {
    return { prefix: 'c-tabs', tabs: [], current: '' }
  },
  computed: {
    closable: function closable() {
      return !(this.tabs.length === 1 && this.isHome(this.tabs[0]))
    }
  },
  watch: {
    $route: { immediate: true, handler: 'addItem' }
  },
  methods: {
    getRoute: function getRoute(path) {
      return this.$router.resolve(path).route
    },
    getLabel: function getLabel(path) {
      var route = this.getRoute(path).matched.filter(function (_) { return _.meta.title; }).pop();
      return (route && route.meta.title) || '未命名页面'
    },
    isHome: function isHome(path) {
      var homePath = this.getRoute('/').path;
      return path === '/' || this.getRoute(path).name === 'home' || homePath === path
    },
    addItem: function addItem(route) {
      var this$1 = this;

      if (route.matched.length) {
        if (route.meta.notTab) { return this.current = '' }
        var prevIndex = this.tabs.indexOf(this.current);
        this.current = route.fullPath;
        var index = this.tabs.findIndex(function (_) {
          var curRoute = this$1.getRoute(_);
          return _ === this$1.current || (route.name && route.name === curRoute.name)
        });
        if (index < 0) {
          prevIndex < 0 ? this.tabs.push(this.current) : this.tabs.splice(prevIndex + 1, 0, this.current);
        } else {
          this.tabs.splice(index, 1, this.current);
        }
      }
    },
    onTabClick: function onTabClick(tab) {
      this.$router.push(tab.name).catch(function () {});
    },
    onTabRemove: function onTabRemove(name) {
      var this$1 = this;

      var index = this.tabs.indexOf(name);
      var nextTab = this.tabs[index - 1] || this.tabs[index + 1];
      this.tabs.splice(index, 1);
      name === this.current && this.$router.push(nextTab ? nextTab : '/').catch(function (e) {
        this$1.tabs = [name];
      });
    },
    onCloseAll: function onCloseAll() {
      var this$1 = this;

      this.tabs = [];
      // 如果导航失败 说明当前处于首页 那么将当前页放入标签页数组
      this.$router.push('/').catch(function () {
        this$1.tabs = [this$1.current];
      });
    },
    onCloseCurrent: function onCloseCurrent() {
      this.current && this.closable && this.onTabRemove(this.current);
    },
    onCloseOther: function onCloseOther() {
      this.tabs = [this.current ? this.current : '/'];
    },
    onCommand: function onCommand(cmd) {
      !{ ALL: this.onCloseAll, CURRENT: this.onCloseCurrent, OTHER: this.onCloseOther }[cmd]();
    }
  }
};

var css_248z$3 = ".c-tabs{position:relative;z-index:10;padding:3px 0;background:#fff;-webkit-box-shadow:2px 2px 1px -1px rgba(0,0,0,.1),2px 1px 1px 0 rgba(0,0,0,.06),2px 1px 3px 0 rgba(0,0,0,.04);box-shadow:2px 2px 1px -1px rgba(0,0,0,.1),2px 1px 1px 0 rgba(0,0,0,.06),2px 1px 3px 0 rgba(0,0,0,.04)}.c-tabs .el-dropdown{position:absolute;top:3px;right:10px;bottom:3px}.c-tabs_link.el-link{height:100%}.c-tabs .el-tabs__header{min-height:33px;margin-bottom:0;padding:0 32px 0 6px}.c-tabs .el-tabs__item{height:32px;line-height:32px;font-size:12px}.c-tabs .el-tabs__nav-next,.c-tabs .el-tabs__nav-prev{line-height:36px;font-size:14px}";
styleInject(css_248z$3);

/* script */
var __vue_script__$4 = script$4;
/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.prefix },
    [
      _c(
        "el-tabs",
        {
          attrs: { type: "card", closable: _vm.closable },
          on: { "tab-remove": _vm.onTabRemove, "tab-click": _vm.onTabClick },
          model: {
            value: _vm.current,
            callback: function($$v) {
              _vm.current = $$v;
            },
            expression: "current"
          }
        },
        _vm._l(_vm.tabs, function(_) {
          return _c("el-tab-pane", {
            key: _,
            attrs: { name: _, label: _vm.getLabel(_) }
          })
        }),
        1
      ),
      _vm._v(" "),
      _c(
        "el-dropdown",
        { on: { command: _vm.onCommand } },
        [
          _c("el-link", {
            class: _vm.prefix + "_link",
            attrs: { underline: false, icon: "el-icon-delete" }
          }),
          _vm._v(" "),
          _c(
            "el-dropdown-menu",
            { attrs: { slot: "dropdown" }, slot: "dropdown" },
            [
              _c("el-dropdown-item", { attrs: { command: "ALL" } }, [
                _vm._v("关闭所有")
              ]),
              _vm._v(" "),
              _c("el-dropdown-item", { attrs: { command: "CURRENT" } }, [
                _vm._v("关闭当前标签页")
              ]),
              _vm._v(" "),
              _c("el-dropdown-item", { attrs: { command: "OTHER" } }, [
                _vm._v("关闭其它标签页")
              ])
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  var __vue_inject_styles__$4 = undefined;
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$5 = {
  name: 'CFrameLayout',
  components: { CTabs: __vue_component__$4, CAside: __vue_component__$1, CHeader: __vue_component__$3, CBreadcrumb: __vue_component__$2 },
  provide: function provide() {
    return { frameLayout: this }
  },
  props: {
    menus: Array,
    asideStyle: {},
    asideClass: {},
    topbarStyle: {},
    topbarClass: {},
    showTabs: Boolean,
    collapsible: {
      type: Boolean,
      default: true
    },
    menuSize: String,
    defaultCollapse: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return { prefix: 'c-frame-layout', collapse: this.defaultCollapse }
  },
  computed: {
    asideProps: function asideProps() {
      return {
        menus: this.menus,
        collapse: this.collapse,
        class: this.asideClass,
        style: this.asideStyle,
        menuSize: this.menuSize
      }
    },
    headerProps: function headerProps() {
      return {
        topbarStyle: this.topbarStyle,
        topbarClass: this.topbarClass
      }
    },
    menuBtnProps: function menuBtnProps() {
      var props = this.collapse ?
        { title: '展开侧栏', icon: 'el-icon-s-unfold' } :
        { title: '收起侧栏', icon: 'el-icon-s-fold' };
      return Object.assign({}, props, {underline: false, class: ((this.prefix) + "_menuBtn")})
    }
  },
  methods: {
    getTabsComponent: function getTabsComponent() {
      return this.$refs.Tabs
    },
    toggleCollapse: function toggleCollapse() {
      this.collapse = !this.collapse;
    }
  }
};

var css_248z$4 = ".c-frame-layout{height:100vh;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.c-frame-layout_wrap{overflow:hidden}.c-frame-layout_main,.c-frame-layout_wrap{-webkit-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-ms-flexbox;display:flex}.c-frame-layout_main{width:0;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.c-frame-layout_content{-webkit-box-flex:1;-ms-flex:1;flex:1;overflow:auto;padding:18px}.c-frame-layout_menuBtn.el-link{font-size:24px;margin-right:6px}";
styleInject(css_248z$4);

/* script */
var __vue_script__$5 = script$5;
/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.prefix },
    [
      _c(
        "c-header",
        _vm._b(
          {
            scopedSlots: _vm._u(
              [
                {
                  key: "left",
                  fn: function() {
                    return [
                      _vm.collapsible
                        ? _c(
                            "el-link",
                            _vm._b(
                              { on: { click: _vm.toggleCollapse } },
                              "el-link",
                              _vm.menuBtnProps,
                              false
                            )
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm._t("header-left")
                    ]
                  },
                  proxy: true
                },
                {
                  key: "middle",
                  fn: function() {
                    return [_vm._t("header-middle")]
                  },
                  proxy: true
                },
                {
                  key: "right",
                  fn: function() {
                    return [_vm._t("header-right")]
                  },
                  proxy: true
                }
              ],
              null,
              true
            )
          },
          "c-header",
          _vm.headerProps,
          false
        )
      ),
      _vm._v(" "),
      _c(
        "div",
        { class: _vm.prefix + "_wrap" },
        [
          _c(
            "c-aside",
            _vm._b(
              { class: _vm.prefix + "_aside" },
              "c-aside",
              _vm.asideProps,
              false
            )
          ),
          _vm._v(" "),
          _c(
            "main",
            { class: _vm.prefix + "_main" },
            [
              _vm.showTabs ? _c("c-tabs", { ref: "Tabs" }) : _vm._e(),
              _vm._v(" "),
              _c(
                "div",
                { class: _vm.prefix + "_content" },
                [_c("c-breadcrumb"), _vm._v(" "), _vm._t("default")],
                2
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  var __vue_inject_styles__$5 = undefined;
  /* scoped */
  var __vue_scope_id__$5 = undefined;
  /* module identifier */
  var __vue_module_identifier__$5 = undefined;
  /* functional template */
  var __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$5 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$6 = {
  name: 'CTableView',
  props: {
    total: Number,
    pageNum: [Number, String],
    pageSize: [Number, String],
    loading: Boolean,
    hidePager: Boolean,
    pagerOptions: Object
  },
  data: function data() {
    return { 
      prefix: 'c-table-view',
      hasActions: false,
      hasSearchBar: false
    }
  },
  computed: {
    tableProps: function tableProps() {
      return Object.assign({}, {border: true,
        stripe: true},
        this.$attrs)
    },
    pagerProps: function pagerProps() {
      return Object.assign({}, {background: true,
        pagerCount: 5,
        pageSizes: [10, 20, 50],
        layout: 'total, sizes, prev, pager, next, jumper'},
        (this.pagerOptions || {}),
        {total: this.total,
        pageSize: +this.pageSize,
        currentPage: +this.pageNum})
    }
  },
  mounted: function mounted() {
    this.hasActions = this.$slots.actions;
    this.hasSearchBar = this.$slots.search;
  },
  methods: {
    /**
     * Element-UI 分页器一个bug
     * 页大小改变将当前页设为首页 有时候会触发当前页改变，出现的很频繁
     * 不是每次都触发，使状态变的难以控制；而IView的分页器每次都触发，控制起来非常容易
     * 尝试用this.$nextTick 然并卵
     * setTimeout完美解决
     */
    onSizeChange: function onSizeChange(pageSize) {
      var this$1 = this;

      this.isSizeChanged = true; // 标识页大小改变
      this.$emit('change', { pageSize: pageSize, pageNum: 1 });
      setTimeout(function () { return this$1.isSizeChanged = false; }, 0); // 我们必须在该方法中延迟重置isSizeChanged的值为false
    },
    // 页大小改变时 该方法可能会执行 并早于以上定时器回调函数执行
    onCurrentChange: function onCurrentChange(pageNum) {
      if (!this.isSizeChanged) { this.$emit('change', { pageNum: pageNum }); }
    },
    getTable: function getTable() {
      return this.$refs.Table
    }
  }
};

var css_248z$5 = ".c-table-view{background:#fff;border-radius:6px;border:1px solid #e4e7ed;padding:18px 18px 36px}.c-table-view+.c-table-view{margin-top:18px}.c-table-view_searchBar .el-form-item{margin-bottom:18px!important}.c-table-view_searchBar+.c-table-view_actionBar{padding-top:9px;border-top:1px solid #e4e7ed}.c-table-view_actionBar{padding-bottom:9px}.c-table-view .el-pagination{text-align:center;margin-top:18px}";
styleInject(css_248z$5);

/* script */
var __vue_script__$6 = script$6;
/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.prefix },
    [
      _vm.hasSearchBar
        ? _c("div", { class: _vm.prefix + "_searchBar" }, [_vm._t("search")], 2)
        : _vm._e(),
      _vm._v(" "),
      _vm.hasActions
        ? _c(
            "div",
            { class: _vm.prefix + "_actionBar" },
            [_vm._t("actions")],
            2
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-table",
        _vm._g(
          _vm._b(
            {
              directives: [
                {
                  name: "loading",
                  rawName: "v-loading",
                  value: _vm.loading,
                  expression: "loading"
                }
              ],
              ref: "Table",
              scopedSlots: _vm._u(
                [
                  {
                    key: "append",
                    fn: function() {
                      return [_vm._t("append")]
                    },
                    proxy: true
                  }
                ],
                null,
                true
              )
            },
            "el-table",
            _vm.tableProps,
            false
          ),
          _vm.$listeners
        ),
        [_vm._t("default")],
        2
      ),
      _vm._v(" "),
      !_vm.hidePager
        ? _c(
            "el-pagination",
            _vm._b(
              {
                on: {
                  "size-change": _vm.onSizeChange,
                  "current-change": _vm.onCurrentChange
                }
              },
              "el-pagination",
              _vm.pagerProps,
              false
            )
          )
        : _vm._e(),
      _vm._v(" "),
      _vm._t("other")
    ],
    2
  )
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  var __vue_inject_styles__$6 = undefined;
  /* scoped */
  var __vue_scope_id__$6 = undefined;
  /* module identifier */
  var __vue_module_identifier__$6 = undefined;
  /* functional template */
  var __vue_is_functional_template__$6 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$6 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    undefined,
    undefined,
    undefined
  );



var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Aside: __vue_component__$1,
  Breadcrumb: __vue_component__$2,
  Header: __vue_component__$3,
  Tabs: __vue_component__$4,
  FrameLayout: __vue_component__$5,
  TableView: __vue_component__$6
});

/**
 * @param {import('vue').VueConstructor} Vue
 */
function index (Vue) {
  Object.keys(components).forEach(function (name) {
    Vue.component(("C" + name), components[name]);
  });
}

export default index;
export { __vue_component__$1 as Aside, __vue_component__$2 as Breadcrumb, __vue_component__$5 as FrameLayout, __vue_component__$3 as Header, __vue_component__$6 as TableView, __vue_component__$4 as Tabs };
