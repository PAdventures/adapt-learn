"use client"

import { Button } from "@/components/shadcn/ui/button.tsx"
import { Logout } from "@mui/icons-material"
import { signOut } from "@/app/dashboard/actions.ts"

export default function SignOutButton() {
    return (
        <Button className="flex items-center justify-around w-[15vh]" onClick={async () => await signOut()}>
            <Logout />
            <p className="text-xs">Sign Out</p>
        </Button>
    )
}