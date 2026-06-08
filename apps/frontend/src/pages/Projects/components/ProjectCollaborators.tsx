import { SimpleTooltip } from '../../../Components/common/SimpleTooltip';
import type { GithubCollaborator } from '../../../services/githubService';

interface ProjectCollaboratorsProps {
  collaborators: GithubCollaborator[];
  ownerAvatarUrl?: string;
}

const ProjectCollaborators = ({
  collaborators,
  ownerAvatarUrl,
}: ProjectCollaboratorsProps) => (
  <div
    className="flex items-center h-8 relative"
    style={{
      width: collaborators.length > 3 ? '80px' : `${Math.max(collaborators.length, 1) * 20 + 8}px`,
    }}
  >
    {collaborators.length > 0 ? (
      <>
        {collaborators.slice(0, 3).map((collaborator, index) => (
          <SimpleTooltip
            key={collaborator.id}
            label={collaborator.login}
            placement="top"
            style={{ left: `${index * 20}px`, zIndex: 3 - index, position: 'absolute' }}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white dark:border-[#161616] flex-shrink-0">
              <img
                src={collaborator.avatar_url}
                alt={collaborator.login}
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
                {collaborators.slice(3).map((collaborator) => (
                  <div key={collaborator.id} className="flex items-center gap-2">
                    <img
                      src={collaborator.avatar_url}
                      alt={collaborator.login}
                      className="w-5 h-5 rounded-full"
                    />
                    <span className="text-xs">{collaborator.login}</span>
                  </div>
                ))}
              </div>
            }
            placement="top"
            style={{
              left: `${Math.min(3, collaborators.length - 1) * 20}px`,
              zIndex: 0,
              position: 'absolute',
            }}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 border-2 border-white dark:border-[#161616] flex-shrink-0 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
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
        <img src={ownerAvatarUrl} alt="Owner" className="w-full h-full object-cover" />
      </div>
    ) : null}
  </div>
);

export default ProjectCollaborators;
