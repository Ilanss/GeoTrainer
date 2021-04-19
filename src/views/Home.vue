<template>
  <div class="home">
    <TopToolbar></TopToolbar>
    <Welcome msg="Bienvenu sur GeoTrainer !"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from '@/components/Welcome.vue'
import TopToolbar from "../components/TopToolbar";

export default {
  name: 'Home',
  components: {
    Welcome,
    TopToolbar
  }
}
</script>
