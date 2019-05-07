<template>
  <div class="home">
    <Nav></Nav>
    <div class="wrapper">
      <h2>Beacon</h2>
      <hr>
      <a class="waves-effect waves-light btn-large">Add Beacon</a>
      <hr>
      
      <table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Identifier</th>
              <th>Attachment Key</th>
              <th>Attachment Value</th>
              <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>.....</td>
            <td>Ec.....lair</td>
            <td>.......</td>
            <td>....</td>
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
  name: 'beacon',
  components: {
      Nav
  }
}
</script>
