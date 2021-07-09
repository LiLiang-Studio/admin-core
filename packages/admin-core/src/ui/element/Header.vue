<template>
  <header :class="[prefix, {hasTabs}]">
    <div :class="[`${prefix}_topbar`, topbarClass]" :style="topbarStyle">
      <div :class="`${prefix}_left`">
        <slot name="left"></slot>
      </div>
      <div :class="`${prefix}_middle`">
        <slot name="middle"></slot>
      </div>
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
<style lang="scss">
@import '../vars.scss';
.c-header {
  position: relative;
  z-index: 10;
  background: #fff;
  box-shadow: $header-shadow;
  &.hasTabs {
    box-shadow: none;
    border-bottom: 1px solid $border-color;
  }
  &_topbar {
    height: 52px;
    padding: 0 16px;
    display: flex;
    align-items: center;
  }
  &_left > *, &_middle > * {
    vertical-align: middle;
  }
  &_middle {
    flex: 1;
    padding: 0 10px;
  }
}
</style>