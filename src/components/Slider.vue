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
          <span slot="title">标签管理</span>
        </template>
        <el-menu-item v-for="label in labels" :index="label.name" :key="label._id"
          @click="showLabelPosts(label._id)">
          {{ label.name }}
        </el-menu-item>
      </el-submenu>

    </el-menu>
  </div>
</template>
<script>
import { labels_url } from '../config'
export default {
  data() {
    return {
      labels: []
    }
  },
  created() {
    this.$http.get(labels_url).then(rep => {
      console.log(rep)
      this.labels = rep.data
    })
  },
  methods: {
    handleOpen(key, keyPath) {
      return [key, keyPath]
    },
    handleClose(key, keyPath) {
      return [key, keyPath]
    },
    handleSelect(index, indexPath) {
      switch (indexPath[0]) {
        case '1':
          this.$router.push('introduce')
          break
        case '2':
          index === '2-1' ? this.$router.push('postList') : this.$router.push('creat')
          break
        default:
          break
      }
    },
    showLabelPosts(id) {
      this.$router.push({ path: '/postList', query: { labelId: id }})
    }
  }
}
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

