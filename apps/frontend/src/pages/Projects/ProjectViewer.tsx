import { RepoStateProvider } from '../../contexts/RepoState';
import ProjectViewerContent from './projectViewer/ProjectViewerContent';

const ProjectViewer = () => (
  <RepoStateProvider>
    <ProjectViewerContent />
  </RepoStateProvider>
);

export default ProjectViewer;
