require('dotenv').config();
const axios = require('axios');

async function testShopifyConnection() {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;

  try {
    const response = await axios.get(
      `https://${storeDomain}/admin/api/2023-07/products.json?limit=5`,
      {
        headers: {
          'X-Shopify-Access-Token': accessToken,
          'Content-Type': 'application/json'
        }
      }
    );
    const products = response.data.products;
    products.forEach(product => {
      //console.log('---');
      //console.log('ID producto:', product.id);
      //console.log('Título:', product.title);
      //console.log('Descripción:', product.body_html);
      //console.log('Vendor:', product.vendor);

      console.log(JSON.stringify(product, null, 2));

      //product.variants.forEach(variant => {
        //console.log('  ID variante:', variant.id);
        //console.log('  Precio:', variant.price);
        //console.log('  SKU:', variant.sku);
        //console.log('  Inventario:', variant.inventory_quantity);
      //});
    });
  } catch (err) {
    console.error('Error al conectar con Shopify:', err.response ? err.response.data : err.message);
  }
}

testShopifyConnection();