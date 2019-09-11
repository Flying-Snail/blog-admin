<template>
  <div class="aside">
    <el-menu default-active="2-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
      active-text-color="#ffd04b" unique-opened @select="handleSelect">

      <div class="user">
        <div class="avatar"><img :src="asset_url + avatarPath" alt=""></div>
        <div class="tool"><span>{{nickName}}</span><span class="logout" @click="logout">注销</span></div>
      </div>

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

      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>

      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">统计图表</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>
<script>
import { labels_url, user_url, asset_url } from '../config'

export default {
  data() {
    return {
      labels: [],
      avatarPath: '',
      asset_url: asset_url,
      nickName: '',
    }
  },
  created() {
    this.$http.get(`${user_url}/show`).then(resp => {
      this.avatarPath = resp.data.avatar_path
      this.nickName = resp.data.nick_name
    })
    this.$http.get(labels_url).then(rep => {
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
        case '4':
          this.$router.push('userList')
          break
        case '5':
          this.$router.push('charts')
          break
        default:
          break
      }
    },
    showLabelPosts(id) {
      this.$router.push({ path: '/postList', query: { labelId: id }})
    },
    logout () {
      window.localStorage.removeItem('token')
      this.$router.push('login')
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
    border none

  .user .avatar
    margin-top 15px
    padding-left 34px

    img
      width 80px
      height 80px
      border-radius 50%
    
  .user .tool
    margin-top 5px
    padding-left 37px
    margin-bottom 15px

    span
      color #fff
      margin 0 5px
      font-size 14px

    .logout
      cursor pointer
</style>

