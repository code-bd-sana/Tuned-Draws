"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

const CustomTooltip = ({ active, payload, label, prefix = "", suffix = "" }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1D27] border border-white/15 rounded-xl p-3 shadow-2xl font-sans">
        <p className="text-xs font-bold text-[#8A92A0] mb-0.5">{label}</p>
        <p className="font-heading font-black text-sm text-white">
          {prefix}{payload[0].value.toLocaleString()}{suffix}
        </p>
      </div>
    );
  }
  return null;
};

const DEFAULT_CATEGORY_COLORS = [
  "#FF1E27",
  "#F59E0B",
  "#3B82F6",
  "#10B981",
  "#8B5CF6",
  "#EC4899",
];

export default function ReportsAnalyticsDashboard() {
  const [timeFilter, setTimeFilter] = useState("3M");
  const filters = ["7D", "1M", "3M", "1Y"];

  const { data, isLoading } = useQuery({
    queryKey: ["admin-reports", timeFilter],
    queryFn: () => adminService.getReports(timeFilter),
  });

  const revenueData = data?.revenueTrend || [];
  const categoryData = (data?.categorySales || []).map((cat, idx) => ({
    ...cat,
    color: cat.color && !cat.color.includes("0B4D35") ? cat.color : DEFAULT_CATEGORY_COLORS[idx % DEFAULT_CATEGORY_COLORS.length],
  }));
  const popularCompetitions = data?.popularCompetitions || [];
  const userGrowthData = data?.userGrowth || [];
  const hostPerformance = data?.hostPerformance || [];
  const geographicData = data?.geographicDistribution || [];

  const maxPopularValue = Math.max(...popularCompetitions.map((c) => c.value), 1);

  return (
    <div className="flex flex-col w-full animate-fadeIn gap-6">
      {/* Time Filter Pills */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="font-heading font-black text-xl text-white uppercase tracking-tight">
            Platform Analytics & Insights
          </h2>
          <p className="font-sans text-xs text-[#8A92A0]">
            Performance breakdown across sales, demographics, and operations
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-[#12141C] border border-white/10 rounded-xl p-1">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-3.5 py-1.5 rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-4">
        {/* Revenue Trend */}
        <div className="bg-[#12141C] border border-white/10 rounded-2xl p-6 flex flex-col h-[330px] shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-black text-base text-white uppercase tracking-tight">
              Revenue Trend
            </h3>
            <span className="px-2 py-0.5 rounded-md bg-[#FF1E27]/10 text-[#FF1E27] text-[10px] font-bold uppercase">
              Sales Volume
            </span>
          </div>
          <div className="flex-1 w-full min-h-0">
            {isLoading ? (
              <div className="w-full h-full animate-pulse bg-white/5 rounded-xl" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="redLineGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#FF1E27" />
                      <stop offset="100%" stopColor="#B3000C" />
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
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip prefix="£" />} cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="url(#redLineGradient)"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 6, fill: "#FF1E27", stroke: "#FFFFFF", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-[#12141C] border border-white/10 rounded-2xl p-6 flex flex-col h-[330px] shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-heading font-black text-base text-white uppercase tracking-tight">
              Sales by Category
            </h3>
            <span className="text-[11px] text-[#8A92A0]">Share %</span>
          </div>
          <div className="flex-1 w-full flex items-center justify-center relative min-h-0">
            {isLoading ? (
              <div className="w-full h-full animate-pulse bg-white/5 rounded-xl" />
            ) : (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="35%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      stroke="none"
                      dataKey="value"
                      paddingAngle={3}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip suffix="%" />} />
                  </PieChart>
                </ResponsiveContainer>

                {/* Custom Legend */}
                <div className="absolute right-[2%] top-1/2 -translate-y-1/2 flex flex-col gap-2.5 max-h-[220px] overflow-y-auto">
                  {categoryData.map((cat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="font-sans font-semibold text-xs text-[#8A92A0] w-[80px] truncate">
                        {cat.name}
                      </span>
                      <span className="font-heading font-bold text-xs text-white">
                        {cat.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Most Popular Competitions */}
        <div className="bg-[#12141C] border border-white/10 rounded-2xl p-6 flex flex-col h-[330px] shadow-xl">
          <h3 className="font-heading font-black text-base text-white uppercase tracking-tight mb-4">
            Most Popular Raffles
          </h3>
          <div className="flex flex-col gap-3.5 flex-1 justify-center">
            {isLoading ? (
              <div className="w-full h-full animate-pulse bg-white/5 rounded-xl" />
            ) : popularCompetitions.length === 0 ? (
              <span className="text-xs text-[#8A92A0] text-center">No competition data recorded.</span>
            ) : (
              popularCompetitions.map((comp, i) => {
                const width = Math.max((comp.value / maxPopularValue) * 100, 5);
                return (
                  <div key={i} className="flex flex-col gap-1 w-full">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-sans font-semibold text-xs text-[#8A92A0] truncate max-w-[200px]">
                        {comp.name}
                      </span>
                      <span className="font-heading font-bold text-xs text-white">
                        {comp.value} entries
                      </span>
                    </div>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full bg-[#FF1E27] rounded-full shadow-[0_0_8px_rgba(255,30,39,0.5)]"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* User Growth Over Time */}
        <div className="bg-[#12141C] border border-white/10 rounded-2xl p-6 flex flex-col h-[330px] shadow-xl">
          <h3 className="font-heading font-black text-base text-white uppercase tracking-tight mb-4">
            User Growth Over Time
          </h3>
          <div className="flex-1 w-full min-h-0">
            {isLoading ? (
              <div className="w-full h-full animate-pulse bg-white/5 rounded-xl" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={userGrowthData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="userGrowthRed" x1="0" y1="0" x2="0" y2="1">
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
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip prefix="users: " />} cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }} />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#FF1E27"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#userGrowthRed)"
                    activeDot={{ r: 6, fill: "#FF1E27", stroke: "#FFFFFF", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Host Performance */}
        <div className="bg-[#12141C] border border-white/10 rounded-2xl p-6 flex flex-col h-[330px] shadow-xl">
          <h3 className="font-heading font-black text-base text-white uppercase tracking-tight mb-4">
            Host Merchant Performance
          </h3>
          <div className="flex flex-col flex-1 justify-center gap-3.5">
            {isLoading ? (
              <div className="w-full h-full animate-pulse bg-white/5 rounded-xl" />
            ) : hostPerformance.length === 0 ? (
              <span className="text-xs text-[#8A92A0] text-center">No host performance metrics.</span>
            ) : (
              hostPerformance.map((host, i) => (
                <div key={i} className="flex items-center gap-3 w-full">
                  <span className="font-sans font-semibold text-xs text-[#8A92A0] w-[90px] text-right truncate shrink-0">
                    {host.name}
                  </span>
                  <div className="flex-1 h-5 bg-white/5 border border-white/10 rounded-lg overflow-hidden flex items-center group">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF1E27] to-[#B3000C] rounded-r-lg transition-all duration-500 ease-out flex items-center justify-end pr-2"
                      style={{ width: `${host.percent}%` }}
                    />
                  </div>
                  <span className="font-heading font-bold text-xs text-white w-9 text-right">
                    {host.percent}%
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Geographic Entry Distribution */}
        <div className="bg-[#12141C] border border-white/10 rounded-2xl p-6 flex flex-col h-[330px] shadow-xl">
          <h3 className="font-heading font-black text-base text-white uppercase tracking-tight mb-4">
            Geographic Entry Distribution
          </h3>
          <div className="flex flex-col gap-4 flex-1 justify-center">
            {isLoading ? (
              <div className="w-full h-full animate-pulse bg-white/5 rounded-xl" />
            ) : geographicData.length === 0 ? (
              <span className="text-xs text-[#8A92A0] text-center">No geographic distribution recorded.</span>
            ) : (
              geographicData.map((geo, i) => {
                const width = Math.max(geo.value, 2);
                return (
                  <div key={i} className="flex flex-col gap-1 w-full">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-sans font-semibold text-xs text-[#8A92A0]">
                        {geo.name}
                      </span>
                      <span className="font-heading font-bold text-xs text-white">
                        {geo.value}%
                      </span>
                    </div>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full bg-[#3B82F6] rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
