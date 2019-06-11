<template>
  <div class="home">
    <Nav />
    <div class="wrapper">
      <h2>Users</h2>
      <hr>
      <a
        class="waves-effect waves-light btn-large"
        @click="openUserCreationInterface()"
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
            v-for="user in users"
            v-cloak
            :key="user.id"
            :class="{editing: user == userObject}"
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

  // Properties
  data() {
    return {
      userObject: null,
      copyOfUsers: [],
    };
  },

  // Data-binded objects
  computed: {
    users() {
      return this.$store.getters.users;
    },
  },

  watch: {
    // Watches for changes in users object using a copy of the users object.
    users() {
      if (this.copyOfUsers.length <= 0) {
        this.copyOfUsers = this.$store.getters.users.splice(0);
        this.$store.dispatch('retrieveUsers');
      }
      const copyOfUsers = JSON.parse(JSON.stringify(this.copyOfUsers));
      const userArray = JSON.parse(JSON.stringify(this.$store.getters.users));

      if (userArray.length > copyOfUsers.length) {
        this.$store.dispatch('retrieveUsers');
        this.copyOfUsers = this.$store.getters.users;
      }
    },
  },

  // Fetches user information as the view is created.
  created() {
    this.$store.dispatch('retrieveUsers');
  },
  methods: {

    /**
    * Opens interface for creation of new users.
    * 
    */
    openUserCreationInterface() {
      ipcRenderer.send('userInterface', 'open');
    },

    /**
    * Save user object.
    * 
    * @param {user} user object.
    */
    saveUser(user) {
      this.$store.dispatch('updateUser', user);
      this.userObject = null;
    },

    /**
    * Edit user object.
    * 
    * @param {user} user object.
    */
    editUser(user) {
      this.userObject = user;
    },

    /**
    * Delete user with corresponding ID.
    * 
    * @param {id} id of specific user object.
    */
    deleteUser(id) {
      if (confirm('Are you sure?')) {
        this.$store.dispatch('deleteUser', id);
      }
    },
  },
};
</script>
