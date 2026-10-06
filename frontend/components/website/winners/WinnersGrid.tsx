"use client";

import React, { useState } from "react";
import { usePublicWinnersList } from "../../../hooks/useRaffleHooks";
import WinnersFilterBar from "./WinnersFilterBar";
import WinnerCard from "./WinnerCard";
import { cn } from "../../../lib/utils";
import { Trophy } from "lucide-react";

/**
 * Grid layout and controller managing state for pagination, sorting, and time range filters.
 * Styled in Tuned Draws dark carbon and Electric Racing Red design.
 */
export default function WinnersGrid() {
  const [activeTab, setActiveTab] = useState<"all" | "month" | "week">("all");
  const [winnerTypeFilter, setWinnerTypeFilter] = useState<"all" | "instant" | "main_draw">("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  // Use the API hook
  const { data: winnersResponse, isLoading } = usePublicWinnersList({
    activeTab,
    winnerType: winnerTypeFilter,
    sortBy,
    page: currentPage,
    limit: itemsPerPage,
  });

  const visibleWinners = winnersResponse?.data || [];
  const totalPages = winnersResponse?.meta?.totalPages || 1;
  const activePage = currentPage > totalPages ? totalPages : currentPage;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Smooth scroll back to grid top on pagination action
      const gridElement = document.getElementById("winners-listing-grid");
      if (gridElement) {
        gridElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleTabChange = (tab: "all" | "month" | "week") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <section id="winners-listing-grid" className="relative flex-grow scroll-mt-20 bg-[#0B0C0E] bg-tachometer-grid py-12 md:py-16 text-white">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-10 left-10 w-[500px] h-[400px] bg-[#FF1E27]/5 rounded-full blur-[150px] -z-0" />
      <div className="pointer-events-none absolute bottom-20 right-10 w-[450px] h-[350px] bg-[#B3000C]/5 rounded-full blur-[140px] -z-0" />

      {/* Dynamic Filters Header bar */}
      <WinnersFilterBar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="container-custom relative mt-8 md:mt-12 z-10">
        {/* Winner Type Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-3xl mx-auto">
          {[
            { label: "All Winners", value: "all" },
            { label: "Main Draws", value: "main_draw" },
            { label: "Instant Wins", value: "instant" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => { setWinnerTypeFilter(tab.value as any); setCurrentPage(1); }}
              className={cn(
                "font-heading text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl border transition-all duration-200 cursor-pointer select-none",
                winnerTypeFilter === tab.value
                  ? "bg-[#FF1E27] border-[#FF1E27] font-black text-white shadow-[0_0_15px_rgba(255,30,39,0.4)]"
                  : "bg-[#12141C] border-white/10 text-[#8A92A0] hover:text-white hover:border-[#FF1E27]/40"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-[400px] gap-4">
            <div className="w-10 h-10 border-2 border-[#FF1E27] border-t-transparent rounded-full animate-spin" />
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-[#D1D5DB]">
              Loading verified winners...
            </span>
          </div>
        ) : visibleWinners.length > 0 ? (
          <>
            {/* Grid of Winner Cards: 4 columns desktop, 2 cols tablet, 1 col mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-7">
              {visibleWinners.map((winner) => (
                <WinnerCard key={winner.id} winner={winner} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12 pt-8 border-t border-white/10 select-none font-sans">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(activePage - 1)}
                  disabled={activePage === 1}
                  className={cn(
                    "px-4 py-2 border rounded-xl font-heading text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer",
                    activePage === 1
                      ? "border-white/5 text-[#8A92A0]/40 bg-[#12141C]/40 cursor-not-allowed"
                      : "border-white/10 text-[#D1D5DB] hover:text-white hover:border-[#FF1E27]/50 bg-[#12141C]"
                  )}
                >
                  ← Prev
                </button>

                {/* Page Index Numbers */}
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNumber = idx + 1;
                  const isActive = pageNumber === activePage;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center font-heading text-xs font-black transition-all duration-200 cursor-pointer select-none",
                        isActive
                          ? "bg-[#FF1E27] text-white border border-[#FF1E27] shadow-[0_0_15px_rgba(255,30,39,0.4)]"
                          : "bg-[#12141C] border border-white/10 text-[#8A92A0] hover:bg-white/5 hover:text-white hover:border-[#FF1E27]/40"
                      )}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(activePage + 1)}
                  disabled={activePage === totalPages}
                  className={cn(
                    "px-4 py-2 border rounded-xl font-heading text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer",
                    activePage === totalPages
                      ? "border-white/5 text-[#8A92A0]/40 bg-[#12141C]/40 cursor-not-allowed"
                      : "border-white/10 text-[#D1D5DB] hover:text-white hover:border-[#FF1E27]/50 bg-[#12141C]"
                  )}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty State if filter yields 0 items */
          <div className="py-20 text-center select-none bg-[#12141C] border border-white/10 border-dashed rounded-2xl max-w-lg mx-auto p-8 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-[#1A1D27] border border-[#FF1E27]/30 flex items-center justify-center mb-5 text-[#FF1E27] mx-auto shadow-[0_0_15px_rgba(255,30,39,0.2)]">
              <Trophy className="w-7 h-7" />
            </div>
            <h3 className="font-heading font-black text-xl text-white uppercase tracking-wide">
              No Winners Found
            </h3>
            <p className="font-sans text-xs text-[#8A92A0] mt-2 max-w-xs mx-auto leading-relaxed">
              We couldn&apos;t find any winner records matching your selected filter parameters.
            </p>
          </div>
        )}
      </div>

    </section>
  );
}
