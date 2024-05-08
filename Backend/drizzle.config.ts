import type { Config } from "drizzle-kit";
export default {
    schema: "./models/*.ts",
    out: "./drizzle",
    driver: "pg",
    verbose: true,
    dbCredentials: {
        user: "postgres",
        password: "password",
        host: process.env.DB_HOST || "localhost", // Add a default value for host
        port: 5432, // Add a default value for port
        database: process.env.DB_DATABASE || "pbd_test", // Add a default value for database
    },
} satisfies Config;