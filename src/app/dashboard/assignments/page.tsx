"use server"

import { redirect } from "next/navigation";
import { getUserDashboardMetadata } from "../actions.ts";

export default async function AssignmentsPage() {
    const userMetadata = await getUserDashboardMetadata();

    if (!userMetadata) {
        redirect("/error")
    }


    return (
        <div className="flex justify-center items-center h-full w-screen">
            <div>
                <h1 className="text-center text-5xl">Dashboard: Assignments</h1>
                <p className="text-center">Welcome {userMetadata.data.displayName} to your assignments page</p>
            </div>
        </div>
    )
}