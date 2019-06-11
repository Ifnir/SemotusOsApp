<template>
  <div class="createelder">
    <div class="top">
      <div class="container">
        <br>
        <form
          action="#"
          @submit.prevent="createElder"
        >
          <div class="form-group">
            <label for="name">Name:</label>
            <input
              id="txtName"
              v-model="name"
              type="text"
              class="form-control"
              required
            >
          </div>
          <div class="form-group">
            <label for="tag">Beacon:</label>
            <v-select
              v-model="beacon"
              :options="filteredArray"
            />
          </div>
          <div class="center-align">
            <label>{{ statusMessage }}</label><br>
            <button
              id="btn-login"
              class="btn btn-default"
            >
              Create Elder
            </button><br>
            <a
              href="#"
              @click="closeElderInterface()"
            ><p id="close-button">Close Interface</p></a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';
import VSelect from '@alfsnd/vue-bootstrap-select';

export default {
  name: 'Createelder',
  components: {
  },
  components: {
    VSelect,
  },
  data() {
    return {
      statusMessage: '',
      name: '',
      beacon: '',
      filteredArray: [],
      filteredBeacons: [],
    };
  },
  computed: {
  },
  created() {
    this.$store.dispatch('retrieveBeacons');
    setTimeout(() => {
      this.createFilteredArray();
    }, 1000);
  },
  methods: {
    beacons() {
      return this.$store.getters.allBeacons;
    },
    closeElderInterface() {
      ipcRenderer.send('elderInterface', 'close');
    },
    createElder() {
      if (this.name && this.beacon) {
        this.$store.dispatch('addElder',
          {
            name: this.name,
            beaconId: this.beacon.value,
          }).then(res => this.statusMessage = res.data,
          this.name = null, this.beacon = null);
      } else {
        this.statusMessage = 'A name and beacon must be specified';
      }
    },
    createFilteredArray() {
      this.filteredArray = [];
      this.filteredBeacons = this.beacons().filter(o => !this.beacons().find(o2 => o.id === o2.beaconId));
      for (let i = 0; i < this.filteredBeacons.length; i++) {
        this.filteredArray.push({ value: this.filteredBeacons[i].id, text: this.filteredBeacons[i].name });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import './src/assets/css.scss';


</style>
