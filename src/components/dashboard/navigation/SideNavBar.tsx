"use client"

import DashboardSideNavBarButtons from "@/components/dashboard/navigation/SideNavBarButtons.tsx";
import { Button } from "@/components/shadcn/ui/button.tsx";
import { ExitToApp } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function DashboardSideNavigationBar() {
    const router = useRouter()
    return (
        <div className="h-[90vh] w-[30vh] bg-gray-800 flex flex-col items-center justify-between">
            <DashboardSideNavBarButtons />
            <div className="h-[7vh]">
                <Button className="flex items-center justify-between w-[23vh]" onClick={() => router.push("/")}>
                    <ExitToApp />
                    <p className="w-3/4">Exit Quietly</p>
                </Button>
            </div>
        </div>
    )
}