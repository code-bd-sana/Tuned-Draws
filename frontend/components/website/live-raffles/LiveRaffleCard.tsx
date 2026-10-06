"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Draw } from "../../../types/draw.types";
import { formatCurrency } from "../../../lib/utils";
import { cn } from "../../../lib/utils";
import { formatUkDateTime } from "../../../lib/uk-time";
import { Flame, Clock, Ticket, ShieldCheck } from "lucide-react";

interface LiveRaffleCardProps {
  raffle: Draw;
  viewMode?: "grid" | "list";
}

/**
 * High-performance automotive card for the Tuned Draws Live Raffles arena.
 * Matches Homepage & Auth page dark carbon glass and Electric Racing Red styling.
 */
export default function LiveRaffleCard({ raffle, viewMode = "grid" }: LiveRaffleCardProps) {
  const r = raffle as any;

  const id = r.id;
  const title = r.title || "Untitled Competition";
  const slug = r.slug || id;
  const isAutoDraw = r.isAutoDraw;
  const host = r.host;

  const fallbackImg = "https://placehold.co/800x600/12141C/FF1E27?text=Tuned+Draws";
  const image = r.mainImage || r.image || fallbackImg;

  const ticketPrice = Number(r.pricePerTicket ?? r.ticketPrice ?? 0) || 0;
  const totalTickets = Number(r.totalTickets ?? 0) || 0;
  const soldTickets = Number(r.ticketsSold ?? r.soldTickets ?? 0) || 0;

  const declaredPrizeValue =
    r.mainPrizeValue !== undefined && r.mainPrizeValue !== null && r.mainPrizeValue !== ""
      ? Number(r.mainPrizeValue)
      : (r.worthPrice !== undefined && r.worthPrice !== null && r.worthPrice !== ""
          ? Number(r.worthPrice)
          : 0);

  const worthPrice = declaredPrizeValue > 0 ? declaredPrizeValue : 0;
  const soldPercent = totalTickets > 0 ? Math.min(Math.round((soldTickets / totalTickets) * 100), 100) : 0;
  const badgeText = r.badgeText || (soldPercent >= 90 ? "ALMOST GONE" : "HOT");

  const rawCategory = r.category;
  const category = typeof rawCategory === 'object' && rawCategory !== null
    ? (rawCategory.name || rawCategory.slug || 'Supercar')
    : (typeof rawCategory === 'string' ? rawCategory : 'Supercar');

  const hostName = host?.businessName || (host?.user?.firstName ? `${host.user.firstName} ${host.user.lastName || ''}`.trim() : "");

  const rawEndDate = r.endDate;
  const isValidDate = rawEndDate && !isNaN(new Date(rawEndDate).getTime());
  const formattedEndDate = isValidDate
    ? formatUkDateTime(rawEndDate)
    : (typeof rawEndDate === "string" ? rawEndDate : "Closing Soon");

  const [timeLeft, setTimeLeft] = useState<string>(() => {
    if (!isValidDate) return typeof rawEndDate === "string" ? rawEndDate : "Closing Soon";
    return "";
  });
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!isValidDate) {
      if (typeof rawEndDate === "string") setTimeLeft(rawEndDate);
      return;
    }

    const calculateTime = () => {
      const now = Date.now();
      const startMs = r.startDate ? new Date(r.startDate).getTime() : 0;
      if (startMs > now) {
        const startDiff = startMs - now;
        const sd = Math.floor(startDiff / (1000 * 60 * 60 * 24));
        const sh = Math.floor((startDiff / (1000 * 60 * 60)) % 24);
        const sm = Math.floor((startDiff / 1000 / 60) % 60);
        return sd > 0 ? `Starts in ${sd}d ${sh}h` : `Starts in ${sh}h ${sm}m`;
      }

      const diff = new Date(rawEndDate).getTime() - now;
      if (diff <= 0) return "Ended";
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);
      
      if (d > 0) return `${d}d ${h}h ${m}m`;
      return `${h}h ${m}m ${s}s`;
    };
    
    setTimeLeft(calculateTime());
    const interval = setInterval(() => setTimeLeft(calculateTime()), 1000);
    return () => clearInterval(interval);
  }, [rawEndDate, isValidDate, r.startDate]);

  const categoryLabel = typeof category === "string" ? category : "Competition";

  const isExpired = Boolean(
    rawEndDate &&
    (rawEndDate === "Draw Closed" ||
     rawEndDate === "Ended" ||
     (!isNaN(new Date(rawEndDate).getTime()) && new Date(rawEndDate).getTime() <= Date.now()))
  );
  const isStatusEnded =
    r.status?.toLowerCase() === "ended" ||
    r.status?.toLowerCase() === "completed" ||
    r.status?.toLowerCase() === "cancelled";
  const isSoldOut = totalTickets > 0 && soldTickets >= totalTickets;
  const isEnded = isStatusEnded || isExpired || isSoldOut;

  // -------------------------------------------------------------
  // LIST VIEW LAYOUT
  // -------------------------------------------------------------
  if (viewMode === "list") {
    return (
      <div className="group flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#12141C] shadow-2xl transition-all duration-300 hover:border-[#FF1E27]/40 hover:shadow-[0_0_30px_rgba(255,30,39,0.25)] sm:flex-row">
        {/* Left Side: Image Block */}
        <div className="relative w-full sm:w-[260px] md:w-[300px] h-[200px] sm:h-auto bg-[#1A1D27] shrink-0 overflow-hidden">
          <Image
            src={imgError ? fallbackImg : image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 300px"
            className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
            unoptimized
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12141C] via-transparent to-transparent sm:hidden" />

          {/* Badges on Top of Image */}
          <div className="absolute inset-x-3 top-3 flex items-start justify-between pointer-events-none">
            {hostName ? (
              <div className="max-w-[150px] truncate rounded-full border border-white/15 bg-[#0B0C0E]/85 px-2.5 py-1 text-[10px] font-heading font-bold text-white shadow-md backdrop-blur-md">
                By {hostName}
              </div>
            ) : <div />}

            <div className="rounded-full border border-white/15 bg-[#0B0C0E]/85 px-2.5 py-1 text-[10px] font-heading font-black text-[#FF1E27] tracking-wider uppercase shadow-md backdrop-blur-md">
              {categoryLabel}
            </div>
          </div>
          
          {/* Bottom Countdown Badge on Image */}
          <div className="absolute inset-x-3 bottom-3 flex items-end justify-center pointer-events-none">
            <div className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#0B0C0E]/90 px-3 py-1.5 shadow-md backdrop-blur-md">
              <Clock className="w-3.5 h-3.5 text-[#FF1E27]" />
              <span className="text-[11px] font-mono font-bold tracking-wide text-white">
                {isEnded ? "Draw Closed" : timeLeft}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Details Content */}
        <div className="flex-grow p-5 md:p-6 flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            {/* Title & Price Row */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-heading font-black text-lg md:text-xl text-white group-hover:text-[#FF1E27] transition-colors duration-200">
                  {title}
                </h3>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {badgeText && (
                    <div className="inline-flex items-center gap-1 border border-[#FF1E27]/30 bg-[#FF1E27]/10 px-2.5 py-0.5 rounded-full text-[9px] font-heading font-black text-[#FF1E27] tracking-wider uppercase">
                      {badgeText.toUpperCase() === "ALMOST GONE" && <Flame className="w-3 h-3 text-[#FF1E27]" />}
                      <span>{badgeText}</span>
                    </div>
                  )}
                  {isAutoDraw && (
                    <div className="inline-flex items-center gap-1 border border-white/10 bg-[#1A1D27] px-2.5 py-0.5 rounded-full text-[9px] font-heading font-bold text-[#D1D5DB] tracking-wider uppercase">
                      <ShieldCheck className="w-3 h-3 text-[#16A34A]" />
                      AUTO DRAW
                    </div>
                  )}
                  {isEnded && (
                    <div className="inline-flex items-center gap-1 border border-red-800 bg-red-950/80 px-2.5 py-0.5 rounded-full text-[9px] font-heading font-black text-red-400 tracking-wider uppercase">
                      CLOSED
                    </div>
                  )}
                </div>
                {worthPrice > 0 && (
                  <p className="font-heading font-bold text-xs text-[#8A92A0] uppercase tracking-wider mt-2">
                    Worth <span className="text-[#FF1E27]">{formatCurrency(worthPrice, 0)}</span>
                  </p>
                )}
              </div>

              {/* Price Pill */}
              <div className="shrink-0 rounded-xl border border-white/10 bg-[#1A1D27] px-4 py-2 text-center">
                <span className="block text-[9px] font-bold text-[#8A92A0] uppercase tracking-wider">Ticket</span>
                <span className="font-heading font-black text-base md:text-lg text-[#FF1E27]">
                  {formatCurrency(ticketPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Middle: Progress Bar & Countdown Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5 pt-4 border-t border-white/10">
            {/* Progress block */}
            <div className="flex flex-col justify-center">
              <div className="flex justify-between items-center text-xs text-[#8A92A0] mb-2 font-medium">
                <span className="flex items-center gap-1.5">
                  <Ticket className="w-3.5 h-3.5 text-[#FF1E27]" />
                  <span>{soldTickets} / {totalTickets} taken</span>
                </span>
                <span className="text-[#FF1E27] font-bold">{soldPercent}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#1A1D27] border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-[#FF1E27] to-[#B3000C] rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(255,30,39,0.5)]"
                  style={{ width: `${soldPercent}%` }}
                />
              </div>
            </div>

            {/* End Date block */}
            <div className="flex w-full items-center gap-2.5 rounded-xl border border-white/10 bg-[#1A1D27]/80 px-3.5 py-2.5">
              <Clock className="w-3.5 h-3.5 text-[#8A92A0]" />
              <div className="flex gap-1.5 text-xs">
                <span className="text-[#8A92A0]">{isEnded ? "Closed on:" : "Closes on:"}</span>
                <span className="font-semibold text-white">{formattedEndDate}</span>
              </div>
            </div>
          </div>

          {/* Bottom: CTA */}
          <div className="pt-2">
            {isEnded ? (
              <Link
                href={`/live-raffles/${slug || id}`}
                className="block w-full rounded-xl px-4 py-3 text-center font-heading text-xs font-black tracking-wider uppercase bg-[#1A1D27] border border-white/10 text-[#8A92A0] hover:text-white transition-all duration-200"
              >
                Draw Closed
              </Link>
            ) : (
              <Link
                href={`/live-raffles/${slug || id}`}
                className="btn-racing-red block w-full rounded-xl px-4 py-3 text-center font-heading text-xs font-black tracking-wider text-white uppercase shadow-[0_4px_20px_rgba(255,30,39,0.35)]"
              >
                Enter Draw →
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // DEFAULT GRID VIEW LAYOUT
  // -------------------------------------------------------------
  return (
    <div className="group flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#12141C] shadow-2xl transition-all duration-300 hover:border-[#FF1E27]/40 hover:shadow-[0_0_30px_rgba(255,30,39,0.25)]">
      {/* Card Image Block */}
      <div className="relative w-full h-[200px] bg-[#1A1D27] shrink-0 overflow-hidden">
        <Image
          src={imgError ? fallbackImg : image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
          unoptimized
          onError={() => setImgError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12141C] via-transparent to-transparent" />

        {/* Floating Badges */}
        <div className="absolute inset-x-3 top-3 flex items-start justify-between pointer-events-none">
          {hostName ? (
            <div className="max-w-[140px] truncate rounded-full border border-white/15 bg-[#0B0C0E]/85 px-2.5 py-1 text-[10px] font-heading font-bold text-white shadow-md backdrop-blur-md">
              By {hostName}
            </div>
          ) : <div />}

          <div className="rounded-full border border-white/15 bg-[#0B0C0E]/85 px-2.5 py-1 text-[10px] font-heading font-black text-[#FF1E27] tracking-wider uppercase shadow-md backdrop-blur-md">
            {categoryLabel}
          </div>
        </div>

        {/* Live Countdown Pill */}
        <div className="absolute inset-x-3 bottom-3 flex items-end justify-center pointer-events-none">
          <div className="flex items-center gap-1.5 rounded-lg border border-white/15 bg-[#0B0C0E]/90 px-3 py-1.5 shadow-md backdrop-blur-md">
            <Clock className="w-3.5 h-3.5 text-[#FF1E27]" />
            <span className="text-[11px] font-mono font-bold tracking-wide text-white">
              {isEnded ? "Draw Closed" : timeLeft}
            </span>
          </div>
        </div>
      </div>

      {/* Card Content details */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Header Row: Title & Price Tag */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-heading font-black text-lg text-white group-hover:text-[#FF1E27] transition-colors line-clamp-1">
              {title}
            </h3>
            <div className="shrink-0 rounded-lg border border-white/10 bg-[#1A1D27] px-2.5 py-1 text-center">
              <span className="font-heading font-black text-xs text-[#FF1E27]">
                {formatCurrency(ticketPrice)}
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {badgeText && (
              <div className="inline-flex items-center gap-1 border border-[#FF1E27]/30 bg-[#FF1E27]/10 px-2 py-0.5 rounded-full text-[9px] font-heading font-black text-[#FF1E27] tracking-wider uppercase">
                {badgeText.toUpperCase() === "ALMOST GONE" && <Flame className="w-3 h-3 text-[#FF1E27]" />}
                <span>{badgeText}</span>
              </div>
            )}
            {isAutoDraw && (
              <div className="inline-flex items-center gap-1 border border-white/10 bg-[#1A1D27] px-2 py-0.5 rounded-full text-[9px] font-heading font-bold text-[#D1D5DB] tracking-wider uppercase">
                <ShieldCheck className="w-3 h-3 text-[#16A34A]" />
                AUTO
              </div>
            )}
            {isEnded && (
              <div className="inline-flex items-center gap-1 border border-red-800 bg-red-950/80 px-2 py-0.5 rounded-full text-[9px] font-heading font-black text-red-400 tracking-wider uppercase">
                CLOSED
              </div>
            )}
          </div>

          {/* Worth Subheading */}
          {worthPrice > 0 && (
            <p className="mb-4 font-heading text-xs font-bold uppercase tracking-wider text-[#8A92A0]">
              Est. Worth <span className="text-white">{formatCurrency(worthPrice, 0)}</span>
            </p>
          )}

          {/* Ticket Sold Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center text-xs text-[#8A92A0] mb-2 font-medium">
              <span className="flex items-center gap-1.5">
                <Ticket className="w-3 h-3 text-[#FF1E27]" />
                <span>{soldTickets} / {totalTickets} taken</span>
              </span>
              <span className="text-[#FF1E27] font-bold">{soldPercent}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#1A1D27] border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-[#FF1E27] to-[#B3000C] rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(255,30,39,0.5)]"
                style={{ width: `${soldPercent}%` }}
              />
            </div>
          </div>

          {/* Closes on Countdown Block */}
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-white/10 bg-[#1A1D27]/80 px-3 py-2 text-xs">
            <Clock className="w-3.5 h-3.5 text-[#8A92A0]" />
            <span className="text-[#8A92A0]">{isEnded ? "Closed on:" : "Closes on:"}</span>
            <span className="font-semibold text-white truncate">{formattedEndDate}</span>
          </div>
        </div>

        {/* Enter Draw CTA Button */}
        {isEnded ? (
          <Link
            href={`/live-raffles/${slug || id}`}
            className="block w-full rounded-xl px-4 py-3 text-center font-heading text-xs font-black tracking-wider uppercase bg-[#1A1D27] border border-white/10 text-[#8A92A0] hover:text-white transition-all duration-200"
          >
            Draw Closed
          </Link>
        ) : (
          <Link
            href={`/live-raffles/${slug || id}`}
            className="btn-racing-red block w-full rounded-xl px-4 py-3 text-center font-heading text-xs font-black tracking-wider text-white uppercase shadow-[0_4px_20px_rgba(255,30,39,0.35)]"
          >
            Enter Draw →
          </Link>
        )}
      </div>
    </div>
  );
}
