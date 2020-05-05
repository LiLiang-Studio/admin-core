<template>
<div>
  <el-submenu v-if="menu.children && menu.children.length" :popper-class="`c-submenu_popper_${size}`" :index="menu.meta.key">
    <template v-slot:title>
      <i v-if="menu.meta.icon" :class="`el-icon-${menu.meta.icon}`"></i>
      <span>{{menu.meta.title}}</span>
    </template>
    <template v-for="item in menu.children">
      <c-submenu v-if="item.children && item.children.length" :key="item.meta.key" :menu="item" :size="size"/>
      <a v-else :key="item.meta.key" v-bind="getLink(item)">
        <el-menu-item :index="item.meta.key">{{item.meta.title}}</el-menu-item>
      </a>
    </template>
  </el-submenu>
  <a v-else v-bind="getLink(menu)">
    <el-menu-item :index="menu.meta.key">
      <i v-if="menu.meta.icon" :class="`el-icon-${menu.meta.icon}`"></i>
      <template v-slot:title>{{menu.meta.title}}</template>
    </el-menu-item>
  </a>
</div>
</template>
<script>
export default {
  name: 'CSubmenu',
  props: ['menu', 'size'],
  methods: {
    getRoute(item) {
      return this.$router.resolve(
        name ? { name: item.name } : item.meta.key
      ).route.fullPath
    },
    getLink(item) {
      return item.meta.url ? { target: '__blank', href: item.meta.url } : { is: 'RouterLink', to: this.getRoute(item) }
    }
  }
}
</script>