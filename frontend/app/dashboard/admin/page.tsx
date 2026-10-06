"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { useAdminOverviewStats } from "../../../hooks/useAdminHooks";
import { adminService } from "../../../services/admin.service";
import {
  Users,
  ShieldCheck,
  Ticket,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronRight,
  Activity,
  CheckCircle2,
  FileCheck2,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [timeFilter, setTimeFilter] = useState("1M");
  const { data: overview, isLoading } = useAdminOverviewStats();
  const { data: reports, isLoading: isReportsLoading } = useQuery({
    queryKey: ["adminReports", timeFilter],
    queryFn: () => adminService.getReports(timeFilter),
  });

  const revenueData = reports?.revenueTrend || [];
  const growthData = reports?.growthData || [];
  const topHosts = overview?.topHosts || [];

  return (
    <div className="flex flex-col gap-8 p-6 lg:p-8 max-w-[1660px] mx-auto w-full animate-fadeIn">
      {/* Page Header & Quick Command Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <h1 className="font-heading font-black text-2xl lg:text-3xl text-white uppercase tracking-tight">
              System Admin Overview
            </h1>
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(16,185,129,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Operational
            </div>
          </div>
          <p className="font-sans text-xs text-[#8A92A0]">
            Real-time platform metrics, merchant verification queue, revenue breakdown, and growth analytics.
          </p>
        </div>

        {/* Quick Nav Actions */}
        <div className="flex items-center flex-wrap gap-2.5">
          <Link
            href="/dashboard/admin/approvals"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#FF1E27]/40 hover:bg-[#FF1E27]/10 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all duration-200 group"
          >
            <FileCheck2 className="w-4 h-4 text-[#FF1E27]" />
            <span>Approvals</span>
            {overview?.awaitingReview.count ? (
              <span className="px-1.5 py-0.5 rounded-md bg-[#FF1E27] text-white text-[10px] font-black">
                {overview.awaitingReview.count}
              </span>
            ) : null}
          </Link>
          <Link
            href="/dashboard/admin/raffles"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-[#D1D5DB] hover:text-white font-heading font-bold text-xs uppercase tracking-wider transition-all duration-200"
          >
            <Ticket className="w-4 h-4 text-[#FF1E27]" />
            <span>Raffles</span>
          </Link>
          <Link
            href="/dashboard/admin/withdrawals"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-[#D1D5DB] hover:text-white font-heading font-bold text-xs uppercase tracking-wider transition-all duration-200"
          >
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>Payouts</span>
          </Link>
          <Link
            href="/dashboard/admin/reports"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FF1E27] hover:bg-[#B3000C] text-white font-heading font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(255,30,39,0.35)]"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Full Analytics</span>
          </Link>
        </div>
      </div>

      {/* Top 4 KPI Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* Total Users */}
        <div className="relative group bg-[#12141C] border border-white/10 hover:border-[#FF1E27]/40 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF1E27]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF1E27]/10 transition-colors" />
          <div className="flex items-center justify-between">
            <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
              Total Users
            </span>
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FF1E27] group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-3">
            <span className="font-heading font-black text-3xl lg:text-4xl text-white leading-none tracking-tight">
              {isLoading ? "..." : (overview?.stats.totalUsers ?? 0).toLocaleString()}
            </span>
            <div className="flex items-center gap-2 mt-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-sans font-bold text-[10px]">
                <ArrowUpRight className="w-3 h-3" />
                Active
              </span>
              <span className="font-sans font-medium text-xs text-[#8A92A0]">Registered entrants</span>
            </div>
          </div>
        </div>

        {/* Active Hosts */}
        <div className="relative group bg-[#12141C] border border-white/10 hover:border-[#FF1E27]/40 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#3B82F6]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#3B82F6]/10 transition-colors" />
          <div className="flex items-center justify-between">
            <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
              Active Hosts
            </span>
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#3B82F6] group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-3">
            <span className="font-heading font-black text-3xl lg:text-4xl text-white leading-none tracking-tight">
              {isLoading ? "..." : (overview?.stats.activeHosts ?? 0).toLocaleString()}
            </span>
            <div className="flex items-center gap-2 mt-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-sans font-bold text-[10px]">
                <CheckCircle2 className="w-3 h-3" />
                Verified
              </span>
              <span className="font-sans font-medium text-xs text-[#8A92A0]">Merchant operators</span>
            </div>
          </div>
        </div>

        {/* Live Raffles */}
        <div className="relative group bg-[#12141C] border border-white/10 hover:border-[#FF1E27]/40 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#F59E0B]/10 transition-colors" />
          <div className="flex items-center justify-between">
            <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
              Live Raffles
            </span>
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#F59E0B] group-hover:scale-105 transition-transform">
              <Ticket className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-3">
            <span className="font-heading font-black text-3xl lg:text-4xl text-white leading-none tracking-tight">
              {isLoading ? "..." : (overview?.stats.liveRaffles ?? 0).toLocaleString()}
            </span>
            <div className="flex items-center gap-2 mt-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-sans font-bold text-[10px]">
                <Activity className="w-3 h-3" />
                In Progress
              </span>
              <span className="font-sans font-medium text-xs text-[#8A92A0]">Open for entries</span>
            </div>
          </div>
        </div>

        {/* Total Platform Revenue */}
        <div className="relative group bg-[#12141C] border border-white/10 hover:border-[#FF1E27]/40 rounded-2xl p-6 transition-all duration-300 shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF1E27]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF1E27]/15 transition-colors" />
          <div className="flex items-center justify-between">
            <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
              Total Revenue
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#FF1E27]/15 border border-[#FF1E27]/30 flex items-center justify-center text-[#FF1E27] group-hover:scale-105 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-3">
            <span className="font-heading font-black text-3xl lg:text-4xl text-white leading-none tracking-tight">
              {isLoading
                ? "..."
                : `£${(overview?.stats.totalRevenue ?? 0).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
            </span>
            <div className="flex items-center gap-2 mt-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-sans font-bold text-[10px]">
                <TrendingUp className="w-3 h-3" />
                Gross
              </span>
              <span className="font-sans font-medium text-xs text-[#8A92A0]">Ticket volume sales</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Grid: Revenue Trend & Awaiting Review */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Platform Revenue Chart */}
        <div className="lg:col-span-2 bg-[#12141C] border border-white/10 rounded-2xl p-6 flex flex-col shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-lg text-white uppercase tracking-tight">
                  Platform Revenue Trend
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-sans font-bold text-[10px] uppercase">
                  Live Feed
                </span>
              </div>
              <span className="font-heading font-black text-2xl lg:text-3xl text-white tracking-tight">
                {isLoading
                  ? "..."
                  : `£${(overview?.stats.totalRevenue ?? 0).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}
              </span>
            </div>

            {/* Time Filter Pills */}
            <div className="flex items-center gap-1 bg-[#1A1D27] border border-white/10 rounded-xl p-1">
              {["7D", "1M", "6M", "1Y"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    timeFilter === filter
                      ? "bg-[#FF1E27] text-white shadow-[0_0_12px_rgba(255,30,39,0.35)]"
                      : "text-[#8A92A0] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full h-[260px]">
            {isReportsLoading ? (
              <div className="w-full h-full flex items-center justify-center text-[#8A92A0] font-sans text-xs animate-pulse">
                Loading revenue analytics...
              </div>
            ) : revenueData.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-[#8A92A0] font-sans text-xs">
                No revenue recorded for this period.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={revenueData}
                  margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="revenueGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF1E27" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#FF1E27" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#8A92A0", fontSize: 11, fontFamily: "inherit" }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#8A92A0", fontSize: 11, fontFamily: "inherit" }}
                    tickFormatter={(val) =>
                      `£${val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}`
                    }
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "#1A1D27",
                      borderColor: "rgba(255,255,255,0.15)",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                      color: "#FFFFFF",
                    }}
                    itemStyle={{ color: "#FFFFFF", fontWeight: 700 }}
                    formatter={(val: any) => [
                      `£${Number(val || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`,
                      "Revenue",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#FF1E27"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#revenueGlow)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Awaiting Review Queue */}
        <div className="bg-[#12141C] border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#FF1E27]" />
                <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight">
                  Awaiting Review
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FF1E27] text-white font-heading font-black text-xs shadow-[0_0_10px_rgba(255,30,39,0.5)]">
                {isLoading ? "..." : overview?.awaitingReview.count ?? 0}
              </span>
            </div>

            <p className="font-sans text-xs text-[#8A92A0] mb-4">
              Items pending administrative approval or operator validation:
            </p>

            <div className="flex flex-col gap-3">
              {isLoading ? (
                <div className="py-8 text-center text-[#8A92A0] font-sans text-xs animate-pulse">
                  Loading review queue...
                </div>
              ) : overview?.awaitingReview.list.length === 0 ? (
                <div className="py-8 text-center text-[#8A92A0] font-sans text-xs flex flex-col items-center gap-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  <span>All queues clear. No items pending review.</span>
                </div>
              ) : (
                overview?.awaitingReview.list.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#FF1E27]/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#FF1E27]/10 border border-[#FF1E27]/30 flex items-center justify-center shrink-0 text-[#FF1E27] font-bold text-xs">
                        {item.icon}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-heading font-bold text-xs text-white truncate max-w-[170px]">
                          {item.title}
                        </span>
                        <span className="font-sans text-[11px] text-[#8A92A0] truncate">
                          {item.sub}
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-sans font-bold text-[10px] uppercase">
                      Action Required
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <Link
            href="/dashboard/admin/approvals"
            className="w-full mt-5 h-11 rounded-xl bg-white/5 border border-white/10 hover:bg-[#FF1E27] hover:border-[#FF1E27] text-white font-heading font-black text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md group"
          >
            <span>Review All Approvals</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Lower Grid: User & Host Growth & Top Hosts Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User & Host Growth Chart */}
        <div className="bg-[#12141C] border border-white/10 rounded-2xl p-6 flex flex-col shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight">
                User &amp; Host Growth
              </h3>
              <p className="font-sans text-xs text-[#8A92A0]">Monthly signup registrations</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF1E27]" />
                <span className="font-sans font-semibold text-xs text-[#8A92A0]">Users</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                <span className="font-sans font-semibold text-xs text-[#8A92A0]">Hosts</span>
              </div>
            </div>
          </div>

          <div className="w-full h-[240px]">
            {isReportsLoading ? (
              <div className="w-full h-full flex items-center justify-center text-[#8A92A0] font-sans text-xs animate-pulse">
                Loading growth statistics...
              </div>
            ) : growthData.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-[#8A92A0] font-sans text-xs">
                No growth data recorded for this period.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={growthData}
                  margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#8A92A0", fontSize: 11, fontFamily: "inherit" }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#8A92A0", fontSize: 11, fontFamily: "inherit" }}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "#1A1D27",
                      borderColor: "rgba(255,255,255,0.15)",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                      color: "#FFFFFF",
                    }}
                    cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  />
                  <Bar dataKey="Users" fill="#FF1E27" radius={[6, 6, 0, 0]} barSize={14} />
                  <Bar dataKey="Hosts" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Top Hosts Leaderboard */}
        <div className="bg-[#12141C] border border-white/10 rounded-2xl p-6 flex flex-col shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight">
                Top Performing Hosts
              </h3>
              <p className="font-sans text-xs text-[#8A92A0]">Ranked by total ticket sales volume</p>
            </div>
            <Link
              href="/dashboard/admin/hosts"
              className="font-sans font-bold text-xs text-[#FF1E27] hover:underline transition-all flex items-center gap-1"
            >
              <span>View Directory</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {isLoading ? (
              <div className="py-8 text-center text-[#8A92A0] font-sans text-xs animate-pulse">
                Loading top hosts...
              </div>
            ) : topHosts.length === 0 ? (
              <div className="py-8 text-center text-[#8A92A0] font-sans text-xs">
                No host sales recorded yet.
              </div>
            ) : (
              topHosts.map((host) => (
                <div
                  key={host.id || host.rank}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`font-heading font-black text-xs w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        host.rank === 1
                          ? "bg-amber-400 text-black shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                          : host.rank === 2
                          ? "bg-slate-300 text-black"
                          : host.rank === 3
                          ? "bg-amber-700 text-white"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      {host.rank}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[#FF1E27]/10 border border-[#FF1E27]/25 flex items-center justify-center shrink-0">
                      <span className="font-heading font-bold text-xs text-[#FF1E27]">
                        {host.initials}
                      </span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-heading font-bold text-xs text-white truncate max-w-[200px]">
                        {host.name}
                      </span>
                      <span className="font-sans text-[11px] text-[#8A92A0]">Verified Merchant</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-heading font-black text-sm text-white">
                      {host.revenue}
                    </span>
                    <span className="font-sans text-[10px] text-emerald-400 font-semibold">
                      Ticket Sales
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Real-Time Activity Log Stream */}
      <div className="w-full bg-[#12141C] border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Activity className="w-5 h-5 text-[#FF1E27]" />
            <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight">
              Real-Time Platform Activity
            </h3>
          </div>
          <Link
            href="/dashboard/admin/logs"
            className="font-sans font-bold text-xs text-[#8A92A0] hover:text-white transition-colors"
          >
            Audit Log History →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {isLoading ? (
            <div className="py-6 text-center text-[#8A92A0] font-sans text-xs animate-pulse col-span-full">
              Loading recent activity...
            </div>
          ) : overview?.recentActivity.length === 0 ? (
            <div className="py-6 text-center text-[#8A92A0] font-sans text-xs col-span-full">
              No recent activity recorded.
            </div>
          ) : (
            overview?.recentActivity.map((activity, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 transition-all"
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                    activity.highlight
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                      : activity.alert
                      ? "bg-rose-500/10 border-rose-500/30 text-rose-400"
                      : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-sans font-semibold text-xs text-white truncate">
                    {activity.text}
                  </span>
                  <span className="font-sans text-[11px] text-[#8A92A0] mt-0.5">
                    {activity.time}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
