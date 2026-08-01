export default defineNuxtConfig({
  modules: [
    'vuetify-nuxt-module',
    '@nuxtjs/supabase',
  ],

  vuetify: {
    moduleOptions: {
      // ตั้งค่าเพิ่มเติมตามต้องการ
    },

    vuetifyOptions: {
      icons: {
        defaultSet: 'mdi',
      },
      theme: {
        defaultTheme: 'light',
      },
    },
  },

  supabase: {
    redirect: false,
  },

  runtimeConfig: {
    public: {
      appName: 'AISist',
    },
  },

  devtools: {
    enabled: true,
  },
})