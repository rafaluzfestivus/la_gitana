import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://la-gitana.vercel.app';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/account/', '/api/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
