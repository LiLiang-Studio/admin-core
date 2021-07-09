<template>
  <header :class="[prefix, {showTabs}]">
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
export default {
  name: 'CHeader',
  inject: {
    frameLayout: { default: '' }
  },
  props: {
    topbarStyle: {},
    topbarClass: {}
  },
  data () {
    return { prefix: 'c-header' }
  },
  computed: {
    showTabs () {
      return (this.frameLayout || {}).showTabs
    }
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
  &.showTabs {
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
