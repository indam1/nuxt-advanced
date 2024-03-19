import { Feed } from 'feed';
import * as cheerio from 'cheerio';
import { serverQueryContent } from '#content/server';
import type {EventHandlerRequest, H3Event} from 'h3';
import { useSiteConfig, withSiteUrl } from '#imports';

export async function generateBlogFeed(event: H3Event<EventHandlerRequest>) {
    const { url, name, currentLocale } = useSiteConfig(event);
    // Fetch all documents
    const feed = new Feed({
        title: `${name} | FakeBank`,
        id: url,
        link: url,
        language: currentLocale,
        favicon: withSiteUrl(event, `/favicon.ico`),
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

        const id = withSiteUrl(event, post._path);
        feed.addItem({
            title: post.title ?? '',
            id,
            link: id,
            description: post.description,
            content: $('body').html() ?? '',
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
