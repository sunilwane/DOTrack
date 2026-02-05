import * as React from "react";
import {
    Chip,
    Button,
} from "@heroui/react";
import { Folder, Link as LinkIcon, Calendar, ChevronDown, RefreshCw } from "lucide-react";

import { Check } from "lucide-react";

const MiniCheckbox: React.FC<{ label: string; defaultSelected?: boolean }> = ({ label, defaultSelected = false }) => {
    const [isSelected, setIsSelected] = React.useState(defaultSelected);
    return (
        <div
            className="flex items-center gap-1.5 cursor-pointer group"
            onClick={() => setIsSelected(!isSelected)}
        >
            <div className={`
                size-3 rounded-[3px] flex items-center justify-center transition-all border
                ${isSelected
                    ? 'bg-primary border-primary'
                    : 'bg-transparent border-slate-700 group-hover:border-slate-500'}
            `}>
                {isSelected && <Check size={8} strokeWidth={4} className="text-white" />}
            </div>
            <span className="text-[10px] font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
                {label}
            </span>
        </div>
    );
};

const ProjectFilter: React.FC = () => {
    return (
        <div className="bg-slate-400/10 border border-white/5 rounded-xl p-3  h-[200px] flex flex-col w-[200px] mx-auto overflow-hidden">
            <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[#4c8df6]">
                        <Folder size={12} fill="currentColor" fillOpacity={0.2} />
                        <h3 className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                            Active Project
                        </h3>
                    </div>
                    <button className="text-white/40 hover:text-primary transition-colors cursor-pointer p-1 -mr-1">
                        <RefreshCw size={12} />
                    </button>
                </div>

                <div className="space-y-0.2 mt-0">
                    <p className="text-xs font-bold text-white tracking-tight truncate">
                        open-source-kernel-v2
                    </p>
                    <div className="flex items-center gap-1 text-[9px] text-slate-500 font-mono">
                        <LinkIcon size={8} />
                        <span>0x2f89...c421</span>
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">
                        Date Range
                    </label>
                    <div className="flex items-center justify-between bg-[#161d2b] border border-slate-800 rounded-md px-2 py-1.5 cursor-pointer hover:border-slate-700 transition-colors group">
                        <div className="flex items-center gap-2">
                            <Calendar size={12} className="text-[#4c8df6]" />
                            <span className="text-[10px] font-medium text-slate-200">Last 30 Days</span>
                        </div>
                        <ChevronDown size={10} className="text-slate-600 group-hover:text-slate-400" />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">
                        Action Type
                    </label>
                    <div className="flex flex-row gap-3 items-center">
                        <MiniCheckbox label="Deployments" defaultSelected />
                        <MiniCheckbox label="Approvals" defaultSelected />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectFilter;
