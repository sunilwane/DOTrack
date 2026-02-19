import { Select, SelectItem } from '@heroui/react';
import { Skeleton } from '../../Skeleton';

const ITEMS_PER_PAGE_OPTIONS = [8, 16, 24, 32];

interface ItemsPerPageSelectProps {
  isLoading?: boolean;
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const ItemsPerPageSelect = ({
  isLoading,
  itemsPerPage,
  onItemsPerPageChange,
}: ItemsPerPageSelectProps) => (
  <div className="flex items-center gap-2">
    <Skeleton isLoaded={!isLoading} width="60px" height="12px">
      <span className="text-xs text-slate-400">Per page:</span>
    </Skeleton>
    <Skeleton isLoaded={!isLoading} width="92px" height="32px">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-white w-6 text-right">{itemsPerPage}</span>
        <Select
          size="sm"
          selectedKeys={[itemsPerPage.toString()]}
          onChange={(event) => onItemsPerPageChange(Number(event.target.value))}
          className="w-10"
          classNames={{
            trigger:
              'flex items-center justify-center bg-slate-800 border-slate-700 data-[hover=true]:bg-slate-700 h-8 min-h-8 px-2',
            value: 'sr-only',
            popoverContent: 'bg-slate-800 border border-slate-700 min-w-[4.5rem]',
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
    </Skeleton>
  </div>
);

export default ItemsPerPageSelect;
