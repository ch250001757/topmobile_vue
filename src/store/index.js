import Vue from 'vue'
import Vuex from 'vuex'
import { getToken,setToken } from '@/utils/authority'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken:getToken()
  },
  mutations: {
    setUserToken(state,payload){ // paylaod 传过来的参数
      setToken(payload)
      state.userToken = payload 
    }
  },
  actions: {},
  modules: {}
})