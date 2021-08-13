import Vue from 'vue'
import VueI18n from 'vue-i18n'
import i18n from '~/config/i18n.js'

Vue.use(VueI18n)

export default ({ app, store }) => {
    // Set i18n instance on app
    // This way we can use it in middleware and pages asyncData/fetch
    app.i18n = new VueI18n({
        locale: 'vi',
        fallbackLocale: i18n.vueI18n.fallbackLocale,
        messages: i18n.vueI18n.messages
    })
}
