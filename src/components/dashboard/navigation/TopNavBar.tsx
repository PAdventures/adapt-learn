"use server"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { createClient } from "@/utils/supabase/server.ts";
import { redirect } from "next/navigation";
import { DrizzleManager } from "@/classes/DrizzleManagers.ts";
import { Account } from "~/database/schema/accounts.ts";
import SignOutButton from "@/components/dashboard/auth/SignOutButton.tsx";

export default async function DashboardTopNavigationBar() {
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

    const userAvatar = data.user.app_metadata.provider === "google" ? data.user.user_metadata.avatar_url : ""
    return (
        <div className="h-[10vh] w-screen bg-gray-800 flex justify-between items-center">
            <div className="flex items-center justify-evenly h-[10vh] w-[26vh]">
                <Avatar>
                    <AvatarImage src={userAvatar} alt={accountData.username + "_avatar"} />
                    <AvatarFallback>{accountData.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <p className="text-white text-sm">{accountData.username}</p>
            </div>
            <div className="flex items-center justify-center w-[22vh]">
                <SignOutButton />
            </div>
        </div>
    )
}