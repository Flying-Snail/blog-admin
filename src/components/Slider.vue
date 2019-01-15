<template>
  <div class="aside">
    <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
      active-text-color="#ffd04b" unique-opened @select="handleSelect">
      <el-menu-item index="1">
        <i class="el-icon-setting"></i>
        <span slot="title">概述</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>文章管理</span>
        </template>
        <el-menu-item index="2-1">文章列表</el-menu-item>
        <el-menu-item index="2-2">添加文章</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">页面管理</span>
        </template>
        <el-menu-item index="3-1">页面管理子页面</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">分类管理</span>
        </template>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">标签管理</span>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(index, indexPath) {
      switch (indexPath[0]) {
        case '1':
          this.$router.push('introduce')
          break
        case '2':
          index === '2-1' ? this.$router.push('posts') : this.$router.push('creatPost')
          break
        case '3':
          this.$router.push('pages')
          break
        default:
          break
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.aside
  flex-shrink 0
  width 200px
  height 100%
  text-align left
  .el-menu-vertical-demo
    width 100%
    height 100%
</style>

