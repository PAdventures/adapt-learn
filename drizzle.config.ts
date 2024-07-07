import type { Config } from "drizzle-kit";

import "dotenv/config"

export default {
    schema: './database/schema/*.ts',
    out: './drizzle/migrations/',
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.SUPABASE_CONNECTION_URL,
        ssl: "require"
    },
    verbose: true,
    strict: true,
} satisfies Config
