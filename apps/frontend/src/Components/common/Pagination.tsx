import { Skeleton } from '../Skeleton';
import ItemsPerPageSelect from './pagination/ItemsPerPageSelect';
import PageButtons from './pagination/PageButtons';
import { getRange } from './pagination/paginationUtils';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  isLoading?: boolean;
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
  isLoading,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const { start, end } = getRange(totalItems, itemsPerPage, currentPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || !onPageChange) return;
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
      <div className="flex items-center gap-4">
        <Skeleton isLoaded={!isLoading} width="140px" height="16px">
          <p className="text-xs">
            Showing <span className="font-semibold text-white">{start}-{end}</span> of{' '}
            <span className="font-semibold text-white">{totalItems.toLocaleString()}</span>
          </p>
        </Skeleton>

        {onItemsPerPageChange && (
          <ItemsPerPageSelect
            isLoading={isLoading}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        )}
      </div>

      <PageButtons
        isLoading={isLoading}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Pagination;
