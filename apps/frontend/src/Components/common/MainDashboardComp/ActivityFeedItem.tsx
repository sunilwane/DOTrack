import React from "react";
import { Bitcoin, Code, Rocket, Landmark } from "lucide-react";
import type { MainDashboardActivity } from "types";
import { Button } from "../Button";

interface ActivityFeedItemProps {
    activity: MainDashboardActivity;
}

const feedAccentStyles = {
    blue: "border-l-blue-600",
    emerald: "border-l-emerald-500"
} as const;

const feedIconStyles = {
    blue: "bg-blue-600/10 text-blue-600",
    emerald: "bg-emerald-500/10 text-emerald-500"
} as const;

const actionStyles = {
    blue: "text-blue-600",
    emerald: "text-emerald-500"
} as const;

const activityIconByKey: Record<MainDashboardActivity["icon"], React.ReactNode> = {
    bitcoin: <Bitcoin size={20} />,
    code: <Code size={20} />,
    rocket: <Rocket size={20} />,
    landmark: <Landmark size={20} />
};

export const ActivityFeedItem: React.FC<ActivityFeedItemProps> = ({ activity }) => {
    return (
        <div
            className={` p-4 rounded-xl border border-slate-200 dark:border-slate-800 border-l-4 ${feedAccentStyles[activity.accent]} flex items-center justify-between`}
        >
            <div className="flex items-center gap-4">
                <div className={`size-10 rounded-full flex items-center justify-center ${feedIconStyles[activity.accent]}`}>
                    {activityIconByKey[activity.icon]}
                </div>
                <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{activity.title}</h4>
                    <p className="text-xs text-slate-500">{activity.description}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{activity.time}</p>
                <Button
                    variant="ghost"
                    size="xs"
                    className={`h-auto px-0 mt-1 text-[10px] font-bold hover:bg-transparent ${actionStyles[activity.actionAccent]}`}
                >
                    {activity.actionLabel}
                </Button>
            </div>
        </div>
    );
};
