import * as React from "react";
import { useEffect, useState } from "react";
import { SimpleTooltip } from "../../Components/common/SimpleTooltip";
import type { ProjectCardData } from "../../mock/PagesMockData/projects";

interface Collaborator {
    id: number | string;
    login: string;
    avatar_url: string;
    html_url: string;
}

interface ProjectCardProps extends Partial<ProjectCardData> {
    name?: string;
    repo?: string;
    status?: 'healthy' | 'failing' | 'pending';
    pipelines?: number;
    lastSync?: string;
    icon?: string;
    iconColor?: string;
    ownerAvatarUrl?: string;
    repoId?: number | string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const ProjectCard: React.FC<ProjectCardProps> = ({
    name = 'Unknown',
    repo = 'unknown/repo',
    status = 'pending',
    pipelines = 0,
    lastSync = 'Never',
    icon = 'folder',
    iconColor = "text-primary",
    ownerAvatarUrl,
    repoId
}) => {
    const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
    const [isLoadingCollabs, setIsLoadingCollabs] = useState(true);

    useEffect(() => {
        const fetchCollaborators = async () => {
            if (!repo || !repoId) {
                setIsLoadingCollabs(false);
                return;
            }
            try {
                const [owner, repoName] = repo.split('/');
                if (!owner || !repoName) {
                    setIsLoadingCollabs(false);
                    return;
                }
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    setIsLoadingCollabs(false);
                    return;
                }
                const res = await fetch(
                    `${API_BASE_URL}/api/auth/github/repos/${owner}/${repoName}/collaborators`,
                    {
                        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                        credentials: 'include',
                    }
                );
                if (res.ok) {
                    const data = await res.json();
                    setCollaborators(Array.isArray(data) ? data : []);
                }
            } catch (e) {
                console.error('Error fetching collaborators:', e);
            } finally {
                setIsLoadingCollabs(false);
            }
        };
        fetchCollaborators();
    }, [repo, repoId]);
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
                    <div className="flex items-center h-8 relative" style={{ width: collaborators.length > 3 ? '80px' : `${Math.max(collaborators.length, 1) * 20 + 8}px` }}>
                        {isLoadingCollabs ? (
                            <div className="text-xs text-slate-400">Loading...</div>
                        ) : collaborators.length > 0 ? (
                            <>
                                {collaborators.slice(0, 3).map((collab, index) => (
                                    <SimpleTooltip
                                        key={collab.id}
                                        label={collab.login}
                                        placement="top"
                                    >
                                        <div
                                            className="w-8 h-8 rounded-full overflow-hidden border-2 border-white dark:border-[#161616] absolute flex-shrink-0"
                                            style={{ left: `${index * 20}px`, zIndex: 3 - index }}
                                        >
                                            <img
                                                src={collab.avatar_url}
                                                alt={collab.login}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </SimpleTooltip>
                                ))}
                                {collaborators.length > 3 && (
                                    <SimpleTooltip
                                        label={
                                            <div className="flex flex-col gap-1">
                                                <div className="font-semibold text-xs mb-1">More collaborators:</div>
                                                {collaborators.slice(3).map((c) => (
                                                    <div key={c.id} className="flex items-center gap-2">
                                                        <img src={c.avatar_url} alt={c.login} className="w-5 h-5 rounded-full" />
                                                        <span className="text-xs">{c.login}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        }
                                        placement="top"
                                    >
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 border-2 border-white dark:border-[#161616] absolute flex-shrink-0 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                                            style={{ left: `${Math.min(3, collaborators.length - 1) * 20}px`, zIndex: 0 }}
                                        >
                                            +{collaborators.length - 3}
                                        </div>
                                    </SimpleTooltip>
                                )}
                            </>
                        ) : ownerAvatarUrl ? (
                            <div
                                className="w-8 h-8 rounded-full overflow-hidden border-2 border-white dark:border-[#161616]"
                                title="Repository Owner"
                            >
                                <img
                                    src={ownerAvatarUrl}
                                    alt="Owner"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : null}
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
