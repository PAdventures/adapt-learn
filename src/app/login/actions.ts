"use server";

import { loginFormSchema } from "@/components/auth/LoginForm.tsx";
import { z } from "zod";
import { createClient } from "@/utils/supabase/server.ts";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function login(values: z.infer<typeof loginFormSchema>): Promise<void> {
    const supabase = createClient();
    
    const { error } = await supabase.auth.signInWithPassword(values);

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}