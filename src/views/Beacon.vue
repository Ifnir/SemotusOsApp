<template>
  <div class="home">
    <Nav></Nav>
    <div class="wrapper">
      <h2>Beacon</h2>
      <hr>
      <a class="waves-effect waves-light btn-large" v-on:click="openBeaconInterface()">Add Beacon</a>
      <hr>
  
      <table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Tag</th>
              <th>Identifier</th>
              <th>Attachment Key</th>
              <th>Attachment Value</th>
              <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="beacon in paginate" :key="beacon.id" :class="{editing: beacon == editedBeacon}" v-cloak>
            <td>
              <div class="view">
                {{beacon.name}}
              </div>
              <div class="edit">
                <input type="text" v-model="beacon.name"/>
              </div>
            </td>
            <td>
              <div class="view">
                {{beacon.tag}}
              </div>
              <div class="edit">
                <input type="text" v-model="beacon.tag"/>
              </div>
            </td>
            <td>
              <div class="view">
                {{beacon.identifier}}
              </div>
              <div class="edit">
                <input type="text" v-model="beacon.identifier"/>
              </div>
            </td>
            <td>
              <div class="view">
                {{beacon.attachment_key}}
              </div>
              <div class="edit">
                <input type="text" v-model="beacon.attachment_key"/>
              </div>
            </td>
            <td>
              <div class="view">
                {{beacon.attachment_value}}
              </div>
              <div class="edit">
                <input type="text" v-model="beacon.attachment_value"/>
              </div>
            </td>
            <td>
                <div class="view">
                  <a class="theB" v-on:click="editBeacon(beacon)">Edit</a>
                </div>
                
                <div class="edit">
                  <a class="theB" v-on:click="saveBeacon(beacon)">Save</a>
                </div>
                <a class="theB delete" v-on:click="deleteBeacon(beacon.id)">Delete</a>
            </td>
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
import { ipcRenderer } from 'electron'
import Nav from './../components/Nav.vue';
export default {
  name: 'beacon',
  data() {
    return {     
      editedBeacon: null,
      tempArray: [],
      currentPage: 0,
      itemsPerPage: 5,
      resultCount: 0,
    }
  },
  components: {
      Nav
  },
  created() {
    this.$store.dispatch('retrieveBeacons')
  },
  computed: {
    anyBeacons() {
      return this.$store.getters.allBeacons
    },
    totalPages() {
      return Math.ceil(this.resultCount / this.itemsPerPage)
    },
    paginate() {
      if (!this.anyBeacons || this.anyBeacons.length !== this.anyBeacons.length) {
                return
          }
          
            if(this.currentPage == 0) {
              this.currentPage = 1
            }
            this.resultCount = this.anyBeacons.length
            if (this.currentPage >= this.totalPages) {
              this.currentPage = this.totalPages
            }
            var index = this.currentPage * this.itemsPerPage - this.itemsPerPage
            return this.anyBeacons.slice(index, index + this.itemsPerPage)
    }
  },
  watch: {
    anyBeacons() {
      if (this.tempArray.length <= 0) {
        this.tempArray = this.$store.getters.allBeacons.splice(0)
        this.$store.dispatch('retrieveBeacons')
      }
      
      var tempArray = JSON.parse(JSON.stringify(this.tempArray))
      var elderArray = JSON.parse(JSON.stringify(this.$store.getters.allBeacons))
     
      if (elderArray.length > tempArray.length) {
        this.$store.dispatch('retrieveBeacons')
        this.tempArray = this.$store.getters.allBeacons
      }
    }
  },
  methods: {
    setPage(pageNumber) {
      
      this.currentPage = pageNumber
    },
    openBeaconInterface() {
      ipcRenderer.send('beaconInterface', 'open')
    },
    saveBeacon(beacon) {
      this.$store.dispatch('updateBeacon', beacon)
      this.editedBeacon = null
    },
    editBeacon(beacon) {
      this.editedBeacon = beacon
    },
    deleteBeacon(id) {
      this.$store.dispatch('deleteBeacon', id)
    }
  },
}
</script>
