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
