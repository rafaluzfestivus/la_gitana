
const domain = '1fgxr0-71.myshopify.com';
const token = 'b695dbb40bbfce92ff3d7f6ba6170c5c';

async function test() {
    const query = `
    {
      collections(first: 10) {
        edges {
          node {
            handle
            title
            products(first: 1) {
                edges {
                    node {
                        title
                    }
                }
            }
          }
        }
      }
      products(first: 5) {
        edges {
            node {
                title
                handle
            }
        }
      }
    }
  `;

    console.log('Fetching from', domain);
    try {
        const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': token
            },
            body: JSON.stringify({ query })
        });

        const json = await res.json();
        console.log(JSON.stringify(json, null, 2));
    } catch (e) {
        console.error(e);
    }
}

test();
