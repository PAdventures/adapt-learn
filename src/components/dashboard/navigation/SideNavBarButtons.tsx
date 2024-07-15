"use client"

import { Button } from "@/components/shadcn/ui/button.tsx";
import { Home, AccountCircle, ConnectWithoutContact, Topic, Quiz, Assignment, QueryStats, BarChart, History } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "@/components/shadcn/ui/separator.tsx";
import { MouseEventHandler, useEffect, useState } from "react";
import { getUserDashboardMetadata } from "@/app/dashboard/actions.ts";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

interface ButtonConfig {
    fullPath: string;
    path: string;
    iconComponent: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; };
    label: string;
}

interface SideNavBarButtonParams {
    children: React.ReactNode;
    activated: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>
}

function SideNavbarButton({ children, activated, onClick }: SideNavBarButtonParams) {
    return (
        <Button
            className={`group h-fit flex items-center justify-between w-[23vh] ${activated ? "bg-accent/15 hover:bg-accent/15" : "bg-accent/5 text-gray-400 hover:bg-accent/10"}`}
            variant={"ghost"}
            onClick={onClick}
        >
            {children}
        </Button>
    )
}

export default function DashboardSideNavBarButtons() {
    const router = useRouter();
    const pathname = usePathname();

    const buttonGroupBaseCSS = "flex flex-col items-center justify-between";
    const buttonLabelCSS = "w-3/4 text-left text-gray-400 group-hover:text-white";
    const buttonSeparatorsCSS = "w-[23vh] h-[2px] bg-gray-400";

    const activatedButtonIconCSS = "text-white";

    const buttonConfig: ButtonConfig[] = [
        { fullPath: "/dashboard", path: "/dashboard", iconComponent: Home, label: "Home" },
        { fullPath: "/dashboard/account", path: "/account", iconComponent: AccountCircle, label: "Account" },
        { fullPath: "/dashboard/courses", path: "/courses", iconComponent: Topic, label: "Courses" },
        { fullPath: "/dashboard/quiz", path: "/quiz", iconComponent: Quiz, label: "Start a Quiz" },
        { fullPath: "/dashboard/analytics", path: "/analytics", iconComponent: QueryStats, label: "General Analytics" },
        { fullPath: "/dashboard/analytics/usage", path: "/usage", iconComponent: BarChart, label: "App Usage" },
        { fullPath: "/dashboard/analytics/history", path: "/history", iconComponent: History, label: "Quiz History" },
        { fullPath: "/dashboard/assignments", path: "/assignments", iconComponent: Assignment, label: "Assignments" },
        { fullPath: "/dashboard/connections", path: "/connections", iconComponent: ConnectWithoutContact, label: "Connections" }
    ]

    const getButtonStateIconCSS = (path: string) => pathname.endsWith(path) ? activatedButtonIconCSS : ""

    const [showSchoolView, setShowSchoolView] =  useState(false);

    useEffect(() => {
        const updateShowSchoolView = async () => {
            const userDashboardMetadata = await getUserDashboardMetadata();
            if (userDashboardMetadata && userDashboardMetadata.allowSchoolView) {
                setShowSchoolView(true)
            }
        }

        updateShowSchoolView();
    }, [])

    return (
        <div className="flex flex-col justify-evenly items-center">
            <div className={`${buttonGroupBaseCSS} h-[10vh]`}>
                <Separator className={buttonSeparatorsCSS} />
                    {buttonConfig.slice(0, 1).map(config => {
                        return (
                            <SideNavbarButton key={config.path} activated={pathname.endsWith(config.path)} onClick={() => router.push(config.fullPath)}>
                                <config.iconComponent className={`${getButtonStateIconCSS(config.path)} group-hover:text-white`} />
                                <p className={buttonLabelCSS}>{config.label}</p>
                            </SideNavbarButton>
                        )
                    })}
                <Separator className={buttonSeparatorsCSS} />
            </div>
            <div className={`${buttonGroupBaseCSS} h-[24vh]`}>
                <Separator className={`${buttonSeparatorsCSS} bg-transparent`} />
                {buttonConfig.slice(1, 4).map(config => {
                        return (
                            <SideNavbarButton key={config.path} activated={pathname.endsWith(config.path)} onClick={() => router.push(config.fullPath)}>
                                <config.iconComponent className={`${getButtonStateIconCSS(config.path)} group-hover:text-white`} />
                                <p className={buttonLabelCSS}>{config.label}</p>
                            </SideNavbarButton>
                        )
                    })}
                <Separator className={buttonSeparatorsCSS} />
            </div>
            <div className={`${buttonGroupBaseCSS} h-[24vh]`}>
                <Separator className={`${buttonSeparatorsCSS} bg-transparent`} />
                {buttonConfig.slice(4, 7).map(config => {
                        return (
                            <SideNavbarButton key={config.path} activated={pathname.endsWith(config.path)} onClick={() => router.push(config.fullPath)}>
                                <config.iconComponent className={`${getButtonStateIconCSS(config.path)} group-hover:text-white`} />
                                <p className={buttonLabelCSS}>{config.label}</p>
                            </SideNavbarButton>
                        )
                    })}
                <Separator className={buttonSeparatorsCSS} />
            </div>
            {!showSchoolView &&
            <div className={`${buttonGroupBaseCSS} h-[17vh]`}>
                <Separator className={`${buttonSeparatorsCSS} bg-transparent`} />
                {buttonConfig.slice(7).map(config => {
                        return (
                            <SideNavbarButton key={config.path} activated={pathname.endsWith(config.path)} onClick={() => router.push(config.fullPath)}>
                                <config.iconComponent className={`${getButtonStateIconCSS(config.path)} group-hover:text-white`} />
                                <p className={buttonLabelCSS}>{config.label}</p>
                            </SideNavbarButton>
                        )
                    })}
                <Separator className={buttonSeparatorsCSS} />
            </div>
            }
        </div>
    )
}