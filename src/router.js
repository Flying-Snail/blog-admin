import VueRouter from "vue-router"
import Introduce from "./pages/Introduce"
import Pages from './pages/Pages'
import PostList from './pages/post/postList'
import PostEditor from './pages/post/postEditor'
import Preview from './pages/post/preview'

export default new VueRouter({
  routes: [{
      path: '/',
      component: Introduce,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/introduce',
      component: Introduce,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/postList',
      component: PostList,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/creat',
      component: PostEditor,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/update',
      component: PostEditor,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/preview',
      component: Preview,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/pages',
      component: Pages,
      meta: {
        keepAlive: false
      }
    },
  ]
})