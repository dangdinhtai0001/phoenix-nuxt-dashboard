//store/index.js
export const actions = {
    async nuxtServerInit({ commit }) {
        // Call api to get init data from server

        if (this.$auth.loggedIn) {
            let data;
            await this.$axios.$get("/menu/all").then(function (response) {
                data = response;
            });

            commit('application/SET_APPLICATION_MENU', data);
        }
    },
};