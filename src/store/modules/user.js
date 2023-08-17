import { login, getprofile } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const state = () => {
  return {
    token: getToken(),
    userInfo: {}
  }
}

const mutations = {
  setToken(state, token) {
    state.token = token
    setToken(state.token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setuserInfo(state, user) {
    state.userInfo = user
    console.log(state.userInfo);
  },

  logout(state,) {
    state.token = null
    state.userInfo = {}

  }

}

const actions = {
  async login({ commit }, data) {
    let res = await login(data)
    console.log(res);
    commit('setToken', res.data.data)
  },

  async getprofile({ commit }) {
    let res = await getprofile()
    console.log(res);
    commit('setuserInfo', res.data.data)
    return res.data.data.roles.menus
  },
  async logout({ commit }) {
    commit('removeToken')
    commit('logout')

  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
