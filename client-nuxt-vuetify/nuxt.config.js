import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ,
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/apollo',

    // 'nuxt-validate', {
    //   lang: 'es',
    //   nuxti18n: {
    //     locale: {
    //       'zh-CN': 'zh_CN'
    //     }
    //   }
    // },
    
   ],
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    theme: {
      primary: colors.blue.darken2,
      accent: colors.grey.darken3,
      secondary: colors.amber.darken3,
      info: colors.teal.lighten1,
      warning: colors.amber.base,
      error: colors.deepOrange.accent4,
      success: colors.green.accent3
    }
  },
  // Give apollo module options
  apollo: {
    tokenName: 'yourApolloTokenName', // optional, default: apollo-token
    cookieAttributes: {
      /**
        * Define when the cookie will be removed. Value can be a Number
        * which will be interpreted as days from time of creation or a
        * Date instance. If omitted, the cookie becomes a session cookie.
        */
      expires: 7, // optional, default: 7 (days)

      /**
        * Define the path where the cookie is available. Defaults to '/'
        */
      path: '/', // optional
      /**
        * Define the domain where the cookie is available. Defaults to
        * the domain of the page where the cookie was created.
        */
      domain: 'example.com', // optional

      /**
        * A Boolean indicating if the cookie transmission requires a
        * secure protocol (https). Defaults to false.
        */
      secure: false,
    },
    includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
    authenticationType: 'Basic', // optional, default: 'Bearer'
    // (Optional) Default 'apollo' definition
    defaultOptions: {
      // See 'apollo' definition
      // For example: default query options
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
      },
    },
    // optional
    errorHandler: '~/plugins/apollo-error-handler.js',
    // required
    clientConfigs: {
      default: {
        // required  
        httpEndpoint: 'http://localhost:4000/graphql',
        // optional
        // See https://www.apollographql.com/docs/link/links/http.html#options
        httpLinkOptions: {
          credentials: 'same-origin'
        },
        // You can use `wss` for secure connection (recommended in production)
        // Use `null` to disable subscriptions
        // wsEndpoint: 'ws://localhost:4000', // optional
        // LocalStorage token
        tokenName: 'apollo-token', // optional
        // Enable Automatic Query persisting with Apollo Engine
        persisting: false, // Optional
        // Use websockets for everything (no HTTP)
        // You need to pass a `wsEndpoint` for this to work
        websocketsOnly: false // Optional
      },
      // test: {
      //   httpEndpoint: 'http://localhost:4000/graphql',
      //   wsEndpoint: 'http://localhost:4000/graphql',
      //   tokenName: 'apollo-token'
      // },
      // alternative: user path to config which returns exact same config options
      // test2: '~/plugins/my-alternative-apollo-config.js'
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
