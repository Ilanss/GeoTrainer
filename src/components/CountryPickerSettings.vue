<template>
    <div>
      <h2>Options Country Picker</h2>
        <h3>Nombre de pays</h3>
        <b-form-input name="gamelength" type="range" v-model="settings.gamelength" min="10" :max="settings.countryCount"></b-form-input>

        <div>
            <h3>Région(s)</h3>
            <input type="checkbox" id="Europe" name="Europe" value="Europe" v-model="settings.regions.Europe" v-on:change="countryCount">
            <label for="Europe"> Europe</label>
            <input type="checkbox" id="Africa" name="Africa" value="Africa" v-model="settings.regions.Africa" v-on:change="countryCount">
            <label for="Africa"> Afrique</label>
            <input type="checkbox" id="Americas" name="Americas" value="Americas" v-model="settings.regions.Americas" v-on:change="countryCount">
            <label for="Americas"> Amériques</label>
            <input type="checkbox" id="Asia" name="Asia" value="Asia" v-model="settings.regions.Asia" v-on:change="countryCount">
            <label for="Asia"> Asie</label>
            <input type="checkbox" id="Oceania" name="Oceania" value="Oceania" v-model="settings.regions.Oceania" v-on:change="countryCount">
            <label for="Oceania"> Océanie</label><br>
        </div>

        <div class="h2" v-b-toggle="'extras'"><h3>Autres options <b-icon-chevron-down width="16" height="16"></b-icon-chevron-down></h3></div>
        <b-collapse id="extras">
        <div>
            <input type="checkbox" id="streetview" name="streetview" value="streetview" v-model="settings.streetview" v-on:change="countryCount">
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
            <input type="checkbox" id="smallCountry" name="smallCountry" value="smallCountry" v-model="settings.smallCountries" v-on:change="countryCount">
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
            countryCount:20,
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
          settings.regions = this.prepareRegion();
          /*settings.regions = [];
          Object.entries(this.settings.regions).forEach(entry => {
              const [key, value] = entry;
              if(value){ settings.regions.push(key) }
          });*/
          this.$store.dispatch('startGame', settings);
          this.$router.push('Game')
      },
      countryCount: function () {
          this.settings.countryCount = this.$store.getters.countryFiltered(this.prepareRegion(), this.settings.streetview, this.settings.smallCountries).length;
          (this.settings.gamelength > this.settings.countryCount) ? this.settings.gamelength = this.settings.countryCount : null;
      },
      prepareRegion: function () {
          let regions = [];
          Object.entries(this.settings.regions).forEach(entry => {
              const [key, value] = entry;
              if(value){ regions.push(key) }
          });
          return regions;
      },
      sendSetting: function (setting, value) {
          this.$store.dispatch('setSetting', setting, value)
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
        this.countryCount();
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
