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
    beacons: [],
    elders: [],
    checks: [],
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    },
    allBeacons(state) {
      return state.beacons.data
    }
  },
  mutations: {
    retrieveBeacons(state, beacons){
      state.beacons = beacons
    },
    retrieveElders(state, elders) {
      state.elders = elders
    },
    retrieveChecks(state, checks) {
      state.checks = checks
    },
    // Token
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state){
      state.token = null
    }

  },
  actions: {
    AuthorizationCall(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
    },
    // Beacons
    retrieveBeacons(context) {
      this.AuthorizationCall()

      axios.get('/beacons')
      .then(response => {
        context.commit('retrieveBeacons', response.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    addBeacon(context, beacon) {
      axios.post('/beacons', {
        tag: beacon.tag,
        name: beacon.name,
        identifier: beacon.identifier,
        attachment_value: beacon.attachment_value,
        attachment_key: beacon.attachment_key
      })
        .then(response => {
          context.commit('addBeacon', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateBeacon(context, beacon) {
      axios.patch('/todos' + beacon.id, body, {
        title: todo.title,
        completed: todo.completed,
      })
        .then(response => {
          context.commit('updateTodo', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // Elders
    retrieveElders(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      axios.get('/elders')
      .then(response => {
        context.commit('retrieveBeacons', response.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    // Checks
    retrieveChecks(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      axios.get('/checks')
      .then(response => {
        context.commit('retrieveBeacons', response.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    //Token
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

          localStorage.setItem('accesstoken', token)
          context.commit('retrieveToken', token)
          resolve(response)

          ipcRenderer.sendSync('login-success', 'success')
        }).catch(err => {
          console.log(err)
          reject(err)
        })
      })

    },
    destroyToken(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      if (context.getters.loggedIn) {
        ipcRenderer.sendSync('login-success', 'logout')
        return new Promise((resolve, reject) => {
          axios.post('/logout')
            .then(response => {
              
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              resolve(response)
            })
            .catch(error => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              reject(error)
            })
        })
}

    }

  }
})
