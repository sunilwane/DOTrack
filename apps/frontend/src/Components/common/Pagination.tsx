import { Button, Select, SelectItem } from "@heroui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange?: (page: number) => void;
    onItemsPerPageChange?: (itemsPerPage: number) => void;
}

const ITEMS_PER_PAGE_OPTIONS = [8, 16, 24, 32];

const Pagination = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
    onItemsPerPageChange,
}: PaginationProps) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');
            
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
            
            if (currentPage < totalPages - 2) pages.push('...');
            pages.push(totalPages);
        }
        return pages;
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && onPageChange) {
            onPageChange(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400 text-sm">
            <div className="flex items-center gap-4">
                <p className="text-xs">
                    Showing <span className="font-semibold text-white">{start}-{end}</span> of{" "}
                    <span className="font-semibold text-white">{totalItems.toLocaleString()}</span>
                </p>
                
                {onItemsPerPageChange && (
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">Per page:</span>
                        <Select
                            size="sm"
                            selectedKeys={[itemsPerPage.toString()]}
                            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                            className="w-20"
                            classNames={{
                                trigger: "bg-slate-800 border-slate-700 data-[hover=true]:bg-slate-700 h-8 min-h-8",
                                value: "text-xs text-white font-semibold",
                                popoverContent: "bg-slate-800 border border-slate-700"
                            }}
                        >
                            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                                <SelectItem 
                                    key={option.toString()}
                                    className="text-white data-[hover=true]:bg-slate-700"
                                >
                                    {option}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                )}
            </div>

            <div className="flex gap-1.5 items-center">
                {/* Previous Button */}
                <Button
                    size="sm"
                    variant="bordered"
                    isIconOnly
                    onClick={() => handlePageChange(currentPage - 1)}
                    isDisabled={currentPage === 1}
                    className="pagination-icon-btn !text-white border-slate-700 hover:bg-slate-800 hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed h-8 min-w-8"
                    style={{ color: 'white' }}
                >
                    <ChevronLeftIcon size={20} />
                </Button>

                {/* Page Numbers */}
                <div className="flex gap-1.5">
                    {getPageNumbers().map((page, index) => (
                        <div key={index}>
                            {page === '...' ? (
                                <span className="flex items-center justify-center h-8 w-8 text-slate-500">•••</span>
                            ) : (
                                <Button
                                    size="sm"
                                    variant={currentPage === page ? "solid" : "bordered"}
                                    onClick={() => handlePageChange(page as number)}
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

                {/* Next Button */}
                <Button
                    size="sm"
                    variant="bordered"
                    isIconOnly
                    onClick={() => handlePageChange(currentPage + 1)}
                    isDisabled={currentPage === totalPages}
                    className="pagination-icon-btn !text-white border-slate-700 hover:bg-slate-800 hover:border-primary disabled:opacity-30 disabled:cursor-not-allowed h-8 min-w-8"
                    style={{ color: 'white' }}
                >
                    <ChevronRightIcon size={20} />
                </Button>
            </div>
        </div>
    );
};

export default Pagination;
