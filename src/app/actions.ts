"use server"

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server.ts";

export async function navigationGetButtonText(): Promise<string> {
    const supabase = createClient()

    const { error, data } = await supabase.auth.getUser();

    return error || !data.user ? "Login" : "Account";
}

export async function navigationHandleAuthClick() {
    const supabase = createClient()

    const { error, data } = await supabase.auth.getUser();

    console.log("Testing")

    if (error || !data.user) {
        redirect("/login")
    }

    redirect("/dashboard")
}