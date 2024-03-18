import * as Sentry from "@sentry/vue";

export default defineNuxtPlugin((nuxtApp) => {
    const router = useRouter();
    const { public: { sentry}} = useRuntimeConfig();
    if (!sentry.dsn) {
        console.warn('Sentry DSN is not defined, it will not initialize');
        return;
    }

    Sentry.init({
        app: nuxtApp.vueApp,
        dsn: sentry.dsn,
        environment: sentry.environment,
        integrations: [
            Sentry.browserTracingIntegration({ router }),
            Sentry.replayIntegration(),
        ],
        tracePropagationTargets: ['localhost'],
        tracesSampleRate: 0.2,
        replaysSessionSampleRate: 1.0,
        replaysOnErrorSampleRate: 1.0,
    });
});
