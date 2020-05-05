<template>
  <aside :class="[prefix, `${prefix}_${menuSize}`]">
    <el-scrollbar>
      <el-menu v-bind="menuProps">
        <c-submenu v-for="menu in menus" :key="menu.meta.key" :menu="menu" :size="menuSize"/>
      </el-menu>
    </el-scrollbar>
  </aside>
</template>
<script>
import CSubmenu from './Submenu.vue'
import { getRoute } from '../../base'
export default {
  name: 'CAside',
  components: { CSubmenu },
  props: {
    collapse: Boolean,
    menus: {
      type: Array,
      default: () => []
    },
    menuSize: {
      default: 'normal',
      validator: v => ['small', 'normal', 'large'].indexOf(v) > -1
    }
  },
  data() {
    return { prefix: 'c-aside', defaultActive: undefined }
  },
  computed: {
    menuProps() {
      return {
        ref: 'Menu',
        uniqueOpened: true,
        defaultActive: this.defaultActive,
        collapse: this.collapse,
        class: `${this.prefix}_menu`
      }
    }
  },
  mounted() {
    this.unwatch = this.$watch(
      () => [this.menus.length, this.collapse, this.$route.path],
      ([_, __]) => _ > 0 && !__ && this.refreshMenu(),
      { immediate: true }
    )
  },
  destroyed() {
    this.unwatch()
  },
  methods: {
    refreshMenu() {
      let route = getRoute(this.$router)()
      let menuRoute = route.matched[0]
      let index = menuRoute && menuRoute.meta.key
      let key = route.matched.map(_ => _.meta.key).filter(_ => _ && !_.endsWith('/')).pop()
      this.defaultActive = key
      index && this.$nextTick(() => {
        try {
          this.$refs.Menu.open(index)
          clearTimeout(this.tid)
          this.tid = setTimeout(() => {
            let activeElement = this.$el.querySelector('.router-link-active>li')
            activeElement && activeElement.scrollIntoViewIfNeeded()
          }, 300)
        } catch (e) {}
      })
    }
  }
}
</script>
<style lang="less">
@import url("../vars.less");
@aside: .c-aside;
@popper: .c-submenu_popper;
@{aside} {
  height: 100%;
  background: @theme-bgcolor;
  box-shadow: @aside-shadow;
  &_menu {
    width: @aside-width;
    &.el-menu {
      padding: 8px 0;
      border-right: none;
      &.el-menu--collapse {
        width: 64px;
      }
    }
  }
  .el-scrollbar {
    height: 100%;
    &__wrap {
      overflow-x: hidden;
    }
  }
  .el-menu--collapse > div > .el-submenu > .el-submenu__title span,
  .el-menu--collapse > div > .el-submenu > .el-submenu__title .el-submenu__icon-arrow {
    display: none;
  }
}

@{popper}_normal, @{aside}_normal {
  .el-submenu .el-menu-item,
  .el-menu-item, .el-submenu__title {
    height: 48px;
    line-height: 48px;
  }
}

@{popper}_small, @{aside}_small {
  .el-submenu .el-menu-item,
  .el-menu-item, .el-submenu__title {
    height: 42px;
    line-height: 42px;
  }
}
</style>