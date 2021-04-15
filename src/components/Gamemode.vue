<template>
    <div>
      <h2>Mode de jeu</h2>
      <input type="radio" id="countryPicker" name="drone" value="countryPicker" v-model="gamemode" v-on:click="$emit('gamemode','countryPicker')">
      <label for="countryPicker">Country Picker</label>
      <input type="radio" id="flagGuesser" name="drone" value="flagGuesser" v-model="gamemode" v-on:click="$emit('gamemode','flagGuesser')">
      <label for="flagGuesser">Flag Guesser</label>
    </div>
</template>

<script>
export default {
  name: 'Gamemode',
  data: function () {
    return {
      gamemode: "countryPicker"
    }
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
a {
  color: #42b983;
}
</style>
