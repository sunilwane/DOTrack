import * as React from "react";
import { Button } from "../../Components/common/Button";
import { mockProjects, type ProjectCardData } from "../../mock/PagesMockData/projects";

interface ProjectCardProps extends ProjectCardData {}

const ProjectCard: React.FC<ProjectCardProps> = ({
    name,
    repo,
    status,
    pipelines,
    lastSync,
    icon,
    iconColor = "text-primary",
    collaborators
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
                    <div className="flex -space-x-2">
                        {Array.from({ length: collaborators }, (_, i) => (
                            <div
                                key={i}
                                className={`w-6 h-6 rounded-full border-2 border-white dark:border-[#161616] bg-slate-${(i + 2) * 100}`}
                            />
                        ))}
                    </div>
                    <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-colors">
                        <span className="material-symbols-outlined">settings</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const Projects: React.FC = () => {
    return (
        <div className="p-8 max-w-7xl mx-auto mt-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-lg font-bold dark:text-white tracking-tight">Active Projects</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Manage and monitor your decentralized repository pipelines.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    {/* <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                            search
                        </span>
                        <Input
                            className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary w-64 transition-all"
                            placeholder="Search projects..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div> */}
                    <Button
                        size="sm"
                        variant="primary"
                        icon={<span className="material-symbols-outlined text-lg">add</span>}
                    >
                        <span className="text-sm">Create New Project</span>
                    </Button>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockProjects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}

                {/* Create Project Placeholder Card */}
                <button className="bg-slate-50 dark:bg-slate-900/30 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-primary min-h-[280px]">
                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 group-hover:border-primary/50">
                        <span className="material-symbols-outlined">add_circle</span>
                    </div>
                    <div className="text-center">
                        <p className="font-bold text-sm">Create New Project</p>
                        <p className="text-[10px] opacity-70">Connect a new repository</p>
                    </div>
                </button>
            </div>

            {/* Footer Stats */}
            <div className="mt-12 flex flex-wrap items-center gap-8 px-6 py-4 bg-white dark:bg-[#161616] border border-slate-200 dark:border-slate-800 rounded-2xl">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <span className="material-symbols-outlined text-xl">rocket_launch</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Global Deployments
                        </p>
                        <p className="text-lg font-bold dark:text-white">1,284</p>
                    </div>
                </div>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                        <span className="material-symbols-outlined text-xl">cloud_done</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Success Rate
                        </p>
                        <p className="text-lg font-bold dark:text-white">99.2%</p>
                    </div>
                </div>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                        <span className="material-symbols-outlined text-xl">database</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Storage Used
                        </p>
                        <p className="text-lg font-bold dark:text-white">42.5 GB</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;
