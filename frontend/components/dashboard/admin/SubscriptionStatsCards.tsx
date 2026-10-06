"use client";

import React from "react";
import { useAdminSubscriptionStats } from "../../../hooks/useSubscriptionHooks";
import { Crown, Zap, CreditCard } from "lucide-react";

export default function SubscriptionStatsCards() {
  const { data: stats, isLoading } = useAdminSubscriptionStats();

  const getPlanData = (planName: string) => {
    return (
      stats?.planDistribution?.find(
        (p) => p.name.toLowerCase() === planName.toLowerCase()
      ) || { value: 0, percentage: "0%" }
    );
  };

  const premiumPlan = getPlanData("Premium");
  const proPlan = getPlanData("Pro");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Premium Subscribers */}
      <div className="relative group bg-[#12141C] border border-white/10 hover:border-[#FF1E27]/40 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
            Premium Tier Subscribers
          </span>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
            <Crown className="w-5 h-5" />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <span className="font-heading font-black text-3xl lg:text-4xl text-white leading-none tracking-tight">
            {isLoading ? "..." : premiumPlan.value}
          </span>
          <div className="flex items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-sans font-bold text-[10px]">
              {premiumPlan.percentage} Share
            </span>
            <span className="font-sans font-medium text-xs text-[#8A92A0]">Active premium hosts</span>
          </div>
        </div>
      </div>

      {/* Pro Subscribers */}
      <div className="relative group bg-[#12141C] border border-white/10 hover:border-[#FF1E27]/40 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
            Pro Tier Subscribers
          </span>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF1E27] group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5" />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <span className="font-heading font-black text-3xl lg:text-4xl text-white leading-none tracking-tight">
            {isLoading ? "..." : proPlan.value}
          </span>
          <div className="flex items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF1E27]/10 border border-[#FF1E27]/25 text-[#FF1E27] font-sans font-bold text-[10px]">
              {proPlan.percentage} Share
            </span>
            <span className="font-sans font-medium text-xs text-[#8A92A0]">Unlimited tier hosts</span>
          </div>
        </div>
      </div>

      {/* MRR */}
      <div className="relative group bg-[#12141C] border border-white/10 hover:border-[#FF1E27]/40 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
            Monthly Recurring Revenue (MRR)
          </span>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
            <CreditCard className="w-5 h-5" />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <span className="font-heading font-black text-3xl lg:text-4xl text-white leading-none tracking-tight">
            {isLoading
              ? "..."
              : `£${(stats?.mrr || 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}
          </span>
          <div className="flex items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-sans font-bold text-[10px]">
              Recurring
            </span>
            <span className="font-sans font-medium text-xs text-[#8A92A0]">Active subscriptions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
