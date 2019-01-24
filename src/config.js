let base_url = 'http://www.pinesage.club:8888'
let asset_url = 'http://www.pinesage.club:8000'
if (process.env.NODE_ENV === 'development') {
  base_url = 'http://127.0.0.1:3333'
  asset_url = '/Applications/myP/adnois-blog/resources'
}
let posts_url = base_url + '/admin/api/posts'
let image_url = base_url + '/admin/upload/image'

export {
  base_url,
  asset_url,
  posts_url,
  image_url
}