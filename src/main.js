import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from "./router"
import Axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import echarts from "echarts"

Axios.interceptors.request.use(
  config => {
    config.headers.Authorization = window.localStorage.getItem('token')
      ? window.localStorage.getItem('token')
      : ''
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.prototype.$echarts = echarts

router.beforeEach((to, from, next) => {
  if (!to.meta.needLogin) return next()

  let token = window.localStorage.getItem('token')
  if (token) return next()

  next({
    path: '/login',
    query: { redirect: to.fullPath }
  })
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
