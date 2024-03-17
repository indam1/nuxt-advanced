export default defineNuxtConfig({
    // ToDo fix breaking layout link
    // app: {
    //     pageTransition: { name: 'page', mode: 'out-in' },
    // },
    nitro: {
        experimental: {
            websocket: true,
        },
        prerender: {
            routes: [
                '/feed.xml',
            ],
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
    future: {
        typescriptBundlerResolution: true
    },
    runtimeConfig: {
        public: {
            baseUrl: process.env.BASE_URL,
            reviewApiUrl: process.env.REVIEW_API_URL,
        }
    },
    modules: [
        ['@nuxtjs/eslint-module', { fix: true}],
        '@nuxtjs/supabase',
        '@nuxtjs/sitemap',
        '@vueuse/nuxt',
        '@nuxt/content',
        '@nuxt/ui',
    ],
    content: {
        documentDriven: true,
        highlight: {
            theme: {
                default: 'min-light',
                dark: 'min-light',
                light: 'min-light',
            },
        },
    },
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
