import * as React from "react";
import { Card, CardBody } from "@heroui/react";

interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
    icon,
    title,
    description,
}) => (
    <Card
        className="flex flex-col gap-3 sm:gap-4 p-5 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161b25] hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 text-left group"
        shadow="none"
        radius="none"
    >
        <CardBody className="p-0 flex flex-col gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-1 sm:mb-2 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[20px] sm:text-[24px]">{icon}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-[13px] sm:text-sm md:text-base leading-relaxed">
                {description}
            </p>
        </CardBody>
    </Card>
);
