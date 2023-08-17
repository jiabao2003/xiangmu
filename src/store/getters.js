const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  avatar: state => state.user.userInfo.staffPhoto,
  userId: state => state.user.userInfo.userId,
  name: state => state.user.userInfo.username,
  routes: state => state.myrouter.routes,
  data: state => state.user.userInfo.roles.points
}
export default getters
