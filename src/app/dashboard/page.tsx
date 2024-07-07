"use server"

import { createClient } from "@/utils/supabase/server.ts"
import { redirect } from "next/navigation";
import { DrizzleManager } from "@/classes/DrizzleManagers.ts";
import { Account } from "~/database/schema/accounts.ts";

export default async function DashboardPage() {
    const supabase = createClient();

    const { error, data } = await supabase.auth.getUser();

    if (error) {
        redirect('/login')
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
                <h1 className="text-center text-5xl">Dashboard</h1>
                <p className="text-center">Welcome {accountData.displayName} to the dashboard</p>
            </div>
        </div>
    )
}