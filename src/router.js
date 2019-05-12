import VueRouter from "vue-router"
import Introduce from "./pages/Introduce"
import UserList from './pages/UserList'
import PostList from './pages/post/postList'
import PostEditor from './pages/post/postEditor'
import Preview from './pages/post/preview'
import Login from './pages/Login'
import Admin from './pages/Admin'

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Admin,
      children: [
        {
          path: '/',
          component: Introduce,
          meta: {
            needLogin: true,
            keepAlive: false,
          }
        },
        {
          path: '/introduce',
          component: Introduce,
          meta: {
            needLogin: true,
            keepAlive: false
          }
        },
        {
          path: '/postList',
          component: PostList,
          meta: {
            needLogin: true,
            keepAlive: false
          }
        },
        {
          path: '/creat',
          component: PostEditor,
          meta: {
            needLogin: true,
            keepAlive: true
          }
        },
        {
          path: '/update',
          component: PostEditor,
          meta: {
            needLogin: true,
            keepAlive: false
          }
        },
        {
          path: '/preview',
          component: Preview,
          meta: {
            needLogin: true,
            keepAlive: false
          }
        },
        {
          path: '/userList',
          component: UserList,
          meta: {
            needLogin: true,
            keepAlive: false
          }
        },
      ],
    },
    {
      path: '/login',
      component: Login,
      meta: {
        needLogin: false,
      }
    },
  ]
})