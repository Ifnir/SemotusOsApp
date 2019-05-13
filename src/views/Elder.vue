<template>
  <div class="home">
    <Nav></Nav>
    <div class="wrapper">
      <h2>Elder</h2>
      <hr>
      <a class="waves-effect waves-light btn-large">Add New</a>
      <hr>

      <table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="elder in anyElders" :key="elder.id">
            <td>{{ elder.name }}</td>
            <td>{{ elder.beaconId }} </td>
             <td>
                <a class="waves-effect waves-light btn">Edit</a><div class="divider"/>
                <a class="waves-effect waves-light btn delete">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
  import Nav from './../components/Nav.vue';
export default {
  name: 'elder',
  components: {
      Nav
  },
  created() {
    this.$store.dispatch('retrieveElders')
  },
  computed: {
    anyElders() {
      return this.$store.getters.allElders
    }
  }
}
</script>
