
const domain = '1fgxr0-71.myshopify.com';
const storefrontAccessToken = 'b695dbb40bbfce92ff3d7f6ba6170c5c';
const apiVersion = "2024-01";

// Fragment from queries.ts
const productFragment = `
  fragment ProductFragment on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 20) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    media(first: 10) {
      edges {
        node {
          mediaContentType
          ... on Video {
            sources {
              url
              mimeType
            }
          }
        }
      }
    }
    seo {
      title
      description
    }
    tags
    updatedAt
  }
`;

const GET_PRODUCTS_QUERY = `
  ${productFragment}
  query GetProducts($first: Int!, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, query: $query, sortKey: $sortKey, reverse: $reverse) {
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
`;

// Mapping function from mockData.ts
const mapShopifyProduct = (node) => {
    // Debug log
    console.log("Mapping Product:", node.handle, "Media:", node.media?.edges?.length, "Images:", node.images?.edges?.length);

    const videos = node.media?.edges
        ?.filter(e => e.node.mediaContentType === 'VIDEO')
        ?.map(e => e.node.sources?.[0]?.url)
        ?.filter((url) => !!url) || [];

    const images = node.images?.edges?.map(e => e.node.url) || [];

    const primaryImage = node.featuredImage?.url || images[0] || "";

    return {
        id: node.id,
        handle: node.handle,
        name: node.title,
        price: Number(node.priceRange?.minVariantPrice?.amount || 0),
        description: node.description || "",
        category: node.tags?.[0] || "Geral",
        image: primaryImage,
        images: [...videos, ...images],
        variants: node.variants?.edges?.map(e => ({
            id: e.node.id,
            title: e.node.title,
            price: Number(e.node.price?.amount || 0)
        })) || [],
        isNew: node.tags?.includes("new") || false,
    };
};

async function shopifyFetch({ query, variables }) {
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
            }
        );

        const body = await result.json();

        if (body.errors) {
            console.error("GraphQL Errors:", JSON.stringify(body.errors, null, 2));
            throw body.errors[0];
        }

        return {
            status: result.status,
            body,
        };
    } catch (e) {
        console.error("Error fetching from Shopify:", e);
        throw e;
    }
}

async function run() {
    console.log("Starting fetch...");
    try {
        const response = await shopifyFetch({
            query: GET_PRODUCTS_QUERY,
            variables: { first: 20 },
        });

        if (!response?.body?.data?.products) {
            console.warn("Shopify returned empty products.");
            return;
        }

        const products = response.body.data.products.edges.map(({ node }) => mapShopifyProduct(node));
        console.log("Mapped Products:", JSON.stringify(products, null, 2));
    } catch (error) {
        console.error("Run failed:", error);
    }
}

run();
