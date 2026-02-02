import { MetadataRoute } from 'next';
import { getProducts, getCollections } from '@/lib/shopify';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://la-gitana.vercel.app'; // Replace with your production URL if different

    // Fetch data
    // Note: getProducts defaults to first 20. For a real sitemap you might want to fetch all or paginate.
    // For this implementation, we will fetch a reasonable amount to cover most items.
    const productsPromise = getProducts({ sortKey: 'CREATED_AT', reverse: true, query: '' }); // Fetch latest
    const collectionsPromise = getCollections();

    const [productsData, collectionsData] = await Promise.all([productsPromise, collectionsPromise]);

    const products = productsData?.edges.map((edge) => ({
        url: `${baseUrl}/product/${edge.node.handle}`,
        lastModified: edge.node.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    })) || [];

    const collections = collectionsData?.edges.map((edge) => ({
        url: `${baseUrl}/collections/${edge.node.handle}`,
        lastModified: edge.node.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    })) || [];

    const routes = [
        '',
        '/collections',
        '/login',
        '/register',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 1.0,
    }));

    return [...routes, ...collections, ...products];
}
