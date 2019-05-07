<template>
      <header id="titlebar">
      <div id="drag-region">
        <div id="window-title">
          <span>Electron quick start</span>
        </div>  
        <div id="window-controls">
          <div class="button" id="min-button">
            <span>&#xE921;</span>
          </div>
          <div class="button" id="max-button">
            <span>&#xE922;</span>
          </div>
          <div class="button" id="restore-button">
            <span>&#xE923;</span>
          </div>
          <div class="button" id="close-button">
            <span>&#xE8BB;</span>
          </div>
        </div>
      </div>
    </header>
</template>
<script>
require('./../renderer.js')
export default {

}
</script>
<style lang="scss">
@import './src/assets/css.scss';


</style>

