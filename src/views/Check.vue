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
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>11:11:11</td>
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
  }
}
</script>
