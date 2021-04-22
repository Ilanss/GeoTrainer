<template>
    <v-container id="game" fluid>
        <v-navigation-drawer
                v-model="drawer"
                absolute
                bottom
                temporary
        >
            <v-list
                    nav
                    dense
            >
                <v-list-item-group>
                    <v-list-item to="/">
                        <v-list-item-title><v-icon>mdi-home</v-icon> Home</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/settings">
                        <v-list-item-title><v-icon>mdi-earth</v-icon> Jouer</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/settings">
                        <v-list-item-title><v-icon>mdi-cog</v-icon> Settings</v-list-item-title>
                    </v-list-item>

                    <v-list-item to="/about">
                        <v-list-item-title><v-icon>mdi-script-text </v-icon> Crédits</v-list-item-title>
                    </v-list-item>

                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                app
                dark
                color="primary"
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title><h2>
                <span v-if="titleMode != 'tldn'">{{country[current][titleMode]}} </span><span v-else>{{country[current][titleMode][0]}} </span>
                <img v-if="flag" id="flag" v-bind:src="country[current].flag" alt="">
            </h2></v-toolbar-title>

            <v-spacer></v-spacer>
                <div id="info">
                    <p>{{current + 1}}/{{country.length}}</p>
                    <p>{{Math.floor(timer/60).toString().padStart(2, '0')}}:{{(Math.floor(timer) % 60).toString().padStart(2, '0')}}</p>
                </div>
        </v-app-bar>

        <Map />


        <v-row justify="center">
            <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="290"
            >
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
    </v-container>
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
                titleMode: "countryName",
                current:0,
                countryFailed: [],
                flag: true,
                redoWrong: true,
                score: 0,
                skip: false,
                timer: 0,
                dialog: false,
                drawer: false,
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
                    this.current++;
                }

                // Si la réponse est fausse

                else{
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
                clearInterval(this.interval);
                this.dialog = true;
            },

            newgame: function() {
                this.$store.dispatch('pickCountries');
                if(this.titleMode == "mix"){
                    this.country = this.$store.getters.countriesList.map(function (x) {
                        let pick = Math.floor(Math.random() * 3);
                        switch(pick){
                            case 0:
                                pick = "countryName";
                                //return {alpha2Code: x.alpha2Code, countryName: x.name};
                                break;
                            case 1:
                                pick = "capital";
                                //return {alpha2Code: x.alpha2Code, countryName: x.capital};
                                break;
                            case 2:
                                pick = "tldn";
                                //return {alpha2Code: x.alpha2Code, countryName: x.tldn};
                                break;
                            default:
                                pick = "countryName";
                                //return {alpha2Code: x.alpha2Code, countryName: x.name};
                                break;
                        }
                        if(pick == "tldn"){
                            return {alpha2Code: x.alpha2Code, countryName: x[pick][0]}
                        }
                        else {
                            return {alpha2Code: x.alpha2Code, countryName: x[pick]}
                        }
                    })
                    this.titleMode = "countryName"
                }
                else {
                    this.country = this.$store.getters.countriesList;
                }
                this.current = 0;
                this.score = 0;
                this.interval = setInterval(() => this.timer++, 1000);
                document.querySelectorAll('.true').forEach(item => item.classList.remove('true'));
                document.querySelectorAll('.wrong').forEach(item => item.classList.remove('wrong'));

            },

        },
        mounted() {
            let settings = this.$store.getters.getGameSettings;
            this.excludedList = settings.excludedList;
            if(settings.grey) {
                settings.excludedList.forEach(x => document.getElementById(x).classList.add("grey"));
            }
            this.flag = settings.flags;
            this.titleMode = settings.titleMode;
            this.redoWrong = settings.redoWrong;
            this.skip = settings.skip;
            this.newgame();
            document.querySelectorAll('.land').forEach(item => item.addEventListener("click", this.countryCheck));
            return this.$store.getters.countriesList;
        }

    }
</script>

<style>
    #game {
        height: 89vh;
        margin-top: 0px;
        padding: 0;
        position: relative;
    }
    svg {
        width: 100%;
        height: 100%;
    }
    #flag {
        height: 35px;
    }
    #info>p {
        margin-bottom: 0;
    }
</style>