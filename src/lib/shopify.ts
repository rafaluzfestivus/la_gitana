
import {
    CREATE_CART_MUTATION,
    ADD_CART_LINES_MUTATION,
    UPDATE_CART_LINES_MUTATION,
    REMOVE_CART_LINES_MUTATION,
    GET_CART_QUERY
} from "./queries";
import { Cart } from "./shopifyTypes";

export async function createCart(lines: { merchandiseId: string; quantity: number }[]): Promise<Cart | undefined> {
    const res = await shopifyFetch<{ cartCreate: { cart: Cart } }>({
        query: CREATE_CART_MUTATION,
        variables: { lines },
    });
    return res?.body.data.cartCreate.cart;
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]): Promise<Cart | undefined> {
    const res = await shopifyFetch<{ cartLinesAdd: { cart: Cart } }>({
        query: ADD_CART_LINES_MUTATION,
        variables: { cartId, lines },
    });
    return res?.body.data.cartLinesAdd.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart | undefined> {
    const res = await shopifyFetch<{ cartLinesRemove: { cart: Cart } }>({
        query: REMOVE_CART_LINES_MUTATION,
        variables: { cartId, lineIds },
    });
    return res?.body.data.cartLinesRemove.cart;
}

export async function updateCartLines(cartId: string, lines: { id: string; merchandiseId?: string; quantity: number }[]): Promise<Cart | undefined> {
    const res = await shopifyFetch<{ cartLinesUpdate: { cart: Cart } }>({
        query: UPDATE_CART_LINES_MUTATION,
        variables: { cartId, lines },
    });
    return res?.body.data.cartLinesUpdate.cart;
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
    const res = await shopifyFetch<{ cart: Cart }>({
        query: GET_CART_QUERY,
        variables: { cartId },
    });
    return res?.body.data.cart;
}

export async function shopifyFetch<T>({
    query,
    variables,
}: {
    query: string;
    variables?: Record<string, any>;
}): Promise<{ status: number; body: { data: T } } | undefined> {
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
    const apiVersion = "2024-01";

    if (!domain || !storefrontAccessToken) {
        console.warn("Shopify credentials missing. Falling back to mock data. Check your .env file.");
        if (!domain) console.warn("- Missing NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN");
        if (!storefrontAccessToken) console.warn("- Missing NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN");
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
                cache: "no-store" // DEBUG: Force fresh fetch
            }
        );

        const body = await result.json();

        if (body.errors) {
            console.error("Shopify GraphQL Errors:", body.errors);
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
