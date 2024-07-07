import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const inter = Poppins({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AdaptLearn",
    description: "The interactive & adaptive learning platform",
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-gradient-to-b from-nav from-10% via-blue-600 to-cyan-500 text-black overflow-hidden`}>
                {children}
            </body>
        </html>
    );
}
