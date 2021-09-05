//store/index.js
// export const actions = {
//     async nuxtServerInit({ dispatch  }) {
//         // Call api to get init data from server

//         if (this.$auth.loggedIn) {
//             let data;
//             await this.$axios.$get("/menu/all").then(function (response) {
//                 data = response;
//             });

//             await dispatch('application/SET_APPLICATION_MENU', data);
//         }
//     },
// };