// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  modules: ['@nuxt/ui', '@nuxtjs/supabase'],
  supabase: {
    redirect: false,
  },
  typescript: {
    strict: true,
  }
})