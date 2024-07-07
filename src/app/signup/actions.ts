"use server";

import { createClient } from "@/utils/supabase/server.ts";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { signupFormSchema } from "@/components/auth/SigninForm.tsx";
import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";
// import { DrizzleManager } from "../../classes/DrizzleManagers.ts";

export async function signupWithEmailAndPassword(values: z.infer<typeof signupFormSchema>): Promise<void> {
    const supabase = createClient();

    const signInData: SignUpWithPasswordCredentials = {
        email: values.email,
        password: values.password,
    }
    
    const authResponse = await supabase.auth.signUp(signInData);

    if (authResponse.error || !authResponse.data.user) {
        redirect('/error')
    }

    // try {
    //     const newAccountError = await DrizzleManager.accounts.create({
    //         authUid: authResponse.data.user.id,
    //         username: values.username,
    //         displayName: values.displayName,
    //         isOAuth: false,
    //         role: values.type,
    //     });
    
    //     if (newAccountError) {
    //         redirect('/error')
    //     }
    // } catch (error) {
    //     redirect('/error')
    // }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signupWithOAuth(provider: "github" | "google"): Promise<void> {
    const supabase = createClient()

    const oauthResponse = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: "http://localhost:3000/api/auth/callback",
            queryParams: provider === "google" ? {
                access_type: "offline",
                prompt: "consent"
            } : undefined
        }
    })

    if (oauthResponse.data.url) {
        redirect(oauthResponse.data.url)
    }

    redirect('/error')
}