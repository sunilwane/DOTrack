import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Components/common/Button";
import Pagination from "../../Components/common/Pagination";
import { Skeleton } from "../../Components/Skeleton";
import ProjectCard from "./ProjectCard";
import { authService } from "../../services/authService";
import { githubService, type GithubRepo } from "../../services/githubService";

const ITEMS_PER_PAGE = 8;

const Projects: React.FC = () => {
    const [repos, setRepos] = useState<GithubRepo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSimulatingLoad, setIsSimulatingLoad] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setIsSimulatingLoad(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const token = authService.getAccessToken();
                if (!token) {
                    setIsLoading(false);
                    return;
                }
                const data = await githubService.getRepos();
                setRepos(data || []);
            } catch (e) {
                console.error("Error fetching repos:", e);
            } finally {
                setIsLoading(false);
            }
        };

        void fetchRepos();
    }, []);

    const paginatedRepos = repos.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    const showSkeletons = isLoading || isSimulatingLoad;

    return (
        <div className="p-8 max-w-7xl mx-auto mt-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <Skeleton isLoaded={!showSkeletons} width="180px" height="24px" className="mb-2">
                        <h2 className="text-lg font-bold dark:text-white tracking-tight">Active Projects</h2>
                    </Skeleton>
                    <Skeleton isLoaded={!showSkeletons} width="320px" height="16px">
                        <p className="text-slate-500 dark:text-slate-400 mt-1">
                            Manage and monitor your decentralized repository pipelines.
                        </p>
                    </Skeleton>
                </div>
                <div className="flex items-center gap-4">
                    <Skeleton isLoaded={!showSkeletons} variant="button" width="80px" height="32px">
                        <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => navigate("/projects/deploy-request")}
                        >
                            <span className="text-sm">Deploy</span>
                        </Button>
                    </Skeleton>
                    <Skeleton isLoaded={!showSkeletons} variant="button" width="160px" height="32px">
                        <Button
                            size="sm"
                            variant="primary"
                            icon={<span className="material-symbols-outlined text-lg">add</span>}
                        >
                            <span className="text-sm">Create New Project</span>
                        </Button>
                    </Skeleton>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {showSkeletons ? (
                    Array.from({ length: 8 }).map((_, i) => (
                        <Skeleton key={i} variant="project" height="280px" />
                    ))
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
                            status={
                                repo.open_issues_count === 0
                                    ? "healthy"
                                    : repo.open_issues_count && repo.open_issues_count > 5
                                        ? "failing"
                                        : "pending"
                            }
                            pipelines={0}
                            lastSync={new Date(repo.updated_at).toLocaleDateString()}
                            icon="folder"
                        />
                    ))
                )}

                {!showSkeletons && repos.length > 0 && (
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

            {!showSkeletons && repos.length > 0 && (
                <div className="sticky bottom-0 bg-[#0a0f1e]/95 backdrop-blur-sm border-t border-slate-800 p-4 mt-8 -mx-8">
                    <Skeleton isLoaded={!showSkeletons} width="100%" height="40px">
                        <Pagination
                            totalItems={repos.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                            onItemsPerPageChange={handleItemsPerPageChange}
                        />
                    </Skeleton>
                </div>
            )}

            <div className="mt-12 flex flex-wrap items-center gap-8 px-6 py-4 bg-white dark:bg-[#161616] border border-slate-200 dark:border-slate-800 rounded-2xl">
                {[
                    { label: "Global Deployments", value: "1,284", icon: "rocket_launch", color: "text-primary", bg: "bg-primary/10" },
                    { label: "Success Rate", value: "99.2%", icon: "cloud_done", color: "text-emerald-500", bg: "bg-emerald-500/10" },
                    { label: "Storage Used", value: "42.5 GB", icon: "database", color: "text-amber-500", bg: "bg-amber-500/10" },
                ].map((stat, i) => (
                    <React.Fragment key={i}>
                        <div className="flex items-center gap-3">
                            <Skeleton isLoaded={!showSkeletons} variant="circular" width="40px" height="40px" className="rounded-lg">
                                <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                                    <span className="material-symbols-outlined text-xl">{stat.icon}</span>
                                </div>
                            </Skeleton>
                            <div>
                                <Skeleton isLoaded={!showSkeletons} width="100px" height="10px" className="mb-1">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        {stat.label}
                                    </p>
                                </Skeleton>
                                <Skeleton isLoaded={!showSkeletons} width="80px" height="20px">
                                    <p className="text-lg font-bold dark:text-white">{stat.value}</p>
                                </Skeleton>
                            </div>
                        </div>
                        {i < 2 && <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden md:block"></div>}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Projects;
