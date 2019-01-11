<template>
  <div class="main">
    <Slider></Slider>
    <router-view></router-view>
  </div>
</template>
<script>
import Slider from "./Slider";
export default {
  components: {
    Slider
  }
}
</script>
<style lang="stylus" scoped>
.main
  display flex
  width 100%
  height 100%
</style>

