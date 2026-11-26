"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePublicCategories } from "../../../hooks/useCategoryHooks";
import { cn } from "../../../lib/utils";

interface LiveRafflesFilterBarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

/**
 * High-performance automotive filter, search, sort, and layout control bar for live raffles.
 * Styled in Tuned Draws dark carbon, metallic silver typography, and Electric Racing Red accents.
 */
export default function LiveRafflesFilterBar({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
}: LiveRafflesFilterBarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: dbCategories } = usePublicCategories();

  const categories = [
    { label: "All", value: "all" },
    ...(dbCategories && dbCategories.length > 0
      ? dbCategories.map((c) => ({ label: c.name, value: c.slug || c.name }))
      : []),
  ];

  const isCategoryActive = (cat: { label: string; value: string }) => {
    if (cat.value === "all") return !activeCategory || activeCategory === "all";
    const act = activeCategory.toLowerCase();
    const val = cat.value.toLowerCase();
    const lbl = cat.label.toLowerCase();
    return (
      act === val ||
      act === lbl ||
      act.replace(/-/g, " ") === val.replace(/-/g, " ") ||
      act.replace(/-/g, " ") === lbl.replace(/-/g, " ") ||
      (act.endsWith("s") && act.slice(0, -1) === val) ||
      (val.endsWith("s") && val.slice(0, -1) === act) ||
      (act.endsWith("s") && act.slice(0, -1) === lbl) ||
      (lbl.endsWith("s") && lbl.slice(0, -1) === act)
    );
  };

  const sortOptions = [
    { label: "Featured", value: "featured" },
    { label: "Ending Soon", value: "ending-soon" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Most Popular", value: "popular" },
  ];

  const activeSortOption = sortOptions.find((opt) => opt.value === sortBy) || sortOptions[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="sticky top-[60px] md:top-[68px] z-30 border-y border-white/10 bg-[#14110F]/90 py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl">
      <div className="container-custom flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Category Pills (Horizontal scrolling list on small screens) */}
        <div className="overflow-x-auto -mx-5 px-5 lg:mx-0 lg:px-0 scrollbar-none flex items-center gap-2 select-none shrink-0 py-1">
          {categories.map((cat) => {
            const isActive = isCategoryActive(cat);
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  "font-heading text-xs uppercase tracking-wider px-4 py-2 rounded-xl border shrink-0 transition-all duration-200 cursor-pointer select-none",
                  isActive
                    ? "border-[#D4A863] bg-[#94632F] font-black text-white shadow-[0_0_15px_rgba(212,168,99,0.4)]"
                    : "border-white/10 bg-[#211C18] text-[#B6AA9C] hover:border-[#D4A863]/40 hover:text-white"
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search, Sort & Layout Controls Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* Custom Sort Dropdown */}
          <div className="relative shrink-0 font-sans" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex w-full items-center justify-between gap-2 rounded-xl border border-white/10 bg-[#211C18] px-4 py-2.5 text-xs font-heading font-bold uppercase tracking-wider text-[#E5DCCD] transition-all duration-200 hover:border-[#D4A863]/40 sm:w-[180px] cursor-pointer"
            >
              <span>Sort: {activeSortOption.label}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className={cn("w-3.5 h-3.5 text-[#B6AA9C] transition-transform duration-200", dropdownOpen && "rotate-180")}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 left-0 z-40 mt-1.5 overflow-hidden rounded-xl border border-white/15 bg-[#211C18] shadow-2xl backdrop-blur-xl transition-all duration-150 animate-in fade-in slide-in-from-top-1.5 sm:left-auto sm:w-[180px]">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSortBy(opt.value);
                      setDropdownOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2.5 text-xs font-heading uppercase tracking-wider transition-colors cursor-pointer select-none",
                      sortBy === opt.value
                        ? "bg-[#302820] text-[#D4A863] font-black border-l-2 border-[#D4A863]"
                        : "text-[#B6AA9C] hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Input Box */}
          <div className="relative flex-grow sm:flex-grow-0 sm:w-[240px] font-sans">
            <input
              type="text"
              placeholder="Search competitions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#211C18] py-2.5 pr-4 pl-9 text-xs text-white placeholder:text-[#B6AA9C] transition-colors focus:border-[#D4A863] focus:outline-none focus:ring-1 focus:ring-[#D4A863]"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B6AA9C] pointer-events-none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>

          {/* Layout Toggle Buttons (Grid / List) */}
          <div className="flex shrink-0 select-none items-center divide-x divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-[#211C18]">
            {/* Grid Layout Toggle */}
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2.5 cursor-pointer transition-all duration-200 select-none",
                viewMode === "grid"
                  ? "bg-[#302820] text-[#D4A863]"
                  : "text-[#B6AA9C] hover:text-white hover:bg-white/5"
              )}
              title="Grid View"
              aria-label="Grid View"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
                />
              </svg>
            </button>

            {/* List Layout Toggle */}
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2.5 cursor-pointer transition-all duration-200 select-none",
                viewMode === "list"
                  ? "bg-[#302820] text-[#D4A863]"
                  : "text-[#B6AA9C] hover:text-white hover:bg-white/5"
              )}
              title="List View"
              aria-label="List View"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 12h16.5m-16.5 5.25h16.5m-16.5-10.5h16.5"
                />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
