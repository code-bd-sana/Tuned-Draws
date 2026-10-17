"use client";

import React from "react";
import {
  CompetitionDetails,
  SearchedUser,
} from "@/services/admin-ticket-assignment.service";

interface AccountingSummaryBoxProps {
  competition: CompetitionDetails | null;
  recipient: SearchedUser | null;
  mode: "specific" | "random";
  ticketNumbers: number[];
  randomQuantity: number;
  adminNotes: string;
  onAdminNotesChange: (notes: string) => void;
  onOpenConfirmation: () => void;
  isSubmitting: boolean;
}

export default function AccountingSummaryBox({
  competition,
  recipient,
  mode,
  ticketNumbers,
  randomQuantity,
  adminNotes,
  onAdminNotesChange,
  onOpenConfirmation,
  isSubmitting,
}: AccountingSummaryBoxProps) {
  if (!competition) return null;

  const ticketCount = mode === "specific" ? ticketNumbers.length : randomQuantity;
  const unitPrice = competition.stats.pricePerTicket;
  const totalFinancialValue = ticketCount * unitPrice;

  // Check which instant wins will be unlocked in specific mode
  const instantWinMap = new Map(
    competition.instantWins.map((iw) => [iw.ticketNumber, iw]),
  );
  const triggeredInstantWins =
    mode === "specific"
      ? ticketNumbers
          .map((n) => instantWinMap.get(n))
          .filter((iw) => Boolean(iw && !iw.isClaimed))
      : [];

  const isValid = Boolean(
    recipient &&
      competition &&
      ticketCount > 0 &&
      (mode === "specific" ? ticketNumbers.length > 0 : randomQuantity > 0),
  );

  return (
    <div className="flex flex-col gap-5 bg-[#12141C] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
        <div className="w-8 h-8 rounded-xl bg-[#FF1E27]/10 border border-[#FF1E27]/30 flex items-center justify-center text-[#FF1E27] font-bold text-sm shadow-xs">
          4
        </div>
        <div>
          <h3 className="font-heading font-black text-base sm:text-lg text-white uppercase tracking-tight">
            Financial &amp; Accounting Breakdown
          </h3>
          <p className="font-sans text-xs text-[#8A92A0]">
            Audit breakdown and Host wallet crediting before execution
          </p>
        </div>
      </div>

      {/* Instant Win Warning Banner */}
      {triggeredInstantWins.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-500/10 border-2 border-amber-500/40 text-amber-300 flex items-start gap-3 shadow-[0_0_20px_rgba(245,158,11,0.15)] animate-pulse">
          <span className="text-2xl mt-0.5">⚡</span>
          <div className="flex flex-col gap-1">
            <strong className="font-heading font-black text-sm uppercase text-white">
              Instant Win Prize Alert ({triggeredInstantWins.length})
            </strong>
            <p className="font-sans text-xs text-amber-200">
              The assigned ticket(s) contain instant win prizes! Upon assignment, the system will automatically claim these prizes and declare {recipient?.name || "the recipient"} as the verified winner:
            </p>
            <ul className="mt-1 list-disc list-inside text-xs font-semibold text-white space-y-0.5">
              {triggeredInstantWins.map((iw: any) => (
                <li key={iw.id}>
                  Ticket #{iw.ticketNumber}: <span className="text-amber-300">{iw.prizeName}</span> {iw.rrpValue ? `(RRP £${Number(iw.rrpValue).toFixed(2)})` : ""}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Accounting Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Recipient */}
        <div className="p-3.5 rounded-xl bg-[#0B0C0E] border border-white/5 flex flex-col gap-1">
          <span className="font-sans text-[11px] font-bold text-[#8A92A0] uppercase">
            Recipient
          </span>
          <span className="font-heading font-bold text-xs text-white truncate">
            {recipient ? recipient.name : "None Selected"}
          </span>
          <span className="font-sans text-[10px] text-[#8A92A0] truncate">
            {recipient ? recipient.email : "Select recipient above"}
          </span>
        </div>

        {/* Competition */}
        <div className="p-3.5 rounded-xl bg-[#0B0C0E] border border-white/5 flex flex-col gap-1">
          <span className="font-sans text-[11px] font-bold text-[#8A92A0] uppercase">
            Competition
          </span>
          <span className="font-heading font-bold text-xs text-white truncate">
            {competition.title}
          </span>
          <span className="font-sans text-[10px] text-[#8A92A0]">
            Host: {competition.host.name}
          </span>
        </div>

        {/* Ticket Count */}
        <div className="p-3.5 rounded-xl bg-[#0B0C0E] border border-white/5 flex flex-col gap-1">
          <span className="font-sans text-[11px] font-bold text-[#8A92A0] uppercase">
            Ticket Count
          </span>
          <span className="font-mono font-black text-sm text-white">
            {ticketCount} {ticketCount === 1 ? "Ticket" : "Tickets"}
          </span>
          <span className="font-sans text-[10px] text-[#8A92A0]">
            {mode === "specific" ? "Specific numbers" : "Random quantity"}
          </span>
        </div>

        {/* Unit Price */}
        <div className="p-3.5 rounded-xl bg-[#0B0C0E] border border-white/5 flex flex-col gap-1">
          <span className="font-sans text-[11px] font-bold text-[#8A92A0] uppercase">
            Unit Price
          </span>
          <span className="font-heading font-bold text-sm text-white">
            £{unitPrice.toFixed(2)}
          </span>
          <span className="font-sans text-[10px] text-[#8A92A0]">Standard rate</span>
        </div>

        {/* Total Value */}
        <div className="p-3.5 rounded-xl bg-[#0B0C0E] border border-white/5 flex flex-col gap-1">
          <span className="font-sans text-[11px] font-bold text-[#8A92A0] uppercase">
            Total Value
          </span>
          <span className="font-heading font-black text-sm text-emerald-400">
            £{totalFinancialValue.toFixed(2)}
          </span>
          <span className="font-sans text-[10px] text-emerald-400/80">
            100% Paid Value
          </span>
        </div>

        {/* Host Credit */}
        <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 flex flex-col gap-1">
          <span className="font-sans text-[11px] font-bold text-purple-300 uppercase">
            Host Wallet Credit
          </span>
          <span className="font-heading font-black text-sm text-purple-300">
            +£{totalFinancialValue.toFixed(2)}
          </span>
          <span className="font-sans text-[10px] text-purple-300/80">
            Auto-credited
          </span>
        </div>
      </div>

      {/* Host Credit Statement Banner */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent border border-purple-500/20 text-xs font-sans text-purple-200 flex items-center gap-3">
        <span className="text-lg">💼</span>
        <p>
          <strong>Host Balance Crediting:</strong> Upon assignment,{" "}
          <strong className="text-white">£{totalFinancialValue.toFixed(2)}</strong> will be credited directly to{" "}
          <strong className="text-white">{competition.host.businessName || competition.host.name}</strong>&apos;s wallet balance, ensuring 100% financial consistency across financial accounting records.
        </p>
      </div>

      {/* Admin Notes Field */}
      <div className="flex flex-col gap-1.5">
        <label className="font-sans text-xs font-bold text-[#8A92A0] uppercase">
          Admin Audit Notes / Allocation Reason (Optional)
        </label>
        <input
          type="text"
          value={adminNotes}
          onChange={(e) => onAdminNotesChange(e.target.value)}
          placeholder="e.g. VIP Giveaway Prize, Loyalty Reward Program, Promotional allocation..."
          className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl px-4 py-2.5 text-xs font-sans text-white placeholder-[#8A92A0] focus:outline-none focus:border-[#FF1E27]"
        />
      </div>

      {/* CTA Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs font-sans text-[#8A92A0]">
          {!recipient && <span className="text-amber-400">⚠️ Please select a recipient user above.</span>}
          {recipient && ticketCount === 0 && (
            <span className="text-amber-400">⚠️ Please select at least 1 ticket number.</span>
          )}
          {recipient && ticketCount > 0 && (
            <span className="text-emerald-400">✓ Ready to execute manual ticket allocation.</span>
          )}
        </div>

        <button
          type="button"
          disabled={!isValid || isSubmitting}
          onClick={onOpenConfirmation}
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#FF1E27] hover:bg-[#e01921] disabled:opacity-50 disabled:cursor-not-allowed text-white font-heading font-black text-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,30,39,0.4)] cursor-pointer active:scale-95"
        >
          {isSubmitting ? "Assigning..." : "Assign Tickets →"}
        </button>
      </div>
    </div>
  );
}
