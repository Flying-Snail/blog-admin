<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  created () {
    document.title = '我的个人博客'
  },
}
</script>

<style lang="stylus">
#app
  height 100%
  width 100%
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
html, body
  margin 0
  padding 0
  width 100%
  height 100%
  overflow hidden
</style>
