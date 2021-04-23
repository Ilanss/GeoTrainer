export default {
    state:{
        gametype:"countryPicker",
        titleMode:"countryName",
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
        grey: false,
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
        },

        SET_NAMES(state, names) {
            state.names = names;
        },

        SET_GREY(state, grey) {
            state.grey = grey;
        },

        SET_TITLEMODE(state, titleMode) {
            state.titleMode = titleMode;
        },

    },

    actions: {
        pickCountries ({commit, rootGetters, state, dispatch}) {
            let countriesList = rootGetters.countryFiltered(state.region, state.streetviewOnly, state.smallCountries);
            let length = countriesList.length-1;

            dispatch('setExcludeList', countriesList);

            //console.log(countriesList)
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

            console.log("ids", countriesIds);
            console.log("picked", countryNames);
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
            commit('SET_EXCLUDEDLIST', found.map(x => x.alpha2Code));
        },

        changeGamemode ({commit}, gamemode) {
            commit('SET_GAMETYPE', gamemode)
        },

        setSetting ({commit}, setting, value) {
            let settingToSet;
            switch (setting) {
                case "gamelength":
                    settingToSet = "SET_GAMELENGTH";
                    break;
                case "streetview":
                    settingToSet = "SET_STREETVIEW";
                    break;
                case "flags":
                    settingToSet = "SET_FLAG";
                    break;
                case "skip":
                    settingToSet = "SET_SKIP";
                    break;
                case "redoWrong":
                    settingToSet = "SET_REDOWRONG";
                    break;
                case "smallCountries":
                    settingToSet = "SET_SMALLCOUNTRIES";
                    break;
                case "capital":
                    settingToSet = "SET_CAPITAL";
                    break;
                case "regions":
                    settingToSet = "SET_REGIONS";
                    break;
                case "tldn":
                    settingToSet = "SET_TLDN";
                    break;
                default:
                    break;
            }
            commit(settingToSet, value);
        },

        startGame ({commit}, settings) {
            commit('SET_GAMELENGTH', settings.gamelength);
            commit('SET_FLAG', settings.flags);
            commit('SET_NAMES', settings.names);
            commit('SET_STREETVIEW', settings.streetview);
            commit('SET_REDOWRONG', settings.redoWrong);
            commit('SET_SMALLCOUNTRIES', settings.smallCountries);
            commit('SET_SKIP', settings.skip);
            commit('SET_REGIONS', settings.regions);
            commit('SET_TITLEMODE', settings.titleMode);
            commit('SET_GREY', settings.grey);
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
            settings.names = state.names;
            settings.skip = state.skip;
            settings.titleMode = state.titleMode;
            settings.redoWrong = state.redoWrong;
            settings.smallCountries = state.smallCountries;
            settings.regions = state.region;
            settings.grey = state.grey;
            settings.excludedList = state.excludedList;

            return settings;
        },
    }
}
