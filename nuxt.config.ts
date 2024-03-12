// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: true,

        timeline: {
            enabled: true
        }
    },
    modules: [
        '@nuxt/ui',
        '@nuxtjs/supabase',
        '@nuxtjs/eslint-module'
    ],
    supabase: {
        redirect: true,
    },
    typescript: {
        strict: true,
    },
});
