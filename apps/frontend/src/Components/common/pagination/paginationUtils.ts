export const getPageNumbers = (
  totalPages: number,
  currentPage: number
): (number | string)[] => {
  const pages: (number | string)[] = [];
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    for (let page = 1; page <= totalPages; page += 1) {
      pages.push(page);
    }
    return pages;
  }

  pages.push(1);
  if (currentPage > 3) pages.push('...');

  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);

  for (let page = startPage; page <= endPage; page += 1) {
    pages.push(page);
  }

  if (currentPage < totalPages - 2) pages.push('...');
  pages.push(totalPages);
  return pages;
};

export const getRange = (totalItems: number, itemsPerPage: number, currentPage: number) => {
  const start = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);
  return { start, end };
};
