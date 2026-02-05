import * as React from "react";
import { Card, CardBody } from "@heroui/react";
import { ComparisonData } from "../../../mock/PagesMockData/LandingData";
import type { ComparisonCardData } from "types";

export const ComparisonCard: React.FC<ComparisonCardData> = ({ variant, title, items }) => {
    const isNexus = variant === "nexus";
    const baseCardClass = "flex flex-col gap-6 p-5 sm:p-8 rounded-2xl shadow-none";
    const cardStyles = isNexus
        ? "border-2 border-primary/50 bg-primary/5 relative overflow-hidden group"
        : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161b25]";

    return (
        <Card className={`${baseCardClass} ${cardStyles} text-left`} shadow="none" radius="none">
            {isNexus && (
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none text-primary">
                    <span className="material-symbols-outlined text-7xl sm:text-8xl lg:text-9xl font-light">verified</span>
                </div>
            )}
            <CardBody className="p-0 flex flex-col gap-6 relative z-10">
                <div className={`flex items-center gap-3 mb-2 sm:mb-4 ${isNexus ? 'text-primary' : 'text-red-500'}`}>
                    <span className="material-symbols-outlined">{isNexus ? 'task_alt' : 'warning'}</span>
                    <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
                </div>
                <div className="space-y-6 sm:space-y-8">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                            <div className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${isNexus ? 'bg-primary/10 text-primary' : 'bg-red-500/10 text-red-500'}`}>
                                <span className="material-symbols-outlined text-xs sm:text-sm">{item.icon}</span>
                            </div>
                            <div>
                                <h4 className="font-bold mb-1 text-sm sm:text-base text-slate-900 dark:text-white">{item.title}</h4>
                                <p className={`text-[13px] sm:text-sm leading-relaxed ${isNexus ? 'text-slate-600 dark:text-slate-400' : 'text-slate-500'}`}>
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
};

export const ComparisonSection: React.FC = () => {
    return (
        <section className="w-full py-20 sm:py-24 lg:py-32 bg-background-light dark:bg-background-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight text-slate-900 dark:text-white">
                        Traditional vs. Decentralized DevOps
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
                        Moving away from centralized bottlenecks towards a
                        transparent and immutable future where code is law.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                    <ComparisonCard {...ComparisonData.centralized} />
                    <ComparisonCard {...ComparisonData.nexus} />
                </div>
            </div>
        </section>
    );
};
