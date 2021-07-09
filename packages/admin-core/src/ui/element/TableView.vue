<template>
  <div :class="prefix">
    <!-- 搜索栏 -->
    <div v-if="hasSearchBar" :class="`${prefix}_searchBar`">
      <slot name="search"></slot>
    </div>
    <!-- 动作栏 -->
    <div v-if="hasActions" :class="`${prefix}_actionBar`">
      <slot name="actions"></slot>
    </div>
    <!-- 表格 -->
    <el-table ref="Table" v-loading="loading" v-bind="tableProps" v-on="$listeners">
      <slot></slot>
      <template v-slot:append>
        <slot name="append"></slot>
      </template>
    </el-table>
    <!-- 分页器 -->
    <el-pagination v-if="!hidePager" v-bind="pagerProps" @size-change="onSizeChange" @current-change="onCurrentChange"/>
    <slot name="other"></slot>
  </div>
</template>
<script>
export default {
  name: 'CTableView',
  props: {
    total: Number,
    pageNum: [Number, String],
    pageSize: [Number, String],
    loading: Boolean,
    hidePager: Boolean,
    pagerOptions: Object
  },
  data() {
    return { 
      prefix: 'c-table-view',
      hasActions: false,
      hasSearchBar: false
    }
  },
  computed: {
    tableProps() {
      return {
        border: true,
        stripe: true,
        ...this.$attrs
      }
    },
    pagerProps() {
      return {
        background: true,
        pagerCount: 5,
        pageSizes: [10, 20, 50],
        layout: 'total, sizes, prev, pager, next, jumper',
        ...(this.pagerOptions || {}),
        total: this.total,
        pageSize: +this.pageSize,
        currentPage: +this.pageNum
      }
    }
  },
  mounted() {
    this.hasActions = this.$slots.actions
    this.hasSearchBar = this.$slots.search
  },
  methods: {
    /**
     * Element-UI 分页器一个bug
     * 页大小改变将当前页设为首页 有时候会触发当前页改变，出现的很频繁
     * 不是每次都触发，使状态变的难以控制；而IView的分页器每次都触发，控制起来非常容易
     * 尝试用this.$nextTick 然并卵
     * setTimeout完美解决
     */
    onSizeChange(pageSize) {
      this.isSizeChanged = true // 标识页大小改变
      this.$emit('change', { pageSize, pageNum: 1 })
      setTimeout(() => this.isSizeChanged = false, 0) // 我们必须在该方法中延迟重置isSizeChanged的值为false
    },
    // 页大小改变时 该方法可能会执行 并早于以上定时器回调函数执行
    onCurrentChange(pageNum) {
      if (!this.isSizeChanged) this.$emit('change', { pageNum })
    },
    getTable() {
      return this.$refs.Table
    }
  }
}
</script>
<style lang="scss">
@import '../vars.scss';
.c-table-view {
  background: #fff;
  border-radius: 6px;
  border: 1px solid $border-color;
  padding: $layout-padding $layout-padding $layout-padding * 2;
  & + & {
    margin-top: $frame-padding;
  }
  &_searchBar {
    .el-form-item {
      margin-bottom: $layout-padding !important;
    }
  }
  &_searchBar + &_actionBar {
    padding-top: $layout-padding / 2;
    border-top: 1px solid $border-color;
  }
  &_actionBar {
    padding-bottom: $layout-padding / 2;
  }
  .el-pagination {
    text-align: center;
    margin-top: $layout-padding;
  }
}
</style>
