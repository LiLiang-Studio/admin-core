<template>
  <div id="app">
    <component :is="layout"></component>
  </div>
</template>
<script>
import modules from './modules'
import UiFrameLayout from './components/Layout.vue'
export default {
  data() {
    return { layout: this.getLayout() }
  },
  watch: {
    $route() {
      this.layout = this.getLayout()
    }
  },
  created() {
    this.initApp()
  },
  methods: {
    getRoute() {
      return this.$adminCore.getRoute()
    },
    getLayout() {
      let { matched } = this.getRoute()
      if (matched.length < 1) return null
      let route = matched.reverse().find(_ => _.meta.layout || _.meta.layout === null)
      let layout = route ? route.meta.layout : undefined
      return layout ? layout : layout === null ? 'router-view' : UiFrameLayout
    },
    initApp() {
      let route = this.getRoute()
      if (route.path.startsWith('/entry')) {
        return route.matched.length < 1 && this.$router.replace({ name: 'login' })
      }
      this.$adminCore.moduleLoader(modules, ['test', 'test:a', 'test:b']).then(() => {
        this.getRoute().matched.length < 1 && this.$router.replace('/')
      })
    }
  }
}
</script>