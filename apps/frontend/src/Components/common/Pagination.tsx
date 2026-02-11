import { Button } from "@heroui/react";

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange?: (page: number) => void;
}

const Pagination = ({
    totalItems,
    itemsPerPage,
    currentPage,
}: PaginationProps) => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="flex justify-between items-center text-gray-400 text-xs">
            <p>
                Showing <b className="text-white font-medium">{start}-{end}</b> of{" "}
                <b className="text-white font-medium">{totalItems.toLocaleString()}</b>
            </p>

            <div className="flex gap-1.5">
                <Button size="sm" variant="bordered" className="border-nexus-border text-gray-400 h-7 px-3 text-xs min-w-0">
                    Prev
                </Button>

                <Button size="sm" color="primary" className="bg-nexus-primary h-7 min-w-[28px] px-0 text-xs font-bold">
                    1
                </Button>

                <Button size="sm" variant="bordered" className="border-nexus-border text-gray-400 h-7 min-w-[28px] px-0 text-xs">
                    2
                </Button>

                <Button size="sm" variant="bordered" className="border-nexus-border text-gray-400 h-7 min-w-[28px] px-0 text-xs">
                    3
                </Button>

                <Button size="sm" variant="bordered" className="border-nexus-border text-gray-400 h-7 px-3 text-xs min-w-0">
                    Next
                </Button>
            </div>
        </div>
    );
};

export default Pagination;
