import React from "react";
import { cn } from "../../../lib/utils";

interface WinnersFilterBarProps {
  activeTab: "all" | "month" | "week";
  setActiveTab: (tab: "all" | "month" | "week") => void;
  sortBy: "newest" | "oldest";
  setSortBy: (sort: "newest" | "oldest") => void;
}

/**
 * Filter bar for Winners page.
 * Manages timeline capsule selections (All Time, This Month, This Week) and sort order.
 * Styled in Tuned Draws dark carbon and Electric Racing Red design.
 */
export default function WinnersFilterBar({
  activeTab,
  setActiveTab,
  sortBy,
  setSortBy,
}: WinnersFilterBarProps) {
  return (
    <div className="sticky top-[60px] md:top-[68px] z-30 select-none border-y border-white/10 bg-[#0B0C0E]/90 py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl">
      <div className="container-custom flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Timeline Toggles */}
        <div className="flex gap-2 items-center overflow-x-auto scrollbar-none py-1">
          <button
            onClick={() => setActiveTab("all")}
            className={cn(
              "px-4 py-2 rounded-xl border font-heading text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0 select-none",
              activeTab === "all"
                ? "bg-[#FF1E27] border-[#FF1E27] text-white shadow-[0_0_15px_rgba(255,30,39,0.4)]"
                : "border-white/10 bg-[#12141C] text-[#8A92A0] hover:border-[#FF1E27]/40 hover:text-white"
            )}
          >
            All Time
          </button>
          <button
            onClick={() => setActiveTab("month")}
            className={cn(
              "px-4 py-2 rounded-xl border font-heading text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0 select-none",
              activeTab === "month"
                ? "bg-[#FF1E27] border-[#FF1E27] text-white shadow-[0_0_15px_rgba(255,30,39,0.4)]"
                : "border-white/10 bg-[#12141C] text-[#8A92A0] hover:border-[#FF1E27]/40 hover:text-white"
            )}
          >
            This Month
          </button>
          <button
            onClick={() => setActiveTab("week")}
            className={cn(
              "px-4 py-2 rounded-xl border font-heading text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0 select-none",
              activeTab === "week"
                ? "bg-[#FF1E27] border-[#FF1E27] text-white shadow-[0_0_15px_rgba(255,30,39,0.4)]"
                : "border-white/10 bg-[#12141C] text-[#8A92A0] hover:border-[#FF1E27]/40 hover:text-white"
            )}
          >
            This Week
          </button>
        </div>

        {/* Sort Dropdown Selector */}
        <div className="relative w-full sm:w-48">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
            className="w-full appearance-none rounded-xl border border-white/10 bg-[#12141C] px-4 py-2.5 font-heading text-xs font-bold uppercase tracking-wider text-[#D1D5DB] transition-colors duration-200 hover:border-[#FF1E27]/40 cursor-pointer outline-none focus:border-[#FF1E27]"
            aria-label="Sort Winner Records"
          >
            <option value="newest" className="bg-[#12141C] text-white">Newest First</option>
            <option value="oldest" className="bg-[#12141C] text-white">Oldest First</option>
          </select>
          
          {/* Custom Select Chevron Icon */}
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#FF1E27]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-3.5 h-3.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}
