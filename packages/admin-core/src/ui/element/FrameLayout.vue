<template>
  <div :class="prefix">
    <c-header v-bind="headerProps">
      <template #left>
        <el-link v-if="collapsible" v-bind="menuBtnProps" @click="toggleCollapse"/>
        <slot name="header-left"></slot>
      </template>
      <template #middle>
        <slot name="header-middle"></slot>
      </template>
      <template #right>
        <slot name="header-right"></slot>
      </template>
    </c-header>
    <div :class="`${prefix}_wrap`">
      <c-aside :class="`${prefix}_aside`" v-bind="asideProps"/>
      <main :class="`${prefix}_main`">
        <c-tabs v-if="showTabs" ref="Tabs"/>
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
  provide() {
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
  data() {
    return { prefix: 'c-frame-layout', collapse: this.defaultCollapse }
  },
  computed: {
    asideProps() {
      return {
        menus: this.menus,
        collapse: this.collapse,
        class: this.asideClass,
        style: this.asideStyle,
        menuSize: this.menuSize
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
  },
  methods: {
    getTabsComponent() {
      return this.$refs.Tabs
    },
    toggleCollapse() {
      this.collapse = !this.collapse
    }
  }
}
</script>
<style lang="scss">
@import '../vars.scss';
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
    padding: $frame-padding;
  }
  &_menuBtn.el-link {
    font-size: 24px;
    margin-right: 6px;
  }
}
</style>
