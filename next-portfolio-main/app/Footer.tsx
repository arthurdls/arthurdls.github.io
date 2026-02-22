import React, { useState, useEffect } from "react";
import { social } from "@/types/main";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter, FaLink } from "react-icons/fa";

const iconMap = { FaLinkedin, FaGithub, FaInstagram, FaTwitter } as const;

export default function Footer({ socials, name }: { socials: social[], name: string }) {

    const [mounted, setMounted] = useState(false)
    const { theme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <footer className="w-full bg-white dark:bg-grey-800 text-gray-500 dark:text-gray-300">

            <div className="xl:max-w-6xl mx-auto md:mx-6 lg:mx-10 xl:mx-auto py-4 lg:py-6 flex flex-col-reverse md:flex-row gap-2 md:gap-0 justify-between items-center">

                <p className="text-sm mt-2 md:mt-0">Made with
                    <span className="animate-pulse"> ❤️ </span>
                    by
                    <span className="text-blue-600"> {name}</span></p>

                <div className="hidden xl:flex items-center gap-2">
                    <Link href={'https://nextjs.org'} target="_blank">
                        <Image alt="Next.js" width={45} height={45} src="/nextjs.svg" className={`${mounted && theme === 'dark' ? 'invert' : 'invert-0'} opacity-80 hover:opacity-100 transition-opacity`} />
                    </Link>
                </div>

                {/* Social Links */}
                <div className="flex xl:hidden items-center gap-2">
                    {socials.map((s: social, ) => (
                        <Link href={s.link} target="_blank" rel="noreferrer" key={s.icon} className="grid place-items-center p-3 rounded-full text-lg hover:bg-gray-100 hover:dark:bg-grey-900 transition-colors">
                            {React.createElement(iconMap[s.icon as keyof typeof iconMap] ?? FaLink, {})}
                        </Link>
                    ))}
                </div>

            </div>

            <div className="xl:max-w-6xl mx-auto md:mx-6 lg:mx-10 xl:mx-auto pb-4 text-center">
                <p className="text-xs text-gray-400 dark:text-gray-500">
                    Portfolio template by{" "}
                    <Link href="https://github.com/jigar-sable/next-portfolio" target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        jigar-sable/next-portfolio
                    </Link>
                </p>
            </div>

        </footer>
    )
}