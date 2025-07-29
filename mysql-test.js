require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
    try{
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: Number(process.env.MYSQL_PORT),
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });
  console.log('Conexion exitosa a MySQL!')
    const [rows] = await connection.execute('SELECT * FROM mercanci LIMIT 1');
  console.log(rows);
  await connection.end();
    }catch(error){
        console.error('Error de conexión:', error);
    }
}

testConnection().catch(console.error);