"use client";

import React from "react";
import {
  CompetitionDetails,
  SearchedUser,
} from "@/services/admin-ticket-assignment.service";

interface AssignmentConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  competition: CompetitionDetails | null;
  recipient: SearchedUser | null;
  mode: "specific" | "random";
  ticketNumbers: number[];
  randomQuantity: number;
  adminNotes: string;
}

export default function AssignmentConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  competition,
  recipient,
  mode,
  ticketNumbers,
  randomQuantity,
  adminNotes,
}: AssignmentConfirmationModalProps) {
  if (!isOpen || !competition || !recipient) return null;

  const count = mode === "specific" ? ticketNumbers.length : randomQuantity;
  const unitPrice = competition.stats.pricePerTicket;
  const totalValue = count * unitPrice;

  // Instant wins triggered
  const instantWinMap = new Map(competition.instantWins.map((iw) => [iw.ticketNumber, iw]));
  const triggeredInstantWins =
    mode === "specific"
      ? ticketNumbers
          .map((n) => instantWinMap.get(n))
          .filter((iw) => Boolean(iw && !iw.isClaimed))
      : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-lg bg-[#12141C] border border-white/20 rounded-2xl p-6 flex flex-col gap-5 shadow-2xl animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🛡️</span>
            <div>
              <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight">
                Confirm Manual Ticket Assignment
              </h3>
              <p className="font-sans text-xs text-[#8A92A0]">
                Review financial details before finalizing allocation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-[#8A92A0] hover:text-white flex items-center justify-center text-sm font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Instant win warning if any */}
        {triggeredInstantWins.length > 0 && (
          <div className="p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs flex items-center gap-2.5">
            <span className="text-xl">⚡</span>
            <div>
              <strong className="font-bold text-white">Instant Win Prize Included!</strong>
              <div className="text-[11px] text-amber-200">
                Ticket(s) {triggeredInstantWins.map((iw: any) => `#${iw.ticketNumber}`).join(", ")} will immediately grant instant win prizes to {recipient.name}.
              </div>
            </div>
          </div>
        )}

        {/* Details Breakdown List */}
        <div className="flex flex-col divide-y divide-white/5 bg-[#0B0C0E] border border-white/10 rounded-xl p-4 text-xs font-sans">
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-[#8A92A0]">Recipient:</span>
            <div className="text-right">
              <span className="font-bold text-white">{recipient.name}</span>
              <div className="text-[11px] text-[#8A92A0]">{recipient.email}</div>
            </div>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <span className="text-[#8A92A0]">Competition:</span>
            <span className="font-bold text-white max-w-[240px] truncate text-right">
              {competition.title}
            </span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <span className="text-[#8A92A0]">Assigned Tickets:</span>
            <span className="font-mono font-bold text-white text-right">
              {mode === "specific"
                ? `${count} Ticket(s) (${ticketNumbers.slice(0, 10).map((n) => `#${n}`).join(", ")}${ticketNumbers.length > 10 ? "..." : ""})`
                : `${count} Random Available Ticket(s)`}
            </span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <span className="text-[#8A92A0]">Total Accounting Value:</span>
            <span className="font-heading font-black text-sm text-emerald-400">
              £{totalValue.toFixed(2)}
            </span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <span className="text-purple-300 font-semibold">Host Credited Balance:</span>
            <span className="font-heading font-black text-sm text-purple-300">
              +£{totalValue.toFixed(2)}
            </span>
          </div>

          {adminNotes && (
            <div className="py-2.5 flex items-start justify-between gap-4">
              <span className="text-[#8A92A0] shrink-0">Admin Notes:</span>
              <span className="text-white text-right italic font-medium truncate max-w-xs">
                &quot;{adminNotes}&quot;
              </span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-sans text-xs font-bold transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className="px-6 py-2.5 rounded-xl bg-[#FF1E27] hover:bg-[#e01921] text-white font-heading font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(255,30,39,0.5)] cursor-pointer flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>Confirm &amp; Allocate →</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
