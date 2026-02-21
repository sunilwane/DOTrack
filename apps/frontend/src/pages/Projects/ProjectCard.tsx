import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProjectCardData } from '../../mock/PagesMockData/projects';
import ProjectCollaborators from './components/ProjectCollaborators';
import { useRepoCollaborators } from './hooks/useRepoCollaborators';
import { getProjectRoute } from './projectCardUtils';

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

const statusConfig = {
  healthy: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-500',
    border: 'border-emerald-500/20',
    label: 'Healthy',
    dot: 'bg-emerald-500 animate-pulse',
  },
  failing: {
    bg: 'bg-red-500/10',
    text: 'text-red-500',
    border: 'border-red-500/20',
    label: 'Failing',
    dot: 'bg-red-500',
  },
  pending: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-500',
    border: 'border-amber-500/20',
    label: 'Pending',
    dot: 'bg-amber-500',
  },
} as const;

const ProjectCard: React.FC<ProjectCardProps> = ({
  name = 'Unknown',
  repo = 'unknown/repo',
  status = 'pending',
  pipelines = 0,
  lastSync = 'Never',
  icon = 'folder',
  iconColor = 'text-primary',
  ownerAvatarUrl,
  repoId,
}) => {
  const collaborators = useRepoCollaborators({ repo, repoId });
  const navigate = useNavigate();
  const projectRoute = getProjectRoute(repo);
  const config = statusConfig[status];

  const openProject = () => {
    if (!projectRoute) return;
    navigate(projectRoute);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={openProject}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          openProject();
        }
      }}
      className="bg-white dark:bg-[#161616] border border-primary/50 rounded-xl p-5 transition-all group relative overflow-hidden cursor-pointer"
    >
      <div className="absolute top-0 right-0 p-3">
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${config.bg} ${config.text} text-[10px] font-bold uppercase tracking-wider border ${config.border}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
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
          <ProjectCollaborators collaborators={collaborators} ownerAvatarUrl={ownerAvatarUrl} />
          <button
            className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 transition-colors"
            aria-label="Project settings"
          >
            <span className="material-symbols-outlined text-sm">settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
