const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const apiVersion = "2024-01";

export async function shopifyFetch<T>({
    query,
    variables,
}: {
    query: string;
    variables?: Record<string, any>;
}): Promise<{ status: number; body: { data: T } } | undefined> {
    if (!domain || !storefrontAccessToken) {
        console.warn("Shopify credentials missing. Falling back to mock data.");
        return undefined;
    }

    try {
        const result = await fetch(
            `https://${domain}/api/${apiVersion}/graphql.json`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
                },
                body: JSON.stringify({
                    query,
                    variables,
                }),
                next: { tags: ["shopify"] }, // For Next.js revalidation
            }
        );

        const body = await result.json();

        if (body.errors) {
            throw body.errors[0];
        }

        return {
            status: result.status,
            body,
        };
    } catch (e) {
        console.error("Error fetching from Shopify:", e);
        throw {
            error: e,
            query,
        };
    }
}
