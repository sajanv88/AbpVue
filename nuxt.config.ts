// https://nuxt.com/docs/api/configuration/nuxt-config
// import type { NuxtPage } from "@nuxt/schema";

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/eslint-module",
    "@pinia/nuxt",
    "shadcn-nuxt",
  ],
  shadcn: {
    prefix: "",
    componentDir: "./abp/ui",
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  devServer: {
    https: {
      key: "cert.key",
      cert: "ca.pem",
    },
  },
  runtimeConfig: {
    openiddict: {
      issuer: process.env.NUXT_AUTHORITY_URL,
      clientId: process.env.NUXT_CLIENT_ID,
      clientSecret: process.env.NUXT_CLIENT_SECRET,
      scope: process.env.NUXT_SCOPE,
      redirectUrl: process.env.NUXT_REDIRECT_URI,
      postLogoutRedirectUrl: process.env.NUXT_POST_LOGOUT_REDIRECT_URI,
    },
    sessionSecret: process.env.NUXT_SESSION_SECRET,
    abpApiEndpoint: process.env.NUXT_ABP_API_ENDPOINT,
    public: {
      baseUrl: process.env.NUXT_ORIGIN,
    },
  },
});
