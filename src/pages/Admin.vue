<template>
  <div class="admin">
    <Slider v-show="sliderShow"></Slider>

    <Container></Container>
  </div>
</template>

<script>
import Slider from "../components/Slider"
import Container from '../components/Container'

export default {
  data() {
    return {
      sliderShow: true
    }
  },
  components: {
    Slider,
    Container,
  }
}
</script>

<style lang="stylus" scoped>
.admin
  display flex
  flex-flow row nowrap
  justify-content space-between
  width 100%
  height 100%
</style>