import VueRouter from "vue-router"
import Introduce from "./pages/Introduce"
import Posts from './pages/Posts'
import Pages from './pages/Pages'

export default new VueRouter({
  routes: [
    { path: '/', component: Introduce },
    { path: '/introduce', component: Introduce },
    { path: '/posts', component: Posts },
    { path: '/pages', component: Pages },
  ]
})