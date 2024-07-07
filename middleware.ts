import { NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware.ts";

export async function middleware(request: NextRequest) {
    return await updateSession(request)
}