"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { winnerService } from "../../../services/winner.service";
import { Trophy, ShieldAlert, Truck } from "lucide-react";

export default function WinnersStatsCards() {
  const { data: allWinners } = useQuery({
    queryKey: ["adminWinnersStats", "All"],
    queryFn: () => winnerService.getAdminWinners({ limit: 1 }),
  });

  const { data: pendingVerifications } = useQuery({
    queryKey: ["adminWinnersStats", "Pending Verification"],
    queryFn: () =>
      winnerService.getAdminWinners({ limit: 1, verificationStatus: "PENDING" }),
  });

  const { data: pendingDeliveries } = useQuery({
    queryKey: ["adminWinnersStats", "Pending Delivery"],
    queryFn: () => winnerService.getAdminWinners({ limit: 1, status: "PENDING" }),
  });

  const totalCount = allWinners?.meta?.total || 0;
  const pendingVerifyCount = pendingVerifications?.meta?.total || 0;
  const pendingDeliveryCount = pendingDeliveries?.meta?.total || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Total Winners */}
      <div className="relative group bg-[#12141C] border border-white/10 hover:border-[#FF1E27]/40 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
            Total Platform Winners
          </span>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
            <Trophy className="w-5 h-5" />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <span className="font-heading font-black text-3xl lg:text-4xl text-white leading-none tracking-tight">
            {totalCount.toLocaleString()}
          </span>
          <div className="flex items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-sans font-bold text-[10px]">
              All-Time Draws
            </span>
            <span className="font-sans font-medium text-xs text-[#8A92A0]">Verified prize winners</span>
          </div>
        </div>
      </div>

      {/* Pending Verification */}
      <div className="relative group bg-[#12141C] border border-white/10 hover:border-[#FF1E27]/40 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
            Pending Verifications
          </span>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF1E27] group-hover:scale-105 transition-transform">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <span className="font-heading font-black text-3xl lg:text-4xl text-white leading-none tracking-tight">
            {pendingVerifyCount.toLocaleString()}
          </span>
          <div className="flex items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-sans font-bold text-[10px]">
              Audit Required
            </span>
            <span className="font-sans font-medium text-xs text-[#8A92A0]">Identity & ticket verification</span>
          </div>
        </div>
      </div>

      {/* Prizes Pending Delivery */}
      <div className="relative group bg-[#12141C] border border-white/10 hover:border-[#FF1E27]/40 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
            Prizes In Fulfillment
          </span>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
            <Truck className="w-5 h-5" />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <span className="font-heading font-black text-3xl lg:text-4xl text-white leading-none tracking-tight">
            {pendingDeliveryCount.toLocaleString()}
          </span>
          <div className="flex items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-sans font-bold text-[10px]">
              In Transit
            </span>
            <span className="font-sans font-medium text-xs text-[#8A92A0]">Dispatch delivery queue</span>
          </div>
        </div>
      </div>
    </div>
  );
}
