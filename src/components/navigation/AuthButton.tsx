"use client"

import { Button } from "@/components/shadcn/ui/button.tsx"
import { navigationGetButtonText, navigationHandleAuthClick } from "@/app/actions.ts";
import { useEffect, useState } from "react";

export default function AuthButton() {
    const [buttonText, setButtonText] = useState("Login")

    useEffect(() => {
        const updateButtonText = async () => {
            const updatedText = await navigationGetButtonText();
            setButtonText(updatedText)
        }

        updateButtonText()
    })
    return (
        <Button onClick={async () => await navigationHandleAuthClick()}>{buttonText}</Button>
    )
}