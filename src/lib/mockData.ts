import { shopifyFetch } from "./shopify";
import { GET_PRODUCTS_QUERY, GET_COLLECTIONS_QUERY, GET_PRODUCT_BY_HANDLE_QUERY } from "./queries";
import { Product as ShopifyProduct, Collection as ShopifyCollection, Connection, Edge } from "./shopifyTypes";

// Internal App Types (Keeping these for compatibility)
export interface Product {
    id: string;
    handle: string; // Added handle
    name: string;
    price: number;
    description: string;
    category: string;
    image: string;
    images: string[];
    variants: { id: string; title: string; price: number }[]; // Added variants
    isNew?: boolean;
}

export interface Collection {
    id: string;
    handle: string; // Added handle
    title: string;
    description: string;
    image: string;
}

// MOCK DATA (Fallback)
export const PRODUCTS: Product[] = [
    {
        id: "1",
        handle: "tote-classica",
        name: "Tote Clássica",
        price: 890,
        description: "Uma obra-prima atemporal feita de couro italiano de flor integral. A Tote Clássica possui um interior espaçoso, ferragens banhadas a ouro e nosso emblema de roda discretamente em relevo.",
        category: "Bolsa de mão",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
        images: [
            "/videos/v2.mp4",
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop"
        ],
        variants: [{ id: "1-v1", title: "Default Title", price: 890 }],
        isNew: true,
    },
    {
        id: "2",
        handle: "gitana-crossbody",
        name: "Gitana Crossbody",
        price: 450,
        description: "Projetada para o nômade moderno. Esta bolsa crossbody compacta combina funcionalidade com elegância, apresentando uma alça ajustável e fecho magnético seguro.",
        category: "Bolsa crossbody",
        image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop",
        images: [
            "/videos/v3.mp4",
            "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=800&auto=format&fit=crop"
        ],
        variants: [{ id: "2-v1", title: "Default Title", price: 450 }],
    },
    {
        id: "3",
        handle: "clutch-veludo",
        name: "Clutch de Veludo",
        price: 320,
        description: "A companheira perfeita para suas soirées. Veludo expresso profundo encontra detalhes em ouro antigo nesta sofisticada clutch noturna.",
        category: "Acessórios",
        image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=800&auto=format&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop"
        ],
        variants: [{ id: "3-v1", title: "Default Title", price: 320 }],
    },
    {
        id: "4",
        handle: "heritage-weekender",
        name: "Heritage Weekender",
        price: 1200,
        description: "Viaje com estilo inigualável. A Heritage Weekender oferece capacidade generosa sem comprometer a silhueta elegante que define La Gitana.",
        category: "Bolsas multimarcas",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
        images: [
            "/videos/v4.mp4",
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1600&auto=format&fit=crop"
        ],
        variants: [{ id: "4-v1", title: "Default Title", price: 1200 }],
        isNew: true,
    },
    {
        id: "5",
        handle: "satchel-no-5",
        name: "Satchel No. 5",
        price: 680,
        description: "Sofisticação estruturada. Ideal para a sala de reuniões ou um brunch casual, com laterais rígidas e uma alça superior confortável.",
        category: "Bolsa de mão",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
        images: [
            "/videos/v5.mp4",
            "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop"
        ],
        variants: [{ id: "5-v1", title: "Default Title", price: 680 }],
    }
];

export const COLLECTIONS: Collection[] = [
    {
        id: "spring-2026",
        handle: "spring-2026",
        title: "Despertar da Primavera",
        description: "Tons terrosos encontram inspirações florais.",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
    },
    {
        id: "signature",
        handle: "signature",
        title: "Série Assinatura",
        description: "Nossos designs icônicos, reimaginados.",
        image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=800&auto=format&fit=crop",
    }
];

// Helper to map Shopify Product to internal App Product
const mapShopifyProduct = (node: ShopifyProduct): Product => {
    return {
        id: node.id,
        handle: node.handle,
        name: node.title,
        price: Number(node.priceRange.minVariantPrice.amount),
        description: node.description,
        category: node.tags[0] || "Geral", // Basic tag mapping
        image: node.featuredImage ? node.featuredImage.url : "",
        images: node.images.edges.map(e => e.node.url),
        variants: node.variants.edges.map(e => ({
            id: e.node.id,
            title: e.node.title,
            price: Number(e.node.price.amount)
        })),
        isNew: node.tags.includes("new"),
    };
};

const mapShopifyCollection = (node: ShopifyCollection): Collection => {
    return {
        id: node.id,
        handle: node.handle,
        title: node.title,
        description: node.description,
        image: node.image ? node.image.url : "",
    };
}


// BRIDGE FUNCTIONS

export async function getProducts(): Promise<Product[]> {
    try {
        const response = await shopifyFetch<{ products: Connection<ShopifyProduct> }>({
            query: GET_PRODUCTS_QUERY,
        });

        if (!response?.body?.data?.products) {
            console.warn("Shopify returned empty products. Falling back to mocks.");
            return PRODUCTS;
        }


        const products = response.body.data.products.edges.map(({ node }) => mapShopifyProduct(node));
        console.log("Shopify Products Fetched:", products.length, products);

        if (products.length === 0) {
            console.warn("Shopify returned 0 products. Falling back to mocks for development.");
            return PRODUCTS;
        }

        return products;
    } catch (error) {
        console.error("Failed to fetch products from Shopify:", error);
        return PRODUCTS;
    }
}

export async function getProduct(handle: string): Promise<Product | undefined> {
    try {
        const response = await shopifyFetch<{ product: ShopifyProduct }>({
            query: GET_PRODUCT_BY_HANDLE_QUERY,
            variables: { handle },
        });

        if (!response?.body?.data?.product) {
            console.warn(`Shopify product ${handle} not found. Checking mocks.`);
            return PRODUCTS.find(p => p.handle === handle || p.id === handle);
        }

        return mapShopifyProduct(response.body.data.product);
    } catch (error) {
        console.error(`Failed to fetch product ${handle} from Shopify:`, error);
        return PRODUCTS.find(p => p.handle === handle || p.id === handle);
    }
}

export async function getCollections(): Promise<Collection[]> {
    try {
        const response = await shopifyFetch<{ collections: Connection<ShopifyCollection> }>({
            query: GET_COLLECTIONS_QUERY,
        });

        if (!response?.body?.data?.collections) {
            console.warn("Shopify returned empty collections. Returning mocks.");
            return COLLECTIONS;
        }

        return response.body.data.collections.edges.map(({ node }) => mapShopifyCollection(node));
    } catch (error) {
        console.error("Failed to fetch collections from Shopify:", error);
        return COLLECTIONS;
    }
}
