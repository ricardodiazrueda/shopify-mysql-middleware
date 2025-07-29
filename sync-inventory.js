require('dotenv').config();
const mysql = require('mysql2/promise');
const axios = require('axios');

async function syncInventory() {
  // 1. Conecta a MySQL y saca productos y stock
  // 2. Por cada producto, llama a la API de Shopify y actualiza el inventario
  // (te ayudo a hacer esto en detalle cuando tengas las pruebas de conexión OK)
}

syncInventory().catch(console.error);