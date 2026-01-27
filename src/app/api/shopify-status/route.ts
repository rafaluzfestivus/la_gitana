
import { NextResponse } from "next/server";
import { getProducts } from "@/lib/mockData";

export async function GET() {
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

    const diagnostics = {
        env: {
            NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: domain ? "Set" : "Missing",
            NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN: token ? "Set" : "Missing",
        },
        testFetch: null as any,
        productsCaught: 0,
    };

    try {
        const products = await getProducts();
        diagnostics.productsCaught = products.length;
        diagnostics.testFetch = products.length > 0 ? "Success" : "Empty";

        // Check if we got mock data back (if configured to fallback)
        // We can check if the first product has a numeric ID (shopify) vs simple string (mock)
        // Actually, mock IDs are also strings "1", "2". 
        // Let's check a known mock ID "tote-classica" which might overlap,
        // but better to check if any handle matches a known mock non-shopify handle if we knew them.
        // For now, let's just return what we found.

        return NextResponse.json({
            status: "ok",
            diagnostics
        });
    } catch (error) {
        return NextResponse.json({
            status: "error",
            error: String(error),
            diagnostics
        }, { status: 500 });
    }
}
