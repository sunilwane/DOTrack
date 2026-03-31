import { Skeleton } from '../../../Components/Skeleton';
import {
  filterCategories,
  quickFilters,
} from '../../../mock/PagesMockData/Marketplace';

interface MarketplaceFiltersProps {
  isLoading: boolean;
  searchQuery: string;
  selectedCategory: string | null;
  selectedQuickFilter: string;
  onSearchQueryChange: (value: string) => void;
  onSelectedCategoryChange: (value: string | null) => void;
  onSelectedQuickFilterChange: (value: string) => void;
}

const MarketplaceFilters = ({
  isLoading,
  searchQuery,
  selectedCategory,
  selectedQuickFilter,
  onSearchQueryChange,
  onSelectedCategoryChange,
  onSelectedQuickFilterChange,
}: MarketplaceFiltersProps) => (
  <>
    <div className="pb-6 relative z-10">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <Skeleton isLoaded={!isLoading} width="100%" height="40px" className="flex-1 rounded-xl">
          <label className="flex flex-col min-w-30 h-10 w-full flex-1">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-lg">
              <div className="text-[#9ca6ba] flex border-none bg-[#282e39] items-center justify-center pl-4 rounded-l-xl">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-white focus:outline-0 focus:ring-1 focus:ring-primary border-none bg-[#282e39] h-full placeholder:text-[#9ca6ba] px-4 pl-2 text-base font-normal leading-normal font-display"
                placeholder="  (e.g. Node.js K8s, React AWS, Zero-trust)..."
                value={searchQuery}
                onChange={(event) => onSearchQueryChange(event.target.value)}
              />
            </div>
          </label>
        </Skeleton>
        <div className="flex gap-2 w-full md:w-auto pb-2 md:pb-0">
          {filterCategories.map((category) => (
            <Skeleton
              key={category.name}
              isLoaded={!isLoading}
              width="140px"
              height="40px"
              className="rounded-xl"
            >
              <div className="relative">
                <button
                  className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#282e39] px-4 border border-white/5 hover:border-primary/50 transition-all w-full"
                  onClick={() =>
                    onSelectedCategoryChange(
                      selectedCategory === category.name ? null : category.name
                    )
                  }
                >
                  <span className="material-symbols-outlined text-sm">{category.icon}</span>
                  <p className="text-white text-sm font-medium">{category.name}</p>
                  <span className="material-symbols-outlined">keyboard_arrow_down</span>
                </button>

                {selectedCategory === category.name && (
                  <div className="absolute top-full mt-2 left-0 right-0 bg-[#1a1f2e] border border-white/10 rounded-xl shadow-xl z-[9999] overflow-hidden">
                    {category.options.map((option, index) => (
                      <button
                        key={option}
                        className={`w-full text-left px-4 py-3 text-sm text-white hover:bg-white/5 transition-colors ${
                          index < category.options.length - 1 ? 'border-b border-white/5' : ''
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Skeleton>
          ))}
        </div>
      </div>
    </div>

    <div className="flex gap-3 pb-8 flex-wrap">
      {quickFilters.map((filter) => (
        <Skeleton key={filter} isLoaded={!isLoading} width="85px" height="24px" className="rounded-full">
          <button
            className={`flex h-6 items-center justify-center gap-x-2 rounded-full px-4 border transition-colors ${
              selectedQuickFilter === filter
                ? 'bg-primary/20 border-primary/30'
                : 'bg-[#282e39] border-white/5 hover:bg-white/10'
            }`}
            onClick={() => onSelectedQuickFilterChange(filter)}
          >
            <p
              className={`text-xs font-bold uppercase tracking-wider ${
                selectedQuickFilter === filter ? 'text-primary' : 'text-white/70'
              }`}
            >
              {filter}
            </p>
          </button>
        </Skeleton>
      ))}
    </div>
  </>
);

export default MarketplaceFilters;
