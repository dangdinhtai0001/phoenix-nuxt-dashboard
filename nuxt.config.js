import colors from 'vuetify/es5/util/colors'

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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/tailwind.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    //https://tailwindcss.nuxtjs.org/
    '@nuxtjs/tailwindcss',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/guide/setup/
    '@nuxtjs/auth'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_BASE_URL || " http://localhost:8091/api/v0",
    debug: process.env.DEBUG || false,
    proxyHeaders: false,
    credentials: false
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // https://tailwindcss.nuxtjs.org/options
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    config: {}
  },

  // Auth-next module configuration: https://auth.nuxtjs.org/api/options
  auth: {
    redirect: {
      login: "/login", // User will be redirected to this path if login is required.
      logout: "/login", // User will be redirected to this path if after logout, current route is protected.
      callback: false, //  User will be redirected to this path by the identity provider after login. (Should match configured Allowed Callback URLs (or similar setting) in your app/client with the identity provider)
      home: "/" // User will be redirected to this path after login. (rewriteRedirects will rewrite this path)
    },
    // https://auth.nuxtjs.org/schemes/local
    strategies: {
      customStrategy: {
        _scheme: "~/schemes/CustomScheme",
        token: {
          property: "token.access_token",
          required: true,
          maxAge: 15
        },
        user: {
          property: "user",
          autoFetch: true,
          scope: "scope"
        },
        refreshToken: {
          property: "token.refresh_token",
          data: "refreshToken",
          maxAge: false
        },
        endpoints: {
          login: { url: "/auth/login", method: "post" },
          refresh: { url: "/auth/refresh", method: "post" },
          logout: { url: "/auth/logout", method: "post" },
          user: { url: "auth/profile", method: "get" }
        }
      }
    }
  },

  router: {
    middleware: ['auth']
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
      ],
    },
  }
}
