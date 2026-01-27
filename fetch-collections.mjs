
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '1fgxr0-71.myshopify.com';
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'b695dbb40bbfce92ff3d7f6ba6170c5c';
const apiVersion = "2024-01";

const query = `
  query GetCollections {
    collections(first: 20) {
      edges {
        node {
          title
          handle
        }
      }
    }
  }
`;

async function fetchCollections() {
    console.log("Fetching collections...");
    try {
        const res = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': storefrontAccessToken
            },
            body: JSON.stringify({ query })
        });
        const json = await res.json();
        if (json.errors) {
            console.error(json.errors);
        } else {
            console.log(JSON.stringify(json.data.collections.edges.map(e => ({ title: e.node.title, handle: e.node.handle })), null, 2));
        }
    } catch (e) {
        console.error(e);
    }
}

fetchCollections();
