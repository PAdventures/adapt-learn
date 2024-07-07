import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schemas from '~/database/schemas.ts';

declare global {
    var db: PostgresJsDatabase<typeof schemas> | undefined;
}

let db: PostgresJsDatabase<typeof schemas>;

if (process.env.NODE_ENV === "production") {
    db = drizzle(
        postgres(process.env.SUPABASE_CONNECTION_URL, { prepare: false, ssl: "require" }),
        { schema: schemas }
    );
} else {
    if (!global.db) {
        global.db = drizzle(
            postgres(process.env.SUPABASE_CONNECTION_URL, { prepare: false, ssl: "require" }),
            { schema: schemas, logger: true }
        );
    }
    db = global.db
}

export class Drizzle {
    protected readonly drizzleClient = db;
}