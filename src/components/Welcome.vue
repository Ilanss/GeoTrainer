<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Si tu veux t'entrainer à reconnaitre les drapeaux de pays et apprendre à les placer sur la carte tu es au bon endroit.
    </p>
    <router-link to="/settings"><v-btn color="primary">Jouer</v-btn></router-link>

    <h3>Mode de jeu disponible</h3>
    <ul>
      <li>Quiz drapeau</li>
      <li>Placement de pays</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  padding: 0;
  list-style-type: none;
}
li {
  margin: 0 10px;
}
</style>
