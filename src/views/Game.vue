<template>
    <div id="game">
            <v-row class="justify-center"><p>{{current + 1}}/{{country.length}}</p></v-row>
        <v-row class="justify-center"><h2><span v-if="names">{{country[current].countryName}} </span><img v-if="flag" id="flag" v-bind:src="country[current].flag" alt=""></h2></v-row>
            <Map />
        <v-row justify="center">
            <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="290"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                            color="primary"
                            dark
                            v-bind="attrs"
                            v-on="on"
                    >
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="headline">
                        Bravo !
                    </v-card-title>
                    <v-card-text>
                        Tu es arrivé un bout du quiz avec un score de {{score}} !
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                                color="green darken-1"
                                text
                                @click="dialog = false"
                        >
                            <router-link to="/settings">Options</router-link>
                        </v-btn>
                        <v-btn
                                color="green darken-1"
                                text
                                @click="dialog = false, newgame()"
                        >
                            Rejouer
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Map from '@/components/Map.vue'

    export default {
        name: 'Game',
        components: {
            Map
        },
        data: function () {
            return {
                country: [{"alpha2Code":"XX","countryName":"empty","flag":"none"}],
                excludedList: [],
                current:0,
                countryFailed: [],
                flag: true,
                names: true,
                redoWrong: true,
                score: 0,
                skip: false,
                dialog: false,
            }
        },
        computed: {
            /*countriesRegion () {
                return this.$store.countries.state.countriesRegion();
            }*/
        },
        methods: {
            countryCheck: function (event) {
                if(event.path[0].classList.contains('grey')) {return;}
                if(event.path[0].classList.contains('true')) {return;}

                // Si la réponse est juste

                if(event.path[0].id == this.country[this.current].alpha2Code){
                    event.path[0].classList.add("true");
                    document.querySelectorAll('.wrong').forEach(item => item.classList.remove('wrong'));
                    this.score++;
                    console.log(this.current);
                    console.log(this.country.length);
                    this.current++;
                }

                // Si la réponse est fausse

                else{
                    console.log(Object.values(this.countryFailed))
                    if(this.countryFailed.filter(x => x.countryName == this.country[this.current].countryName).length > 0){
                        console.log("Already in failed list")
                    }
                    else {
                        this.countryFailed.push(this.country[this.current]);
                        this.score--;
                    }

                    if(this.skip) {
                        document.getElementById(this.country[this.current].alpha2Code).classList.add('true');
                        this.current++;
                    }
                    else {
                        event.path[0].classList.add("wrong");
                    }
                }

                // Dans tout les cas test si fin de partie

                if(this.current +1 >= this.country.length){
                    // Si il faut refaire les pays faux et qu'il y en a
                    if(this.redoWrong && this.countryFailed.length > 0){
                        this.country = this.countryFailed;
                        this.current = 0;
                        document.querySelectorAll('.true').forEach(item => item.classList.remove('true'));
                        this.countryFailed = [];

                    }
                    // Sinon fin de partie
                    else {
                        this.endgame();
                    }
                }
            },

            endgame: function() {
                this.dialog = true;
            },

            newgame: function() {
                this.$store.dispatch('pickCountries');
                this.country = this.$store.getters.countriesList;
                this.current = 0;
                this.score = 0;
                document.querySelectorAll('.true').forEach(item => item.classList.remove('true'));
                document.querySelectorAll('.wrong').forEach(item => item.classList.remove('wrong'));

            },

        },
        mounted() {
            this.newgame();
            let settings = this.$store.getters.getGameSettings;
            this.excludedList = settings.excludedList;
            console.log(settings.excludedList);
            if(settings.grey) {
                settings.excludedList.forEach(x => document.getElementById(x).classList.add("grey"));
            }
            this.flag = settings.flags;
            this.names = settings.names;
            this.redoWrong = settings.redoWrong;
            this.skip = settings.skip;
            document.querySelectorAll('.land').forEach(item => item.addEventListener("click", this.countryCheck));
            return this.$store.getters.countriesList;
        }

    }
</script>

<style>
    #game {
        height: 80vh;
        position: relative;
    }
    svg {
        width: 100%;
        height: 100%;
    }
    #flag {
        height: 35px;
    }
</style>