<template>
  <div class="home">
    <Nav></Nav>
    <div class="wrapper">
      <h2>Beacon</h2>
      <hr>
      <a class="waves-effect waves-light btn-large">Add Beacon</a>
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
          <tr v-for="beacon in anyBeacons" :key="beacon.id" :class="{editing: beacon == editedBeacon}" v-cloak>
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
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import Nav from './../components/Nav.vue';
export default {
  name: 'beacon',
  data() {
    return {
      editedBeacon: null,
      editMode: false
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
    }
  },
  methods: {
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
  }
  
}
</script>
