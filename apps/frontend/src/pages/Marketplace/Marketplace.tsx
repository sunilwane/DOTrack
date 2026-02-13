import { useState } from "react";
import { Footer } from "../../Components/layout/Footer";
import Pagination from "../../Components/common/Pagination";
import { TemplateCardComponent } from "../../Components/common/marketplace/TemplateCard";
import { ConfirmPopUp } from "./ConfirmPopUp";
import { marketplaceTemplates, filterCategories, quickFilters } from "../../mock/PagesMockData/Marketplace";
import type { TemplateCard } from "types";

const MarketPlace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedQuickFilter, setSelectedQuickFilter] = useState("Popular");
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateCard | null>(null);

  const handleDeploy = (template: TemplateCard) => {
    setSelectedTemplate(template);
    setShowConfirmPopup(true);
  };

  const handleConfirmDeploy = () => {
    console.log("Deploying template:", selectedTemplate?.title);
    // Add actual deployment logic here
    setShowConfirmPopup(false);
    setSelectedTemplate(null);
  };

  const handleClosePopup = () => {
    setShowConfirmPopup(false);
    setSelectedTemplate(null);
  };

  const itemsPerPage = 9;

  const filteredTemplates = marketplaceTemplates.filter(template => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchLower === "" ||
      template.title.toLowerCase().includes(searchLower) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
      template.author.address.toLowerCase().includes(searchLower);

    return matchesSearch;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedTemplates = filteredTemplates.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-background-light dark:bg-background-dark text-white min-h-screen">

      <main className="flex flex-1 justify-center py-5 px-2 lg:px-10">
        <div className="layout-content-container flex flex-col max-w-[1400px] flex-1">
          <div className="flex flex-col gap-2 pb-8">
            <h1 className="text-lg font-bold mb-1">
              Decentralized Pipeline Marketplace
            </h1>
            <p className="text-xs text-gray-400">
              Secure, immutable, and transparent CI/CD templates stored on IPFS and verified by the blockchain.
            </p>
          </div>

          <div className="pb-6 relative z-10">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <label className="flex flex-col min-w-30 h-10 w-full flex-1">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-lg">
                  <div className="text-[#9ca6ba] flex border-none bg-[#282e39] items-center justify-center pl-4 rounded-l-xl">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl text-white focus:outline-0 focus:ring-1 focus:ring-primary border-none bg-[#282e39] h-full placeholder:text-[#9ca6ba] px-4 pl-2 text-base font-normal leading-normal font-display"
                    placeholder="Search templates (e.g. Node.js K8s, React AWS, Zero-trust)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </label>
              <div className="flex gap-2 w-full md:w-auto pb-2 md:pb-0">
                {filterCategories.map((category) => (
                  <div key={category.name} className="relative">
                    <button
                      className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#282e39] px-4 border border-white/5 hover:border-primary/50 transition-all"
                      onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
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
                            className={`w-full text-left px-4 py-3 text-sm text-white hover:bg-white/5 transition-colors ${index < category.options.length - 1 ? "border-b border-white/5" : ""
                              }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pb-8 flex-wrap">
            {quickFilters.map((filter) => (
              <button
                key={filter}
                className={`flex h-6 items-center justify-center gap-x-2 rounded-full px-4 border transition-colors ${selectedQuickFilter === filter
                    ? "bg-primary/20 border-primary/30"
                    : "bg-[#282e39] border-white/5 hover:bg-white/10"
                  }`}
                onClick={() => setSelectedQuickFilter(filter)}
              >
                <p className={`text-xs font-bold uppercase tracking-wider ${selectedQuickFilter === filter ? "text-primary" : "text-white/70"
                  }`}>
                  {filter}
                </p>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedTemplates.map((template) => (
              <TemplateCardComponent
                key={template.id}
                template={template}
                onDeploy={handleDeploy}
              />
            ))}
          </div>


          <div className="mt-12">
            <Pagination
              totalItems={filteredTemplates.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
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
