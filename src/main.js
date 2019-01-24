import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from "./router"
import Axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.prototype.$http = Axios

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
