<template>
    <div>
      <h2>Options Country Picker</h2>
        <h3>Nombre de pays</h3>
        <input type="radio" id="15country" name="nbrCountry" value="15" v-model="settings.gamelength">
        <label for="15country">15</label>
        <input type="radio" id="30country" name="nbrCountry" value="30" v-model="settings.gamelength">
        <label for="30country">30</label>
        <input type="radio" id="45country" name="nbrCountry" value="45" v-model="settings.gamelength">
        <label for="45country">45</label>
        <input type="radio" id="allCountry" name="nbrCountry" value="all" v-model="settings.gamelength">
        <label for="allCountry">tous</label>

        <div>
            <h3>Région(s)</h3>
            <input type="checkbox" id="Europe" name="Europe" value="Europe" v-model="settings.regions.Europe">
            <label for="Europe"> Europe</label>
            <input type="checkbox" id="Africa" name="Africa" value="Africa" v-model="settings.regions.Africa">
            <label for="Africa"> Afrique</label>
            <input type="checkbox" id="Americas" name="Americas" value="Americas" v-model="settings.regions.Americas">
            <label for="Americas"> Amériques</label>
            <input type="checkbox" id="Asia" name="Asia" value="Asia" v-model="settings.regions.Asia">
            <label for="Asia"> Asie</label>
            <input type="checkbox" id="Oceania" name="Oceania" value="Oceania" v-model="settings.regions.Oceania">
            <label for="Oceania"> Océanie</label><br>
        </div>

        <div class="h2 mb-0" v-b-toggle="'extras'"><h3>Autres options <b-icon-arrow-bar-down></b-icon-arrow-bar-down></h3></div>
        <b-collapse id="extras">
        <div>
            <input type="checkbox" id="streetview" name="streetview" value="streetview" v-model="settings.streetview">
            <label for="streetview"> Uniquement les pays StreetView</label><br>
        </div>

        <div>
            <input type="checkbox" id="flags" name="flags" value="flags" v-model="settings.flags">
            <label for="flags"> Afficher les drapeaux</label><br>
        </div>

        <div>
            <input type="checkbox" id="flagOnly" name="flagOnly" value="flagOnly" v-model="settings.flagOnly">
            <label for="flagOnly"> Only flags</label><br>
        </div>

        <div>
            <input type="checkbox" id="grey" name="grey" value="grey" v-model="settings.grey">
            <label for="grey"> Grey excluded countries</label><br>
        </div>

        <div>
            <input type="checkbox" id="skip" name="skip" value="skip" v-model="settings.skip">
            <label for="skip"> Passer au suivant avec une mauvaise réponse</label><br>
        </div>

        <div>
            <input type="checkbox" id="redoWrong" name="redoWrong" value="redoWrong" v-model="settings.redoWrong">
            <label for="redoWrong"> Refaire les pays faux</label><br>
        </div>

        <div>
            <input type="checkbox" id="smallCountry" name="smallCountry" value="smallCountry" v-model="settings.smallCountries">
            <label for="smallCountry"> Inclure les petits pays</label><br>
        </div>
        </b-collapse>
        <button v-on:click="startGame">Jouer</button>
    </div>
</template>

<script>
export default {
  name: 'CountryPickerSettings',
  data: function () {
    return {
        settings: {
            gamelength: 15,
            streetview:false,
            flags: false,
            flagOnly: false,
            skip: false,
            redoWrong: false,
            smallCountries: false,
            regions:{
                Europe:false,
                Africa:false,
                Americas:false,
                Asia:false,
                Oceania:false
            }
        }
    }
  },
  methods: {
      startGame: function () {
          let settings = {};
          settings.gamelength = this.settings.gamelength;
          settings.streetview = this.settings.streetview;
          settings.flags = this.settings.flags;
          settings.skip = this.settings.skip;
          settings.redoWrong = this.settings.redoWrong;
          settings.smallCountries = this.settings.smallCountries;
          settings.regions = [];
          Object.entries(this.settings.regions).forEach(entry => {
              const [key, value] = entry;
              if(value){ settings.regions.push(key) }
          });
          this.$store.dispatch('startGame', settings);
          this.$router.push('Game')
      }
  },
    mounted() {
      let settings = this.$store.getters.getGameSettings;
        this.settings.gamelength = settings.gamelength;
        this.settings.streetview = settings.streetview;
        this.settings.flags = settings.flags;
        this.settings.skip = settings.skip;
        this.settings.redoWrong = settings.redoWrong;
        this.settings.smallCountries = settings.smallCountries;

        let tempRegion = {};
        Object.values(settings.regions).forEach(region => tempRegion[region] = true)
        if(!tempRegion.Asia){tempRegion.Asia = false}
        if(!tempRegion.Europe){tempRegion.Europe = false}
        if(!tempRegion.Africa){tempRegion.Africa = false}
        if(!tempRegion.Oceania){tempRegion.Oceania = false}
        if(!tempRegion.Americas){tempRegion.Americas = false}
        this.settings.regions = tempRegion;
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
