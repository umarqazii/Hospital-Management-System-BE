// src/db.ts
import mysql from 'mysql2/promise';

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Verbatin#123', // Replace with your MySQL root password
  database: 'hospital'
});

export default pool;
