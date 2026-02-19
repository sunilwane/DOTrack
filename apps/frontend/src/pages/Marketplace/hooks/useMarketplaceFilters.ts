import { useMemo, useState } from 'react';
import type { TemplateCard } from 'types';
import { useToggle } from '../../../hooks';
import { DEFAULT_PAGE_SIZE } from '../../../constants';
import { marketplaceTemplates } from '../../../mock/PagesMockData/Marketplace';

const ITEMS_PER_PAGE = DEFAULT_PAGE_SIZE;

export const useMarketplaceFilters = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedQuickFilter, setSelectedQuickFilter] = useState('Popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmPopup, , openPopup, closePopup] = useToggle(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateCard | null>(null);

  const filteredTemplates = useMemo(() => {
    const searchLower = searchQuery.toLowerCase();
    return marketplaceTemplates.filter((template) => {
      const matchesSearch =
        searchLower === '' ||
        template.title.toLowerCase().includes(searchLower) ||
        template.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
        template.author.address.toLowerCase().includes(searchLower);

      return matchesSearch;
    });
  }, [searchQuery]);

  const displayedTemplates = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTemplates.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTemplates, currentPage]);

  const handleDeploy = (template: TemplateCard) => {
    setSelectedTemplate(template);
    openPopup();
  };

  const handleConfirmDeploy = () => {
    closePopup();
    setSelectedTemplate(null);
  };

  const handleClosePopup = () => {
    closePopup();
    setSelectedTemplate(null);
  };

  return {
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
    itemsPerPage: ITEMS_PER_PAGE,
  };
};
