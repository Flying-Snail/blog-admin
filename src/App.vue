<template>
  <div id="app">
    <Header></Header>
    <Container></Container>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Container from './components/Container'
import Footer from './components/Footer'

export default {
  name: 'app',
  components: {
    Header,
    Container,
    Footer
  },
  created () {
    document.title = '我的个人博客'
  }
}
</script>

<style lang="stylus">
#app 
  display flex
  flex-flow column nowrap
  justify-content space-between
  height 100%
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 0
  padding 0
html, body
  margin 0
  padding 0
  width 100%
  height 100%
</style>
