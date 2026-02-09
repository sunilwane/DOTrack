import * as React from "react";
import type { PipelineStage } from "types";

interface Props {
    stages: PipelineStage[];
}

export const PipelineTracker: React.FC<Props> = ({ stages }) => {
    return (
        <div className="flex items-center justify-between relative w-full px-4">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200 dark:bg-slate-700 -translate-y-1/2 z-0"></div>
            <div
                className="absolute top-1/2 left-0 h-[1px] bg-primary -translate-y-1/2 z-0 transition-all duration-1000"
                style={{ width: `${stages.length > 1 ? (stages.filter(s => s.status === 'done').length / (stages.length - 1)) * 100 : 0}%` }}
            ></div>

            {stages.map((stage, index) => (
                <div key={index} className={`relative z-10 flex flex-col items-center gap-3 transition-all duration-500 ${stage.status === 'pending' ? 'opacity-40' : ''}`}>
                    <div
                        className={
                            `
                                flex items-center justify-center shadow-lg transition-all duration-500
                                ${stage.status === 'done' ? 'size-10 rounded-full bg-accent-emerald text-white' : ''}
                                ${stage.status === 'active' ? 'size-12 rounded-full bg-primary text-white outline outline-4 outline-background-dark shadow-primary/20 scale-110' : ''}
                                ${stage.status === 'pending' ? 'size-10 rounded-full bg-slate-700 text-slate-400' : ''}
                            `
                        }
                    >
                        <span className={`material-symbols-outlined text-[20px] ${stage.status === 'active' && stage.icon === 'progress_activity' ? 'animate-spin' : stage.status === 'active' && stage.icon === 'pen_size_2' ? 'animate-pulse' : ''}`}>
                            {stage.icon}
                        </span>
                    </div>
                    <div className="text-center">
                        <p className={`text-[10px] font-bold uppercase tracking-tight ${stage.status === 'active' ? 'text-primary' : stage.status === 'pending' ? 'text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                            {stage.label}
                        </p>
                        <p className={`text-[9px] font-mono tracking-tighter ${stage.status === 'pending' ? 'text-slate-600' : 'text-slate-500'}`}>
                            {stage.time}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PipelineTracker;
