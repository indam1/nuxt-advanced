import type { NitroFetchRequest, $Fetch } from 'nitropack';
type Review = {
    id: number;
    userId: string;
    title: string;
    body: string;
};

export const reviewRepository = <T>(fetch: $Fetch<T, NitroFetchRequest>) => ({
    async getFirst(): Promise<Review> {
        return fetch<Review>('/posts/1');
    },

    async getTwenty(): Promise<Review[]> {
        const result = await fetch<Review[]>('/posts');
        return result.splice(0, 20);
    }
});
