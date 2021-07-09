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

<style lang="scss">
@import './assets/theme.scss';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body {
  height: 100%;
  overflow: visible;
}
body {
  color: $text-color-important;
  background-color: $bgcolor;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
a {
  cursor: pointer;
  text-decoration: none;
  color: $text-color-important;
  -webkit-tap-highlight-color: transparent;
}
li {
  list-style: none;
}

// element-ui 样式覆盖
.el-dropdown-menu__item {
  white-space: nowrap;
}
.el-form-item {
  margin-bottom: 24px !important;
  &__error {
    padding-top: 4px !important;
  }
}

.ui-text-btns {
  .el-button {
    padding: 0;
  }
}
</style>
