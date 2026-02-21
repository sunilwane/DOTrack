import { useMemo, useState } from 'react';
import Pagination from '../../Components/common/Pagination';
import { Skeleton } from '../../Components/Skeleton';
import { usePageLoading, useFetch } from '../../hooks';
import { githubService } from '../../services/githubService';
import { DEFAULT_PAGE_SIZE } from '../../constants';
import ProjectsGrid from './components/ProjectsGrid';
import ProjectsHeader from './components/ProjectsHeader';
import ProjectsStats from './components/ProjectsStats';

const ITEMS_PER_PAGE = DEFAULT_PAGE_SIZE;

const Projects = () => {
  const { isLoading: isSimulatingLoad } = usePageLoading('projects');
  const { data: repos, loading: isLoadingRepos } = useFetch(
    () => githubService.getRepos(),
    { immediate: true }
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

  const paginatedRepos = useMemo(
    () => (repos || []).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [repos, currentPage, itemsPerPage]
  );

  const showSkeletons = isLoadingRepos || isSimulatingLoad;

  return (
    <div className="p-8 max-w-7xl mx-auto mt-8">
      <ProjectsHeader showSkeletons={showSkeletons} />

      <ProjectsGrid showSkeletons={showSkeletons} repos={paginatedRepos} />

      {!showSkeletons && (repos || []).length > 0 && (
        <div className="sticky bottom-0 z-50 bg-[#0a0f1e]/95 backdrop-blur-sm border-t border-slate-800 p-4 mt-8 -mx-8">
          <Skeleton isLoaded={!showSkeletons} width="100%" height="40px">
            <Pagination
              totalItems={(repos || []).length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={(nextItemsPerPage: number) => {
                setItemsPerPage(nextItemsPerPage);
                setCurrentPage(1);
              }}
            />
          </Skeleton>
        </div>
      )}

      <ProjectsStats showSkeletons={showSkeletons} />
    </div>
  );
};

export default Projects;
