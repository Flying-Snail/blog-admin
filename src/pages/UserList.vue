<template>
  <div class="main">

    <div class="header">
      <span>用户列表</span>
    </div>

    <el-table :data="userList" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="用户名" width="280" align="center" prop="user_name"></el-table-column>
      <el-table-column label="用户名" width="280" align="center" prop="nick_name"></el-table-column>

      <el-table-column label="操作" align="center" v-slot="{$index, row}">
        <el-button size="mini" @click="banComment($index, row, !row.ban_comment)">{{ !row.ban_comment ? '禁止评论' : '允许评论' }}</el-button>
        <el-button size="mini" type="danger" @click="handleDelete($index, row)">删除</el-button>
      </el-table-column>
    </el-table>

    <div class="tool">
      <p>当前第{{page}}页，共{{lastPage}}页</p>
      <el-button-group>
        <el-button type="primary" icon="el-icon-arrow-left" :disabled="isPrevDisable" @click="handleToPrev">上一页</el-button>
        <el-button type="primary" :disabled="isNextDisable" @click="handleToNext">
          下一页
          <i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
      </el-button-group>
    </div>

  </div>
</template>
<script>
import { user_url } from "../config.js"

export default {
  data () {
    return {
      total: 0,
      page: 1,
      lastPage: 1,
      userList: []
    }
  },
  created () {
    this.updataData(this.page)
  },
  methods: {
    banComment($index, row, value) {
      const originUserData = this.userList[$index]
      const nowUserData = Object.assign({}, originUserData, { ban_comment: value })
      const url = user_url + '/' + row._id

      this.$http.put(url, nowUserData).then(() => {
        this.userList.splice($index, 1, nowUserData)
      })
    },

    handleDelete (index, row) {
      this.$http.delete(user_url + '/' + row._id)
        .then(() => this.updataData(this.page))
    },

    handleToNext () {
      this.updataData(this.page + 1)
    },

    handleToPrev () {
      this.updataData(this.page - 1)
    },

    updataData (page) {
      const url = user_url + '?page=' + page

      this.$http.get(url)
        .then(rep => {
          const data = rep.data
          this.total = data.total
          this.page = parseInt(data.page)
          this.lastPage = data.lastPage
          this.userList = data.data
        })
    },
  },

  computed: {
    isPrevDisable () {
      return !(this.page > 1)
    },
    isNextDisable () {
      return !(this.page < this.lastPage)
    }
  }
}
</script>

<style lang="stylus" scoped>
.main
  position relative
  width 100%
  height 100%
  display block

  /deep/ .el-table .top-row
    background: #f0f9eb

  .header
    display flex
    flex-shrink 0
    width 100%
    height 67px
    box-shadow 3px 0 15px #ccc
    margin-bottom 5px

    span
      display block
      height 67px
      line-height 67px
      padding-left 10px

  .tool
    position absolute
    display flex
    width 100%
    bottom 8px
    justify-content space-around
</style>
