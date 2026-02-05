import * as React from "react";
import { Logo } from "../Logo";
import { FooterLinks, SocialIcons } from "../../../mock/PagesMockData/LandingData";
import type { FooterColumn as FooterColumnType } from "types";

export const SocialLink: React.FC<{ icon: string }> = ({ icon }) => (
    <a className="text-slate-400 hover:text-primary transition-all hover:scale-110" href="#">
        <span className="material-symbols-outlined">{icon}</span>
    </a>
);

export const FooterColumn: React.FC<FooterColumnType> = ({ title, links }) => (
    <div className="flex flex-col gap-4">
        <h4 className="font-bold uppercase text-xs sm:text-sm tracking-widest text-slate-400">{title}</h4>
        <ul className="flex flex-col gap-2.5">
            {links.map((link, idx) => (
                <li key={idx}>
                    <a className="text-sm sm:text-base text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">{link}</a>
                </li>
            ))}
        </ul>
    </div>
);

export const LandingFooter: React.FC = () => {
    return (
        <footer className="w-full border-t border-slate-200 dark:border-[#282e39] pt-16 pb-12 bg-background-light dark:bg-background-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
                    <div className="md:col-span-5 flex flex-col gap-6 text-left">
                        <div className="flex items-center gap-3 text-primary">
                            <Logo />
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Nexus CI/CD</h2>
                        </div>
                        <div className="flex gap-5">
                            {SocialIcons.map((icon, index) => (
                                <SocialLink key={index} icon={icon} />
                            ))}
                        </div>
                    </div>
                    <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 text-left">
                        {FooterLinks.map((column, index) => (
                            <FooterColumn key={index} {...column} />
                        ))}
                    </div>
                </div>
                <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium">
                        © 2024 Nexus CI/CD Protocol. All rights reserved. Secured by Ethereum.
                    </p>
                </div>
            </div>
        </footer>
    );
};
