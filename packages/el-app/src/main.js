import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import AdminCore from '@xview-ui/admin-core/src/index'
import AdminCoreUI from '@xview-ui/admin-core/src/ui/element'
import router from './router'
import App from './App.vue'
Vue.config.productionTip = false
Vue.prototype.$APP_NAME = process.env.VUE_APP_NAME
Vue.use(ElementUI, { size: 'small' })
Vue.use(AdminCore, { router })
Vue.use(AdminCoreUI)
new Vue({ router, render: h => h(App) }).$mount('#app')