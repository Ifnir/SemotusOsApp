<template>
  <div class="home">
    <Header></Header>
    <Nav></Nav>
    <div class="wrapper">
      <h2>Home</h2>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
  import Header from './../components/Header.vue';
  import Nav from './../components/Nav.vue';
export default {
  name: 'home',
  components: {
      Header,
      Nav
  }
}
</script>
