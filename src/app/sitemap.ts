import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: 'https://la-gitana.vercel.app',
            lastModified: new Date(),
        },
        {
            url: 'https://la-gitana.vercel.app/collections',
            lastModified: new Date(),
        }
    ];
}
