<template>
    <div>
      <h1>Mode de jeu</h1>
        <v-layout class="justify-center">
            <v-radio-group v-model="gamemode" row>
                <v-radio label="Country Picker" id="countryPicker" value="countryPicker" v-on:click="$emit('gamemode','countryPicker')"></v-radio>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on">
                            <v-radio label="Flag Guesser" id="flagGuesser" value="flagGuesser" v-on:click="$emit('gamemode','flagGuesser')" disabled></v-radio>
                        </span>
                    </template>
                    <span>Coming soon</span>
                </v-tooltip>
            </v-radio-group>
        </v-layout>
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
