<template>
  <div class="login">
    <div class="top">
      <div class="container">
        <br/>
        <form action="#" @submit.prevent="login">       
            <div class="form-group">
              <label for="usr">User Name:</label>
              <input type="text" class="form-control" id="txtUsr" v-model="username">
          </div>
          <div class="form-group">
              <label for="pwd">Password:</label>
              <input type="password" class="form-control" id="txtPwd" v-model="password">
          </div>
            <div class="center-align">
              <button class="btn btn-default" id="btn-login">Login</button><br>
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
  name: 'login',
  components: {
  },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login() {
      this.$store.dispatch('retrieveToken', {
        username: this.username,
        password: this.password
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './src/assets/css.scss';


</style>