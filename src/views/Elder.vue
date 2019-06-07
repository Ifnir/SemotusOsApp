<template>
  <div class="home">
    <Nav />
    <div class="wrapper">
      <h2>Elder</h2>
      <hr>
      <a
        class="waves-effect waves-light btn-large"
        @click="openElderInterface()"
      >Add Elder</a>
      <hr>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Beacon</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(elder, obj) in paginate"
            v-cloak
            :key="obj.id"
            :class="{editing: elder == editedElder}"
          >
            <td>{{ elder.name }}</td>
            <td>
              <div class="view">
                <template v-if="elder.beacon">
                  {{ elder.beacon.name }}
                </template>
              </div>
              <div class="edit">
                <v-select
                  v-model="selectedValue"
                  :options="filteredArray"
                />
              </div>
            </td>
            <td>
              <div class="view">
                <a
                  class="theB"
                  @click="editElder(elder)"
                >Edit</a>
              </div>
              <div class="edit">
                <a
                  class="theB"
                  :required="selectedValue != null"
                  @click="saveElder()"
                >Save </a>
              </div>
              <div class="view">
                <a
                  class="theB delete"
                  @click="deleteElder(elder.id)"
                >Delete</a>
              </div>
              <div class="edit">
                <a
                  class="theB delete"
                  @click="cancelChange()"
                >Cancel</a>
              </div>
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
import VSelect from '@alfsnd/vue-bootstrap-select';
import Nav from '../components/Nav.vue';

export default {
  name: 'Elder',
  components: {
    Nav,
    VSelect,
  },
  data() {
    return {
      editedElder: null,
      selectedValue: null,
      filteredBeacons: [],
      filteredArray: [],
      testArray: [],
      currentPage: 0,
      itemsPerPage: 4,
      resultCount: 0,
    };
  },
  computed: {
    errElder() {
      return this.$store.getters.allElders;
    },
    totalPages() {
      return Math.ceil(this.resultCount / this.itemsPerPage);
    },
    paginate() {
      if (!this.errElder || this.errElder.length <= 0) {
        return;
      }

      if (this.currentPage == 0) {
        this.currentPage = 1;
      }
      this.resultCount = this.errElder.length;
      if (this.currentPage >= this.totalPages) {
        this.currentPage = this.totalPages;
      }
      const index = this.currentPage * this.itemsPerPage - this.itemsPerPage;
      return this.errElder.slice(index, index + this.itemsPerPage);
    },
  },
  watch: {
    errElder() {
      if (this.testArray.length <= 0 && this.anyElders().length > 0) {
        this.testArray = this.anyElders().splice(0);
        this.$store.dispatch('retrieveElders');
      }
      const tempArray = JSON.parse(JSON.stringify(this.testArray));
      const elderArray = JSON.parse(JSON.stringify(this.anyElders()));
      console.log('tempArray', tempArray, 'elderArray', elderArray);

      for (const i in elderArray) {
        const index = tempArray.map(e => e.name).indexOf(elderArray[i].name);
        if (tempArray[index].beaconId !== elderArray[i].beaconId) {
          this.$store.dispatch('retrieveElders');
          this.testArray = this.anyElders();
        }
      }
    },
    deep: true,
  },
  created() {
    this.$store.dispatch('retrieveBeacons');
    this.$store.dispatch('retrieveElders');
  },
  methods: {
    allBeacons() {
      return this.$store.getters.allBeacons;
    },
    anyElders() {
      return this.$store.getters.allElders;
    },
    editElder(elder) {
      this.selectedValue = null;
      this.filteredArray = [];
      this.filteredBeacons = this.allBeacons().filter(o => !this.anyElders().find(o2 => o.id === o2.beaconId));
      for (let i = 0; i < this.filteredBeacons.length; i++) {
        this.filteredArray.push({ value: this.filteredBeacons[i].id, text: this.filteredBeacons[i].name });
      }
      this.editedElder = elder;
    },
    saveElder() {
      if (this.selectedValue) {
        this.editedElder.beaconId = this.selectedValue.value;
        this.$store.dispatch('updateElder', this.editedElder);
        this.editedElder = null;
      }
    },
    cancelChange() {
      this.editedElder = null;
    },

    deleteElder(id) {
      if (confirm('Are you sure?')) {
        this.$store.dispatch('deleteElder', id);
        setTimeout(() => {
          this.$store.dispatch('retrieveElders');
        }, 500);
      }
    },
    openElderInterface() {
      ipcRenderer.send('elderInterface', 'open');
    },
    setPage(pageNumber) {
      this.currentPage = pageNumber;
    },
  },
};
</script>
