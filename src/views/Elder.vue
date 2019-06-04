<template>
  <div class="home">
    <Nav></Nav>
    <div class="wrapper">
      <h2>Elder</h2>
      <hr>
      <a class="waves-effect waves-light btn-large" v-on:click="openElderInterface()">Add Elder</a>
      <hr>

      <table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Beacon</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(elder, obj) in errElder" :key="obj.id" :class="{editing: elder == editedElder}" v-cloak>
            <td>{{ elder.name }}</td>
            <td>
              <div class="view">
                <template v-if="elder.beacon">
                  {{ elder.beacon.name }}
                </template>
              </div>
              <div class="edit">
                <v-select :options="filteredArray" v-model="selectedValue"/>
              </div>
            </td>
            <td>
              <div class="view">
                <a class="theB" v-on:click="editElder(elder)">Edit</a>
              </div>
              <div class="edit">
                <a class="theB" :required="selectedValue != null" v-on:click="saveElder()">Save </a>
              </div>
              <div class="view">
                <a class="theB delete" v-on:click="deleteElder(elder.id)">Delete</a>
              </div>
              <div class="edit">
                <a class="theB delete" v-on:click="cancelChange()">Cancel</a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ipcRenderer } from 'electron'
import Nav from './../components/Nav.vue';
import VSelect from '@alfsnd/vue-bootstrap-select';

export default {
  name: 'elder',
  data() {
    return {
      editedElder: null,
      selectedValue: null,
      filteredBeacons: [],
      filteredArray: [],
      testArray: []
    }
  },
  components: {
      Nav,
      VSelect
  },
  created() {
    this.$store.dispatch('retrieveBeacons')
    this.$store.dispatch('retrieveElders')
  },
  computed: {
    errElder() {
      return this.$store.getters.allElders
    }
  },
  watch: {
    errElder() {
      if (this.testArray.length <= 0 && this.anyElders().length > 0) {
        this.testArray = this.anyElders().splice(0)
        this.$store.dispatch('retrieveElders')
    }
      var tempArray = JSON.parse(JSON.stringify(this.testArray))
      var elderArray = JSON.parse(JSON.stringify(this.anyElders()))
      console.log("tempArray", tempArray, "elderArray", elderArray)

      for (var i in elderArray) {
        const index = tempArray.map(e => e.name).indexOf(elderArray[i].name);
        if (tempArray[index].beaconId !== elderArray[i].beaconId) {
          this.$store.dispatch('retrieveElders')
          this.testArray = this.anyElders()
        
      }
    }
  },
    deep: true
  },
  methods: {
    allBeacons() {
      return this.$store.getters.allBeacons
    },
    anyElders() {
      return this.$store.getters.allElders
    },
    editElder(elder) {
      this.selectedValue = null
      this.filteredArray = []
      this.filteredBeacons = this.allBeacons().filter(o => ! this.anyElders().find(o2 => o.id === o2.beaconId))
      for (var i = 0; i < this.filteredBeacons.length; i++) {
        this.filteredArray.push({value: this.filteredBeacons[i].id, text: this.filteredBeacons[i].name})
      }
      this.editedElder = elder
    },
    saveElder() {
        this.editedElder['beaconId'] = this.selectedValue['value']
        this.$store.dispatch('updateElder', this.editedElder)
        this.editedElder = null
    },
    cancelChange() {
      this.editedElder = null
    },
    deleteElder(id) {
      this.$store.dispatch('deleteElder', id)
      this.$store.dispatch('retrieveElders')
    },
    openElderInterface() {
      ipcRenderer.send('elderInterface', 'open')
    }
  }
}
</script>
