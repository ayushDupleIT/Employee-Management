import React, { useState } from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  // Function to handle next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Function to handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  // Function to handle direct page selection
  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      handlePageChange(pageNumber);
    }
  };

  // Generate an array of page numbers for rendering buttons
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center my-4">
      <nav className="inline-flex relative z-0 shadow-sm">
        <button
          onClick={prevPage}
          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={currentPage === 1}
        >
          <span className="sr-only">Previous</span>
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M9.707 5.293a1 1 0 010 1.414L6.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        {pageNumbers.map(page => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${currentPage === page ? 'bg-indigo-500 text-white' : ''}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={nextPage}
          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
          disabled={currentPage === totalPages}
        >
          <span className="sr-only">Next</span>
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10.293 14.707a1 1 0 01-1.414 0L5.586 11.414a1 1 0 011.414-1.414L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4z" clipRule="evenodd" />
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default CustomPagination;
