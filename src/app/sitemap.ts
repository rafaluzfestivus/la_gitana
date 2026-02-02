import { MetadataRoute } from 'next';

import { getProducts, getCollections } from '@/lib/shopify';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://la-gitana.vercel.app'; // Replace with your production URL if different

    // Fetch data
    let productsData: any = { edges: [] };
    let collectionsData: any = { edges: [] };

    try {
        const productsPromise = getProducts({ sortKey: 'CREATED_AT', reverse: true, query: '' });
        const collectionsPromise = getCollections();
        const [p, c] = await Promise.all([productsPromise, collectionsPromise]);
        productsData = p || { edges: [] };
        collectionsData = c || { edges: [] };
    } catch (error) {
        console.error("Error generating sitemap:", error);
    }

    const products = productsData.edges.map((edge: any) => ({
        url: `${baseUrl}/product/${edge.node.handle}`,
        lastModified: edge.node.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    })) || [];

    const collections = collectionsData.edges.map((edge: any) => ({
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
