<template>
  <div class="container">

    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件 -->
      </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件 -->
    </router-view>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: '哈哈哈',
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  width 100%
  height 100%
</style>