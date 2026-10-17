"use client";

import React, { useState } from "react";
import {
  AssignedCompetition,
  useAdminAssignmentCompetitions,
} from "@/hooks/useAdminTicketAssignment";

interface CompetitionSelectorProps {
  selectedCompetitionId: string | null;
  onSelectCompetition: (competition: AssignedCompetition | null) => void;
}

export default function CompetitionSelector({
  selectedCompetitionId,
  onSelectCompetition,
}: CompetitionSelectorProps) {
  const [search, setSearch] = useState("");
  const { data: competitions, isLoading, isError } = useAdminAssignmentCompetitions({
    q: search,
  });

  const selectedCompetition =
    competitions?.find((c) => c.id === selectedCompetitionId) || null;

  return (
    <div className="flex flex-col gap-4 bg-[#12141C] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#FF1E27]/10 border border-[#FF1E27]/30 flex items-center justify-center text-[#FF1E27] font-bold text-sm shadow-xs">
            1
          </div>
          <div>
            <h3 className="font-heading font-black text-base sm:text-lg text-white uppercase tracking-tight">
              Select Competition
            </h3>
            <p className="font-sans text-xs text-[#8A92A0]">
              Choose the active competition to allocate tickets from
            </p>
          </div>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <svg
            className="w-4 h-4 text-[#8A92A0] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search competitions..."
            className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs font-sans text-white placeholder-[#8A92A0] focus:outline-none focus:border-[#FF1E27] transition-all"
          />
        </div>
      </div>

      {/* Selected Competition Preview Card */}
      {selectedCompetition ? (
        <div className="relative overflow-hidden bg-gradient-to-br from-[#181B26] to-[#0E1017] border-2 border-[#FF1E27] rounded-xl p-4 sm:p-5 shadow-[0_0_25px_rgba(255,30,39,0.15)] flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-20 h-20 rounded-xl bg-black/60 border border-white/10 overflow-hidden shrink-0 relative shadow-md">
              {selectedCompetition.mainImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selectedCompetition.mainImage}
                  alt={selectedCompetition.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl">
                  🏆
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  {selectedCompetition.status}
                </span>
                {selectedCompetition.isAutoDraw && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 border border-purple-500/30 text-purple-300">
                    ⚡ Auto-Draw
                  </span>
                )}
                {selectedCompetition.instantWins.total > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-400">
                    ⚡ {selectedCompetition.instantWins.unclaimed} Instant Wins Left
                  </span>
                )}
              </div>

              <h4 className="font-heading font-black text-base sm:text-lg text-white truncate max-w-md">
                {selectedCompetition.title}
              </h4>

              <div className="flex items-center gap-4 text-xs font-sans text-[#8A92A0]">
                <span>Host: <strong className="text-white">{selectedCompetition.host.name}</strong></span>
                <span>•</span>
                <span>Price: <strong className="text-[#FF1E27] font-bold">£{selectedCompetition.pricePerTicket.toFixed(2)}</strong></span>
              </div>
            </div>
          </div>

          {/* Progress & Change action */}
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto shrink-0">
            <div className="flex flex-col gap-1.5 w-full sm:w-48">
              <div className="flex justify-between text-[11px] font-sans">
                <span className="text-[#8A92A0]">Sold: <strong className="text-white">{selectedCompetition.ticketsSold}</strong>/{selectedCompetition.totalTickets}</span>
                <span className="text-emerald-400 font-bold">{selectedCompetition.remainingTickets} left</span>
              </div>
              <div className="w-full h-2 bg-[#0B0C0E] rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-[#FF1E27] rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      (selectedCompetition.ticketsSold / selectedCompetition.totalTickets) * 100,
                    )}%`,
                  }}
                />
              </div>
            </div>

            <button
              onClick={() => onSelectCompetition(null)}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-sans text-xs font-bold transition-all cursor-pointer whitespace-nowrap self-center sm:self-auto"
            >
              Change Competition
            </button>
          </div>
        </div>
      ) : (
        /* Competitions Grid Selector */
        <div className="flex flex-col gap-3">
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2 text-[#8A92A0]">
              <div className="w-7 h-7 border-2 border-[#FF1E27] border-t-transparent rounded-full animate-spin" />
              <span className="font-sans text-xs">Loading live competitions...</span>
            </div>
          ) : isError ? (
            <div className="py-8 text-center text-red-400 font-sans text-xs bg-red-500/10 border border-red-500/20 rounded-xl">
              Failed to load competitions. Please refresh or try again.
            </div>
          ) : !competitions || competitions.length === 0 ? (
            <div className="py-10 text-center text-[#8A92A0] font-sans text-xs flex flex-col items-center justify-center gap-2">
              <span className="text-2xl">🔍</span>
              <p className="font-heading font-bold text-sm text-white">No active competitions found</p>
              <p className="text-[11px] text-[#8A92A0]">Try adjusting your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1">
              {competitions.map((comp) => {
                const soldOut = comp.remainingTickets <= 0;
                return (
                  <div
                    key={comp.id}
                    onClick={() => {
                      if (!soldOut) onSelectCompetition(comp);
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3.5 group ${
                      soldOut
                        ? "opacity-50 cursor-not-allowed bg-black/20 border-white/5"
                        : "bg-[#0B0C0E]/70 hover:bg-[#181B26] border-white/10 hover:border-[#FF1E27]/50 hover:shadow-[0_0_15px_rgba(255,30,39,0.1)]"
                    }`}
                  >
                    <div className="w-14 h-14 rounded-lg bg-black/50 border border-white/10 overflow-hidden shrink-0 relative">
                      {comp.mainImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={comp.mainImage}
                          alt={comp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg">
                          🎯
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col min-w-0 flex-1">
                      <h5 className="font-heading font-bold text-xs text-white truncate group-hover:text-[#FF1E27] transition-colors">
                        {comp.title}
                      </h5>
                      <div className="flex items-center gap-2 text-[11px] font-sans text-[#8A92A0] mt-0.5">
                        <span>£{comp.pricePerTicket.toFixed(2)}/tkt</span>
                        <span>•</span>
                        <span className="text-emerald-400 font-semibold">{comp.remainingTickets} left</span>
                      </div>
                      <div className="text-[10px] text-[#8A92A0] truncate mt-0.5">
                        Host: {comp.host.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
