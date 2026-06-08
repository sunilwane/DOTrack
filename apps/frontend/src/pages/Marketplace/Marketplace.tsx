import { Footer } from '../../Components/layout/Footer';
import Pagination from '../../Components/common/Pagination';
import { Skeleton } from '../../Components/Skeleton';
import { usePageLoading } from '../../hooks/usePageLoading';
import MarketplaceFilters from './components/MarketplaceFilters';
import MarketplaceGrid from './components/MarketplaceGrid';
import MarketplaceHero from './components/MarketplaceHero';
import { ConfirmPopUp } from './ConfirmPopUp';
import { useMarketplaceFilters } from './hooks/useMarketplaceFilters';

const MarketPlace = () => {
  const { isLoading } = usePageLoading('marketplace');
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedQuickFilter,
    setSelectedQuickFilter,
    currentPage,
    setCurrentPage,
    filteredTemplates,
    displayedTemplates,
    showConfirmPopup,
    selectedTemplate,
    handleDeploy,
    handleConfirmDeploy,
    handleClosePopup,
    itemsPerPage,
  } = useMarketplaceFilters();

  return (
    <div className="bg-background-light dark:bg-background-dark text-white min-h-screen">
      <main className="flex flex-1 justify-center py-5 px-2 lg:px-10">
        <div className="layout-content-container flex flex-col max-w-[1400px] flex-1">
          <MarketplaceHero isLoading={isLoading} />

          <MarketplaceFilters
            isLoading={isLoading}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            selectedQuickFilter={selectedQuickFilter}
            onSearchQueryChange={setSearchQuery}
            onSelectedCategoryChange={setSelectedCategory}
            onSelectedQuickFilterChange={setSelectedQuickFilter}
          />

          <MarketplaceGrid
            isLoading={isLoading}
            templates={displayedTemplates}
            onDeploy={handleDeploy}
          />

          <div className="mt-12">
            <Skeleton isLoaded={!isLoading} width="100%" height="40px" className="rounded-xl">
              <Pagination
                totalItems={filteredTemplates.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </Skeleton>
          </div>
        </div>
      </main>

      <ConfirmPopUp
        isOpen={showConfirmPopup}
        onClose={handleClosePopup}
        onConfirm={handleConfirmDeploy}
        template={selectedTemplate}
      />
      <Footer />
    </div>
  );
};

export default MarketPlace;
