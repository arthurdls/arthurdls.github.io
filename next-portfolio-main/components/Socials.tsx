import React from 'react';
import Link from 'next/link';
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter, FaLink } from 'react-icons/fa';
import { social } from '@/types/main';

const iconMap = { FaLinkedin, FaGithub, FaInstagram, FaTwitter } as const;

const Socials = ({ socials }: { socials: social[] }) => {
    return (
        <section id='socials' className="fixed xl:bottom-4 xl:left-4 2xl:bottom-10 2xl:left-10 hidden lg:flex flex-col gap-3 z-20">
            {socials.map((s: social) => (
                <Link href={s.link} target="_blank" rel="noreferrer" key={s.icon} className="btn-theme grid place-items-center p-3 hover:animate-bounce rounded-full">
                    {React.createElement(iconMap[s.icon as keyof typeof iconMap] ?? FaLink, {})}
                </Link>
            ))}
        </section>
    );
};

export default Socials