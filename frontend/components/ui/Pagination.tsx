'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  total?: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  total,
  totalPages,
  onPageChange,
}) => {
  const effectiveTotal = totalPages ?? total ?? 1;
  if (effectiveTotal <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (effectiveTotal <= maxVisible) {
      for (let i = 1; i <= effectiveTotal; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', effectiveTotal);
      } else if (currentPage >= effectiveTotal - 2) {
        pages.push(1, '...', effectiveTotal - 3, effectiveTotal - 2, effectiveTotal - 1, effectiveTotal);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', effectiveTotal);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8 w-full select-none font-sans">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-[#D1D5DB] hover:text-white hover:bg-[#FF1E27]/15 hover:border-[#FF1E27]/40 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:text-[#8A92A0] disabled:hover:border-white/10 transition-all duration-200 shadow-sm cursor-pointer"
        aria-label="Previous page"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`flex items-center justify-center w-9 h-9 rounded-full font-sans font-bold text-xs md:text-sm transition-all duration-200 ${
            page === currentPage
              ? 'bg-[#FF1E27] text-white border border-[#FF1E27] shadow-[0_0_12px_rgba(255,30,39,0.4)]'
              : page === '...'
              ? 'bg-transparent text-[#8A92A0]/60 cursor-default'
              : 'bg-white/5 border border-white/10 text-[#8A92A0] hover:text-white hover:border-[#FF1E27]/40 hover:bg-[#FF1E27]/10 cursor-pointer'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === total}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-[#D1D5DB] hover:text-white hover:bg-[#FF1E27]/15 hover:border-[#FF1E27]/40 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:text-[#8A92A0] disabled:hover:border-white/10 transition-all duration-200 shadow-sm cursor-pointer"
        aria-label="Next page"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};
