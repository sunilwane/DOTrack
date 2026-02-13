import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "../../Components/common/Button";
import ProjectCard from "./ProjectCard";
import Pagination from "../../Components/common/Pagination";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

interface GithubRepo {
    id: number | string;
    name: string;
    full_name: string;
    owner?: { avatar_url: string };
    updated_at: string;
    open_issues_count?: number;
}

const ITEMS_PER_PAGE = 8;

const Projects: React.FC = () => {
    const [repos, setRepos] = useState<GithubRepo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    setIsLoading(false);
                    return;
                }
                const res = await fetch(`${API_BASE_URL}/api/auth/github/repos`, {
                    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                    credentials: 'include',
                });
                if (!res.ok) {
                    setIsLoading(false);
                    return;
                }
                const data = await res.json();
                setRepos(data || []);
            } catch (e) {
                console.error('Error fetching repos:', e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRepos();
    }, []);

    const paginatedRepos = repos.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

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
                        variant="secondary"
                        onClick={() => navigate("/projects/deploy-request")}
                    >
                        <span className="text-sm">Deploy</span>
                    </Button>
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
                {isLoading ? (
                    <div className="col-span-full flex items-center justify-center py-12">
                        <div className="text-slate-500 dark:text-slate-400">Loading repositories...</div>
                    </div>
                ) : repos.length === 0 ? (
                    <div className="col-span-full flex items-center justify-center py-12">
                        <div className="text-slate-500 dark:text-slate-400">No repositories found.</div>
                    </div>
                ) : (
                    paginatedRepos.map((repo) => (
                        <ProjectCard
                            key={repo.id}
                            name={repo.name}
                            repo={repo.full_name}
                            ownerAvatarUrl={repo.owner?.avatar_url}
                            repoId={repo.id}
                            status={repo.open_issues_count === 0 ? 'healthy' : repo.open_issues_count && repo.open_issues_count > 5 ? 'failing' : 'pending'}
                            pipelines={0}
                            lastSync={new Date(repo.updated_at).toLocaleDateString()}
                            icon="folder"
                        />
                    ))
                )}

                {!isLoading && repos.length > 0 && (
                    <button className="bg-slate-50 dark:bg-slate-900/30 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-primary min-h-[280px]">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 group-hover:border-primary/50">
                            <span className="material-symbols-outlined">add_circle</span>
                        </div>
                        <div className="text-center">
                            <p className="font-bold text-sm">Create New Project</p>
                            <p className="text-[10px] opacity-70">Connect a new repository</p>
                        </div>
                    </button>
                )}
            </div>

            {!isLoading && repos.length > 0 && (
                <div className="sticky bottom-0 bg-[#0a0f1e]/95 backdrop-blur-sm border-t border-slate-800 p-4 mt-8 -mx-8">
                    <Pagination
                        totalItems={repos.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        onItemsPerPageChange={handleItemsPerPageChange}
                    />
                </div>
            )}

            
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
