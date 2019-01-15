<template>
  <div class="main">
    <el-form ref="form" :rules="rules" :label-position="labelPosition" :model="form" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item label="是否置顶">
        <el-switch v-model="form.is_top"></el-switch>
      </el-form-item>
      <el-form-item label="标签">
        <el-checkbox-group v-model="form.labels">
          <el-checkbox label="JavaScript" name="type"></el-checkbox>
          <el-checkbox label="HTML" name="type"></el-checkbox>
          <el-checkbox label="CSS" name="type"></el-checkbox>
          <el-checkbox label="设计" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!-- <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import config from '../config'
export default {
  data() {
    return {
      labelPosition: 'left',
      form: {
        title: '',
        author: '',
        is_top: false,
        labels: [],
      },
      rules: {
        title: [{
          required: true,
          message: '请输入标题内容',
          trigger: 'blur'
        }, ],
        author: [{
          required: true,
          message: '请输入作者名称',
          trigger: 'blur'
        }, ],
      }
    }
  },
  methods: {
    onSubmit() {
      this.$http.post(config.base_url + '/posts', this.form)
        .then(res => {
          if (res.status !== 200) {
            this.$message.error('提交失败')
          }
          this.$message({
            message: '提交成功',
            type: 'success'
          })
          this.initData()
        }).catch((err) => {
          console.log(err)
        })
    },
    initData() {
      this.form = {
        title: '',
        author: '',
        is_top: false,
        labels: [],
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.main
  padding-top 20px
  padding-left 40px
</style>
