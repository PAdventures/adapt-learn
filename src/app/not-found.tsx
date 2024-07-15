"use client"

import { Button } from "@/components/shadcn/ui/button.tsx";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/shadcn/ui/separator.tsx";

export default function NotFound() {
    const router = useRouter();
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <div className="h-[30vh] w-1/2 flex items-center justify-evenly">
                <h1 className="text-white text-4xl text-center">404</h1>
                <Separator className="h-20" orientation={"vertical"} />
                <h1 className="text-white text-3xl text-center">
                    Looks like you got lost somewhere.
                </h1>
            </div>
            <Button onClick={() => router.push("/")}>Find your way home</Button>
        </div>
    )
}