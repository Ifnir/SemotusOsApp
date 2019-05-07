<template>
    <div class="nav">
        <ul id="slide-out" class="sidenav sidenav-fixed">
            <li>
            <div class="user-view">
                <div class="background">
                <img src="https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260">
                </div>
                <a href="#user"><img class="circle" src="https://media.licdn.com/dms/image/C5603AQEmOVuegzAu3Q/profile-displayphoto-shrink_200_200/0?e=1561593600&v=beta&t=T6q2L8YYlR75iQSc2S6LiTK5ItDH9392ETbE_DNGjZE"></a>
                <a href="#name"><span class="white-text name">Asger Riisbøl</span></a>
                <a href="#email"><span class="white-text email">armc@gmail.com</span></a>
                <router-link to="/logout" class="logout"><span class="white-text"><i class="fas fa-sign-out-alt"></i>Logout</span></router-link>
            </div>
            </li>
            <li><router-link to="/"><i class="fas fa-camera"></i>Home</router-link></li>
            <li><router-link to="/elder">Elder</router-link></li>
            <li><router-link to="/beacon">Beacon</router-link></li>
            <li><router-link to="/check">Check</router-link></li>
            <li><div class="divider"></div></li>
            <li><a class="subheader">Subheader</a></li>
            <li><a class="waves-effect" href="#!">Third Link With Waves</a></li>
        </ul>
    </div> 
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>

</style>
