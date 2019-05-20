<template>
  <div class="home">
    <Nav></Nav>
    <div class="wrapper">
      <h2>Elder</h2>
      <hr>
      <a class="waves-effect waves-light btn-large">Add New</a>
      <hr>

      <table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Beacon</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="elder in anyElders" :key="elder.id" :class="{editing: elder == editedElder}" v-cloak>
            <td>{{ elder.name }}</td>
            <td>
              <div class="view">
                {{ elder.beacon }}
              </div>
              <div class="edit">
                <v-select :options="tempArray" v-model="selectedValue" />
              </div>
            </td>
            <td>
              <div class="view">
                <a class="waves-effect waves-light btn" v-on:click="editElder(elder)">Edit</a>
              </div>
              <div class="edit">
                <a class="waves-effect waves-light btn" v-on:click="saveElder()">Save</a>
              </div>
                <a class="waves-effect waves-light btn delete">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from './../components/Nav.vue';
import VSelect from '@alfsnd/vue-bootstrap-select';

export default {
  name: 'elder',
  data() {
    return {
      editedElder: null,
      selectedValue: null,
      attemptArray: [],
      tempArray: [],
      reeee: []
    }
  },
  components: {
      Nav,
      VSelect
  },
  created() {
    this.$store.dispatch('retrieveElders')
  },
  computed: {
    anyElders() {
      return this.$store.getters.allElders
    },
    allBeacons() {
      return this.$store.getters.allBeacons
    }
  },
  methods: {
    editElder(elder) {
      this.attemptArray = this.$store.getters.allBeacons
      for (var i = 0; i < this.attemptArray.length; i++) {
        this.tempArray.push({value: this.attemptArray[i].id, text: this.attemptArray[i].name})
      }
      this.editedElder = elder
      this.reeee = this.anyElders.data
      console.log(this.reeee)
    },
    saveElder() {      
      this.reeee = this.anyElders.data
      console.log(this.reeee)
      this.editedElder['beaconId'] = this.selectedValue['value']
      this.$store.dispatch('updateElder', this.editedElder)
      this.editedElder = null
      this.reeee = this.anyElders.data
      console.log(this.reeee)
    }
  }
}
</script>
