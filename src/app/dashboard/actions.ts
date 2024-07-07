"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server.ts";
import { revalidatePath } from "next/cache";

export async function signOut(): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        redirect("/error")
    }

    revalidatePath("/", "layout")
    redirect("/")
}