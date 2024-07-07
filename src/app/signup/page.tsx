'use client'

import AuthScrollArea from "@/components/auth/AuthScrollArea.tsx";

export default function SignupPage() {
    return (
        <div className="h-screen flex items-center justify-between overflow-auto">
            <div className="h-1/2 w-1/2 flex flex-col items-center justify-evenly">
                <div>
                    <h1 className="text-white text-5xl text-center p-6">Welcome to AdaptLearn</h1>
                    <p className="text-slate-300 text-xl m-auto text-center w-[60%]">Giving you effective, flexible and adaptive learning</p>
                </div>
            </div>
            <AuthScrollArea type="signup" />
        </div>
    )
}