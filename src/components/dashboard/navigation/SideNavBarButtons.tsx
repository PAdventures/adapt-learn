"use client"

import { Button } from "@/components/ui/button.tsx";
import { Home, AccountCircle } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator.tsx";

export default function DashboardSideNavBarButtons() {
    const router = useRouter();
    const pathname = usePathname();

    const activatedButtonCSS = "bg-accent/15 hover:bg-accent/15";
    const activatedButtonIconCSS = "text-white";

    const deactivatedButtonCSS = "bg-accent/5 text-gray-400 hover:bg-accent/10";
    
    const homeButtonStateCSS = pathname.endsWith("/dashboard") ? activatedButtonCSS : deactivatedButtonCSS;
    const homeButtonStateIconCSS = pathname.endsWith("/dashboard") ? activatedButtonIconCSS : "";

    const accountButtonStateCSS = pathname.endsWith("/account") ? activatedButtonCSS : deactivatedButtonCSS;
    const accountButtonStateIconCSS = pathname.endsWith("/account") ? activatedButtonIconCSS : "";

    return (
        <div className="flex flex-col justify-evenly items-center">
            <div className="flex flex-col items-center justify-between h-[10vh]">
                <Separator className="w-[23vh] h-[2px] bg-gray-400" />
                <Button className={`group flex items-center justify-between w-[23vh] ${homeButtonStateCSS}`} variant={"ghost"} onClick={() => router.push("/dashboard")}>
                    <Home className={`${homeButtonStateIconCSS} group-hover:text-white`} />
                    <p className="w-3/4 text-left text-gray-400 group-hover:text-white">Home</p>
                </Button>
                <Separator className="w-[23vh] h-[2px] bg-gray-400" />
            </div>
            <div className="flex flex-col items-center justify-between h-[10vh]">
                <Separator className="w-[23vh] h-[2px] bg-transparent" />
                <Button className={`group flex items-center justify-between w-[23vh] ${accountButtonStateCSS}`} variant={"ghost"} onClick={() => router.push("/dashboard/account")}>
                    <AccountCircle className={`${accountButtonStateIconCSS} group-hover:text-white`} />
                    <p className="w-3/4 text-left text-gray-400 group-hover:text-white">Account</p>
                </Button>
                <Separator className="w-[23vh] h-[2px] bg-gray-400" />
            </div>
        </div>
    )
}