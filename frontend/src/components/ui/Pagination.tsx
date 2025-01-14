interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const delta = 2; // Number of pages to show before and after current page

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // First page
        i === totalPages || // Last page
        (i >= currentPage - delta && i <= currentPage + delta) // Pages around current page
      ) {
        pages.push(i);
      }
    }

    return pages.reduce((acc: number[], page: number) => {
      if (acc.length === 0) return [page];
      
      const lastPage = acc[acc.length - 1];
      if (page - lastPage === 2) {
        acc.push(lastPage + 1, page);
      } else if (page - lastPage > 1) {
        acc.push(-1, page); // -1 represents ellipsis
      } else {
        acc.push(page);
      }
      
      return acc;
    }, []);
  };

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination__button"
      >
        Previous
      </button>

      <div className="pagination__pages">
        {getPageNumbers().map((page, index) => (
          page === -1 ? (
            <span key={`ellipsis-${index}`} className="pagination__ellipsis">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`pagination__button ${currentPage === page ? 'pagination__button--active' : ''}`}
            >
              {page}
            </button>
          )
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination__button"
      >
        Next
      </button>
    </div>
  );
}; 