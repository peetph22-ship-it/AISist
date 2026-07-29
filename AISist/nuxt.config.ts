export default defineNuxtConfig({
  modules: [
    'vuetify-nuxt-module'
  ],
  vuetify: {
    moduleOptions: {
      // ตั้งค่าเพิ่มเติมตามต้องการ
    },
    vuetifyOptions: {
      icons: {
        defaultSet: 'mdi',
      }
    }
  },
  // หากใช้ Axios สามารถสร้าง instance แยก หรือเรียกใช้งานได้ทันที
})