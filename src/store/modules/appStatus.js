export default {
    state:{
        title:"Accueil",
    },
    mutations: {
        SET_TITLE(state, title) {
            state.title = title;
        },

    },
    actions: {
        startGame ({commit}, title) {
            commit('SET_TITLE', title);
        }

    },
    modules: {
    },
    getters: {
        getTitle: state => {
            return state.title;
        },
    }
}
