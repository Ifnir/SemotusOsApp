<template>
  <div class="createbeacon">
    <div class="top">
      <div class="container">
        <br>
        <form
          action="#"
          @submit.prevent="createBeacon"
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
            <label for="tag">Tag:</label>
            <input
              id="txtTag"
              v-model="tag"
              type="text"
              class="form-control"
              required
            >
          </div>
          <div class="form-group">
            <label for="identifier">Identifier:</label>
            <input
              id="txtIdentifier"
              v-model="identifier"
              type="text"
              class="form-control"
              required
            >
          </div>
          <div class="form-group">
            <label for="attachKey">Attachment Key:</label>
            <input
              id="txtAttachKey"
              v-model="attachKey"
              type="text"
              class="form-control"
              required
            >
          </div>
          <div class="form-group">
            <label for="attachValue">Attachment Value:</label>
            <input
              id="txtAttachValue"
              v-model="attachValue"
              type="text"
              class="form-control"
              required
            >
          </div>
          <div class="center-align">
            <label>{{ statusMessage }}</label><br>
            <button
              id="btn-login"
              class="btn btn-default"
            >
              Create Beacon
            </button><br>
            <a
              href="#"
              @click="closeBeaconInterface()"
            ><p id="close-button">Close Interface</p></a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron';

export default {
  name: 'Createbeacon',
  components: {
  },

  // Properties
  data() {
    return {
      statusMessage: '',
      name: '',
      tag: '',
      identifier: '',
      attachKey: '',
      attachValue: '',
    };
  },
  methods: {
    /**
    * Closes beacon creation interface.
    *
    */
    closeBeaconInterface() {
      ipcRenderer.send('beaconInterface', 'close');
    },

    /**
    * Creates new beacon.
    *
    */
    createBeacon() {
      if (this.name && this.tag && this.identifier && this.attachKey && this.attachValue) {
        this.$store.dispatch('addBeacon',
          {
            name: this.name,
            tag: this.tag,
            identifier: this.identifier,
            attachment_key: this.attachKey,
            attachment_value: this.attachValue,
          }).then(res => this.statusMessage = res.data,
          this.name = null, this.tag = null, this.identifier = null, this.attachKey = null, this.attachValue = null);
      } else {
        this.statusMessage = 'All fields must be filled out';
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import './src/assets/css.scss';


</style>
