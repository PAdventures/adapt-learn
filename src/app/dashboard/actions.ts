"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server.ts";
import { revalidatePath } from "next/cache";
import { DrizzleManager } from "@/classes/DrizzleManagers.ts";
import { Account } from "~/database/schema/accounts.ts";
import { User } from "@supabase/supabase-js";

export interface UserDashboardMetadata {
    data: Account;
    auth: User;
    allowSchoolView: boolean;
}

export async function signOut(): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        redirect("/error")
    }

    revalidatePath("/", "layout")
    redirect("/")
}

export async function getUserDashboardMetadata(): Promise<UserDashboardMetadata | undefined> {
    const supabase = createClient();

    const { error, data } = await supabase.auth.getUser();

    if (error || !data) {
        return undefined
    }

    let accountData: Account | undefined;

    try {
        accountData = await DrizzleManager.accounts.getOneByAuthUid(data.user.id);
    } catch (error) {
        return undefined
    }

    if (!accountData) {
        return undefined
    }

    return {
        data: accountData,
        auth: data.user,
        allowSchoolView: ["STUDENT", "TEACHER"].includes(accountData.role)
    };
}