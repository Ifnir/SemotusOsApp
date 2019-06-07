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
              <label>{{statusMessage}}</label><br>
              <button class="btn btn-default" id="btn-login">Create Elder</button><br>
              <a href="#" v-on:click="closeElderInterface()"><p id="close-button">Close Interface</p></a>
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
      statusMessage: '',
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
      if (this.name && this.beacon) {
        this.$store.dispatch('addElder',
        {
          name: this.name,
          beaconId: this.beacon.value
        }).then(res => this.statusMessage = res.data,
          this.name = null, this.beacon = null)
      }
      else {
        this.statusMessage = "A name and beacon must be specified"
      }
    },
    createFilteredArray() {
      this.filteredArray = []
      this.filteredBeacons = this.beacons().filter(o => ! this.beacons().find(o2 => o.id === o2.beaconId))
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