"use client";

import React from "react";
import { CompetitionDetails } from "@/services/admin-ticket-assignment.service";

interface InstantWinVisualizerProps {
  details: CompetitionDetails;
  selectedTicketNumbers: number[];
  onToggleTicketNumber: (num: number) => void;
}

export default function InstantWinVisualizer({
  details,
  selectedTicketNumbers,
  onToggleTicketNumber,
}: InstantWinVisualizerProps) {
  const instantWins = details.instantWins || [];
  const soldNumbersSet = new Set(details.soldNumbers || []);

  if (instantWins.length === 0) {
    return (
      <div className="bg-[#12141C] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3 text-[#8A92A0]">
          <span className="text-xl">ℹ️</span>
          <span className="font-sans text-xs">
            No instant win prizes configured for this competition.
          </span>
        </div>
      </div>
    );
  }

  const unclaimedCount = instantWins.filter((iw) => !iw.isClaimed && !soldNumbersSet.has(iw.ticketNumber)).length;
  const claimedCount = instantWins.length - unclaimedCount;

  return (
    <div className="flex flex-col gap-4 bg-[#12141C] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm shadow-xs">
            ⚡
          </div>
          <div>
            <h3 className="font-heading font-black text-base sm:text-lg text-white uppercase tracking-tight flex items-center gap-2">
              Instant Win Visualizer
              <span className="px-2 py-0.5 rounded-full text-[10px] font-sans font-bold bg-amber-500/15 border border-amber-500/30 text-amber-400">
                {unclaimedCount} Available
              </span>
            </h3>
            <p className="font-sans text-xs text-[#8A92A0]">
              Instant win prizes trigger automatically when the assigned ticket number matches
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-sans">
          <span className="flex items-center gap-1.5 text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            {unclaimedCount} Unclaimed
          </span>
          <span className="text-[#8A92A0]">•</span>
          <span className="flex items-center gap-1.5 text-[#8A92A0]">
            <span className="w-2 h-2 rounded-full bg-[#8A92A0]" />
            {claimedCount} Claimed / Sold
          </span>
        </div>
      </div>

      {/* Grid of Instant Wins */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-60 overflow-y-auto pr-1">
        {instantWins.map((iw) => {
          const isSold = soldNumbersSet.has(iw.ticketNumber) || iw.isClaimed;
          const isSelected = selectedTicketNumbers.includes(iw.ticketNumber);

          return (
            <div
              key={iw.id}
              className={`p-3 rounded-xl border flex flex-col justify-between gap-2.5 transition-all ${
                isSelected
                  ? "bg-amber-500/15 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.25)] ring-1 ring-amber-400"
                  : isSold
                  ? "bg-black/30 border-white/5 opacity-60"
                  : "bg-[#0B0C0E]/80 border-amber-500/30 hover:border-amber-400 hover:bg-[#181B26]"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md font-mono font-black text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-xs">
                    #{iw.ticketNumber}
                  </span>
                  {iw.rrpValue && (
                    <span className="text-[10px] font-sans font-bold text-[#8A92A0]">
                      RRP £{iw.rrpValue.toFixed(2)}
                    </span>
                  )}
                </div>

                {isSold ? (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-white/5 text-[#8A92A0] border border-white/10">
                    Claimed
                  </span>
                ) : isSelected ? (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-500 text-black font-black">
                    Selected ✓
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Available
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {iw.image && (
                  <div className="w-8 h-8 rounded-lg bg-black/50 overflow-hidden shrink-0 border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={iw.image}
                      alt={iw.prizeName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-heading font-bold text-xs text-white truncate" title={iw.prizeName}>
                    {iw.prizeName}
                  </p>
                </div>
              </div>

              {/* 1-click quick-action button */}
              <button
                type="button"
                disabled={isSold}
                onClick={() => onToggleTicketNumber(iw.ticketNumber)}
                className={`w-full py-1.5 px-2.5 rounded-lg font-sans font-bold text-[11px] transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  isSold
                    ? "bg-transparent text-[#8A92A0] cursor-not-allowed border border-white/5 line-through"
                    : isSelected
                    ? "bg-amber-500 text-black hover:bg-amber-400 shadow-xs font-black"
                    : "bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/30 hover:border-amber-500 shadow-xs"
                }`}
              >
                {isSold ? (
                  "Already Claimed"
                ) : isSelected ? (
                  "✓ Selected in Assignment"
                ) : (
                  <>
                    <span>⚡ Quick Select #{iw.ticketNumber}</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
