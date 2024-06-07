import type { Config } from "drizzle-kit";
export default {
    schema: "./models/*.ts",
    out: "./drizzle",
    driver: "pg",
    verbose: true,
    dbCredentials: {
        user: "postgres",
        password: "password",
        host: "localhost", // Add a default value for host //process.env.DB_HOST ||
        port: 5432, // Add a default value for port
        database: "pbd_test", // Add a default value for database
    },
} satisfies Config;