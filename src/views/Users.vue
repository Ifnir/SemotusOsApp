<template>
  <div class="home">
    <Nav />
    <div class="wrapper">
      <h2>Users</h2>
      <hr>
      <a
        class="waves-effect waves-light btn-large"
        @click="openUserInterface()"
      >Add User</a>
      <hr>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th />
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="user in allUsers"
            v-cloak
            :key="user.id"
            :class="{editing: user == editedUser}"
          >
            <td>
              <div class="view">
                {{ user.username }}
              </div>
              <div class="edit">
                <input
                  v-model="user.username"
                  type="text"
                >
              </div>
            </td>
            <td>
              <div class="view">
                <a
                  class="theB"
                  @click="editUser(user)"
                >Edit</a>
              </div>

              <div class="edit">
                <a
                  class="theB"
                  @click="saveUser(user)"
                >Save</a>
              </div>
              <a
                class="theB delete"
                @click="deleteUser(user.id)"
              >Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ipcRenderer } from 'electron';
import Nav from '../components/Nav.vue';

export default {
  name: 'User',
  components: {
    Nav,
  },
  data() {
    return {
      editedUser: null,
      tempArray: [],
    };
  },
  computed: {
    allUsers() {
      return this.$store.getters.allUsers;
    },
  },
  watch: {
    anyBeacons() {
      if (this.tempArray.length <= 0) {
        this.tempArray = this.$store.getters.allBeacons.splice(0);
        this.$store.dispatch('retrieveBeacons');
        console.log('reeee');
      }
      console.log('test');
      const tempArray = JSON.parse(JSON.stringify(this.tempArray));
      const elderArray = JSON.parse(JSON.stringify(this.$store.getters.allBeacons));
      console.log(tempArray, tempArray.length);
      console.log(elderArray, elderArray.length);
      if (elderArray.length > tempArray.length) {
        this.$store.dispatch('retrieveBeacons');
        this.tempArray = this.$store.getters.allBeacons;
      }
    },
  },
  created() {
    this.$store.dispatch('retrieveUsers');
  },
  methods: {
    openUserInterface() {
      ipcRenderer.send('userInterface', 'open');
    },
    saveUser(user) {
      this.$store.dispatch('updateUser', user);
      this.editedUser = null;
    },
    editUser(User) {
      this.editedUser = User;
    },
    deleteUser(id) {
      if (confirm('Are you sure?')) {
        this.$store.dispatch('deleteUser', id);
      }
    },
  },
};
</script>
