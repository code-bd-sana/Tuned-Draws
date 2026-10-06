"use client";

import React from "react";
import { cn } from "../../../lib/utils";

interface LiveRafflesPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Pagination component for live draws grid navigation matching Tuned Draws automotive design.
 */
export default function LiveRafflesPagination({
  currentPage = 1,
  totalPages = 3,
  onPageChange,
}: LiveRafflesPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 py-8 mt-12 border-t border-white/10 font-sans">
      {/* Prev Button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider rounded-xl border select-none transition-all duration-200",
          currentPage === 1
            ? "border-white/5 text-[#8A92A0]/40 bg-[#12141C]/40 cursor-not-allowed"
            : "border-white/10 text-[#D1D5DB] hover:text-white hover:border-[#FF1E27]/50 bg-[#12141C] cursor-pointer"
        )}
      >
        ← Prev
      </button>

      {/* Pages list */}
      <div className="flex items-center gap-2 select-none">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={cn(
              "w-9 h-9 text-xs font-heading font-black rounded-xl border flex items-center justify-center transition-all duration-200 cursor-pointer select-none",
              currentPage === p
                ? "bg-[#FF1E27] border-[#FF1E27] text-white shadow-[0_0_15px_rgba(255,30,39,0.4)]"
                : "bg-[#12141C] border-white/10 text-[#8A92A0] hover:text-white hover:border-[#FF1E27]/40"
            )}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider rounded-xl border select-none transition-all duration-200",
          currentPage === totalPages
            ? "border-white/5 text-[#8A92A0]/40 bg-[#12141C]/40 cursor-not-allowed"
            : "border-white/10 text-[#D1D5DB] hover:text-white hover:border-[#FF1E27]/50 bg-[#12141C] cursor-pointer"
        )}
      >
        Next →
      </button>
    </div>
  );
}
