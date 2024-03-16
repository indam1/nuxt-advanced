// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    nitro: {
        experimental: {
            websocket: true,
        },
    },
    colorMode: {
        preference: 'light',
    },
    devtools: {
        enabled: true,

        timeline: {
            enabled: true
        }
    },
    runtimeConfig: {
        public: {
            baseUrl: process.env.BASE_URL,
            reviewApiUrl: process.env.REVIEW_API_URL,
        }
    },
    modules: [
        '@nuxt/ui',
        '@nuxtjs/supabase',
        '@nuxtjs/eslint-module',
        '@vueuse/nuxt',
    ],
    supabase: {
        redirectOptions: {
            callback: '/auth/confirm',
            login: '/auth/login',
            include: ['/mybank(/*)?', '/settings(/*)?'],
        }
    },
    typescript: {
        strict: true,
    },
});
