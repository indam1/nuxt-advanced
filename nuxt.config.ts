export default defineNuxtConfig({
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            htmlAttrs: {
                lang: 'en',
            }
        }
    },
    pages: true,
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
    runtimeConfig: {
        public: {
            baseUrl: process.env.BASE_URL,
            reviewApiUrl: process.env.REVIEW_API_URL,
            sentry: {
                dsn: process.env.SENTRY_DSN,
                environment: 'development',
            },
        }
    },
    modules: [
        ['@nuxtjs/eslint-module', { fix: true }],
        '@nuxtjs/supabase',
        '@nuxtjs/sitemap',
        '@vueuse/nuxt',
        '@nuxt/content',
        '@nuxt/image',
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
        shim: true,
        // typeCheck: true,
    },
    site: {
        url: process.env.BASE_URL,
    },
});
