"use client"

import { Button } from "@/components/ui/button.tsx";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
    const router = useRouter();
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="h-[40vh] w-1/2 flex flex-col items-center justify-evenly">
                <h1 className="text-white text-3xl text-center">
                    {"Oh no. Something went wrong :("}
                </h1>
                <Button onClick={() => router.push("/")}>Go home</Button>
            </div>
        </div>
    )
}