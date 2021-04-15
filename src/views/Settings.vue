<template>
    <div class="settings">
        <Gamemode v-on:gamemode="setGamemode"/>
        <FlagGuesserSettings v-if="gamemode == 'flagGuesser'"></FlagGuesserSettings>
        <CountryPickerSettings v-if="gamemode == 'countryPicker'"></CountryPickerSettings>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Gamemode from "../components/Gamemode";
    import FlagGuesserSettings from "../components/FlagGuesserSettings";
    import CountryPickerSettings from "../components/CountryPickerSettings";

    export default {
        name: 'Settings',
        components: {
            Gamemode,
            FlagGuesserSettings,
            CountryPickerSettings
        },
        data () {
            return {
                gamemode: "countryPicker"
            }
        },
        methods: {
            setGamemode (gamemode) {
                this.$store.dispatch('changeGamemode', gamemode);
                this.gamemode = gamemode;

            }
        }
    }
</script>
