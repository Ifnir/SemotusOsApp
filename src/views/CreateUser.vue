<template>
  <div class="createuser">
    <div class="top">
      <div class="container">
        <br/>
        <form action="#" @submit.prevent="createUser">
            <div class="form-group">
              <label for="name">Username:</label>
              <input type="text" class="form-control" id="txtName" v-model="username" required>
              <label for="name">Password:</label>
              <input type="text" class="form-control" id="txtName" v-model="password" required>
            </div>
            <div class="center-align">
              <button class="btn btn-default" id="btn-login">Create User</button><br>
              <a href="#" v-on:click="closeUserInterface()"><p id="close-button">Cancel</p></a>
            </div>
        </form>
    </div>
  </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'createuser',
  components: {
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    closeUserInterface() {
      ipcRenderer.send('userInterface', 'close')
    },
    createUser() {
      this.$store.dispatch('createUser',
      {
        username: this.username,
        password: this.password
      })
      this.closeUserInterface()
    }
  }
}
</script>
<style lang="scss" scoped>
@import './src/assets/css.scss';


</style>