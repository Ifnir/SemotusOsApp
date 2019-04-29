<template>
  <div class="login">
    <Header></Header>
      <div class="container">
        <br/>
        <div class="form-group">
            <label for="usr">User Name:</label>
            <input type="text" class="form-control" id="txtUsr">
        </div>
        <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" class="form-control" id="txtPwd">
        </div>
        <button class="btn btn-default" id="btn-login">Login</button>
        <label  id="lbl"></label>
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
  }
}
</script>
<style lang="scss" scoped>
@import './src/assets/css.scss';


</style>