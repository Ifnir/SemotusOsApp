<template>
  <div class="home">
    <Nav></Nav>
    <div class="wrapper">
      <h2>Check</h2>
      <hr>
      <table>
        <thead>
          <tr>
              <th>Elder</th>
              <th>User</th>
              <th>Time</th>
              <th>Check</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="check in anyChecks" :key="check.id">
            <td>{{ check.elders.name }}</td>
            <td>{{ check.users.username }}</td>
            <td>{{ check.timestamp}}</td>
            <td>{{ check.check ? 'Out' : 'In' }}</td>
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
  name: 'check',
  components: {
      Nav
  },
  created() {
    this.$store.dispatch('retrieveChecks')
  },
  computed: {
    anyChecks() {
      return this.$store.getters.allChecks
    }
  }
}
</script>
