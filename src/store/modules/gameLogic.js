export default {
    state:{
        gametype:"countryPicker",
        streakLength:0,
        gameLength:15,
        countriesList:[],
        failedCountries:[],
        excludedList:[],
        points:0,
        flag:true,
        streetviewOnly:true,
        redoWrong:false,
        region: ['Asia', 'Europe', 'Americas', 'Oceania'],
        smallCountries: false,
        skip: false,
    },
    mutations: {
        SET_STREAKLENGTH(state, length) {
            state.streakLength = length;
        },

        SET_COUNTRIESLIST(state, countryList) {
            state.countriesList = countryList;
        },

        SET_GAMETYPE(state, gamemode) {
            state.gametype = gamemode;
        },

        SET_GAMELENGTH(state, gameLength) {
            state.gameLength = gameLength;
        },

        SET_FLAG(state, flag) {
            state.flag = flag;
        },

        SET_STREETVIEW(state, streetview) {
            state.streetviewOnly = streetview;
        },

        SET_REDOWRONG(state, redoWrong) {
            state.redoWrong = redoWrong;
        },

        SET_SMALLCOUNTRIES(state, smallCountries) {
            state.smallCountries = smallCountries;
        },

        SET_REGIONS(state, region) {
            state.region = region;
        },

        SET_SKIP(state, skip) {
            state.skip = skip;
        },

        SET_EXCLUDEDLIST(state, excludedList) {
            state.excludedList = excludedList;
        }

    },
    actions: {
        pickCountries ({commit, rootGetters, state, dispatch}) {
            console.log(state.streetviewOnly)
            let countriesList = rootGetters.countryFiltered(state.region, state.streetviewOnly, state.smallCountries);
            let length = countriesList.length;

            dispatch('setExcludeList', countriesList);

            let i = 0;
            let countryPicked;
            let countriesIds = [];
            do {
                countryPicked = Math.round(Math.random() * length);
                if(countriesIds.includes(countryPicked) == false) {
                    countriesIds.push(countryPicked);
                    i++
                }
            } while (i != state.gameLength);

            let countryNames = [];

            countriesIds.forEach(countryId => countryNames.push(countriesList[countryId]));

            commit('SET_COUNTRIESLIST', countryNames);
        },

        setExcludeList ({rootGetters, commit}, countryPicked) {
            let list = rootGetters.allCountriesNames();
            //list = list.filter(country => country.alpha2Code != countryPicked.alpha2Code);

            var entry;
            var found = [];
            var exclude = false;
            for (var i = 0; i < list.length; i++) {
                entry = list[i];
                for (var y = 0; y < countryPicked.length; y++) {
                    if(list[i].alpha2Code == countryPicked[y].alpha2Code) {
                        exclude = true;
                    }
                }
                (!exclude) ? found.push(entry) : exclude = false;
            }

            console.log("picked",found)
            commit('SET_EXCLUDEDLIST', found.map(x => x.alpha2Code));
        },

        changeGamemode ({commit}, gamemode) {
            commit('SET_GAMETYPE', gamemode)
        },

        startGame ({commit}, settings) {
            commit('SET_GAMELENGTH', settings.gamelength);
            commit('SET_FLAG', settings.flags);
            commit('SET_STREETVIEW', settings.streetview);
            commit('SET_REDOWRONG', settings.redoWrong);
            commit('SET_SMALLCOUNTRIES', settings.smallCountries);
            commit('SET_REGIONS', settings.regions);
            commit('SET_SKIP', settings.skip);
        }

    },
    modules: {
    },
    getters: {
        countriesList: state => {
            return state.countriesList;
        },

        getGameSettings: state => {
            let settings = {};
            settings.gamelength = state.gameLength;
            settings.streetview = state.streetviewOnly;
            settings.flags = state.flag;
            settings.skip = state.skip;
            settings.redoWrong = state.redoWrong;
            settings.smallCountries = state.smallCountries;
            settings.regions = state.region;
            settings.excludedList = state.excludedList;

            return settings;
        }
    }
}
