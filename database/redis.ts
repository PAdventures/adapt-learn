import { createClient } from "redis";

export const redis = createClient({
    url: process.env.REDIS_CACHE_CONNECTION_URL
}).connect();