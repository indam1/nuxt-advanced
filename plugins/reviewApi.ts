export default defineNuxtPlugin({
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
