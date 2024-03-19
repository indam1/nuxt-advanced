export default defineNuxtPlugin({
    name: 'sentry',
    parallel: true,
    async setup(nuxtApp) {
        const router = useRouter();
        const { init, browserTracingIntegration } = await import('@sentry/vue');
        const { public: { sentry}} = useRuntimeConfig();
        if (!sentry.dsn) {
            console.warn('Sentry DSN is not defined, it will not initialize');
            return;
        }

        init({
            app: nuxtApp.vueApp,
            dsn: sentry.dsn,
            environment: sentry.environment,
            integrations: [browserTracingIntegration({ router })],
            tracePropagationTargets: ['localhost'],
            tracesSampleRate: 0.2,
            replaysSessionSampleRate: 1.0,
            replaysOnErrorSampleRate: 1.0,
        });

        nuxtApp.hook('app:mounted', async () => {
            const { addIntegration, replayIntegration } = await import('@sentry/vue');
            addIntegration(replayIntegration({ maskAllText: false, blockAllMedia: false }));
        });
    }
});
