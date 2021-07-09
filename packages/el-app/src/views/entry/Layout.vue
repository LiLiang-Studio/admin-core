<template>
  <div :class="prefix">
    <div :class="`${prefix}-box`">
      <h2 :class="`${prefix}-title`">
        {{$APP_NAME}}
        <span class="dot"></span>
        {{$route.meta.title}}
      </h2>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { prefix: 'page-entry' }
  }
}
</script>
<style lang="scss">
@import '../../assets/theme.scss';
.page-entry {
  min-height: 100vh;
  padding: 24px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $theme-bgcolor;
  &-box {
    width: 360px;
    padding: 0 24px 24px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  }
  &-title {
    padding: 20px;
    font-size: 18px;
    text-align: center;
    color: $text-color-important;
    .dot {
      display: inline-block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      margin: 0 8px;
      vertical-align: middle;
      background-color: $text-color-important;
    }
  }
  &-code {
    display: flex;
    align-items: center;
    img {
      height: 30px;
      margin-left: 6px;
    }
  }
  &-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    a {
      color: $color-primary;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>