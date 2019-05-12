<template>
  <div class="header">
    <span class="tittle">{{title}}</span>
  </div>
</template>
<script>
export default {
  props: ['title'],
}
</script>

<style lang="stylus" scoped>
.header
  width 100%
  height 44px
  .tittle
    display block
    height 44px
    line-height 44px
</style>