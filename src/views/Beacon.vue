<template>
  <div class="home">
    <Nav />
    <div class="wrapper">
      <h2>Beacon</h2>
      <hr>
      <a
        class="waves-effect waves-light btn-large"
        @click="openBeaconCreationInterface()"
      >Add Beacon</a>
      <hr>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Tag</th>
            <th>Identifier</th>
            <th>Attachment Key</th>
            <th>Attachment Value</th>
            <th />
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="beacon in paginate"
            v-cloak
            :key="beacon.id"
            :class="{editing: beacon == editedBeacon}"
          >
            <td>
              <div class="view">
                {{ beacon.name }}
              </div>
              <div class="edit">
                <input
                  v-model="beacon.name"
                  type="text"
                >
              </div>
            </td>
            <td>
              <div class="view">
                {{ beacon.tag }}
              </div>
              <div class="edit">
                <input
                  v-model="beacon.tag"
                  type="text"
                >
              </div>
            </td>
            <td>
              <div class="view">
                {{ beacon.identifier }}
              </div>
              <div class="edit">
                <input
                  v-model="beacon.identifier"
                  type="text"
                >
              </div>
            </td>
            <td>
              <div class="view">
                {{ beacon.attachment_key }}
              </div>
              <div class="edit">
                <input
                  v-model="beacon.attachment_key"
                  type="text"
                >
              </div>
            </td>
            <td>
              <div class="view">
                {{ beacon.attachment_value }}
              </div>
              <div class="edit">
                <input
                  v-model="beacon.attachment_value"
                  type="text"
                >
              </div>
            </td>
            <td>
              <div class="view">
                <a
                  class="theB"
                  @click="editBeacon(beacon)"
                >Edit</a>
              </div>

              <div class="edit">
                <a
                  class="theB"
                  @click="saveBeacon(beacon)"
                >Save</a>
              </div>
              <a
                class="theB delete"
                @click="deleteBeacon(beacon.id)"
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
  name: 'Beacon',
  components: {
    Nav,
  },

  // Properties
  data() {
    return {
      editedBeacon: null,
      currentPage: 0,
      itemsPerPage: 5,
      resultCount: 0,
    };
  },

  // Data-binded objects
  computed: {
    beacons() {
      return this.$store.getters.beacons;
    },
    totalPages() {
      return Math.ceil(this.resultCount / this.itemsPerPage);
    },
    paginate() {
      if (!this.beacons || this.beacons.length <= 0) {
        return;
      }
      if (this.currentPage == 0) {
        this.currentPage = 1;
      }
      this.resultCount = this.beacons.length;
      if (this.currentPage >= this.totalPages) {
        this.currentPage = this.totalPages;
      }
      const index = this.currentPage * this.itemsPerPage - this.itemsPerPage;
      return this.beacons.slice(index, index + this.itemsPerPage);
    },
  },
  // Fetches beacon information as the view is created.
  created() {
    this.$store.dispatch('retrieveBeacons');
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

    /**
    * Opens interface for creation of new beacons.
    * 
    */
    openBeaconCreationInterface() {
      ipcRenderer.send('beaconInterface', 'open');
    },
    
    /**
    * Save beacon object.
    * 
    * @param {beacon} beacon object.
    */
    saveBeacon(beacon) {
      this.$store.dispatch('updateBeacon', beacon);
      this.editedBeacon = null;
    },

    /**
    * Edit beacon object.
    * 
    * @param {beacon} beacon object.
    */
    editBeacon(beacon) {
      this.editedBeacon = beacon;
    },

    /**
    * Delete beacon with corresponding ID.
    * 
    * @param {id} id of specific beacon object.
    */
    deleteBeacon(id) {
      if (confirm('Are you sure?')) {
        this.$store.dispatch('deleteBeacon', id);
      }
    },
  },
};
</script>
