<template>
  <header :class="[prefix, {hasTabs}]">
    <div :class="[`${prefix}_topbar`, topbarClass]" :style="topbarStyle">
      <slot name="left"></slot>
      <div :class="`${prefix}_middle`"></div>
      <slot name="right"></slot>
    </div>
    <slot></slot>
  </header>
</template>
<script>
import { getParentComponent } from '../../base'
export default {
  name: 'CHeader',
  props: {
    topbarStyle: {},
    topbarClass: {}
  },
  data() {
    return { prefix: 'c-header', hasTabs: false }
  },
  mounted() {
    const parent = getParentComponent(this, 'CFrameLayout')
    if (parent) {
      this.unwatch = this.$watch(() => parent.showTabs, val => this.hasTabs = val, { immediate: true })
    }
  },
  destroyed() {
    this.unwatch && this.unwatch()
  }
}
</script>
<style lang="less">
@import url("../vars.less");
.c-header {
  position: relative;
  z-index: 10;
  background: #fff;
  box-shadow: @header-shadow;
  &.hasTabs {
    box-shadow: none;
    border: 1px solid @border-color;
  }
  &_topbar {
    height: 52px;
    padding: 0 16px;
    display: flex;
    align-items: center;
  }
  &_middle {
    flex: 1;
    height: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
  }
}
</style>