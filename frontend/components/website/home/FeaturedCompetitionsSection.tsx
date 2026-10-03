"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import DrawCard from "../shared/DrawCard";
import { raffleService } from "../../../services/raffle.service";
import { formatUkDate } from "../../../lib/uk-time";
import type { Draw } from "../../../types/draw.types";

/**
 * Featured Competitions section with horizontal carousel and nav arrows.
 * Rebuilt with Tuned Draws pitch-dark obsidian and carbon glass aesthetic.
 */
export default function FeaturedCompetitionsSection() {
  const [draws, setDraws] = useState<Draw[]>([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchDraws() {
      try {
        const res = await raffleService.getPublicRaffles({ limit: 10, statusFilter: 'Live' });
        if (res.data && res.data.length > 0) {
          setDraws(res.data.map(r => ({
            id: r.id, title: r.title, description: r.description,
            image: r.mainImage || '', ticketPrice: Number(r.pricePerTicket),
            totalTickets: r.totalTickets, soldTickets: r.ticketsSold,
            endDate: formatUkDate(r.endDate),
            rawEndDate: r.endDate,
            status: (r.status === 'ACTIVE' ? 'live' : 'ended') as 'live' | 'ended',
            category: r.category || 'general', slug: r.slug,
            worthPrice: r.mainPrizeValue ? Number(r.mainPrizeValue) : undefined,
            instantWinsCount: r._count?.instantWins || 0,
            isInstantWin: (r._count?.instantWins || 0) > 0,
          })));
        }
      } catch { /* ignore */ } finally { setLoading(false); }
    }
    fetchDraws();
  }, []);

  const scroll = (dir: 'left' | 'right') =>
    carouselRef.current?.scrollBy({ left: dir === 'left' ? -370 : 370, behavior: 'smooth' });

  return (
    <section id="live-draws" className="py-20 bg-[#0B0C0E] border-t border-white/10 relative">
      <div className="container-custom">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12141C] border border-[#FF1E27]/30 text-[10px] font-heading font-black uppercase tracking-widest text-[#FF1E27] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
              ⚡ LIVE ON TRACK
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Featured Competitions
            </h2>
            <p className="font-sans text-sm text-[#8A92A0] mt-2 max-w-md">
              Browse elite automotive sweepstakes hosted by verified tuners, workshops &amp; brands.
            </p>
          </div>
          <Link
            href="/live-raffles"
            className="btn-racing-red shrink-0 px-6 py-3.5 text-white font-heading text-xs font-black tracking-widest uppercase rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(255,30,39,0.3)] hover:shadow-[0_0_30px_rgba(255,30,39,0.5)] self-start sm:self-auto cursor-pointer"
          >
            See All Competitions →
          </Link>
        </div>

        {/* Carousel */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-[#8A92A0]">
            <div className="animate-spin h-10 w-10 border-4 border-[#FF1E27] border-t-transparent rounded-full shadow-[0_0_15px_rgba(255,30,39,0.5)]" />
            <p className="font-heading text-xs tracking-wider uppercase">Loading competitions…</p>
          </div>
        ) : draws.length > 0 ? (
          <div className="relative group">
            {/* Left arrow */}
            <button
              onClick={() => scroll('left')}
              className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-xl bg-[#12141C] border border-white/10 shadow-2xl text-[#D1D5DB] hover:text-[#FF1E27] hover:border-[#FF1E27] hover:scale-105 transition-all opacity-0 group-hover:opacity-100 focus:outline-none cursor-pointer"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>

            <div
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth"
            >
              {draws.map((draw) => (
                <div key={draw.id} className="snap-center shrink-0 w-[85vw] sm:w-[360px] lg:w-[380px]">
                  <DrawCard draw={draw} />
                </div>
              ))}
            </div>

            {/* Right arrow */}
            <button
              onClick={() => scroll('right')}
              className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-xl bg-[#12141C] border border-white/10 shadow-2xl text-[#D1D5DB] hover:text-[#FF1E27] hover:border-[#FF1E27] hover:scale-105 transition-all opacity-0 group-hover:opacity-100 focus:outline-none cursor-pointer"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="text-center py-16 bg-[#12141C] border border-dashed border-white/10 rounded-2xl max-w-md mx-auto">
            <div className="text-4xl mb-4">🏁</div>
            <h3 className="font-heading font-black text-lg text-white mb-2 uppercase">No Live Competitions Yet</h3>
            <p className="font-sans text-xs text-[#8A92A0]">New tuned supercar builds and parts are dropping soon. Follow us on Instagram to be first.</p>
          </div>
        )}

      </div>
    </section>
  );
}
