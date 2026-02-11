import * as React from "react";
import { Button } from "../../Components/common/Button";
import ProjectCard from "./ProjectCard";
import { mockProjects } from "../../mock/PagesMockData/projects";

const Projects: React.FC = () => {
    return (
        <div className="p-8 max-w-7xl mx-auto mt-8">
           
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-lg font-bold dark:text-white tracking-tight">Active Projects</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Manage and monitor your decentralized repository pipelines.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Button
                        size="sm"
                        variant="primary"
                        icon={<span className="material-symbols-outlined text-lg">add</span>}
                    >
                        <span className="text-sm">Create New Project</span>
                    </Button>
                </div>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mockProjects.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}

                
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
