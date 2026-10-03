import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Draw } from "../../../types/draw.types";
import { formatCurrency } from "../../../lib/utils";
import PrimaryButton from "./PrimaryButton";

interface DrawCardProps {
  draw: Draw;
  variant?: "grid" | "featured" | "instant";
}

function checkIsEndPassed(rawEnd?: string, endDate?: string): boolean {
  if (rawEnd) {
    if (rawEnd === "Draw Closed" || rawEnd === "Ended") {
      return true;
    }
    const parsedTime = new Date(rawEnd).getTime();
    if (!isNaN(parsedTime)) {
      return parsedTime <= Date.now();
    }
  }

  if (endDate) {
    if (endDate === "Draw Closed" || endDate === "Ended") {
      return true;
    }
    if (endDate.includes("T") || endDate.includes(":")) {
      const parsedTime = new Date(endDate).getTime();
      if (!isNaN(parsedTime)) {
        return parsedTime <= Date.now();
      }
    } else {
      const parsedDate = new Date(endDate);
      if (!isNaN(parsedDate.getTime())) {
        const endOfDay = new Date(parsedDate);
        endOfDay.setHours(23, 59, 59, 999);
        return endOfDay.getTime() <= Date.now();
      }
    }
  }

  return false;
}

/**
 * Reusable Card component for Competitions, Live Draws, and Instant Wins.
 * Formatted with Tuned Draws dark carbon glass and electric racing red design system.
 */
export default function DrawCard({ draw, variant = "grid" }: DrawCardProps) {
  const {
    title,
    description,
    image,
    ticketPrice,
    totalTickets,
    soldTickets,
    endDate,
    worthPrice: rawWorthPrice,
    instantWinsCount,
    isInstantWin,
  } = draw;

  const statusLower = (draw.status || "").toLowerCase();
  const rawEnd = draw.rawEndDate || (draw as any).rawEndDate;
  const isEndPassed = checkIsEndPassed(rawEnd, endDate);

  const isSoldOut = totalTickets > 0 && soldTickets >= totalTickets;
  const isEnded =
    statusLower === "ended" ||
    statusLower === "completed" ||
    statusLower === "cancelled" ||
    statusLower === "sold_out" ||
    isSoldOut ||
    isEndPassed;

  const declaredValue =
    (draw as any).mainPrizeValue !== undefined &&
    (draw as any).mainPrizeValue !== null &&
    (draw as any).mainPrizeValue !== ""
      ? Number((draw as any).mainPrizeValue)
      : (rawWorthPrice ? Number(rawWorthPrice) : undefined);

  const worthPrice = declaredValue && declaredValue > 0 ? declaredValue : undefined;
  const soldPercent = totalTickets > 0 ? Math.min(Math.round((soldTickets / totalTickets) * 100), 100) : 0;

  const clockIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-3.5 h-3.5 text-[#8A92A0]"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );

  const arrowIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
      className="w-4 h-4 text-white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  );

  if (variant === "featured") {
    return (
      <div className="flex flex-col bg-[#12141C] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-[#FF1E27]/40 hover:shadow-[0_0_30px_rgba(255,30,39,0.25)] w-full max-w-[750px] group">
        {/* Card Image */}
        <div className="relative w-full h-[280px] md:h-[340px] bg-[#1A1D27] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 750px"
            className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12141C] via-transparent to-transparent" />
          
          {worthPrice && (
            <div className="absolute top-4 left-4 bg-[#0B0C0E]/85 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-[11px] font-heading font-black text-white tracking-wider uppercase shadow-md">
              WORTH <span className="text-[#FF1E27]">{formatCurrency(worthPrice, 0)}</span>
            </div>
          )}
          {isEnded && (
            <div className="absolute top-4 right-4 bg-red-950/80 border border-red-700/60 text-red-400 px-3 py-1 rounded-full text-[11px] font-black tracking-wider uppercase shadow-md backdrop-blur-sm">
              Draw Closed
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6 md:p-8 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="font-heading font-black text-xl md:text-2xl text-white group-hover:text-[#FF1E27] transition-colors">
              {title}
            </h3>
            {worthPrice && (
              <span className="text-xs font-bold font-heading text-[#8A92A0] whitespace-nowrap hidden sm:inline uppercase">
                Est. {formatCurrency(worthPrice, 0)}
              </span>
            )}
          </div>

          {description && (
            <p className="font-sans text-xs md:text-sm text-[#8A92A0] leading-relaxed mb-6 line-clamp-2">
              {description}
            </p>
          )}

          {/* Ticket Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center text-xs text-[#8A92A0] mb-2 font-medium">
              <span>{soldTickets} / {totalTickets} tickets taken</span>
              <span className="text-[#FF1E27] font-bold">{soldPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-[#1A1D27] rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-[#FF1E27] to-[#B3000C] rounded-full transition-all duration-500 ease-out shadow-[0_0_12px_rgba(255,30,39,0.5)]"
                style={{ width: `${soldPercent}%` }}
              />
            </div>
          </div>

          {/* Pricing & CTA Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-white/10 mt-auto">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#8A92A0] uppercase tracking-wider font-bold">
                Ticket Price
              </span>
              <span className="text-2xl font-black font-heading text-[#FF1E27]">
                {formatCurrency(ticketPrice)}
              </span>
            </div>
            {isEnded ? (
              <Link
                href={`/live-raffles/${draw.slug || draw.id}`}
                className="px-8 py-3.5 text-xs font-heading font-black uppercase rounded-xl bg-[#1A1D27] border border-white/10 text-[#8A92A0] hover:text-white text-center transition-all"
              >
                Draw Closed
              </Link>
            ) : (
              <PrimaryButton
                href={`/live-raffles/${draw.slug || draw.id}`}
                icon={arrowIcon}
                className="px-8 py-3.5 text-xs"
              >
                Enter Now
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Instant wins variant
  if (variant === "instant" || isInstantWin) {
    return (
      <div className="flex flex-col bg-[#12141C] border border-white/10 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:border-[#FF1E27]/40 hover:shadow-[0_0_25px_rgba(255,30,39,0.25)] group">
        {/* Card Image */}
        <div className="relative w-full h-[180px] bg-[#1A1D27] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12141C] via-transparent to-transparent" />
          
          <div className="absolute top-3 left-3 bg-[#FF1E27] text-white px-2.5 py-1 rounded-full text-[9px] font-heading font-black uppercase tracking-wider shadow-[0_0_10px_rgba(255,30,39,0.6)]">
            ⚡ INSTANT WIN
          </div>

          {isEnded && (
            <div className="absolute top-3 right-3 bg-red-950/80 border border-red-700/60 text-red-400 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase shadow-xs">
              Draw Closed
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-heading font-black text-base text-white mb-2 line-clamp-1 group-hover:text-[#FF1E27] transition-colors">
            {title}
          </h3>

          <div className="text-lg font-black text-[#FF1E27] font-heading mb-4">
            Worth {formatCurrency(worthPrice || 0, 0)}
          </div>

          {/* Ticket Progress Bar */}
          <div className="mb-4">
            <div className="w-full h-1.5 bg-[#1A1D27] rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-[#FF1E27] to-[#B3000C] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${soldPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] text-[#8A92A0] mt-1.5 font-medium">
              <span>{soldTickets} / {totalTickets}</span>
              <span>{soldPercent}% sold</span>
            </div>
          </div>

          {/* Countdown timer */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#8A92A0] mb-5 bg-[#1A1D27] px-2.5 py-1.5 rounded-lg border border-white/5 w-fit">
            {clockIcon}
            <span>{isEnded ? "Draw Closed" : endDate}</span>
          </div>

          {/* Pricing & CTA Row */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto gap-4">
            <div className="flex flex-col">
              <span className="text-[9px] text-[#8A92A0] uppercase tracking-wider font-bold">
                Entry from
              </span>
              <span className="text-base font-black text-white">
                {formatCurrency(ticketPrice)}
              </span>
            </div>
            
            {isEnded ? (
              <Link
                href={`/live-raffles/${draw.slug || draw.id}`}
                className="px-4 py-2 text-xs font-heading font-black uppercase rounded-xl bg-[#1A1D27] border border-white/10 text-[#8A92A0] hover:text-white text-center transition-all"
              >
                Closed
              </Link>
            ) : (
              <PrimaryButton
                href={`/live-raffles/${draw.slug || draw.id}`}
                className="px-4 py-2 text-xs"
                icon={arrowIcon}
              >
                Enter
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Standard Grid draw card
  return (
    <div className="flex flex-col bg-[#12141C] border border-white/10 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:border-[#FF1E27]/40 hover:shadow-[0_0_25px_rgba(255,30,39,0.25)] group">
      {/* Card Image */}
      <div className="relative w-full h-[180px] bg-[#1A1D27] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12141C] via-transparent to-transparent" />

        {worthPrice && (
          <div className="absolute top-3 left-3 bg-[#0B0C0E]/85 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-full text-[10px] font-heading font-black text-white tracking-wider uppercase shadow-md">
            WORTH <span className="text-[#FF1E27]">{formatCurrency(worthPrice, 0)}</span>
          </div>
        )}
        {isEnded && (
          <div className="absolute top-3 right-3 bg-red-950/80 border border-red-700/60 text-red-400 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase shadow-xs">
            Draw Closed
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading font-black text-base text-white mb-2 line-clamp-1 group-hover:text-[#FF1E27] transition-colors">
          {title}
        </h3>
        
        {description && (
          <p className="font-sans text-[11px] text-[#8A92A0] leading-relaxed mb-4 line-clamp-2 h-8">
            {description}
          </p>
        )}

        {/* Ticket Progress Bar */}
        <div className="mb-4">
          <div className="w-full h-1.5 bg-[#1A1D27] rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-[#FF1E27] to-[#B3000C] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${soldPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-[#8A92A0] mt-1.5 font-medium">
            <span>{soldTickets} / {totalTickets} tickets</span>
            <span className="text-[#FF1E27] font-bold">{soldPercent}% sold</span>
          </div>
        </div>

        {/* Countdown timer */}
        <div className="flex items-center gap-1.5 text-[11px] text-[#8A92A0] mb-5 bg-[#1A1D27] px-2.5 py-1.5 rounded-lg border border-white/5 w-fit">
          {clockIcon}
          <span>{isEnded ? "Draw Closed" : endDate}</span>
        </div>

        {/* Pricing & CTA Row */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto gap-4">
          <div className="flex flex-col">
            <span className="text-[9px] text-[#8A92A0] uppercase tracking-wider font-bold">
              Ticket
            </span>
            <span className="text-base font-black font-heading text-[#FF1E27]">
              {formatCurrency(ticketPrice)}
            </span>
          </div>
          
          {isEnded ? (
            <Link
              href={`/live-raffles/${draw.slug || draw.id}`}
              className="px-4 py-2 text-xs font-heading font-black uppercase rounded-xl bg-[#1A1D27] border border-white/10 text-[#8A92A0] hover:text-white text-center transition-all"
            >
              Closed
            </Link>
          ) : (
            <PrimaryButton
              href={`/live-raffles/${draw.slug || draw.id}`}
              className="px-4 py-2 text-xs"
              icon={arrowIcon}
            >
              Enter Draw
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
}
