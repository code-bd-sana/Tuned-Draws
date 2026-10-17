"use client";

import React from "react";
import { AssignmentResult } from "@/services/admin-ticket-assignment.service";

interface AssignmentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AssignmentResult | null;
}

export default function AssignmentSuccessModal({
  isOpen,
  onClose,
  result,
}: AssignmentSuccessModalProps) {
  if (!isOpen || !result) return null;

  const hasInstantWins = result.instantWins && result.instantWins.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-lg bg-[#12141C] border border-white/20 rounded-2xl p-6 sm:p-7 flex flex-col gap-5 shadow-2xl animate-scaleUp max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Celebration Banner for Instant Wins */}
        {hasInstantWins && (
          <div className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-600/20 border-2 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.3)] flex flex-col items-center text-center gap-2 animate-bounce-subtle">
            <span className="text-4xl animate-spin-slow">🎉</span>
            <h3 className="font-heading font-black text-lg sm:text-xl text-yellow-300 uppercase tracking-tight">
              Instant Win Prize Unlocked!
            </h3>
            <p className="font-sans text-xs text-yellow-100 max-w-sm">
              The assigned tickets triggered {result.instantWins.length} instant win prize(s)! Winner records have been automatically generated.
            </p>

            <div className="flex flex-col gap-1.5 w-full mt-2">
              {result.instantWins.map((win) => (
                <div
                  key={win.winnerId}
                  className="bg-black/50 border border-amber-400/40 rounded-xl p-2.5 flex items-center justify-between text-xs"
                >
                  <span className="font-mono font-bold text-amber-300">
                    Ticket #{win.ticketNumber}
                  </span>
                  <span className="font-heading font-black text-white truncate max-w-[200px]">
                    {win.prizeName}
                  </span>
                  {win.rrpValue && (
                    <span className="text-[11px] text-amber-400 font-bold">
                      £{win.rrpValue.toFixed(2)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Success Header */}
        {!hasInstantWins && (
          <div className="flex flex-col items-center text-center gap-2 pt-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              ✓
            </div>
            <h3 className="font-heading font-black text-xl text-white uppercase tracking-tight">
              Tickets Successfully Assigned!
            </h3>
            <p className="font-sans text-xs text-[#8A92A0]">
              The tickets have been credited and user notifications were dispatched.
            </p>
          </div>
        )}

        {/* Breakdown Card */}
        <div className="bg-[#0B0C0E] border border-white/10 rounded-xl p-4 flex flex-col gap-2.5 text-xs font-sans">
          <div className="flex items-center justify-between py-1 border-b border-white/5">
            <span className="text-[#8A92A0]">Transaction Ref:</span>
            <span className="font-mono font-bold text-[#FF1E27] truncate max-w-[220px]">
              {result.gatewayTransactionId}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-white/5">
            <span className="text-[#8A92A0]">Recipient:</span>
            <span className="font-bold text-white">
              {result.recipient.name} ({result.recipient.email})
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-white/5">
            <span className="text-[#8A92A0]">Competition:</span>
            <span className="font-bold text-white truncate max-w-[240px]">
              {result.competition.title}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-white/5">
            <span className="text-[#8A92A0]">Accounting Value:</span>
            <span className="font-heading font-black text-sm text-emerald-400">
              £{result.totalAmount.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-purple-300 font-semibold">Host Credited:</span>
            <span className="font-heading font-black text-sm text-purple-300">
              +£{result.hostCreditedAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Assigned Ticket Numbers */}
        <div className="flex flex-col gap-2">
          <span className="font-sans text-xs font-bold text-[#8A92A0] uppercase">
            Allocated Ticket Numbers ({result.ticketNumbers.length}):
          </span>
          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto bg-[#0B0C0E] border border-white/10 rounded-xl p-3">
            {result.ticketNumbers.map((num) => {
              const isInstant = result.instantWins.some((iw) => iw.ticketNumber === num);
              return (
                <span
                  key={num}
                  className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${
                    isInstant
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "bg-white/10 text-white border border-white/15"
                  }`}
                >
                  #{num} {isInstant && "⚡"}
                </span>
              );
            })}
          </div>
        </div>

        {/* Auto draw status */}
        {result.isAutoDrawTriggered && (
          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs flex items-center gap-2">
            <span>🎉</span>
            <span>
              <strong>Auto-Draw Activated:</strong> This competition sold out and the auto-draw mechanism has successfully selected the winner!
            </span>
          </div>
        )}

        {/* Done Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#FF1E27] hover:bg-[#e01921] text-white font-heading font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(255,30,39,0.5)] cursor-pointer"
          >
            Done &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
}
