"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "../../../lib/utils";
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
  const [failed, setFailed] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchDraws() {
      try {
        const res = await raffleService.getPublicRaffles({ limit: 10, statusFilter: 'Live', category: 'wedding' });
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
      } catch { setFailed(true); } finally { setLoading(false); }
    }
    fetchDraws();
  }, []);

  const scroll = (dir: 'left' | 'right') =>
    carouselRef.current?.scrollBy({ left: dir === 'left' ? -370 : 370, behavior: 'smooth' });

  return (
    <section id="live-draws" className="wedding-light wedding-competitions relative border-t border-[#e9ddca] py-16 sm:py-24">
      <div className="container-custom">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="wedding-eyebrow mb-3 flex items-center gap-3"><span className="h-px w-8 bg-[#c8a36f]" /> Featured competitions</div>
            <h2 className="text-4xl sm:text-5xl">
              Win Incredible <span className="italic text-[#ad824a]">Wedding Prizes</span>
            </h2>
            <p className="font-sans text-sm text-[#8A92A0] mt-2 max-w-md">
              Discover competitions and special prizes from wedding suppliers and hosts.
            </p>
          </div>
          <Link
            href="/live-raffles"
            className="btn-racing-red shrink-0 px-6 py-3.5 text-xs font-bold tracking-wider uppercase rounded-full transition-all self-start sm:self-auto"
          >
            See All Competitions →
          </Link>
        </div>

        {/* Carousel */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-[#8A92A0]">
            <div className="animate-spin h-10 w-10 border-4 border-[#D4A863] border-t-transparent rounded-full shadow-[0_0_15px_rgba(212,168,99,0.5)]" />
            <p className="font-heading text-xs tracking-wider uppercase">Loading competitions…</p>
          </div>
        ) : draws.length > 0 ? (
          <div className="relative group">
            {/* Left arrow */}
            <button
              onClick={() => scroll('left')}
              className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-xl bg-[#12141C] border border-white/10 shadow-2xl text-[#D1D5DB] hover:text-[#D4A863] hover:border-[#D4A863] hover:scale-105 transition-all opacity-0 group-hover:opacity-100 focus:outline-none cursor-pointer"
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
                <div key={draw.id} className="snap-center shrink-0 w-[85vw] sm:w-[320px] lg:w-[330px]">
                  <article className="h-full overflow-hidden rounded-sm border border-[#e5dacb] bg-white shadow-[0_8px_30px_rgba(59,42,23,0.07)]">
                    <Link href={`/live-raffles/${draw.slug || draw.id}`} className="relative block h-56 overflow-hidden bg-[#eee6da]">
                      <Image src={draw.image || '/images/wedding-flowers.png'} alt={draw.title} fill sizes="(max-width: 640px) 85vw, 330px" className="object-cover transition-transform duration-500 hover:scale-105" unoptimized />
                    </Link>
                    <div className="p-5">
                      <p className="wedding-eyebrow mb-2">Live competition</p>
                      <h3 className="min-h-14 font-serif text-xl leading-snug text-[#211b16]">{draw.title}</h3>
                      <div className="mt-4 flex items-end justify-between border-t border-[#eee5d9] pt-4"><div><span className="block text-[10px] uppercase tracking-wider text-[#82786b]">Ticket price</span><strong className="text-lg text-[#9a6929]">{formatCurrency(draw.ticketPrice)}</strong></div><span className="text-xs text-[#746c61]">{draw.soldTickets} / {draw.totalTickets} tickets</span></div>
                      <Link href={`/live-raffles/${draw.slug || draw.id}`} className="btn-racing-red mt-5 block rounded-full px-5 py-3 text-center text-xs font-bold uppercase tracking-wider">View competition →</Link>
                    </div>
                  </article>
                </div>
              ))}
            </div>

            {/* Right arrow */}
            <button
              onClick={() => scroll('right')}
              className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-xl bg-[#12141C] border border-white/10 shadow-2xl text-[#D1D5DB] hover:text-[#D4A863] hover:border-[#D4A863] hover:scale-105 transition-all opacity-0 group-hover:opacity-100 focus:outline-none cursor-pointer"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-7 flex items-start gap-3 rounded-lg border border-[#e8d8c1] bg-[#fffaf3] px-5 py-4 text-sm text-[#6d5a41]">
              <span aria-hidden="true" className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#bc9057]" />
              <p>{failed ? 'Wedding competitions are temporarily unavailable. Please check back shortly.' : 'No live wedding competitions yet. Explore these ideas while new prizes are being prepared.'}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {[
                { src: '/images/wedding-dress.png?v=2', label: 'Bridal style', detail: 'For your unforgettable entrance' },
                { src: '/images/wedding-hero.png', label: 'Dream weddings' },
                { src: '/images/wedding-reception.png', label: 'Beautiful celebrations' },
                { src: '/images/wedding-flowers.png', label: 'The special details' },
              ].map(item => (
                <article key={item.label} className="group overflow-hidden rounded-lg border border-[#e7dac9] bg-[#fffdf9] shadow-[0_8px_30px_rgba(59,42,23,0.07)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#eee6da] sm:aspect-[4/4.2]"><Image src={item.src} alt="" fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw" unoptimized={item.label === 'Bridal style'} className="object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute left-3 top-3 rounded-full bg-[#17130f]/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-[#f2dfbd]">Inspiration</span></div>
                  <div className="p-4 sm:p-5"><p className="wedding-eyebrow mb-2">For your special day</p><h3 className="font-serif text-lg leading-tight sm:text-xl">{item.label}</h3><p className="mt-2 hidden text-xs leading-relaxed text-[#766c60] sm:block">{item.detail || 'Thoughtful inspiration for your celebration'}</p></div>
                </article>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
