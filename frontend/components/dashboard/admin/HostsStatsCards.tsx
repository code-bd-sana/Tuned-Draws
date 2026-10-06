"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { adminService } from "../../../services/admin.service";
import { Shield, ShieldCheck, Clock, ShieldAlert } from "lucide-react";

export default function HostsStatsCards() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-hosts-stats"],
    queryFn: () => adminService.getHostStats(),
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Total Hosts */}
      <div className="relative group bg-[#12141C] border border-white/10 hover:border-[#FF1E27]/40 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
            Total Registered Hosts
          </span>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF1E27] group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5" />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <span className="font-heading font-black text-3xl lg:text-4xl text-white leading-none tracking-tight">
            {isLoading ? "..." : (stats?.totalHosts || 0).toLocaleString()}
          </span>
          <div className="flex items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF1E27]/10 border border-[#FF1E27]/25 text-[#FF1E27] font-sans font-bold text-[10px]">
              All Merchants
            </span>
            <span className="font-sans font-medium text-xs text-[#8A92A0]">Raffle creators</span>
          </div>
        </div>
      </div>

      {/* Active Hosts */}
      <div className="relative group bg-[#12141C] border border-white/10 hover:border-[#FF1E27]/40 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
            Active Verified Hosts
          </span>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <span className="font-heading font-black text-3xl lg:text-4xl text-white leading-none tracking-tight">
            {isLoading ? "..." : (stats?.activeHosts || 0).toLocaleString()}
          </span>
          <div className="flex items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-sans font-bold text-[10px]">
              Verified
            </span>
            <span className="font-sans font-medium text-xs text-[#8A92A0]">Operational status</span>
          </div>
        </div>
      </div>

      {/* Pending Approval Hosts */}
      <div className="relative group bg-[#12141C] border border-white/10 hover:border-[#FF1E27]/40 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
            Pending Approval
          </span>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
            <Clock className="w-5 h-5" />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <span className="font-heading font-black text-3xl lg:text-4xl text-amber-400 leading-none tracking-tight">
            {isLoading ? "..." : (stats?.pendingHosts || 0).toLocaleString()}
          </span>
          <div className="flex items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-sans font-bold text-[10px]">
              Needs Review
            </span>
            <span className="font-sans font-medium text-xs text-[#8A92A0]">Awaiting merchant audit</span>
          </div>
        </div>
      </div>

      {/* Blocked Hosts */}
      <div className="relative group bg-[#12141C] border border-white/10 hover:border-[#FF1E27]/40 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
            Suspended Hosts
          </span>
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-3">
          <span className="font-heading font-black text-3xl lg:text-4xl text-white leading-none tracking-tight">
            {isLoading ? "..." : (stats?.blockedHosts || 0).toLocaleString()}
          </span>
          <div className="flex items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-sans font-bold text-[10px]">
              Suspended
            </span>
            <span className="font-sans font-medium text-xs text-[#8A92A0]">Account restrictions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
