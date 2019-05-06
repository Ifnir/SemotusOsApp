<template>
    <div class="logout">
        
    </div>
</template>
<script>
export default {
    created() {
        this.$store.dispatch('destroyToken')
        .then(response => {
            console.log(response)
        })
    }
}
</script>
