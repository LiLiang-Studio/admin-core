<template>
  <c-frame-layout v-bind="layoutProps">
    <router-link slot="header-left" to="/" :class="`${prefix}_logo`">{{$APP_NAME}}</router-link>
    <el-dropdown slot="header-right" trigger="click">
      <div :class="`${prefix}_user`">
        <el-avatar icon="el-icon-user-solid" :size="32"/>
        <span style="margin-left:6px;">liliang</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-lock" command="USER_INFO">个人资料</el-dropdown-item>
        <el-dropdown-item icon="el-icon-lock" command="UPDATE_PWD">修改密码</el-dropdown-item>
        <el-dropdown-item icon="el-icon-switch-button" command="LOGOUT">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <router-view/>
  </c-frame-layout>
</template>
<script>
export default {
  name: 'AppMainLayout',
  data() {
    return { prefix: 'app-main-layout' }
  },
  computed: {
    layoutProps() {
      return {
        showTabs: true,
        menuSize: 'small',
        menus: this.$store.state.core.menus
      }
    }
  }
}
</script>
<style lang="less">
.app-main-layout {
  &_logo {
    font-size: 18px;
  }
  &_user {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
}
</style>