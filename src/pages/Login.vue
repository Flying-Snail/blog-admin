<template>
  <div class="login">
    <div class="login-area">
      <el-input v-model="userName" placeholder="用户名" clearable></el-input>
      <el-input placeholder="请输入密码" v-model="password" show-password clearable></el-input>
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import { login_url } from '../config.js'

export default {
  data() {
    return {
      userName: '',
      password: '',
    }
  },
  methods: {
    login () {
      this.$http.post(login_url, {
        user_name: this.userName,
        password: this.password,
      }).then((result) => {
        if (!result.data.success) return this.$message.error('登录失败，请检查账号密码')

        window.localStorage.setItem('token', result.data.token)
        this.$message({
          message: '登录成功',
          type: 'success'
        })

        this.$router.push("/")
      }).catch((err) => {
        this.$message.error('登录失败，请检查账号密码')
      })
    },
  }
}
</script>

<style lang="stylus" scoped>
.login
  display flex
  justify-content center
  align-items center
  height 100%
  width 100%
  
  .login-area
    display flex
    flex-flow column
    justify-content space-between
    width 300px
    height 240px
    
    .button-area
      display flex
      justify-content space-between

      button
        width 46%

</style>
