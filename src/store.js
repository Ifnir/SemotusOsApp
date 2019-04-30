import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { ipcRenderer } from 'electron'
import qs from 'qs'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://localhost:3000'


export default new Vuex.Store({
  state: {
    token: localStorage.getItem('accesstoken') || null,
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    }
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state){
      state.token = null
    }

  },
  actions: {
    retrieveToken(context, credentials){
      var Basicaouth = 'Basic dGVzdDE6cGFzc3dvcmQx'
      let config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: Basicaouth
        }
      }

      const data = qs.stringify({
        grant_type: 'password',
        username: credentials.username,
        password: credentials.password,
      })

      return new Promise((resolve, reject) => {
        axios.post('/oauth/token', data, config).then(response => {
          const token = response.data.accessToken
          console.log(token)

          ipcRenderer.sendSync('login-success', 'success')

          localStorage.setItem('accesstoken', token)
          context.commit('retrieveToken', token)
          resolve(response)
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      })

    },
    destroyToken(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

    }

  }
})
