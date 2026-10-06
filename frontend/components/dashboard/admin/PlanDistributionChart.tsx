"use client";

import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useAdminSubscriptionStats } from "../../../hooks/useSubscriptionHooks";

const COLORS = [
  "#FF1E27", // Racing Red (Pro)
  "#F59E0B", // Amber Gold (Premium)
  "#3B82F6", // Electric Blue (Starter)
  "#10B981", // Emerald
  "#8B5CF6", // Purple
];

export default function PlanDistributionChart() {
  const { data: stats, isLoading } = useAdminSubscriptionStats();

  const chartData = useMemo(() => {
    if (!stats || !stats.planDistribution) return [];

    return stats.planDistribution.map((item, index) => ({
      ...item,
      color: COLORS[index % COLORS.length],
    }));
  }, [stats]);

  return (
    <div className="bg-[#12141C] border border-white/10 rounded-2xl p-6 flex flex-col w-full self-start shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <span className="font-heading font-black text-base text-white uppercase tracking-tight">
          Plan Distribution
        </span>
        <span className="text-[11px] font-sans text-[#8A92A0]">Active Tiers</span>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center min-h-[220px]">
          <span className="font-sans text-xs text-[#8A92A0] animate-pulse">
            Loading distribution analytics...
          </span>
        </div>
      ) : chartData.length === 0 ? (
        <div className="flex-1 flex items-center justify-center min-h-[220px]">
          <span className="font-sans text-xs text-[#8A92A0]">No active subscriptions found.</span>
        </div>
      ) : (
        <div className="flex-1 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-6">
          {/* Chart Container */}
          <div className="w-full sm:flex-1 h-[200px] sm:h-[220px] relative shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius="55%"
                  outerRadius="82%"
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1A1D27",
                    borderColor: "rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    color: "#FFFFFF",
                  }}
                  itemStyle={{ color: "#FFFFFF", fontWeight: 700 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend Section */}
          <div className="w-full sm:w-[160px] flex flex-wrap sm:flex-col items-center sm:items-start justify-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/10">
            {chartData.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5 bg-white/5 sm:bg-transparent px-3 py-1.5 sm:p-0 rounded-xl sm:rounded-none border border-white/10 sm:border-none w-full"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                  style={{ backgroundColor: item.color }}
                />

                <div className="flex items-baseline justify-between gap-1.5 flex-1 min-w-0">
                  <span
                    className="font-heading font-bold text-xs text-white truncate max-w-[70px]"
                    title={item.name}
                  >
                    {item.name}
                  </span>
                  <div className="flex items-center gap-1 ml-auto">
                    <span className="font-heading font-black text-xs text-white">
                      {item.value}
                    </span>
                    <span className="font-sans text-[11px] text-[#8A92A0]">
                      ({item.percentage})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
