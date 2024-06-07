import { drizzle } from "drizzle-orm/node-postgres";
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,//"localhost",
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        connectionTimeoutMillis: 5000,
    });

    const db = drizzle(pool);

    export default db;
