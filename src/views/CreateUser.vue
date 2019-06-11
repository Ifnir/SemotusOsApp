<template>
  <div class="createuser">
    <div class="top">
      <div class="container">
        <br>
        <form
          action="#"
          @submit.prevent="createUser"
        >
          <div class="form-group">
            <label for="name">Username:</label>
            <input
              id="txtName"
              v-model="username"
              type="text"
              class="form-control"
              required
            >
            <label for="name">Password:</label>
            <input
              id="txtName"
              v-model="password"
              type="password"
              class="form-control"
              required
            >
            <label for="name">Password confirmation:</label>
            <input
              id="txtName"
              v-model="passwordConfirmation"
              type="password"
              class="form-control"
              required
            >
          </div>
          <div class="center-align">
            <label>{{ statusMessage }}</label><br>
            <button
              id="btn-login"
              class="btn btn-default"
            >
              Create User
            </button><br>
            <a
              href="#"
              @click="closeUserInterface()"
            ><p id="close-button">Close Interface</p></a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';

export default {
  name: 'Createuser',
  components: {
  },
  data() {
    return {
      statusMessage: '',
      username: '',
      password: '',
      passwordConfirmation: '',
    };
  },
  methods: {
    closeUserInterface() {
      ipcRenderer.send('userInterface', 'close');
    },
    createUser() {
      if (this.username && this.password && this.passwordConfirmation) {
        if (this.password !== this.passwordConfirmation) {
          this.statusMessage = 'Passwords do not match';
        } else {
          this.$store.dispatch('createUser',
            {
              username: this.username,
              password: this.password,
            }).then(res => this.statusMessage = res.data,
            this.username = null, this.password = null, this.passwordConfirmation = null);
        }
      } else {
        this.statusMessage = 'All fields must be filled out';
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import './src/assets/css.scss';


</style>
