<template>
  <div class="main">
    <el-table :data="postList" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="标题" width="280" align="center" prop="title"></el-table-column>
      <el-table-column label="上次修改时间" width="150" align="center" prop="updated_at"></el-table-column>
      <el-table-column label="点赞数" width="100" align="center" prop="like_num"></el-table-column>
      <el-table-column label="评论数" width="100" align="center" prop="comment_num"></el-table-column>

      <el-table-column label="操作" align="center" v-slot="{$index, row}">
        <el-button size="mini" @click="handleRelease($index, row, !row.is_released)">{{ row.is_released ? '下架' : '发布' }}</el-button>
        <el-button size="mini" @click="handleSee($index, row)">查看</el-button>
        <el-button size="mini" @click="handleEdit($index, row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete($index, row)">删除</el-button>
      </el-table-column>
    </el-table>
    <div class="tool">
      <p>{{labelPosts}}</p>
      <!-- <p>当前第{{page}}页，共{{lastPage}}页</p> -->
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
import { posts_url, labels_url } from "../../config"
export default {
  props: ['labelPosts'],
  data () {
    return {
      total: 0,
      page: 1,
      lastPage: 1,
      postList: []
    }
  },
  watch: {
    '$route' () {
      this.updataData(1)
    }
  },
  created () {
    this.updataData(this.page)
  },
  methods: {
    tableRowClassName({row}) {
      if (row.is_top) return 'top-row'
      return ''
    },

    handleRelease($index, row, value) {
      const originPostData = this.postList[$index]
      const nowPostData = Object.assign({}, originPostData, { is_released: value })
      const url = posts_url + '/' + row._id

      this.$http.put(url, nowPostData).then(() => {
        this.postList.splice($index, 1, nowPostData)
      })
    },

    handleSee (index, row) {
      this.$router.push({
        path: 'preview',
        query: {id: row._id}
      })
    },

    handleEdit (index, row) {
      this.$router.push({path: 'update', query:{id: row._id}})
    },

    handleDelete (index, row) {
      this.$http.delete(posts_url + '/' + row._id)
        .then(() => this.updataData(this.page))
    },

    handleToNext () {
      this.updataData(this.page + 1)
    },

    handleToPrev () {
      this.updataData(this.page - 1)
    },

    updataData (page) {
      const url = this.$route.query.labelId
        ? posts_url + '?page=' + page + '&label_id=' + this.$route.query.labelId
        : posts_url + '?page=' + page

      this.$http.get(url)
        .then(rep => {
          const data = rep.data
          this.total = data.total
          this.page = parseInt(data.page)
          this.lastPage = data.lastPage
          this.postList = data.data.map((row) => {
            return Object.assign({}, row, {
              updated_at: this.formatDate(row.updated_at)
            })
          })
        })
    },
  
    formatDate (date) {
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
  /deep/ .el-table .top-row
    background: #f0f9eb
  .tool
    position absolute
    display flex
    width 100%
    bottom 8px
    justify-content space-around
</style>
