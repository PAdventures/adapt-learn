"use server"

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server.ts";
import { Account } from "~/database/schema/accounts.ts";
import { DrizzleManager } from "@/classes/DrizzleManagers.ts";

export default async function AccountPage() {
    const supabase = createClient();

    const { error, data } = await supabase.auth.getUser();

    if (error || !data.user) {
        redirect("/login")
    }

    let accountData: Account | undefined;

    try {
        accountData = await DrizzleManager.accounts.getOneByAuthUid(data.user.id);
    } catch (error) {
        redirect("/error")
    }

    if (!accountData) {
        redirect("/error")
    }


    return (
        <div className="flex justify-center items-center h-full w-screen">
            <div>
                <h1 className="text-center text-5xl">Dashboard: Account</h1>
                <p className="text-center">Welcome {accountData.displayName} to your account page</p>
            </div>
        </div>
    )
}