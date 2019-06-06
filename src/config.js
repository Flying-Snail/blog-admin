let base_url = 'http://www.pinesage.club:8888'
let asset_url = 'http://images.blog:8002'
if (process.env.NODE_ENV === 'development') {
  base_url = 'http://127.0.0.1:3333'
}
const posts_url = base_url + '/admin/api/posts'
const labels_url = base_url + '/admin/api/labels'
const image_url = base_url + '/admin/upload/image'
const login_url = base_url + '/login'
const user_url = base_url + '/admin/api/users'

export {
  base_url,
  asset_url,
  posts_url,
  labels_url,
  image_url,
  login_url,
  user_url,
}