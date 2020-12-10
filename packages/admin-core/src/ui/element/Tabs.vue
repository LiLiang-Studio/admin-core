<template>
  <div :class="prefix">
    <el-tabs type="card" :closable="closable" v-model="current" 
      @tab-remove="onTabRemove" @tab-click="onTabClick">
      <el-tab-pane v-for="_ in tabs" :key="_" :name="_" :label="getLabel(_)"/>
    </el-tabs>
    <el-dropdown @command="onCommand">
      <el-link :class="`${prefix}_link`" :underline="false" icon="el-icon-delete"/>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="ALL">关闭所有</el-dropdown-item>
        <el-dropdown-item command="CURRENT">关闭当前标签页</el-dropdown-item>
        <el-dropdown-item command="OTHER">关闭其它标签页</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  data() {
    return { prefix: 'c-tabs', tabs: [], current: '' }
  },
  computed: {
    closable() {
      return !(this.tabs.length === 1 && this.isHome(this.tabs[0]))
    }
  },
  watch: {
    $route: { immediate: true, handler: 'addItem' }
  },
  methods: {
    getRoute(path) {
      return this.$router.resolve(path).route
    },
    getLabel(path) {
      let route = this.getRoute(path).matched.filter(_ => _.meta.title).pop()
      return (route && route.meta.title) || '未命名页面'
    },
    isHome(path) {
      let homePath = this.getRoute('/').path
      return path === '/' || this.getRoute(path).name === 'home' || homePath === path
    },
    addItem(route) {
      if (route.matched.length) {
        if (route.meta.notTab) return this.current = ''
        let prevIndex = this.tabs.indexOf(this.current)
        this.current = route.fullPath
        let index = this.tabs.findIndex(_ => {
          let curRoute = this.getRoute(_)
          return _ === this.current || (route.name && route.name === curRoute.name)
        })
        if (index < 0) {
          prevIndex < 0 ? this.tabs.push(this.current) : this.tabs.splice(prevIndex + 1, 0, this.current)
        } else {
          this.tabs.splice(index, 1, this.current)
        }
      }
    },
    onTabClick(tab) {
      this.$router.push(tab.name).catch(() => {})
    },
    onTabRemove(name) {
      let index = this.tabs.indexOf(name)
      let nextTab = this.tabs[index - 1] || this.tabs[index + 1]
      this.tabs.splice(index, 1)
      name === this.current && this.$router.push(nextTab ? nextTab : '/').catch((e) => {
        this.tabs = [name]
      })
    },
    onCloseAll() {
      this.tabs = []
      // 如果导航失败 说明当前处于首页 那么将当前页放入标签页数组
      this.$router.push('/').catch(() => {
        this.tabs = [this.current]
      })
    },
    onCloseCurrent() {
      this.current && this.closable && this.onTabRemove(this.current)
    },
    onCloseOther() {
      this.tabs = [this.current ? this.current : '/']
    },
    onCommand(cmd) {
      !{ ALL: this.onCloseAll, CURRENT: this.onCloseCurrent, OTHER: this.onCloseOther }[cmd]()
    }
  }
}
</script>
<style lang="less">
@import url("../vars.less");
@padding: 3px;
.c-tabs {
  position: relative;
  z-index: 10;
  padding: @padding 0;
  background: #fff;
  box-shadow: @header-shadow;
  .el-dropdown {
    position: absolute;
    top: @padding;
    right: 10px;
    bottom: @padding;
  }
  &_link.el-link {
    height: 100%;
  }
  .el-tabs__header {
    min-height: 33px;
    margin-bottom: 0;
    padding: 0 32px 0 6px;
  }
  .el-tabs__item {
    height: 32px;
    line-height: 32px;
    font-size: 12px;
  }
  .el-tabs__nav-next, .el-tabs__nav-prev {
    line-height: 36px;
    font-size: 14px;
  }
}
</style>