// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
import colors from 'vuetify/es5/util/colors';

export default {
    customVariables: ['~/assets/variables.scss'],
    // optionsPath: '~/config/vuetify.options.js',
    theme: {
        dark: true,
        themes: {
            dark: {
                primary: '#CFCFCF',
                secondary: '#0E3793',
                accent: colors.grey.darken3,
                info: colors.teal.lighten1,
                warning: colors.amber.base,
                error: colors.deepOrange.accent4,
                success: colors.green.accent3,
            },
            light: {
                primary: '#FFFFFF',
                accent: colors.grey.darken3,
                secondary: colors.amber.darken3,
                info: colors.teal.lighten1,
                warning: colors.amber.base,
                error: colors.deepOrange.accent4,
                success: colors.green.accent3
            }
        }
    }
}