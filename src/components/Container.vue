<template>
  <div class="main">
    <Slider v-show="sliderShow"></Slider>

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如 Home！ -->
      </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
    </router-view>

  </div>
</template>
<script>
import Slider from "./Slider";
export default {
  data() {
    return {
      sliderShow: true
    }
  },
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

