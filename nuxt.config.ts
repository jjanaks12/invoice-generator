// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    "nuxt-lazy-hydrate",
    '@vue-email/nuxt'
  ],

  runtimeConfig: {
    public: {
      appName: process.env.NUXT_APP_NAME || 'app',
    },

    mail: {
      host: process.env.NUXT_MAIL_HOST || '',
      port: process.env.NUXT_MAIL_PORT || '',
      user: process.env.NUXT_MAIL_USER || '',
      password: process.env.NUXT_MAIL_PASSWORD || ''
    }
  },

  vueEmail: {
    autoImport: true
  }
})
