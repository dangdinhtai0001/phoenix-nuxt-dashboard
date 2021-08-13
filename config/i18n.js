import en from '../lang/en-US.js'
import vi from '../lang/vi-VN.js'

export default {
    locales: [
        {
            code: 'en',
            iso: 'en-US',
            name: 'English'
        },
        {
            code: 'vi',
            iso: 'vi-VN',
            name: 'Vietnam'
        },
    ],
    defaultLocale: 'vi',
    routes: {

    },
    vueI18n: {
        fallbackLocale: 'vi',
        messages: { en, vi }
    }
}