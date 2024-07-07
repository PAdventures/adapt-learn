export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SUPABASE_CONNECTION_URL: string;
            NEXT_PUBLIC_SUPABASE_URL: string;
            NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
        }
    }
}