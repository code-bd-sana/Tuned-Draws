'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { raffleService } from '../../../services/raffle.service';

/**
 * Homepage hero: modern, high-performance automotive tuning & competitions aesthetic.
 * Features high-clarity modified car banner with dark obsidian gradients and racing red glow.
 */
export default function HeroSection() {
  const [stats, setStats] = useState<{ id: number; value: string; label: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    raffleService.getPublicStats()
      .then(data => {
        if (data?.length) setStats(data);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const drawsCompletedStat = stats.find(s => s.id === 1 || s.label.toLowerCase().includes('draws'));

  return (
    <section className="relative min-h-[760px] overflow-hidden bg-[#0B0C0E] pt-28 sm:min-h-[780px] md:pt-36 lg:min-h-[720px]">
      {/* High-Clarity Background Car Banner Image */}
      <Image
        src="/images/car-main.jpg"
        alt="Tuned Draws BMW M340i Custom Build"
        fill
        priority
        className="-z-20 object-cover object-[70%_center] lg:object-center opacity-85 contrast-110 brightness-105"
      />
      
      {/* Light atmospheric overlays for optimal legibility & crystal-clear car visibility */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0B0C0E] via-[#0B0C0E]/75 to-[#0B0C0E]/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0B0C0E] via-transparent to-[#0B0C0E]/60" />

      {/* Ambient Crimson Red Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-[#FF1E27]/12 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 -right-24 w-[500px] h-[500px] bg-[#FF1E27]/10 rounded-full blur-[140px]" />
      </div>

      <div className="container-custom relative z-10 flex min-h-[580px] items-center pb-24 lg:pb-28">
        <div className="grid w-full grid-cols-1 items-center lg:grid-cols-12 gap-12">
          {/* Main Hero Headline & CTAs */}
          <div className="flex max-w-[760px] flex-col items-start text-left lg:col-span-8">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#12141C] border border-[#FF1E27]/30 text-white text-[11px] font-heading font-black uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(255,30,39,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#FF1E27] animate-pulse shadow-[0_0_8px_rgba(255,30,39,0.8)]" />
              <span className="text-[#D1D5DB]">CAR MODS, TUNING &amp; PERFORMANCE PARTS</span>
            </div>

            {/* Main 3-Tier Headline */}
            <div className="mb-6">
              <h1 className="font-heading text-[clamp(2.8rem,9vw,5.2rem)] font-black leading-[0.88] tracking-tight uppercase text-white drop-shadow-md">
                WIN PERFORMANCE
              </h1>
              <div className="my-2.5 flex items-center gap-3 sm:gap-4">
                <span className="text-xl font-black text-[#FF1E27] sm:text-3xl">—</span>
                <span className="font-heading text-[clamp(2.2rem,7.5vw,4.2rem)] font-black leading-none tracking-tight text-[#FF1E27] uppercase drop-shadow-[0_0_20px_rgba(255,30,39,0.6)]">
                  PARTS &amp; SERVICES
                </span>
                <span className="text-xl font-black text-[#FF1E27] sm:text-3xl">—</span>
              </div>
              <span className="font-heading block text-[clamp(2.8rem,9vw,5.2rem)] font-black leading-[0.88] tracking-tight uppercase text-[#D1D5DB] drop-shadow-md">
                FOR LESS
              </span>
            </div>

            {/* Description Subtitle */}
            <p className="mb-9 max-w-xl font-sans text-sm sm:text-base font-normal leading-relaxed text-[#8A92A0]">
              Discover elite automotive competitions for performance parts, ECU tuning packages, custom car wrapping, detailing, and track days. Every draw is <strong className="font-bold text-white">fair, transparent, and 100% verified</strong>.
            </p>

            {/* Action Buttons */}
            <div className="flex w-full flex-wrap items-center gap-4 sm:w-auto">
              <Link
                href="/live-raffles"
                className="btn-racing-red px-8 py-4 rounded-xl text-white font-heading font-black text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all duration-200 shadow-[0_0_25px_rgba(255,30,39,0.4)] hover:shadow-[0_0_35px_rgba(255,30,39,0.7)] hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
              >
                <span>VIEW ALL COMPETITIONS</span>
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>

              <Link
                href="/how-it-works"
                className="btn-glossy-white px-7 py-4 rounded-xl font-heading font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
              >
                <span className="w-5 h-5 rounded-full bg-[#FF1E27] text-white flex items-center justify-center text-xs font-heading font-black">
                  i
                </span>
                <span>HOW IT WORKS</span>
              </Link>
            </div>
          </div>

          {/* RIGHT — High-Clarity Featured Modification Showcase Card */}
          <div className="hidden lg:flex lg:col-span-4 justify-end items-center relative">
            <div className="relative w-full max-w-sm rounded-2xl border border-white/20 bg-[#12141C]/80 backdrop-blur-xl p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] group hover:border-[#FF1E27]/50 transition-all duration-300">
              <div className="relative w-full h-56 rounded-xl overflow-hidden border border-white/15 shadow-inner">
                <Image
                  src="/images/car-main.jpg"
                  alt="Performance Tuning Package"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute top-3 left-3 bg-[#0B0C0E]/90 border border-[#FF1E27]/40 px-3 py-1 rounded-full text-[9px] font-heading font-black text-white tracking-widest uppercase shadow-md flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
                  FEATURED SERVICE
                </div>
              </div>
              <div className="mt-3 px-2.5 pb-1 flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-black text-sm text-white uppercase tracking-tight">
                    Stage 2 ECU + Exhaust Package
                  </h3>
                  <p className="font-sans text-[11px] text-[#8A92A0] mt-0.5">
                    Dyno Tune · Custom Map · Free Workshop Install
                  </p>
                </div>
                <span className="font-heading text-xs font-black text-[#FF1E27] bg-[#FF1E27]/10 border border-[#FF1E27]/30 px-2.5 py-1 rounded-lg">
                  LIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Automotive Statistics Band */}
      <div className="relative z-10 overflow-hidden border-t border-white/10 bg-[#12141C] shadow-[0_-10px_35px_rgba(0,0,0,0.5)]">
        <div className="container-custom relative pt-7 pb-8 sm:pt-9 sm:pb-10">
          <div className="mx-auto grid max-w-5xl grid-cols-3 divide-x divide-white/10">
            {/* Stat Card 1 */}
            <div className="flex flex-col items-center justify-center px-2 text-center transition-transform hover:scale-[1.03] sm:px-5">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#1A1D27] text-lg text-white shadow-md sm:h-12 sm:w-12 sm:text-xl">
                🏎️
              </div>
              <span className="font-heading text-lg font-black tracking-tight text-white sm:text-2xl lg:text-3xl">
                {isLoading ? "..." : (drawsCompletedStat?.value || "0")}
              </span>
              <span className="mt-1 font-heading text-[8px] font-bold tracking-wider text-[#8A92A0] uppercase sm:text-[11px]">
                DRAWS COMPLETED
              </span>
            </div>

            {/* Stat Card 2 */}
            <div className="flex flex-col items-center justify-center px-2 text-center transition-transform hover:scale-[1.03] sm:px-5">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#1A1D27] text-lg text-white shadow-md sm:h-12 sm:w-12 sm:text-xl">
                ⚡
              </div>
              <span className="font-heading text-lg font-black tracking-tight text-white sm:text-2xl lg:text-3xl">
                TUNING &amp; MODS
              </span>
              <span className="mt-1 font-heading text-[8px] font-bold tracking-wider text-[#8A92A0] uppercase sm:text-[11px]">
                PARTS &amp; SERVICES
              </span>
            </div>

            {/* Stat Card 3 */}
            <div className="flex flex-col items-center justify-center px-2 text-center transition-transform hover:scale-[1.03] sm:px-5">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#1A1D27] text-lg text-white shadow-md sm:h-12 sm:w-12 sm:text-xl">
                🛡️
              </div>
              <span className="font-heading text-lg font-black tracking-tight text-white sm:text-2xl lg:text-3xl">
                VERIFIED
              </span>
              <span className="mt-1 font-heading text-[8px] font-bold tracking-wider text-[#8A92A0] uppercase sm:text-[11px]">
                FAIR AUDITED DRAWS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
