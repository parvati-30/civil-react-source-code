const mariadb = require('mariadb');

const config = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'giridhar',
  password: process.env.DB_PASSWORD || 'giridhar_db_2024',
  database: process.env.DB_NAME || 'giridhar_construction',
  connectionLimit: 10,
  acquireTimeout: 10000,
  dateStrings: true,
};

const pool = mariadb.createPool(config);

async function query(sql, params) {
  let conn;
  try {
    conn = await pool.getConnection();
    return await conn.query(sql, params);
  } finally {
    if (conn) conn.release();
  }
}

async function testConnection() {
  const conn = await pool.getConnection();
  await conn.ping();
  conn.release();
}

module.exports = { query, testConnection };
