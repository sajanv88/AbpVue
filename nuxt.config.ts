// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    openiddict: {
        issuer: process.env.NUXT_AUTHORITY_URL,
        clientId: process.env.NUXT_CLIENT_ID,
        clientSecret: process.env.NUXT_CLIENT_SECRET,
        scope: process.env.NUXT_SCOPE,
        redirectUrl: process.env.NUXT_REDIRECT_URI,
        postLogoutRedirectUrl: process.env.NUXT_POST_LOGOUT_REDIRECT_URI
    },
      sessionSecret: process.env.NUXT_SESSION_SECRET,
      public: {
        baseUrl: process.env.NUXT_ORIGIN,
      }
  },
    tailwindcss: {
        cssPath: './assets/css/tailwind.css',
        configPath: 'tailwind.config',
        exposeConfig: false,
        exposeLevel: 2,
        config: {},
        injectPosition: 'first',
        viewer: true,
        editorSupport: true,
    }
})
