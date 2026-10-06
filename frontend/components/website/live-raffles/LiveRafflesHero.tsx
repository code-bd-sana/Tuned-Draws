"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Gauge, Flame, Sparkles } from "lucide-react";
import { usePublicLiveStats } from "../../../hooks/useRaffleHooks";

interface LiveRafflesHeroProps {
  liveCount?: number;
  closingTodayCount?: number;
  totalPrizesValue?: string;
}

/** 
 * High-performance automotive hero header for the Tuned Draws live competitions arena.
 * Matches Homepage & Auth page dark obsidian aesthetic with tachometer grid and racing red glow.
 */
export default function LiveRafflesHero({
  liveCount,
  closingTodayCount,
  totalPrizesValue,
}: LiveRafflesHeroProps) {
  const { data: stats, isLoading } = usePublicLiveStats();

  const displayLiveCount = liveCount ?? stats?.liveCount ?? 0;
  const displayClosingTodayCount = closingTodayCount ?? stats?.closingTodayCount ?? 0;
  const displayTotalPrizesValue = totalPrizesValue ?? stats?.totalPrizesValue ?? "£0";

  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#0B0C0E] pt-24 sm:pt-28">
      {/* Background competition hero image with dark cinematic gradient overlays */}
      <Image
        src="/images/tuned-hero-bg.jpg"
        alt="Tuned Draws high performance custom supercar"
        fill
        priority
        className="-z-20 object-cover object-[75%_center] lg:object-center opacity-70 contrast-115"
      />

      {/* Atmospheric lighting falloff & speed-line gradients */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0B0C0E] via-[#0B0C0E]/85 to-[#0B0C0E]/40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/30 to-[#0B0C0E]/80" />
      <div className="absolute -top-32 left-1/3 w-[650px] h-[450px] bg-[#FF1E27]/15 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-10 w-[450px] h-[350px] bg-[#B3000C]/12 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Subtle tachometer dot-grid */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03] -z-10"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="container-custom py-10 sm:py-14 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li className="text-[#FF1E27]" aria-hidden="true">/</li>
            <li className="text-white">Live Competitions</li>
          </ol>
        </nav>

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          {/* Main Title Block */}
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF1E27]/30 bg-[#12141C]/90 px-4 py-1.5 font-heading text-[11px] font-black tracking-widest text-[#D1D5DB] uppercase shadow-[0_0_15px_rgba(255,30,39,0.2)]">
              <span className="h-2 w-2 rounded-full bg-[#FF1E27] animate-pulse shadow-[0_0_8px_rgba(255,30,39,0.8)]" />
              UK AUTOMOTIVE SWEEPSTAKES — LIVE ARENA
            </div>
            <h1 className="font-heading text-4xl font-black leading-[0.95] tracking-tight text-white uppercase sm:text-5xl md:text-6xl">
              ENTER THE RACE.<br />
              <span className="text-[#FF1E27] drop-shadow-[0_0_25px_rgba(255,30,39,0.55)]">
                WIN BUILT BEASTS.
              </span>
            </h1>
            <p className="mt-4 font-sans text-xs sm:text-sm text-[#8A92A0] max-w-lg leading-relaxed">
              Guaranteed live draws, transparent UK ticket allocations, and real-time instant win releases. Pick your tickets and unlock your next dream build.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid w-full grid-cols-3 overflow-hidden rounded-2xl border border-white/10 bg-[#12141C]/85 shadow-[0_12px_36px_rgba(0,0,0,0.7)] backdrop-blur-xl lg:w-auto lg:min-w-[460px]">
            {[
              {
                icon: <Gauge className="w-4 h-4 text-[#FF1E27]" />,
                value: isLoading && !stats ? "..." : `${displayLiveCount}`,
                label: "Live Draws",
              },
              {
                icon: <Flame className="w-4 h-4 text-[#FF1E27]" />,
                value: isLoading && !stats ? "..." : `${displayClosingTodayCount}`,
                label: "Closing Today",
              },
              {
                icon: <Sparkles className="w-4 h-4 text-[#FF1E27]" />,
                value: isLoading && !stats ? "..." : displayTotalPrizesValue,
                label: "In Prizes",
              },
            ].map((metric, index) => (
              <div
                key={metric.label}
                className={`px-4 py-4 sm:py-5 text-center ${
                  index < 2 ? "border-r border-white/10" : ""
                }`}
              >
                <div className="mb-1.5 flex justify-center">{metric.icon}</div>
                <div className="font-heading text-xl font-black tracking-tight text-white sm:text-2xl">
                  {metric.value}
                </div>
                <div className="mt-0.5 font-sans text-[9px] font-bold tracking-wider text-[#8A92A0] uppercase sm:text-[10px]">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
