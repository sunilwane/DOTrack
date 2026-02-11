import * as React from "react";
import type { ProjectCardData } from "../../mock/PagesMockData/projects";

interface ProjectCardProps extends ProjectCardData {}

const ProjectCard: React.FC<ProjectCardProps> = ({
    name,
    repo,
    status,
    pipelines,
    lastSync,
    icon,
    iconColor = "text-primary"
}) => {
    const statusConfig = {
        healthy: {
            bg: "bg-emerald-500/10",
            text: "text-emerald-500",
            border: "border-emerald-500/20",
            label: "Healthy",
            dot: "bg-emerald-500 animate-pulse"
        },
        failing: {
            bg: "bg-red-500/10",
            text: "text-red-500",
            border: "border-red-500/20",
            label: "Failing",
            dot: "bg-red-500"
        },
        pending: {
            bg: "bg-amber-500/10",
            text: "text-amber-500",
            border: "border-amber-500/20",
            label: "Pending",
            dot: "bg-amber-500"
        }
    };

    const config = statusConfig[status];

    return (
        <div className={`bg-white dark:bg-[#161616] border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-primary/50 transition-all group relative overflow-hidden`}>
            <div className="absolute top-0 right-0 p-3">
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bg} ${config.text} text-[10px] font-bold uppercase tracking-wider border ${config.border}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
                    {config.label}
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                    <span className={`material-symbols-outlined ${iconColor}`}>{icon}</span>
                </div>
                <div>
                    <h3 className="font-bold text-sm dark:text-white truncate">{name}</h3>
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mt-1">
                        <span className="material-symbols-outlined text-sm">link</span>
                        <span className="truncate">{repo}</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100 dark:border-slate-800/50">
                    <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Pipelines</p>
                        <p className="text-xl font-bold dark:text-white mt-1">
                            {pipelines} <span className="text-xs font-normal text-slate-500">Active</span>
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Last Sync</p>
                        <p className="text-sm font-medium dark:text-white mt-2">{lastSync}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {(() => {
                            const maxAvatars = 3;
                            const urls = Array.from({ length: maxAvatars }, (_, i) => `https://i.pravatar.cc/150?u=${encodeURIComponent(name)}-${i}`);
                            return urls.map((src, i) => (
                                <div key={i} className="w-8 h-8 rounded-full overflow-hidden border-2 border-white dark:border-[#161616]">
                                    <img src={src} alt={`${name}-collab-${i}`} className="w-full h-full object-cover" />
                                </div>
                            ));
                        })()}
                    </div>
                    <button className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-colors" aria-label="Project settings">
                        <span className="material-symbols-outlined text-sm">settings</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
