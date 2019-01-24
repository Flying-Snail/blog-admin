<template>
  <div class="header">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        小工具<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>上传图片</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  props: ['dialogVisible'],
  methods: {
    handleCommand() {
      this.$emit('update:dialogVisible', true)
    }
  }
}
</script>

<style lang="stylus" scoped>
.header
  width 100%
  height 44px
  background-color #222222
  .el-dropdown-link
    display inline-block
    height 44px
    line-height 44px
</style>