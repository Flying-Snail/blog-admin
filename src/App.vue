<template>
  <div id="app">
    <Header :dialogVisible.sync="dialogVisible"></Header>
    <Container></Container>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-upload class="upload-demo" :action="uploadUrl" :show-file-list="showFileList" :on-success="handleUploadSuc">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div class="img-url">{{imageUrl}}</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Header from './components/Header'
import Container from './components/Container'
import { asset_url, image_url } from "./config"
export default {
  name: 'app',
  data() {
    return {
      dialogVisible: false,
      showFileList: false,
      imageUrl: '',
      uploadUrl: image_url
    }
  },
  components: {
    Header,
    Container,
  },
  created () {
    document.title = '我的个人博客'
  },
  methods: {
    handleUploadSuc(res) {
      this.imageUrl = asset_url + res.file_path + '/' + res.file_name
    }
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
  overflow hidden
</style>
<style lang="stylus" scoped>
.img-url
  margin-top 10px
  line-height 24px  
</style>
