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
          <tr v-for="check in paginate" :key="check.id">
            <td>{{ check.elders.name }}</td>
            <td>{{ check.users.username }}</td>
            <td>{{ check.timestamp}}</td>
            <td>{{ check.check ? 'Out' : 'In' }}</td>
          </tr>
        </tbody>
      </table>
      <ul>
    <li v-for="pageNumber in totalPages" v-if="Math.abs(pageNumber - currentPage) < 3 || pageNumber == totalPages || pageNumber == 1">
    <a v-bind:key="pageNumber" href="#" @click="setPage(pageNumber)" :class="{current: currentPage === pageNumber, last: (pageNumber == totalPages && Math.abs(pageNumber - currentPage) > 3), first:(pageNumber == 1 && Math.abs(pageNumber - currentPage) > 3)}">{{ pageNumber }}</a>
    </li>
    </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
 import Nav from './../components/Nav.vue';
export default {
  name: 'check',
  data() {
    return {     
      currentPage: 0,
      itemsPerPage: 10,
      resultCount: 0,
    }
  },
  components: {
      Nav
  },
  created() {
    this.$store.dispatch('retrieveChecks')
  },
  computed: {
    anyChecks() {
      return this.$store.getters.allChecks
    },
    totalPages() {
      return Math.ceil(this.resultCount / this.itemsPerPage)
    },
    paginate() {
      if (!this.anyChecks || this.anyChecks.length !== this.anyChecks.length) {
                return
          }
          
            if(this.currentPage == 0) {
              this.currentPage = 1
            }
            this.resultCount = this.anyChecks.length
            if (this.currentPage >= this.totalPages) {
              this.currentPage = this.totalPages
            }
            var index = this.currentPage * this.itemsPerPage - this.itemsPerPage
            return this.anyChecks.slice(index, index + this.itemsPerPage)
    }
  },
  methods: {
    setPage(pageNumber) {
      this.currentPage = pageNumber
    },
  }
}
</script>
