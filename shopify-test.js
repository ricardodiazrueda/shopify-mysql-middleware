require('dotenv').config();
const axios = require('axios');

async function testShopifyConnection() {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;

  //GET https://prueba-mayasis-interno.myshopify.com/admin/api/2024-07/products.json

  try {
    const response = await axios.get(
      `https://${storeDomain}/admin/api/2024-07/products.json`,
      {
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('¡Conexión exitosa a Shopify!');
    console.log(response.data);
  } catch (err) {
    console.error('Error al conectar con Shopify:', err.response ? err.response.data : err.message);
  }
}

testShopifyConnection();