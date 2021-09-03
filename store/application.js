export const state = () => ({
    locales: ['en', 'vi'],
    locale: 'vi',
    applicationMenu: []
})

export const mutations = {
    SET_LANG(state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
            state.locale = locale
        }
    },

    SET_APPLICATION_MENU(state, menu) {
        state.applicationMenu = menu;
    }
}