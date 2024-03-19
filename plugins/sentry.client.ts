import * as Sentry from "@sentry/vue";

async function lazyLoadSentryIntegrations() {
    const { replayIntegration } = await import("@sentry/vue");
    Sentry.addIntegration(replayIntegration({ maskAllText: false, blockAllMedia: false}));
}

function getSentryIntegrations() {
    const router = useRouter();
    return [Sentry.browserTracingIntegration({ router })];
}

export default defineNuxtPlugin({
    name: 'sentry',
    parallel: true,
    async setup(nuxtApp) {
        const { public: { sentry}} = useRuntimeConfig();
        if (!sentry.dsn) {
            console.warn('Sentry DSN is not defined, it will not initialize');
            return;
        }

        Sentry.init({
            app: nuxtApp.vueApp,
            dsn: sentry.dsn,
            environment: sentry.environment,
            integrations: getSentryIntegrations(),
            tracePropagationTargets: ['localhost'],
            tracesSampleRate: 0.2,
            replaysSessionSampleRate: 1.0,
            replaysOnErrorSampleRate: 1.0,
        });

        lazyLoadSentryIntegrations();
    }
});
