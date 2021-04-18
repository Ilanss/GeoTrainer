<template>
    <div>
      <h2>Options Country Picker</h2>
        <h3>Nombre de pays</h3>
        <v-slider name="gamelength" step="5" thumb-label="always" v-model="settings.gamelength" min="10" :max="settings.countryCount"></v-slider>

        <h3>Région(s)</h3>
        <v-layout row wrap class="justify-center">
            <v-checkbox type="checkbox" label="Europe" id="Europe" name="Europe" v-model="settings.regions.Europe" v-on:change="countryCount"></v-checkbox>
            <v-checkbox type="checkbox" label="Afrique" id="Africa" name="Africa" v-model="settings.regions.Africa" v-on:change="countryCount"></v-checkbox>
            <v-checkbox type="checkbox" label="Amériques" id="Americas" name="Americas" v-model="settings.regions.Americas" v-on:change="countryCount"></v-checkbox>
            <v-checkbox type="checkbox" label="Asie" id="Asia" name="Asia" v-model="settings.regions.Asia" v-on:change="countryCount"></v-checkbox>
            <v-checkbox type="checkbox" label="Océanie" id="Oceania" name="Oceania" v-model="settings.regions.Oceania" v-on:change="countryCount"></v-checkbox>
        </v-layout>

        <h3>Mode des pays</h3>
        <v-layout class="justify-center">
            <v-radio-group v-model="settings.titleMode" row>
                <v-radio label="Noms" value="Names"></v-radio>
                <v-radio label="Drapeaux" value="Flags"></v-radio>
                <v-radio label="Noms + Drapeaux" value="NamesFlags"></v-radio>
            </v-radio-group>
        </v-layout>

        <v-expansion-panels>
            <v-expansion-panel><v-expansion-panel-header>
                Autres options
            </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-checkbox type="checkbox" id="streetview" label="Uniquement les pays StreetView" name="streetview" v-model="settings.streetview" v-on:change="countryCount"></v-checkbox>
                    <v-checkbox type="checkbox" id="grey" label="Griser les pays exclus" name="grey" v-model="settings.grey"></v-checkbox>
                    <v-checkbox type="checkbox" id="skip" label="Passer au suivant avec une mauvaise réponse" name="skip" v-model="settings.skip"></v-checkbox>
                    <v-checkbox type="checkbox" id="redoWrong" label="Refaire les pays faux" name="redoWrong" v-model="settings.redoWrong"></v-checkbox>
                    <v-checkbox type="checkbox" id="smallCountry" label="Inclure les petits pays" name="smallCountry" v-model="settings.smallCountries" v-on:change="countryCount"></v-checkbox>
                </v-expansion-panel-content></v-expansion-panel>
        </v-expansion-panels>
        <!--<div class="h2" v-b-toggle="'extras'"><h3>Autres options <b-icon-chevron-down width="16" height="16"></b-icon-chevron-down></h3></div>-->
        <!--<b-collapse id="extras">-->
        <!--</b-collapse>-->
        <v-btn v-on:click="startGame" color="primary">Jouer</v-btn>
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
            titleMode: "Names",
            skip: false,
            redoWrong: false,
            smallCountries: false,
            countryCount:20,
            grey: false,
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
          switch (this.settings.titleMode) {
              case "Names":
                  settings.flags = false;
                  settings.names = true;
                  break;
              case "Flags":
                  settings.flags = true;
                  settings.names = false;
                  break;
              case "NamesFlags":
                  settings.flags = true;
                  settings.names = true;
                  break;
              default:
                  settings.flags = true;
                  settings.names = true;
                  break;
          }
          settings.skip = this.settings.skip;
          settings.redoWrong = this.settings.redoWrong;
          settings.grey = this.settings.grey;
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
a {
  color: #42b983;
}
</style>
