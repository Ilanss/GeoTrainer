<template>
    <div id="game">
        <p>{{current + 1}}/{{country.length}}</p>
        <h2>{{country[current].countryName}} <img v-if="flag" id="flag" v-bind:src="country[current].flag" alt=""></h2>
        <div>
            <b-modal id="endgame" ref="endgame" title="Bravo!">

                <template>
                    <p>Tu es arrivé un bout du quiz avec un score de {{score}} !</p>
                </template>

                <template #modal-footer="{ ok }">
                    <!-- Emulate built in modal footer ok and cancel button actions -->
                    <router-link to="/settings"><b-button variant="secondary" @click="cancel()">
                        Options
                    </b-button></router-link>
                    <b-button variant="primary" @click="newgame(), ok()">
                        Rejouer
                    </b-button>
                </template>



                <p class="my-4"></p>
            </b-modal>
        </div>
        <Map />
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
                redoWrong: true,
                score: 0,
                skip: false,
                grey: true,
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
                let current = this.current;
                if(event.path[0].id == this.country[current].alpha2Code){
                    event.path[0].classList.add("true");
                    document.querySelectorAll('.wrong').forEach(item => item.classList.remove('wrong'));
                    this.current++;
                    this.score++;
                    if(current +1 >= this.country.length){
                        if(this.redoWrong && this.countryFailed.length > 0){
                            this.country = this.countryFailed;
                            this.current = 0;
                            document.querySelectorAll('.true').forEach(item => item.classList.remove('true'));
                            this.countryFailed = [];
                        }
                        else {
                            this.endgame();
                        }
                    }
                }
                else{
                    console.log(Object.values(this.countryFailed))
                    if(this.countryFailed.filter(x => x.countryName == this.country[this.current].countryName).length > 0){
                        console.log("Already in failed list")
                    }
                    else {
                        this.countryFailed.push(this.country[this.current]);
                        this.score--;
                    }
                    event.path[0].classList.add("wrong");
                }
            },

            endgame: function() {
                this.$refs['endgame'].show()
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
            console.log(settings.excludedList)
            settings.excludedList.forEach(x => document.getElementById(x).classList.add("grey"))
            this.flag = settings.flags;
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
        height: 25px;
    }
</style>