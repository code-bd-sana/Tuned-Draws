"use client";

import React from "react";
import { useAdminOrdersStats } from "../../../hooks/useAdminHooks";
import { ShoppingBag, Ticket, DollarSign, RotateCcw } from "lucide-react";

export default function OrdersStatsCards() {
  const { data: stats, isLoading } = useAdminOrdersStats();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {/* Total Orders */}
      <div className="relative group bg-[#12141C] border border-white/10 hover:border-[#FF1E27]/40 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
            Total Platform Orders
          </span>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF1E27] group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <span className="font-heading font-black text-3xl lg:text-4xl text-white leading-none tracking-tight">
            {isLoading ? "..." : (stats?.totalOrders || 0).toLocaleString()}
          </span>
          <div className="flex items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF1E27]/10 border border-[#FF1E27]/25 text-[#FF1E27] font-sans font-bold text-[10px]">
              Purchases
            </span>
            <span className="font-sans font-medium text-xs text-[#8A92A0]">Completed ticket orders</span>
          </div>
        </div>
      </div>

      {/* Total Tickets Sold */}
      <div className="relative group bg-[#12141C] border border-white/10 hover:border-[#FF1E27]/40 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
            Total Tickets Sold
          </span>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
            <Ticket className="w-5 h-5" />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <span className="font-heading font-black text-3xl lg:text-4xl text-white leading-none tracking-tight">
            {isLoading ? "..." : (stats?.totalTicketsSold || 0).toLocaleString()}
          </span>
          <div className="flex items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-sans font-bold text-[10px]">
              Active Entries
            </span>
            <span className="font-sans font-medium text-xs text-[#8A92A0]">Draw allocations</span>
          </div>
        </div>
      </div>

      {/* Total Order Value */}
      <div className="relative group bg-[#12141C] border border-white/10 hover:border-[#FF1E27]/40 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
            Gross Sales Volume
          </span>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <span className="font-heading font-black text-3xl lg:text-4xl text-white leading-none tracking-tight">
            {isLoading
              ? "..."
              : `£${(stats?.totalOrderValue || 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
          </span>
          <div className="flex items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-sans font-bold text-[10px]">
              Processed
            </span>
            <span className="font-sans font-medium text-xs text-[#8A92A0]">Total ticket volume</span>
          </div>
        </div>
      </div>

      {/* Refunded Orders */}
      <div className="relative group bg-[#12141C] border border-white/10 hover:border-[#FF1E27]/40 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
            Refunded Orders
          </span>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
            <RotateCcw className="w-5 h-5" />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <span className="font-heading font-black text-3xl lg:text-4xl text-white leading-none tracking-tight">
            {isLoading ? "..." : (stats?.refundedOrders || 0).toLocaleString()}
          </span>
          <div className="flex items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-sans font-bold text-[10px]">
              Returned
            </span>
            <span className="font-sans font-medium text-xs text-[#8A92A0]">Customer reversals</span>
          </div>
        </div>
      </div>
    </div>
  );
}
