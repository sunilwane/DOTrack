import { Card, CardBody, Chip } from "@heroui/react";
import { Skeleton } from "../Skeleton";

export interface StatItem {
    label: string;
    value: string;
    chipText: string;
    chipType?: "success" | "purple" | "slate";
    icon?: React.ReactNode;
}

interface StatsGridProps {
    stats: StatItem[];
    isLoading?: boolean;
}

const StatsGrid = ({ stats, isLoading }: StatsGridProps) => {
    const getChipClass = (type?: string) => {
        switch (type) {
            case "success":
                return "bg-nexus-success/10 text-nexus-success border border-nexus-success/20 font-bold";
            case "purple":
                return "bg-nexus-purple/10 text-nexus-purple border border-nexus-purple/20 font-bold";
            case "slate":
            default:
                return "bg-slate-500/10 text-slate-400 border border-slate-500/20 font-bold";
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
                <Card key={index} className="bg-nexus-card border border-nexus-border shadow-none" radius="none">
                    <CardBody className="flex-row justify-between items-start p-4">
                        <div className="space-y-1">
                            <Skeleton isLoaded={!isLoading} width="80px" height="16px">
                                <p className="text-gray-400 text-sm">
                                    {stat.label}
                                </p>
                            </Skeleton>
                            <div className="flex items-center gap-3 mt-2">
                                <Skeleton isLoaded={!isLoading} width="60px" height="32px">
                                    <span className="text-2xl font-bold">{stat.value}</span>
                                </Skeleton>
                                <Skeleton isLoaded={!isLoading} width="50px" height="20px">
                                    <Chip
                                        size="sm"
                                        variant="flat"
                                        className={`${getChipClass(stat.chipType)} h-5 text-[10px] px-1 min-w-0`}
                                    >
                                        {stat.chipText}
                                    </Chip>
                                </Skeleton>
                            </div>
                        </div>
                        {stat.icon && (
                            <Skeleton isLoaded={!isLoading} width="40px" height="40px">
                                <div className="text-white/10 mt-1">
                                    {stat.icon}
                                </div>
                            </Skeleton>
                        )}
                    </CardBody>
                </Card>
            ))}
        </div>
    );
};

export default StatsGrid;
