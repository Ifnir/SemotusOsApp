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
            v-for="user in paginate"
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
      <ul>
        <li
          v-for="pageNumber in totalPages"
          v-if="Math.abs(pageNumber - currentPage) < 3 || pageNumber == totalPages || pageNumber == 1"
        >
          <a
            :key="pageNumber"
            href="#"
            :class="{current: currentPage === pageNumber, last: (pageNumber == totalPages && Math.abs(pageNumber - currentPage) > 3), first:(pageNumber == 1 && Math.abs(pageNumber - currentPage) > 3)}"
            @click="setPage(pageNumber)"
          >{{ pageNumber }}</a>
        </li>
      </ul>
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
      currentPage: 0,
      itemsPerPage: 10,
      resultCount: 0,
    };
  },

  // Data-binded objects
  computed: {
    users() {
      return this.$store.getters.users;
    },
    totalPages() {
      return Math.ceil(this.resultCount / this.itemsPerPage);
    },
    paginate() {
      if (!this.users || this.users.length < 0) {
        return;
      }
      if (this.currentPage == 0) {
        this.currentPage = 1;
      }
      this.resultCount = this.users.length;
      if (this.currentPage >= this.totalPages) {
        this.currentPage = this.totalPages;
      }
      const index = this.currentPage * this.itemsPerPage - this.itemsPerPage;
      return this.users.slice(index, index + this.itemsPerPage);
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
