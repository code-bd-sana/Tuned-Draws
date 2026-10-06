"use client";

import React from "react";
import { Clock, DollarSign, Percent, CheckCircle2 } from "lucide-react";

interface WithdrawalsStatsCardsProps {
  withdrawals?: any[];
  isLoading?: boolean;
}

export default function WithdrawalsStatsCards({
  withdrawals = [],
  isLoading,
}: WithdrawalsStatsCardsProps) {
  const pendingRequests = withdrawals.filter(
    (w) => w.status === "PENDING" || w.status === "Pending"
  );
  const pendingCount = pendingRequests.length;

  const totalPendingAmount = pendingRequests.reduce(
    (acc, w) => acc + (w.amount || 0),
    0
  );

  const totalCommissionEarned = withdrawals.reduce((acc, w) => {
    const fee = w.feeAmount !== undefined ? w.feeAmount : (w.amount || 0) * 0.15;
    return acc + fee;
  }, 0);

  const totalProcessedNet = withdrawals
    .filter(
      (w) =>
        w.status === "COMPLETED" || w.status === "APPROVED" || w.status === "Paid"
    )
    .reduce(
      (acc, w) =>
        acc + (w.netAmount !== undefined ? w.netAmount : (w.amount || 0) * 0.85),
      0
    );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-[#12141C] border border-white/10 rounded-2xl h-[130px] animate-pulse shadow-xl"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {/* Pending Requests */}
      <div className="relative group bg-[#12141C] border border-white/10 hover:border-[#FF1E27]/40 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
            Pending Requests
          </span>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
            <Clock className="w-5 h-5" />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <span className="font-heading font-black text-3xl lg:text-4xl text-amber-400 leading-none tracking-tight">
            {pendingCount}
          </span>
          <div className="flex items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-sans font-bold text-[10px]">
              {pendingCount > 0 ? `${pendingCount} Needs Action` : "All Clear"}
            </span>
            <span className="font-sans font-medium text-xs text-[#8A92A0]">Payout approval queue</span>
          </div>
        </div>
      </div>

      {/* Total Pending Amount */}
      <div className="relative group bg-[#12141C] border border-white/10 hover:border-[#FF1E27]/40 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
            Pending Amount
          </span>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF1E27] group-hover:scale-105 transition-transform">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <span className="font-heading font-black text-3xl lg:text-4xl text-white leading-none tracking-tight">
            £{totalPendingAmount.toFixed(2)}
          </span>
          <div className="flex items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF1E27]/10 border border-[#FF1E27]/25 text-[#FF1E27] font-sans font-bold text-[10px]">
              Gross
            </span>
            <span className="font-sans font-medium text-xs text-[#8A92A0]">Requested payouts</span>
          </div>
        </div>
      </div>

      {/* Platform Commission Earned */}
      <div className="relative group bg-[#12141C] border border-white/10 hover:border-[#FF1E27]/40 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
            Platform Commission
          </span>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
            <Percent className="w-5 h-5" />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <span className="font-heading font-black text-3xl lg:text-4xl text-white leading-none tracking-tight">
            £{totalCommissionEarned.toFixed(2)}
          </span>
          <div className="flex items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-sans font-bold text-[10px]">
              Revenue
            </span>
            <span className="font-sans font-medium text-xs text-[#8A92A0]">Payout fees retained</span>
          </div>
        </div>
      </div>

      {/* Total Processed Payouts */}
      <div className="relative group bg-[#12141C] border border-white/10 hover:border-[#FF1E27]/40 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
            Processed Net Payouts
          </span>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <span className="font-heading font-black text-3xl lg:text-4xl text-white leading-none tracking-tight">
            £{totalProcessedNet.toFixed(2)}
          </span>
          <div className="flex items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-sans font-bold text-[10px]">
              Transferred
            </span>
            <span className="font-sans font-medium text-xs text-[#8A92A0]">Total sent to hosts</span>
          </div>
        </div>
      </div>
    </div>
  );
}
