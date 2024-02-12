// https://nuxt.com/docs/api/configuration/nuxt-config
// import type { NuxtPage } from "@nuxt/schema";

export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/eslint-module", "@pinia/nuxt"],
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
        class: "dark",
      },
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js",
        },
      ],
    },
  },
  // hooks: {
  //   "pages:extend"(pages) {
  //     function setMiddleware(pages: NuxtPage[]) {
  //       for (const page of pages) {
  //         console.log(page, "page");
  //         if (page.path.includes("/admin/")) {
  //           page.meta ||= {};
  //           page.meta.middleware = ["auth"];
  //         }
  //         if (page.children) {
  //           setMiddleware(page.children);
  //         }
  //       }
  //     }
  //     setMiddleware(pages);
  //   },
  // },
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
  tailwindcss: {
    cssPath: ["./assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: true,
    editorSupport: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  eslint: {},
});
