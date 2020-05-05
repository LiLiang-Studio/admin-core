<template>
  <div :class="prefix">
    <c-header v-bind="headerProps">
      <template v-slot:left>
        <el-link v-if="collapsible" v-bind="menuBtnProps" @click="collapse = !collapse"/>
        <slot name="header-left"></slot>
      </template>
      <template v-slot:middle>
        <slot name="header-middle"></slot>
      </template>
      <template v-slot:right>
        <slot name="header-right"></slot>
      </template>
    </c-header>
    <div :class="`${prefix}_wrap`">
      <c-aside :class="`${prefix}_aside`" v-bind="asideProps"/>
      <main :class="`${prefix}_main`">
        <c-tabs v-if="showTabs"/>
        <div :class="`${prefix}_content`">
          <c-breadcrumb/>
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import CTabs from './Tabs.vue'
import CAside from './Aside.vue'
import CHeader from './Header.vue'
import CBreadcrumb from './Breadcrumb.vue'
export default {
  name: 'CFrameLayout',
  components: { CTabs, CAside, CHeader, CBreadcrumb },
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
    }
  },
  data() {
    return { prefix: 'c-frame-layout', collapse: false }
  },
  computed: {
    asideProps() {
      return {
        menus: this.menus,
        collapse: this.collapse,
        class: this.asideClass,
        style: this.asideStyle
      }
    },
    headerProps() {
      return {
        topbarStyle: this.topbarStyle,
        topbarClass: this.topbarClass
      }
    },
    menuBtnProps() {
      let props = this.collapse ?
        { title: '展开侧栏', icon: 'el-icon-s-unfold' } :
        { title: '收起侧栏', icon: 'el-icon-s-fold' }
      return { ...props, underline: false, class: `${this.prefix}_menuBtn` }
    }
  }
}
</script>
<style lang="less">
@import url("../vars.less");
.c-frame-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  &_wrap {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
  &_main {
    flex: 1;
    width: 0;
    display: flex;
    flex-direction: column;
  }
  &_content {
    flex: 1;
    overflow: auto;
    padding: @frame-padding;
  }
  &_menuBtn.el-link {
    font-size: 24px;
    margin-right: 6px;
  }
}
</style>