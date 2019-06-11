<template>
  <div class="home">
    <Nav />
    <div class="wrapper">
      <h2>Elder</h2>
      <hr>
        <a class="waves-effect waves-light btn-large"
          @click="openElderCreationInterface()"
        >Add Elder
        </a>
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
            :class="{editing: elder == elderObject}"
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
                  v-model="selectedBeacon"
                  :options="filteredBeacons"
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
                  :required="selectedBeacon != null"
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

  //Properties
  data() {
    return {
      elderObject: null,
      selectedBeacon: null,
      beaconsAvailable: [],
      filteredBeacons: [],
      copyOfElders: [],
      currentPage: 0,
      itemsPerPage: 4,
      resultCount: 0,
    };
  },
  
  // Data-binded objects
  computed: {
    elderWatcher() {
      return this.$store.getters.elders;
    },

    totalPages() {
      return Math.ceil(this.resultCount / this.itemsPerPage);
    },

    paginate() {
      if (!this.elderWatcher || this.elderWatcher.length <= 0) {
        return;
      }
      if (this.currentPage == 0) {
        this.currentPage = 1;
      }
      this.resultCount = this.elderWatcher.length;
      if (this.currentPage >= this.totalPages) {
        this.currentPage = this.totalPages;
      }
      const index = this.currentPage * this.itemsPerPage - this.itemsPerPage;
      return this.elderWatcher.slice(index, index + this.itemsPerPage);
    },
  },
  watch: {
    // Watches for changes in elders object using a copy of the elders object.
    elderWatcher() {
      // Creates copyOfElders to be used in comparison.
      if (this.copyOfElders.length <= 0 && this.elders().length > 0) {
        this.copyOfElders = this.elders().splice(0);
        this.$store.dispatch('retrieveElders');
      }
      const copyOfEldersArray = JSON.parse(JSON.stringify(this.copyOfElders));
      const elderArray = JSON.parse(JSON.stringify(this.elders()));

      // Check in elderArray for beacon ID changes by comparing with the copy
      for (var i in elderArray) {
        const index = copyOfEldersArray.map(e => e.name).indexOf(elderArray[i].name);
        if (copyOfEldersArray[index].beaconId !== elderArray[i].beaconId) {
          this.$store.dispatch('retrieveElders');
          this.copyOfElders = this.elders();
        }
      }
    },
    deep: true,
  },
  // Fetches beacon and elder information as the view is created.
  created() {
    this.$store.dispatch('retrieveBeacons');
    this.$store.dispatch('retrieveElders');
  },
  methods: {
    /**
    * Return beacon object from store.
    * 
    * @returns beacons
    */
    beacons() {
      return this.$store.getters.beacons;
    },

    /**
    * Return elders object from store.
    * 
    * @returns elders
    */
    elders() {
      return this.$store.getters.elders;
    },

    /**
    * Edit elder object.
    * 
    * @param {elder} contains elder information.
    */
    editElder(elder) {
      this.selectedBeacon = null;
      this.filteredBeacons = [];

      // Create array of unused beacons.
      this.beaconsAvailable = this.beacons().filter(o => !this.elders().find(o2 => o.id === o2.beaconId));

      //Create array with necessary data structure for v-select object.
      for (var i = 0; i < this.beaconsAvailable.length; i++) {
        this.filteredBeacons.push({ value: this.beaconsAvailable[i].id, text: this.beaconsAvailable[i].name });
      }
      this.elderObject = elder;
    },

    /**
    * Save elder object.
    * 
    */
    saveElder() {
      // If condition, then edit elder object's beaconId to selected.
      if (this.selectedBeacon) {
        this.elderObject.beaconId = this.selectedBeacon.value;
        this.$store.dispatch('updateElder', this.elderObject);
        this.elderObject = null;
      }
    },

    /**
    * Delete elder with corresponding ID.
    * 
    * @param {id} id of specific elder object.
    */
    deleteElder(id) {
      if (confirm('Are you sure?')) {
        this.$store.dispatch('deleteElder', id);
        setTimeout(() => {
          this.$store.dispatch('retrieveElders');
        }, 500);
      }
    },

    /**
    * Cancel changes of elder object.
    * 
    */
    cancelChange() {
      this.elderObject = null;
    },

    /**
    * Opens interface for creation of new elders.
    * 
    */
    openElderCreationInterface() {
      ipcRenderer.send('elderInterface', 'open');
    },
  
    /**
    * Set page to be shown.
    * 
    */
    setPage(pageNumber) {
      this.currentPage = pageNumber;
    },
  },
};
</script>
