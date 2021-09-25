import vuetify from './config/vuetify.js'
import tailwind from './config/tailwind.js'

import auth from './config/auth.js'
import axios from './config/axios.js'
import toast from './config/toast.js'
import imagemin from './config/imagemin.js'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - phoenix-nuxt-dashboard',
    title: 'phoenix-nuxt-dashboard',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap'
      }
    ]
  },

  //Starting from v2.13, Nuxt can auto import your components when used in your templates. 
  //To activate this feature, set components: true in your configuration:
  components: true,

  /*
   ** Customize the progress bar color
   */
  loading: { color: '#fff' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/global.css',
    '@/assets/tailwind.css',
    '@/assets/ag-grid-theme.css',
    '@/assets/icon.css',
    '@/assets/perfect-scrollbar.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/i18n.js',
    { src: "~/plugins/vuelidate.js", mode: "client" },
    { src: "~/plugins/vuedraggable.js", mode: "client" },
    { src: "~/plugins/ag-grid.js", mode: "client" },
    { src: "~/plugins/vuex-persistedstate.js" },
    { src: "~/plugins/perfect-scrollbar.js", mode: "client" }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    //https://tailwindcss.nuxtjs.org/
    ['@nuxtjs/tailwindcss', { tailwind }],
    //https://www.npmjs.com/package/@nuxtjs/imagemin
    ['@nuxtjs/imagemin', { imagemin }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/guide/setup/
    '@nuxtjs/auth',
    //https://github.com/shakee93/vue-toasted
    '@nuxtjs/toast'
  ],

  toast: toast,
  auth: auth,
  axios: axios,

  router: {
    middleware: ['auth']
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: vuetify,

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
      ],
    },
    extend(config, context) {
      config.resolve.alias['vue'] = 'vue/dist/vue.common'
    }
  }
}
