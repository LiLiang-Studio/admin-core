<template>
  <div :class="prefix" v-if="items.length > 1">
    <el-link v-if="items.length > 2" title="返回" icon="el-icon-back" :class="`${prefix}_back`" :underline="false"
      @click="$router.back()"/>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in items" :key="index">
        <span>{{item.meta.title}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  name: 'CBreadcrumb',
  data() {
    return { prefix: 'c-breadcrumb' }
  },
  computed: {
    items() {
      return this.$route.matched.filter(_ => _.meta.title)
    }
  }
}
</script>
<style lang="scss">
@import '../vars.scss';
.c-breadcrumb {
  margin-bottom: $frame-padding;
  &_back.el-link {
    font-size: 20px;
    margin-right: 6px;
  }
  .el-breadcrumb {
    display: inline-block;
    vertical-align: middle;
    &__separator {
      margin: 0 6px;
    }
  }
}
</style>