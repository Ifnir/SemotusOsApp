<template>
  <div class="home">
    <Nav />
    <div class="wrapper">
      <h2>Home</h2>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '../components/Nav.vue';

export default {
  name: 'Home',
  components: {
    Nav,
  },
};
</script>
