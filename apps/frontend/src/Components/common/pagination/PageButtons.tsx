import { Button } from '@heroui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '../../icons';
import { Skeleton } from '../../Skeleton';
import { getPageNumbers } from './paginationUtils';

interface PageButtonsProps {
  isLoading?: boolean;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PageButtons = ({ isLoading, totalPages, currentPage, onPageChange }: PageButtonsProps) => (
  <div className="flex gap-1.5 items-center">
    <Skeleton isLoaded={!isLoading} width="32px" height="32px" className="rounded">
      <Button
        size="sm"
        variant="bordered"
        isIconOnly
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        className="pagination-icon-btn !text-white border-slate-700 hover:bg-slate-800 hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed h-8 min-w-8"
        style={{ color: 'white' }}
      >
        <ChevronLeftIcon size={20} />
      </Button>
    </Skeleton>

    <div className="flex gap-1.5">
      {isLoading
        ? Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} isLoaded={false} width="32px" height="32px" className="rounded" />
          ))
        : getPageNumbers(totalPages, currentPage).map((page, index) => (
            <div key={index}>
              {page === '...' ? (
                <span className="flex items-center justify-center h-8 w-8 text-slate-500">...</span>
              ) : (
                <Button
                  size="sm"
                  variant={currentPage === page ? 'solid' : 'bordered'}
                  onClick={() => onPageChange(page as number)}
                  className={`h-8 min-w-8 px-2 text-xs font-semibold ${
                    currentPage === page
                      ? 'bg-primary border-primary text-white'
                      : 'border-slate-700 text-white hover:bg-slate-800 hover:border-primary'
                  }`}
                >
                  {page}
                </Button>
              )}
            </div>
          ))}
    </div>

    <Skeleton isLoaded={!isLoading} width="32px" height="32px" className="rounded">
      <Button
        size="sm"
        variant="bordered"
        isIconOnly
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages || totalPages === 0}
        className="pagination-icon-btn !text-white border-slate-700 hover:bg-slate-800 hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed h-8 min-w-8"
        style={{ color: 'white' }}
      >
        <ChevronRightIcon size={20} />
      </Button>
    </Skeleton>
  </div>
);

export default PageButtons;
