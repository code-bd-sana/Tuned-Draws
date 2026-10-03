"use client";

import React, { useState, useEffect } from "react";
import SectionHeader from "../shared/SectionHeader";
import DrawCard from "../shared/DrawCard";
import { cn } from "../../../lib/utils";
import { raffleService } from "../../../services/raffle.service";
import { categoryService, Category } from "../../../services/category.service";
import { formatUkDate } from "../../../lib/uk-time";
import type { Draw } from "../../../types/draw.types";

/**
 * Instant Wins draws section with interactive client category filtering.
 * High-performance dark styling for Tuned Draws.
 */
export default function InstantWinsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [draws, setDraws] = useState<Draw[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [fetchedCategories, fetchedDraws] = await Promise.all([
          categoryService.getPublicCategories(),
          raffleService.getInstantWinRaffles(12)
        ]);

        setCategories(fetchedCategories);

        if (fetchedDraws.data && fetchedDraws.data.length > 0) {
          const mappedDraws: Draw[] = fetchedDraws.data.map((r: any) => ({
            id: r.id,
            title: r.title,
            description: r.description,
            image: r.mainImage || '',
            ticketPrice: Number(r.pricePerTicket),
            totalTickets: r.totalTickets,
            soldTickets: r.ticketsSold,
            endDate: formatUkDate(r.endDate),
            rawEndDate: r.endDate,
            status: (r.status === 'ACTIVE' ? 'live' : 'ended') as "live" | "ended",
            category: r.category || 'general',
            slug: r.slug,
            worthPrice: r.mainPrizeValue ? Number(r.mainPrizeValue) : undefined,
            instantWinsCount: r._count?.instantWins || 0,
            isInstantWin: (r._count?.instantWins || 0) > 0,
          }));
          setDraws(mappedDraws);
        }
      } catch (error) {
        console.error("Failed to fetch instant win draws:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter draws
  const filteredDraws = activeCategory === "all"
    ? draws
    : draws.filter((draw) => {
        const cat = (draw.category || "").toLowerCase();
        const target = activeCategory.toLowerCase();
        return (
          cat === target ||
          cat.replace(/[^a-z0-9]+/g, "-") === target ||
          cat.replace(/[^a-z0-9]+/g, " ") === target.replace(/-/g, " ")
        );
      });

  return (
    <section id="instant-wins" className="py-20 bg-[#0B0C0E] border-t border-white/10 relative">
      <div className="container-custom">

        {/* Section Header */}
        <SectionHeader
          badgeText="INSTANT WIN PRIZES LIVE NOW"
          headingText="Win Big. Every Day."
          paragraphText="Match pre-allocated winning ticket numbers immediately at checkout for instant delivery prizes."
        />

        {/* Filter Tabs Row */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10 max-w-xl mx-auto">
          <button
            onClick={() => setActiveCategory("all")}
            className={cn(
              "font-heading font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl border transition-all duration-200 cursor-pointer select-none",
              activeCategory === "all"
                ? "btn-racing-red text-white shadow-[0_0_15px_rgba(255,30,39,0.35)]"
                : "bg-[#12141C] border-white/10 text-[#8A92A0] hover:text-white hover:border-[#FF1E27]/40"
            )}
          >
            All Draws
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.slug)}
              className={cn(
                "font-heading font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl border transition-all duration-200 cursor-pointer select-none",
                activeCategory === category.slug
                  ? "btn-racing-red text-white shadow-[0_0_15px_rgba(255,30,39,0.35)]"
                  : "bg-[#12141C] border-white/10 text-[#8A92A0] hover:text-white hover:border-[#FF1E27]/40"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Draws Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-[#8A92A0]">
            <div className="animate-spin h-10 w-10 border-4 border-[#FF1E27] border-t-transparent rounded-full shadow-[0_0_15px_rgba(255,30,39,0.5)]" />
            <p className="font-heading text-xs tracking-wider uppercase">Loading instant win draws…</p>
          </div>
        ) : filteredDraws.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDraws.map((draw) => (
              <DrawCard key={draw.id} draw={draw} variant="instant" />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#12141C] border border-dashed border-white/10 rounded-2xl max-w-md mx-auto">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="font-heading font-black text-lg text-white mb-2 uppercase">No Instant Wins in This Category</h3>
            <p className="font-sans text-xs text-[#8A92A0]">Check back soon as hosts add daily instant-win cash and automotive gear.</p>
          </div>
        )}

      </div>
    </section>
  );
}
