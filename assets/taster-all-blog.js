const productQuery = `
query  {
    articles(first: 250) {
      nodes {
        title
      }
    }
  }  
`;

const STOREFRONT_ACCESS_TOKEN = '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';

const GRAPHQL_URL =
  'https:/theme-practice-apo.myshopify.com/api/2022-07/graphql.json';

const GRAPHQL_BODY = () => {
  return {
    async: true,
    // crossDomain: true,
    method: 'POST',
    headers: {
      'X-Shopify-Access-Token': STOREFRONT_ACCESS_TOKEN,
      'Content-Type': 'application/graphql',
    },
    body: productQuery,
  };
};

fetch(GRAPHQL_URL, GRAPHQL_BODY())
  .then((res) => res.json())
  .then((products) => {
    console.log('products', products);
  });
