"use client"

import { Button } from "@/components/shadcn/ui/button.tsx";
import { useRouter } from "next/navigation";
import LinkElements from "@/components/navigation/LinkElements.tsx";
import AuthButton from "@/components/navigation/AuthButton.tsx";

export default function NavigationBar() {
    const router = useRouter()

    return (
        <>
            <div className={`w-full h-[10vh] sticky top-0`}>
                <div className="container mx-auto px-4 h-full">
                    <div className="flex justify-between items-center h-full p-0">
                        <div className="flex justify-normal items-center w-1/3">
                            <Button onClick={() => router.push('dashboard')} variant={"default"}>
                                Dashboard
                            </Button>
                        </div>
                        <div className="flex justify-center items-center h-full w-1/3">
                            <LinkElements />
                        </div>
                        <div className="flex justify-end items-center w-1/3">
                            <AuthButton />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}