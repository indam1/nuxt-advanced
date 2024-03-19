export default defineNuxtPlugin({
    name: 'reviewApi',
    parallel: true,
    setup() {
        const reviewApi = $fetch.create({
            baseURL: useRuntimeConfig().public.reviewApiUrl,
        });

        return {
            provide: {
                reviewApi
            }
        };
    }
});
