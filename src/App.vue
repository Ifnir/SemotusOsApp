<template>
  <div id="app"> 
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
<div>
  <ul id="slide-out" class="sidenav sidenav-fixed">
    <li>
      <div class="user-view">
        <div class="background">
          <img src="https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260">
        </div>
          <a href="#user"><img class="circle" src="https://media.licdn.com/dms/image/C5603AQEmOVuegzAu3Q/profile-displayphoto-shrink_200_200/0?e=1561593600&v=beta&t=T6q2L8YYlR75iQSc2S6LiTK5ItDH9392ETbE_DNGjZE"></a>
          <a href="#name"><span class="white-text name">Asger Riisbøl</span></a>
          <a href="#email"><span class="white-text email">armc@gmail.com</span></a>
    </div>
    </li>
      <li><a href="#!"><i class="fas fa-camera"></i>First Link With Icon</a></li>
      <li><a href="#!">Second Link</a></li>
      <li><div class="divider"></div></li>
      <li><a class="subheader">Subheader</a></li>
      <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
  </ul>
</div>
  <div class="wrapper">
        <div class="container">
          <h2>Test</h2>
        </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
 require('./renderer.js')
export default {
  
}
</script>


<style lang="scss" scoped>
@import './src/assets/css.scss';

.wrapper {
    padding-left: 300px;
}
</style>
