// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'nuxt-lazy-hydrate',
    '@vue-email/nuxt',
    '@sidebase/nuxt-auth',
    'nuxt-nodemailer'
  ],

  css: ['@/assets/scss/main.scss'],

  auth: {
    isEnabled: true,
    provider: {
      type: 'authjs'
    },
    globalAppMiddleware: false
  },

  runtimeConfig: {
    authOrigin: '',
    authSecret: '',

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
  },

  nodemailer: {
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "3fa264f060e76a",
      pass: '69a40db965f234'
    }
  }
})
