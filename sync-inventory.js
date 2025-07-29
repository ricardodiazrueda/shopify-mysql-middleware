require('dotenv').config();
const mysql = require('mysql2/promise');
const axios = require('axios');

async function main() {
  // 1. Conexión a MySQL
  const db = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: Number(process.env.MYSQL_PORT),
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  // 2. Leer productos
  const [productos] = await db.execute('SELECT nombre, descripcion, precio, sku FROM productos');

  // 3. Recorrer y subir a Shopify
  for (const prod of productos) {
    const shopifyProduct = {
      product: {
        title: prod.nombre,
        body_html: prod.descripcion,
        vendor: "Mi Marca", // Puedes personalizar esto
        product_type: "General", // O tu categoría
        variants: [
          {
            option1: "Default Title",
            price: prod.precio.toString(),
            sku: prod.sku
          }
        ]
      }
    };

    try {
      const response = await axios.post(
        `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2023-07/products.json`,
        shopifyProduct,
        {
          headers: {
            'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(`Producto subido: ${prod.nombre}`);
    } catch (err) {
      console.error(`Error subiendo ${prod.nombre}:`, err.response ? err.response.data : err.message);
    }
  }

  await db.end();
}

main();