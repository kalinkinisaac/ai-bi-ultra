// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  devServer: {
    port: 8081,
  },
  runtimeConfig: {
    public: {
      // apiUrl: "http://app:80",
    },
  },
  // routeRules: {
  //   '/api/v1/**': {
  //     cors: true,
  //     headers: {
  //       'access-control-allow-methods': 'GET',
  //     },
  //     proxy: 'http://localhost:80/api/v1/**',
  //   },
  // },
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "nuxt-lucide-icons",
    "nuxt-shiki",
  ],
  // routeRules: {
  //   '/api/**': { proxy: '/api/v2/**' },
  // },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  colorMode: {
    classSuffix: "",
  },
  lucide: {
    namePrefix: "Icon",
  },
  shiki: {
    defaultLang: "sql",
    highlightOptions: {
      lang: "sql",
    },
  },
});
