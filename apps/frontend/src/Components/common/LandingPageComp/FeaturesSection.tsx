import * as React from "react";
import { FeatureCard } from "../FeatureCard";
import { LandingFeatures } from "../../../mock/PagesMockData/LandingData";

export const FeaturesSection: React.FC = () => {
    return (
        <section className="w-full py-20 sm:py-24 lg:py-32 bg-slate-50 dark:bg-[#0d1117]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16">
                    <div className="max-w-[600px] text-left">
                        <h2 className="text-3xl sm:text-4xl font-black mb-4 text-slate-900 dark:text-white">
                            Core Ecosystem Features
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">
                            Everything you need to ship secure, decentralised software
                            at scale without the friction of traditional web2 gates.
                        </p>
                    </div>
                    <a className="text-primary font-bold flex items-center gap-2 group w-fit" href="#">
                        Explore full docs
                        <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </a>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-6 sm:gap-6 lg:gap-8">
                    {LandingFeatures.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};
