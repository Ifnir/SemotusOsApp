<template>
  <div class="login">
    <div class="top">
      <div class="container">
        <br>
        <form
          action="#"
          @submit.prevent="login"
        >
          <div class="form-group">
            <label for="usr">User Name:</label>
            <input
              id="txtUsr"
              v-model="username"
              type="text"
              class="form-control"
            >
          </div>
          <div class="form-group">
            <label for="pwd">Password:</label>
            <input
              id="txtPwd"
              v-model="password"
              type="password"
              class="form-control"
            >
          </div>
          <div class="center-align">
            <button
              id="btn-login"
              class="btn btn-default"
            >
              Login
            </button><br>
            <a href="#"><p id="close-button">Close Program</p></a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.$store.dispatch('retrieveToken', {
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import './src/assets/css.scss';


</style>
