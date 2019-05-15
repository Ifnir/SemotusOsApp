<template>
  <div class="createbeacon">
    <div class="top">
      <div class="container">
        <br/>
        <form action="#" @submit.prevent="createBeacon">
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" class="form-control" id="txtName" v-model="name" required>
            </div>
            <div class="form-group">
              <label for="tag">Tag:</label>
              <input type="text" class="form-control" id="txtTag" v-model="tag" required>
            </div>
            <div class="form-group">
              <label for="identifier">Identifier:</label>
              <input type="text" class="form-control" id="txtIdentifier" v-model="identifier" required>
            </div>
            <div class="form-group">
              <label for="attachKey">Attachment Key:</label>
              <input type="text" class="form-control" id="txtAttachKey" v-model="attachKey" required>
            </div>
            <div class="form-group">
              <label for="attachValue">Attachment Value:</label>
              <input type="text" class="form-control" id="txtAttachValue" v-model="attachValue" required>
            </div>
            <div class="center-align">
              <button class="btn btn-default" id="btn-login">Create Beacon</button><br>
              <a href="#"><p id="close-button">Cancel</p></a>
            </div>
        </form>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'createbeacon',
  components: {
  },
  data() {
    return {
      name: '',
      tag: '',
      identifier: '',
      attachKey: '',
      attachValue: ''
    }
  },
  methods: {
    createBeacon() {
      this.$store.dispatch('addBeacon',
      {
        name: this.name,
        tag: this.tag,
        identifier: this.identifier,
        attachment_key: this.attachKey,
        attachment_value: this.attachValue
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './src/assets/css.scss';


</style>