import { appendHeader } from 'h3';
import { generateBlogFeed } from '~/server/utils/feed.js';

export default defineEventHandler(async (event) => {
    const feed = await generateBlogFeed(event);
    appendHeader(event, 'Content-Type', 'application/xml');
    return feed.rss2();
});
