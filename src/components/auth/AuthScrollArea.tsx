"use client"

import { useRouter } from "next/navigation"
import { ScrollArea } from "@/components/shadcn/ui/scroll-area.tsx"
import CloseIcon from '@mui/icons-material/Close';
import AuthButtons from "@/components/auth/AuthButtons.tsx"
import { Separator } from "@/components/shadcn/ui/separator.tsx";
import SigninForm from "@/components/auth/SigninForm.tsx";
import LoginForm from "@/components/auth/LoginForm.tsx";
import Link from "next/link";
import { AuthComponentProps } from "@/types/constants.ts";

export default function AuthScrollArea(props: AuthComponentProps) {
    const router = useRouter()
    return (
        <ScrollArea scrollHideDelay={0} className="h-screen w-1/2 bg-white block">
                <div onClick={() => router.push("/")} className="top-[1.5rem] right-[1.5rem] fixed hover:cursor-pointer">
                    <CloseIcon fontSize="large" />
                </div>
                <div className="flex flex-col justify-evenly items-center">
                    <div className="w-[80%] h-[30vh] mt-[10vh] mb-[5vh]">
                        <h1 className="w-[80%] text-left text-2xl text-black">{props.type === "signup" ? "Create an account" : "Log into your account"}</h1>
                        <div className="flex items-center mt-[1vh]">
                            <p>{props.type === "signup" ? "Already have an account?" : "Don't have an account?"}</p>
                            <Link className="text-blue-600 ml-3.5" href={props.type === "signup" ? "/login" : "/signup"}>{props.type === "signup" ? "Login" : "Sign Up"}</Link>
                        </div>
                        <AuthButtons type={props.type} />
                    </div>
                    <div className="h-[10vh] w-4/5 flex items-center justify-between">
                        <Separator className="w-2/5 h-[2px]" />
                        <p className="w-[20%] text-center">or email</p>
                        <Separator className="w-2/5 h-[2px]" />
                    </div>
                    <div className={`w-full ${props.type === "signup" ? "h-[90vh]" : "h-[40vh]"} flex flex-col space-y-4 items-center justify-center mb-[10vh]`}>
                        {props.type === "signup" ? <SigninForm /> : <LoginForm />}
                    </div>
                </div>
            </ScrollArea>
    )
}