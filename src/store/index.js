import Vue from 'vue'
import Vuex from 'vuex'
import countries from './modules/countries'
import gameLogic from "./modules/gameLogic";
import appStatus from "./modules/appStatus";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {
  },
  actions: {
  },
  modules: {
    countries, gameLogic, appStatus
  }
})
