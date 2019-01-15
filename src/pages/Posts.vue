<template>
  <div class="main">
    <el-table :data="postList" style="width: 100%">
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column label="标题" width="360">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上次修改时间" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ formatDate(scope.row.updated_at) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="点赞数" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.like_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评论数" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.comment_num }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作者" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="tool">
      <p>当前第{{page}}页，共{{lastPage}}页</p>
      <el-button-group>
        <el-button type="primary" icon="el-icon-arrow-left" :disabled="isPrevDisable" @click="handleToPrev">上一页</el-button>
        <el-button type="primary" :disabled="isNextDisable" @click="handleToNext">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
    </div>
  </div>
</template>
<script>
import config from "../config"
export default {
  data () {
    return {
      total: 0,
      page: 1,
      lastPage: 1,
      postList: []
    }
  },
  created () {
    this.updataData(this.page)
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      this.$http.delete(config.base_url + '/posts/' + row._id)
        .then(rep => this.updataData(this.page))
    },
    handleToNext() {
      this.updataData(this.page + 1)
    },
    handleToPrev() {
      this.updataData(this.page - 1)
    },
    updataData(page) {
      this.$http.get(config.base_url + '/posts?page=' + page)
        .then(rep => {
          const data = rep.data
          this.total = data.total
          this.page = parseInt(data.page)
          this.lastPage = data.lastPage
          this.postList = data.data
        })
    },
    formatDate(date) {
      const time = new Date(date)
      return time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日'
    }
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
  display block
  .tool
    position absolute
    display flex
    width 100%
    bottom 8px
    justify-content space-around
</style>
