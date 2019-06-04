import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { ipcRenderer } from 'electron'
import qs from 'qs'
import { timeout } from 'q';

Vue.use(Vuex)

axios.defaults.baseURL = 'http://localhost:3000'


export default new Vuex.Store({
  state: {
    token: localStorage.getItem('accesstoken') || null,
    beacons: [],
    elders: [],
    checks: [],
    users: [],
  },
  getters: {
    accessToken(state) {
      return state.token;
    },
    loggedIn(state) {
      return state.token !== null;
    },
    allBeacons(state) {
      return state.beacons.data;
    },
    allElders(state) {
      return state.elders.data;
    },
    allChecks(state) {
      return state.checks.data;
    },
    allUsers(state) {
      return state.users.data;
    },
  },
  mutations: {
    // ---------- Beacons
    retrieveUsers(state, users){
      state.users = users
    },
    retrieveBeacons(state, beacons){
      state.beacons = beacons
    },
    addBeaconToMutation(state, beacon) {
      state.beacons.push({
        'id': beacon.id,
        'tag': beacon.tag,
        'identifier': beacon.identifier,
        'name': beacon.name,
        'attachment_key': beacon.attachment_key,
        'attachment_value': beacon.attachment_value
      })
    },
    addUser(state, user) {
      state.users.push({
        'name': user.username,
        'password': user.password,
      })
    },
    addElder(state, elder) {
      state.elders.push({
        'name': elder.name,
        'beaconId': elder.beaconId,
      })
    },
    updateBeacons(state, beacon) {
      const index = state.beacons.data.findIndex(item => item.id == beacon.id)
      
      state.beacons.data.splice(index, 1, {
        'id': beacon.id,
        'tag': beacon.tag,
        'identifier': beacon.identifier,
        'name': beacon.name,
        'attachment_key': beacon.attachment_key,
        'attachment_value': beacon.attachment_value
      })
    },
    updateElders(state, elder) {
      const index = state.elders.data.findIndex(item => item.id == elder.id)
      /*Vue.set(state.elders.data, index, {
        'name': elder.name,
        'beaconId': elder.beaconId})*/
      state.elders.data.splice(index, 1, {
        'name': elder.name,
        'beaconId': elder.beaconId
      })
    },
    updateUser(state, user) {
      const index = state.users.data.findIndex(item => item.id == user.id)
      state.users.data.splice(index, 1, {
        'username': user.username,
      })
    },
    deleteUser(state, id) {
      const index = state.users.data.findIndex(item => item.id == id)
      state.users.data.splice(index, 1)
    },
    deleteBeacons(state, id) {
      const index = state.beacons.data.findIndex(item => item.id == id)
      state.beacons.data.splice(index, 1)
    },
    deleteElder(state, id) {
      const index = state.elders.data.findIndex(item => item.id == id)
      state.elders.data.splice(index, 1)
    },
    // ---------- Elders
    retrieveElders(state, elders) {
      state.elders = elders
    },
    // ---------- Checks
    retrieveChecks(state, checks) {
      console.log(checks)
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

    // -----------------------------------------------------Beacons
    retrieveBeacons(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      axios.get('/beacon')
      .then(response => {
        context.commit('retrieveBeacons', response.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    createUser(context, user) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      axios.post('/user/create', {
        username: user.username,
        password: user.password
      })
        .then(() => {
          context.commit('addUser', user)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addBeacon(context, beacon) {
      console.log(beacon.tag)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      axios.post('/beacon/create', {
        name: beacon.name,
        tag: beacon.tag,
        identifier: beacon.identifier,
        attachment_value: beacon.attachment_value,
        attachment_key: beacon.attachment_key
      })
        .then(() => {
          context.commit('addBeaconToMutation', beacon)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateBeacon(context, beacon) {
      axios.post('/beacon_id/edit/' + beacon.id, {
        tag: beacon.tag,
        name: beacon.name,
        identifier: beacon.identifier,
        attachment_value: beacon.attachment_value,
        attachment_key: beacon.attachment_key
      })
        .then(() => {
          context.commit('updateBeacons', beacon)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteBeacon(context, id) {
      axios.delete('/beacon_id',
      {data: {
        id: id
      }})
      .then(() => {
        context.commit('deleteBeacons', id)
      })
      .catch(error => {
        console.log(error)
      })
    },
    deleteUser(context, id) {
      axios.delete('/user_id',
      {data: {
        id: id
      }})
      .then(() => {
        context.commit('deleteUser', id)
      })
      .catch(error => {
        console.log(error)
      })
    },
    // -------------------------------------------------------Elders
    retrieveElders(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      axios.get('/elders')
      .then(response => {
        context.commit('retrieveElders', response.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    addElder(context, elder) {
      console.log(elder)
      axios.post('/elder/create', {
        name: elder.name,
        beaconId: elder.beaconId,
      })
        .then(response => {
          context.commit('addElder', response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateElder(context, elder) {
      axios.post('/elder_id/edit/' + elder.id,  {
        name: elder.name,
        beaconId: elder.beaconId
      })
        .then(() => {
          context.commit('updateElders', elder)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateUser(context, user) {
      axios.post('/user_id/edit/' + user.id,  {
        username: user.username
      })
        .then(() => {
          context.commit('updateUser', user)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteElder(context, id) {
      axios.delete('/elder_id',
      {data: {
        id: id
      }})
      .then(() => {
        context.commit('deleteElder', id)
      })
      .catch(error => {
        console.log(error)
      })
    },
    // --------------------------------------------------------Checks
    retrieveChecks(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      axios.get('/check_ins')
      .then(response => {
        context.commit('retrieveChecks', response.data)
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
        password: credentials.password
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

    },
    retrieveUsers(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      axios.get('/users')
      .then(response => {
        context.commit('retrieveUsers', response.data)
      })
      .catch(err => {
        console.log(err)
      })
    },

  }
})
