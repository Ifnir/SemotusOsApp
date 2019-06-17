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
              :options="filteredBeacons"
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

  // Properties
  data() {
    return {
      statusMessage: '',
      name: '',
      beacon: '',
      filteredBeacons: [],
      beaconArray: [],
    };
  },

  // Fetches beacon information as the view is created.
  created() {
    this.$store.dispatch('retrieveBeacons');

    // setTimeout is used since its otherwise too fast updating the view,
    // without the changes being shown.
    setTimeout(() => {
      this.createFilteredBeacons();
    }, 1000);
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
    * Closes elder creation interface.
    *
    */
    closeElderInterface() {
      ipcRenderer.send('elderInterface', 'close');
    },

    /**
    * Creates new elder.
    *
    */
    createElder() {
      if (this.name && this.beacon) {
        this.$store.dispatch('createElder',
          {
            name: this.name,
            beaconId: this.beacon.value,
          }).then(res => this.statusMessage = res.data,
          this.name = null, this.beacon = null);
      } else {
        this.statusMessage = 'A name and beacon must be specified';
      }
    },

    /**
    * Create array with necessary data structure for v-select object.
    *
    */
    createFilteredBeacons() {
      this.filteredBeacons = [];
      this.beaconArray = this.beacons();
      for (let i = 0; i < this.beaconArray.length; i++) {
        this.filteredBeacons.push({ value: this.beaconArray[i].id, text: this.beaconArray[i].name });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import './src/assets/css.scss';


</style>
