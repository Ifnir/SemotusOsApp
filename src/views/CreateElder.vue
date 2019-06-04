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
              <!--<input type="text" class="form-control" id="txtTag" v-model="tag" required>-->
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
      beacon: ''
    }
  },
  components: {
      VSelect
  },
  computed: {
    filteredArray() {
      return this.$store.getters.filteredElder
    }
  },
  methods: {
    closeElderInterface() {
      
      //ipcRenderer.send('elderInterface', 'close')
    },
    createElder() {
      this.$store.dispatch('addElder',
      {
        name: this.name,
        beaconId: this.tag
      })
      this.closeElderInterface()
    }
  }
}
</script>
<style lang="scss" scoped>
@import './src/assets/css.scss';


</style>