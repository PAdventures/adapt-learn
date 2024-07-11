"use client"

import { Button } from "@/components/shadcn/ui/button.tsx"
import Logout from "@mui/icons-material/Logout"
import { signOut } from "@/app/dashboard/actions.ts"

export default function SignOutButton() {
    return (
        <Button className="flex items-center justify-evenly" onClick={async () => await signOut()}>
            <Logout className=" pr-4 text-[2.5rem]" />
            <p className="text-sm">Sign Out</p>
        </Button>
    )
}