// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: true,

        timeline: {
            enabled: true
        }
    },
    runtimeConfig: {
        public: {
            baseUrl: process.env.BASE_URL,
        }
    },
    modules: [
        '@nuxt/ui',
        '@nuxtjs/supabase',
        '@nuxtjs/eslint-module',
        '@vueuse/nuxt',
    ],
    supabase: {
        redirect: true,
    },
    typescript: {
        strict: true,
    },
});
