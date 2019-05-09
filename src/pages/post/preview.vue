<template>
  <div class="preview">
    <mavon-editor ref="md" v-model="value" :toolbarsFlag="toolbarsFlag"
      :defaultOpen="defaultOpen" :subfield="subfield"
      :editable="editable" class="preview"/>
  </div>
</template>
<script>
import { posts_url } from '../../config'
export default {
  data() {
    return {
      value: '',
      toolbarsFlag: false,
      editable: false,
      subfield: false,
      defaultOpen: 'preview'
    }
  },
  created() {
    this.$http.get(`${posts_url}/${this.$route.query.id}`)
      .then((rep) => {
        const result = rep.data
        this.value = result.content
      }).catch((err) => {
        console.log(err)
      })
  }
}
</script>
<style lang="stylus" scoped>
.preview
  width 100%
  height 100%
</style>


