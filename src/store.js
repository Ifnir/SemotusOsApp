/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { ipcRenderer } from 'electron';
import qs from 'qs';

Vue.use(Vuex);

axios.defaults.baseURL = 'http://10.10.50.10:3000';


export default new Vuex.Store({
  state: {
    token: localStorage.getItem('accessToken') || null,
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
    beacons(state) {
      return state.beacons.data;
    },
    elders(state) {
      return state.elders.data;
    },
    checks(state) {
      return state.checks.data;
    },
    users(state) {
      return state.users.data;
    },
  },
  mutations: {
    // Set state of Elders.
    setElders(state, elders) {
      state.elders = elders;
    },
    // Set state of Beacons.
    setBeacons(state, beacons) {
      state.beacons = beacons;
    },
    // Set state of Checks.
    setChecks(state, checks) {
      state.checks = checks;
    },
    // Set state of Users.
    setUsers(state, users) {
      state.users = users;
    },
    // Set state of Token.
    setToken(state, token) {
      state.token = token;
    },

    // Add Elder to Elders state.
    addElderToElders(state, elder) {
      state.elders.push({
        name: elder.name,
        beaconId: elder.beaconId,
      });
    },
    // Add Beacon to Beacon state.
    addBeaconToBeacons(state, beacon) {
      state.beacons.push({
        id: beacon.id,
        tag: beacon.tag,
        identifier: beacon.identifier,
        name: beacon.name,
        attachment_key: beacon.attachment_key,
        attachment_value: beacon.attachment_value,
      });
    },
    // Add User to User state.
    addUserToUsers(state, user) {
      state.users.push({
        name: user.username,
        password: user.password,
      });
    },
    // Update Elder in Elder state.
    updateElder(state, elder) {
      const index = state.elders.data.findIndex(item => item.id === elder.id);
      state.elders.data.splice(index, 1, {
        name: elder.name,
        beaconId: elder.beaconId,
      });
    },
    // Update Beacon in Beacon state.
    updateBeacon(state, beacon) {
      const index = state.beacons.data.findIndex(item => item.id === beacon.id);
      state.beacons.data.splice(index, 1, {
        id: beacon.id,
        tag: beacon.tag,
        identifier: beacon.identifier,
        name: beacon.name,
        attachment_key: beacon.attachment_key,
        attachment_value: beacon.attachment_value,
      });
    },
    // Update User in User state.
    updateUser(state, user) {
      const index = state.users.data.findIndex(item => item.id === user.id);
      state.users.data.splice(index, 1, {
        username: user.username,
      });
    },
    // Delete Elder in Elder state.
    deleteElder(state, id) {
      const index = state.elders.data.findIndex(item => item.id === id);
      state.elders.data.splice(index, 1);
    },
    // Delete Beacon in Beacon state.
    deleteBeacons(state, id) {
      const index = state.beacons.data.findIndex(item => item.id === id);
      state.beacons.data.splice(index, 1);
    },
    // Delete User in User state.
    deleteUser(state, id) {
      const index = state.users.data.findIndex(item => item.id === id);
      state.users.data.splice(index, 1);
    },
    // Delete Token in Token state.
    destroyToken(state) {
      state.token = null;
    },
  },
  actions: {

    // Retrieves Elders from API server, and add response to Elders state.
    retrieveElders(context) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;
      axios.get('/elders').then((response) => {
        context.commit('setElders', response.data);
      }).catch((err) => {
        console.log(err);
      });
    },
    // Retrieves Beacons from API server, and add response to Beacons state.
    retrieveBeacons(context) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;
      axios.get('/beacon').then((response) => {
        context.commit('setBeacons', response.data);
      }).catch((err) => {
        console.log(err);
      });
    },
    // Retrieves Checks from API server, and add response to Checks state.
    retrieveChecks(context) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;
      axios.get('/check_ins').then((response) => {
        context.commit('setChecks', response.data);
      }).catch((err) => {
        console.log(err);
      });
    },
    // Retrieves Users from API server, and add response to Users state.
    retrieveUsers(context) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;
      axios.get('/users').then((response) => {
        context.commit('setUsers', response.data);
      }).catch((err) => {
        console.log(err);
      });
    },
    // Retrieves Token from API server, and add response to token state.
    retrieveToken(context, credentials) {
      const Basicaouth = 'Basic dGVzdDE6cGFzc3dvcmQx';
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: Basicaouth,
        },
      };

      const data = qs.stringify({
        grant_type: 'password',
        username: credentials.username,
        password: credentials.password,
      });

      return new Promise((resolve, reject) => {
        axios.post('/oauth/token', data, config).then((response) => {
          const token = response.data.accessToken;
          localStorage.setItem('accessToken', token);
          context.commit('setToken', token);
          resolve(response);
          ipcRenderer.sendSync('login-success', 'success');
        }).catch((err) => {
          console.log(err);
          reject(err);
        });
      });
    },
    // Creates Elder by sending POST to API server add Elder to Elder state.
    createElder(context, elder) {
      const response = axios.post('/elder/create', {
        name: elder.name,
        beaconId: elder.beaconId,
      });
      context.commit('addElderToElders', elder);
      return response;
    },
    // Creates Beacon by sending POST to API server add Beacon to Beacon state.
    createBeacon(context, beacon) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;
      const response = axios.post('/beacon/create', {
        name: beacon.name,
        tag: beacon.tag,
        identifier: beacon.identifier,
        attachment_value: beacon.attachment_value,
        attachment_key: beacon.attachment_key,
      });
      context.commit('addBeaconToBeacons', beacon);
      return response;
    },
    // Creates User by sending POST to API server add User to User state.
    createUser(context, user) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;
      const response = axios.post('/user/create', {
        username: user.username,
        password: user.password,
      });
      context.commit('addUserToUsers', user);
      return response;
    },
    // Update Elder by sending POST to API server and update Elder in Elder object.
    updateElder(context, elder) {
      axios.post(`/elder_id/edit/${elder.id}`, {
        name: elder.name,
        beaconId: elder.beaconId,
      }).then(() => {
        context.commit('updateElder', elder);
      }).catch((error) => {
        console.log(error);
      });
    },
    // Update Beacon by sending POST to API server and update Beacon in Beacon object.
    updateBeacon(context, beacon) {
      axios.post(`/beacon_id/edit/${beacon.id}`, {
        tag: beacon.tag,
        name: beacon.name,
        identifier: beacon.identifier,
        attachment_value: beacon.attachment_value,
        attachment_key: beacon.attachment_key,
      }).then(() => {
        context.commit('updateBeacon', beacon);
      }).catch((error) => {
        console.log(error);
      });
    },
    // Update User by sending POST to API server and update User in User state.
    updateUser(context, user) {
      axios.post(`/user_id/edit/${user.id}`, {
        username: user.username,
      }).then(() => {
        context.commit('updateUser', user);
      }).catch((error) => {
        console.log(error);
      });
    },
    // Delete Elder by sending DELETE to API server and delete Elder from Elder state.
    deleteElder(context, id) {
      axios.delete('/elder_id',
        {
          data: {
            id,
          },
        }).then(() => {
        context.commit('deleteElder', id);
      }).catch((error) => {
        console.log(error);
      });
    },
    // Delete Beacon by sending DELETE to API server and delete Beacon from Beacon state.
    deleteBeacon(context, id) {
      axios.delete('/beacon_id',
        {
          data: {
            id,
          },
        }).then(() => {
        context.commit('deleteBeacons', id);
      }).catch((error) => {
        console.log(error);
      });
    },
    // Delete User by sending DELETE to API server and delete User from User state.
    deleteUser(context, id) {
      axios.delete('/user_id',
        {
          data: {
            id,
          },
        }).then(() => {
        context.commit('deleteUser', id);
      }).catch((error) => {
        console.log(error);
      });
    },
    // Destroy Token from localStorage and logout the user.
    destroyToken(context) {
      axios.defaults.headers.common.Authorization = `Bearer ${context.state.token}`;
      if (context.getters.loggedIn) {
        ipcRenderer.sendSync('login-success', 'logout');
        return new Promise((resolve, reject) => {
          axios.post('/logout').then((response) => {
            localStorage.removeItem('access_token');
            context.commit('destroyToken');
            resolve(response);
          }).catch((error) => {
            localStorage.removeItem('access_token');
            context.commit('destroyToken');
            reject(error);
          });
        });
      }
    },
  },
});
