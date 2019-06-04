<template>
  <div class="createelder">
    <div class="top">
      <div class="container">
        <br/>
        <form action="#" @submit.prevent="createElder">
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" class="form-control" id="txtName" v-model="name" required>
            </div>
            <div class="form-group">
              <label for="tag">Beacon:</label>
              <v-select :options="filteredArray" v-model="beacon"/>
            </div>
            <div class="center-align">
              <button class="btn btn-default" id="btn-login">Create Elder</button><br>
              <a href="#" v-on:click="closeElderInterface()"><p id="close-button">Cancel</p></a>
            </div>
        </form>
    </div>
  </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import VSelect from '@alfsnd/vue-bootstrap-select';
export default {
  name: 'createelder',
  components: {
  },
  data() {
    return {
      name: '',
      beacon: '',
      filteredArray: [],
      filteredBeacons: []
    }
  },
  components: {
      VSelect
  },
  created() {
    this.$store.dispatch('retrieveBeacons')
    setTimeout(()=>{
      this.createFilteredArray()
    },1000);
  },
  computed: {
  },
  methods: {
    beacons() {
      return this.$store.getters.allBeacons
    },
    closeElderInterface() {
      ipcRenderer.send('elderInterface', 'close')
    },
    createElder() {
      this.$store.dispatch('addElder',
      {
        name: this.name,
        beaconId: this.beacon.value
      })
      this.closeElderInterface()
    },
    createFilteredArray() {
      this.filteredArray = []
      this.filteredBeacons = this.beacons().filter(o => ! this.beacons().find(o2 => o.id === o2.beaconId))
      console.log(this.filteredBeacons)
      for (var i = 0; i < this.filteredBeacons.length; i++) {
        this.filteredArray.push({value: this.filteredBeacons[i].id, text: this.filteredBeacons[i].name})
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import './src/assets/css.scss';


</style>