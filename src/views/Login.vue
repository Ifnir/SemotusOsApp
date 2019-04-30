<template>
  <div class="login">
    <Header></Header>
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
             <button class="btn btn-default" id="btn-login">Login</button>
        </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from './../components/Header.vue';

export default {
  name: 'login',
  components: {
    Header
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