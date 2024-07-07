"use client"

import { Button } from "@/components/ui/button.tsx";
import { Google, GitHub } from "@mui/icons-material";
import { AuthComponentProps } from "@/types/constants.ts";
import { signupWithOAuth } from "@/app/signup/actions.ts";

export default function AuthButtons(props: AuthComponentProps) {
    return (
        <div className="flex flex-col items-center justify-evenly w-full h-full">
            <Button onClick={() => signupWithOAuth("github")} className="w-full h-[30%] bg-white hover:bg-slate-200 active:bg-slate-300 border-slate-300 border-2 text-black">
                <div className="w-full flex justify-evenly items-center text-base">
                    <GitHub fontSize="medium"></GitHub>
                    {props.type === "signup" ? "Sign Up With GitHub" : "Login With GitHub"}
                </div>
            </Button>
            <Button onClick={() => signupWithOAuth("google")} className="w-full h-[30%] bg-white hover:bg-slate-200 active:bg-slate-300 border-slate-300 border-2 text-black">
                <div className="w-full flex justify-evenly items-center text-base">
                    <Google fontSize="medium"></Google>
                    {props.type === "signup" ? "Sign Up With Google" : "Login With Google"}
                </div>
            </Button>
        </div>
    )
}