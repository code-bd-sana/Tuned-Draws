import React from "react";
import { Gauge } from "lucide-react";

interface LiveRafflesEmptyStateProps {
  onReset: () => void;
}

/**
 * Visual feedback for search/filter results containing zero elements in the live draws arena.
 * Styled in Tuned Draws dark carbon and Electric Racing Red design.
 */
export default function LiveRafflesEmptyState({ onReset }: LiveRafflesEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-[#211C18] border border-white/10 border-dashed rounded-2xl max-w-lg mx-auto font-sans shadow-2xl">
      <div className="w-14 h-14 rounded-2xl bg-[#302820] border border-[#D4A863]/30 flex items-center justify-center mb-5 text-[#D4A863] shadow-[0_0_15px_rgba(212,168,99,0.2)]">
        <Gauge className="w-7 h-7" />
      </div>
      <h3 className="font-heading font-black text-xl text-white mb-2 uppercase tracking-wide">
        No Competitions Found
      </h3>
      <p className="text-sm text-[#B6AA9C] max-w-xs leading-relaxed mb-6 font-sans">
        We couldn&apos;t find any active competitions matching your search or category filters.
      </p>
      <button
        onClick={onReset}
        className="btn-racing-red font-heading font-black text-xs text-white uppercase tracking-wider px-6 py-3 rounded-xl transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(212,168,99,0.35)]"
      >
        Reset Filters
      </button>
    </div>
  );
}
