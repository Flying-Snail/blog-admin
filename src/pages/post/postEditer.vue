<template>
  <div class="main">
    <el-form ref="form" :rules="rules" :label-position="labelPosition" :model="form" class="form">
      <el-form-item label="标题" prop="title" label-width="80px">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <mavon-editor ref="md" v-model="value" @imgAdd="$imgAdd" @imgDel="$imgDel" @fullScreen="$fullScreen" :class="{ editor : !isEditerFullScreen }" />
      <el-form-item class="switch-area">
        <span>是否置顶</span>
        <el-switch v-model="form.is_top" class="item-switch"></el-switch>
        <el-checkbox-group v-model="form.labels" class="item-checkbox-group">
          <el-checkbox label="JavaScript" name="type"></el-checkbox>
          <el-checkbox label="HTML" name="type"></el-checkbox>
          <el-checkbox label="CSS" name="type"></el-checkbox>
          <el-checkbox label="设计" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{isUpdate ? '提交' : '创建'}}</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  posts_url,
  image_url,
  asset_url
} from '../../config'
export default {
  data() {
    return {
      labelPosition: 'left',
      postId: '',
      isUpdate: false,
      form: {
        title: '',
        author: '不语',
        is_top: false,
        labels: [],
      },
      rules: {
        title: [{
          required: true,
          message: '请输入标题内容',
          trigger: 'blur'
        }, ]
      },
      value: '',
      images: {},
      isEditerFullScreen: false
    }
  },
  created() {
    const id = this.$route.query.id
    if (id) {
      this.$http.get(`${posts_url}/${id}/edit`)
        .then(res => {
          const { title, is_top, labels, content, _id } = res.data
          this.isUpdate = true
          this.postId = _id
          this.form = Object.assign({}, this.form, {
            title,
            is_top,
            labels
          })
          this.value = content
        })
    }
  },
  mounted() {
    this.$refs.md.$refs.toolbar_left.img_file = []
  },
  methods: {
    onSubmit() {
      this.isUpdate ? this.updatePost() : this.createPost()
    },
    createPost() {
      this.$http.post(posts_url, Object.assign({}, this.form, {
          content: this.value
        }))
        .then(() => {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.initData()
        }).catch(() => {
          this.$message.error('提交失败')
        })
    },
    updatePost() {
      this.$http.put(`${posts_url}/${this.postId}`, Object.assign({}, this.form, {
          content: this.value
        }))
        .then(() => {
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.$router.push('postList')
        }).catch((e) => {
          this.$message.error(e)
        })
    },
    initData() {
      this.form = {
        title: '',
        author: '不语',
        is_top: false,
        labels: [],
      }
      this.value = ''
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$refs.md.$refs.toolbar_left.img_file = []
    },
    $imgAdd(pos, $file) {
      console.log('image add...')

      const imgData = new FormData()
      imgData.append('image', $file)
      const name = $file._name
      this.$http({
        url: image_url,
        method: 'post',
        data: imgData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        const result = res.data
        const url = asset_url + result.file_path + '/' + result.file_name
        this.$refs.md.$img2Url(pos, url)
        // 临时解决方案
        // 由于原始pos位置已被更新为url
        // 所以必须映射url为key
        this.images[name] = result
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        console.log(this.$refs.md.$refs.toolbar_left.img_file)
      }).catch((error) => {
        this.$message.error('上传失败')
        console.log('image upload error', error)
        // 临时解决方案
        this.$refs.md.$refs.toolbar_left.$imgDel(pos)
      })
    },
    $imgDel(file) {
      const my_file = this.images[file[0]._name]
      if (my_file) {
        console.log('delete file: ', my_file.file_name)

        this.$http.delete(image_url + '/' + my_file._id)
          .then(() => {
            delete this.images[file[0]._name]
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          })
          .catch((error) => {
            this.$message.error('删除失败')
            console.log('delete error', error)
          })
      }
    },
    $fullScreen(status) {
      this.isEditerFullScreen = status
    }
  }
}
</script>
<style lang="stylus" scoped>
.main
  display block
  padding 20px
  .form
    height 100%
    .switch-area
      margin 20px 0
    .item-switch
      margin-left 50px
    .item-checkbox-group
      display inline-flex
      margin-left 50px
  .editor
    height 70%
</style>
