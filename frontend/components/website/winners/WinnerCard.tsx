import React from "react";
import Image from "next/image";
import { Winner } from "../../../types/winner.types";
import { CheckCircle2, Trophy } from "lucide-react";

interface WinnerCardProps {
  winner: Winner;
}

/**
 * Renders a completed raffle winner record card with ticket and avatar details.
 * Formatted in Tuned Draws dark carbon glass and Electric Racing Red design.
 */
export default function WinnerCard({ winner }: WinnerCardProps) {
  const { name, location, avatar, competitionImage, initials, prizeTitle, drawDate, ticketNumber } = winner;
  const displayImage = competitionImage || avatar;

  return (
    <div className="relative min-h-[195px] w-full rounded-2xl border border-white/10 bg-[#12141C] p-5 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#FF1E27]/40 hover:shadow-[0_0_30px_rgba(255,30,39,0.22)] group flex flex-col justify-between">
      
      <div>
        {/* Top Header Block: Initials & User Details */}
        <div className="flex items-center gap-3 pr-24">
          {/* Initials Placeholder or Avatar */}
          {avatar && avatar !== "/placeholder-avatar.jpg" ? (
            <div className="relative h-11 w-11 shrink-0 rounded-xl overflow-hidden border border-white/15 shadow-sm">
              <Image src={avatar} alt={name} fill unoptimized sizes="44px" className="object-cover" />
            </div>
          ) : (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-[#1A1D27] font-heading text-sm font-black text-white group-hover:border-[#FF1E27]/40 transition-colors select-none shadow-sm">
              {initials}
            </div>
          )}

          {/* Name & Location Details */}
          <div className="flex flex-col min-w-0">
            <span className="font-heading font-black text-sm text-white group-hover:text-[#FF1E27] transition-colors truncate">
              {name}
            </span>
            {location && location !== "Unknown Location" && location !== "Unknown" && (
              <span className="font-sans text-xs text-[#8A92A0] truncate mt-0.5">
                {location}
              </span>
            )}
          </div>
        </div>

        {/* Horizontal Divider Line */}
        <div className="my-3.5 h-px w-full bg-white/10" />

        {/* Body Section: Prize Name & Draw Date */}
        <div className="flex flex-col justify-between pr-24">
          <div>
            <h3 className="font-heading font-black text-sm text-white line-clamp-2 leading-snug group-hover:text-[#FF1E27] transition-colors">
              {prizeTitle}
            </h3>
            <p className="font-sans text-[11px] text-[#8A92A0] mt-1 leading-normal">
              {drawDate}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Row: Delivered status pill & ticket ref */}
      <div className="flex items-center justify-between mt-4 pr-24 sm:pr-0 pt-2 border-t border-white/5">
        {/* Verification Status Badge */}
        <div className="flex w-fit items-center gap-1.5 rounded-full border border-emerald-700/50 bg-emerald-950/60 px-2.5 py-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span className="text-[9px] font-heading font-black leading-none tracking-wider text-emerald-400 uppercase">
            Delivered
          </span>
        </div>

        {/* Masked Ticket Reference Number (For transparency) */}
        <span className="font-mono text-[10px] text-[#8A92A0] tracking-wider font-semibold mr-1">
          {ticketNumber}
        </span>
      </div>

      {/* Competition/Prize photo (Absolute positioning on the top-right corner) */}
      {displayImage && (
        <div className="absolute right-5 top-5 w-20 h-20 rounded-xl border border-white/15 overflow-hidden bg-[#1A1D27] shrink-0 shadow-lg select-none group-hover:scale-105 transition-transform duration-300">
          <Image
            src={displayImage}
            alt={`${prizeTitle} prize image`}
            fill
            sizes="80px"
            className="object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-200"
            unoptimized
          />
        </div>
      )}

    </div>
  );
}
