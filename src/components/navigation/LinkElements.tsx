"use client"

import Link from "next/link";

export default function LinkElements() {
    return (
        <ul className="hidden md:flex gap-x-32 text-white">
            <li className="flex justify-center items-center">
                <Link href="/">
                    <p>Home</p>
                </Link>
            </li>
            <li className="flex justify-center items-center">
                <Link href="/courses">
                    <p>Courses</p>
                </Link>
            </li>
            <li className="flex justify-center items-center">
                <Link href="/help">
                    <p>Help</p>
                </Link>
            </li>
        </ul>
    )
}