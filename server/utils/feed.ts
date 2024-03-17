import { Feed } from 'feed';
import * as cheerio from 'cheerio';
import { serverQueryContent } from '#content/server';
import type { H3Event } from 'h3';

export async function generateBlogFeed(event: H3Event) {
    const { url, name, currentLocale } = useSiteConfig(event);
    // Fetch all documents
    const feed = new Feed({
        title: `${name} | FakeBank`,
        id: url,
        link: url,
        language: currentLocale,
        favicon: withSiteUrl(event, `/favicon.svg`),
        generator: ';)',
        copyright: `No license :(`,
        feedLinks: {
            rss: `${url}/feed.xml`,
        },
    });

    const posts = await serverQueryContent(event, 'news').sort({ datePublished: -1 }).find();

    for (const post of posts) {
        if (!post._path || post._path === '/news') {
            continue;
        }

        // this will return the SSR content of the post
        const content = await $fetch<string>(`${post._path}/`);
        let $ = cheerio.load(content);
        const prose = $('.prose').html();
        $ = cheerio.load(prose!);

        // remove all attributes from all elements
        $('*').each(function () {
            // @ts-ignore
            this.attribs = {};
        });

        feed.addItem({
            title: post.title,
            id: withSiteUrl(event, post._path),
            link: withSiteUrl(event, post._path),
            description: post.description,
            content: $('body').html(),
            author: [
                {
                    name: 'IndamFake',
                    link: url,
                },
            ],
            date: new Date(post.datePublished),
        });
    }

    return feed;
}
