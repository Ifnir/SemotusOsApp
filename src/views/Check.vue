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
  data() {
    return {
      currentPage: 0,
      itemsPerPage: 10,
      resultCount: 0,
      searchKey: '',
    };
  },
  computed: {
    anyChecks() {
      console.log(this.$store.getters.allChecks);
      return this.$store.getters.allChecks;
    },
    totalPages() {
      return Math.ceil(this.resultCount / this.itemsPerPage);
    },
    paginate() {
      if (!this.anyChecks || this.anyChecks.length !== this.anyChecks.length) {
        return;
      }
      const search = this.searchKey.toLowerCase().trim();

      if (search) {
        return this.anyChecks.filter(c => c.timestamp.toLowerCase().indexOf(search) > -1);
      }

      if (this.currentPage == 0) {
        this.currentPage = 1;
      }
      this.resultCount = this.anyChecks.length;
      if (this.currentPage >= this.totalPages) {
        this.currentPage = this.totalPages;
      }
      const index = this.currentPage * this.itemsPerPage - this.itemsPerPage;
      return this.anyChecks.slice(index, index + this.itemsPerPage);
    },
    filtered() {
      const search = this.searchKey.toLowerCase().trim();

      if (!search) return this.anyChecks;

      return this.anyChecks.filter(c => c.timestamp.toLowerCase().indexOf(search) > -1);
    },
  },
  created() {
    this.$store.dispatch('retrieveChecks');
  },
  methods: {
    setPage(pageNumber) {
      this.currentPage = pageNumber;
    },
  },
};
</script>
