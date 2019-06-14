<template>
  <div class="home">
    <Nav />
    <div class="wrapper">
      <h2>Check</h2>
      <hr>
      <input
        v-model="searchKey"
        type="text"
        placeholder="Search timestamp.."
      >
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
          <tr
            v-for="check in paginate"
            :key="check.id"
          >
            <td>{{ check.elders.name }}</td>
            <td>{{ check.users.username }}</td>
            <td>{{ check.timestamp }}</td>
            <td>{{ check.check ? 'Out' : 'In' }}</td>
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
import { setTimeout } from 'timers';
import Nav from '../components/Nav.vue';

export default {
  name: 'Check',
  components: {
    Nav,
  },
  // Propertis
  data() {
    return {
      currentPage: 0,
      itemsPerPage: 10,
      resultCount: 0,
      searchKey: '',
    };
  },

  // Data-binded objects
  computed: {
    checks() {
      return this.$store.getters.checks;
    },
    totalPages() {
      return Math.ceil(this.resultCount / this.itemsPerPage);
    },
    paginate() {
      if (!this.checks || this.checks.length < 0) {
        return;
      }
      const search = this.searchKey.toLowerCase().trim();

      if (search) {
        return this.checks.filter(c => c.timestamp.toLowerCase().indexOf(search) > -1);
      }

      if (this.currentPage == 0) {
        this.currentPage = 1;
      }
      this.resultCount = this.checks.length;
      if (this.currentPage >= this.totalPages) {
        this.currentPage = this.totalPages;
      }
      const index = this.currentPage * this.itemsPerPage - this.itemsPerPage;
      return this.checks.slice(index, index + this.itemsPerPage);
    },
  },

  // Fetches check information as the view is created.
  created() {
    this.$store.dispatch('retrieveChecks');
  },
  methods: {
    /**
    * Set page to be shown.
    *
    * @param {pageNumber} number of what page to show.
    */
    setPage(pageNumber) {
      this.currentPage = pageNumber;
    },
  },
};
</script>
