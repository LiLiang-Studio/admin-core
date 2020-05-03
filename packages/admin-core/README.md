# @xview-ui/admin-core

[![npm package](https://img.shields.io/npm/v/@xview-ui/admin-core.svg)](https://www.npmjs.org/package/@xview-ui/admin-core)
[![NPM downloads](http://img.shields.io/npm/dm/@xview-ui/admin-core.svg?style=flat-square)](https://npmjs.org/package/@xview-ui/admin-core)
[![NPM downloads](https://img.shields.io/npm/dt/@xview-ui/admin-core.svg?style=flat-square)](https://npmjs.org/package/@xview-ui/admin-core)
![gzip size](http://img.badgesize.io/https://unpkg.com/@xview-ui/admin-core/dist/admin-core.min.js?compression=gzip&label=gzip:%20JS)
![License: MIT](https://img.shields.io/npm/l/@xview-ui/admin-core)

> 基于Vuejs的中后台开发基础模块和基于element-ui的基础布局组件

### Install

```
npm install @xview-ui/admin-core
```

### Usage

```javascript
import Vue from 'vue'
import store from './store'
import router from './router'
import adminCore from '@xview-ui/admin-core'
// 如果你不需要UI 可以不引入
import adminCoreUI from '@xview-ui/admin-core/ui/element'
Vue.use(adminCoreUI)
Vue.use(adminCore, { store, router })
```

### 支持功能

**提示：** 详细用法请暂时参考开发工具的智能提示使用

```javascript
import adminCore, {
  formatDate, // 日期时间格式化工具
  getParentComponent, // 通过name属性获取父组件
  getChildComponents, // 获取所有子组件 如果提供name 则获取指定name的子组件
  getSubStr, // 截取指定长度字符 按照1个汉字等于2个字符长度
  getRoute, // 获取路由 该方法为解决：页面加载时 我们无法通过this.$route获取到正确的动态加载的路由
  getSize, // 获取尺寸 如果为数值或数值字符串 添加px单位 否则 直接返回
  navModal, // 支持导航控制的模态框混合
  filterRoutes // 过滤路由
} from '@xview-ui/admin-core'

// adminCoreUI 包含所有组件 也可按需引入
import adminCoreUI, {
  Aside, // 边栏菜单
  Breadcrumb, // 面包屑
  Header, // 头部
  Tabs, // 标签页导航
  FrameLayout, // 框架布局 也许你仅仅需要该组件
  TableView // 表格视图 由搜索栏 动作栏 表格 分页器构成
} from '@xview-ui/admin-core/ui/element'

// 路由配置元数据定义 元数据属性是可选的
{
  title: String, // 标题 -> 浏览器标签页 边栏菜单 标签页导航使用
  notTab: Boolean, // 是否不添加到标签页导航
  notMenu: Boolean, // 是否不添加到边栏菜单
  icon: String // 边栏菜单展示图标
}
```