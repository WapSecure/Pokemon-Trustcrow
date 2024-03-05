// Import React and define the PaginationProps interface
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Define the Pagination component with TypeScript props
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Event handler for clicking the "Previous" button
  const handleClickPrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Event handler for clicking the "Next" button
  const handleClickNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Render the pagination UI
  return (
    <div className="flex justify-between mt-4">
      {/* Display current page and total pages */}
      <div>
        Page {currentPage} of {totalPages}
      </div>
      {/* Navigation buttons for Previous and Next pages */}
      <div className="flex">
        {/* "Previous" button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          onClick={handleClickPrev}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {/* "Next" button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleClickNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
