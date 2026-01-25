
const domain = "1fgxr0-71.myshopify.com";
const storefrontAccessToken = "b695dbb40bbfce92ff3d7f6ba6170c5c";
const apiVersion = "2024-01";

async function testShopify() {
    console.log(`Testing connection to ${domain}...`);

    const query = `
    {
      products(first: 3) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }`;

    try {
        const result = await fetch(
            `https://${domain}/api/${apiVersion}/graphql.json`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
                },
                body: JSON.stringify({ query }),
            }
        );

        console.log("Status:", result.status);
        const data = await result.json();
        console.log("Body:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Error:", e);
    }
}

testShopify();
