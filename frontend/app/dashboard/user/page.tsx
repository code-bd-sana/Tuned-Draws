"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer
} from "recharts";
import { useAuthUser } from "@/hooks/useAuthHooks";
import { useMyWinnersQuery } from "@/hooks/useUserHooks";
import { useMyTicketsQuery, useMyTransactionsQuery } from "@/hooks/useTicketHooks";
import { UserWinner } from "@/services/user.service";

export default function UserDashboardPage() {
  const { data: user } = useAuthUser();
  const { data: winners, isLoading: isWinnersLoading } = useMyWinnersQuery();
  const { data: rawTickets, isLoading: isTicketsLoading } = useMyTicketsQuery();
  const { data: rawTransactions, isLoading: isTransactionsLoading } = useMyTransactionsQuery();

  const [timeframe, setTimeframe] = useState<"7D" | "1M" | "3M" | "1Y">("1M");

  const allWinners: UserWinner[] = useMemo(() => winners || [], [winners]);
  const instantWinsCount = useMemo(
    () => allWinners.filter((w) => w.winType === "INSTANT_WIN").length,
    [allWinners]
  );
  const mainDrawWinsCount = useMemo(
    () => allWinners.filter((w) => w.winType === "MAIN_DRAW").length,
    [allWinners]
  );
  const totalWins = allWinners.length;
  const recentWins = useMemo(() => allWinners.slice(0, 5), [allWinners]);

  const allTickets: any[] = useMemo(() => rawTickets || [], [rawTickets]);
  const activeTickets = useMemo(
    () => allTickets.filter((t: any) => t.raffle && t.raffle.status === "ACTIVE"),
    [allTickets]
  );

  // Group active tickets by competition
  const activeCompetitions = useMemo(() => {
    const map = new Map<string, { raffle: any; ticketCount: number; latestDate: string }>();
    activeTickets.forEach((t: any) => {
      const r = t.raffle;
      if (!r) return;
      const existing = map.get(r.id);
      if (existing) {
        existing.ticketCount += 1;
        if (new Date(t.createdAt) > new Date(existing.latestDate)) {
          existing.latestDate = t.createdAt;
        }
      } else {
        map.set(r.id, {
          raffle: r,
          ticketCount: 1,
          latestDate: t.createdAt,
        });
      }
    });
    return Array.from(map.values()).slice(0, 5);
  }, [activeTickets]);

  // Transactions & Total Spend
  const transactions: any[] = useMemo(() => rawTransactions || [], [rawTransactions]);
  const totalLifetimeSpent = useMemo(() => {
    const completed = transactions.filter(
      (t: any) => (t.status || "").toUpperCase() === "COMPLETED"
    );
    if (completed.length > 0) {
      return completed.reduce((sum: number, t: any) => {
        const val =
          parseFloat(String(t.amount || "0").replace(/[^0-9.-]+/g, "")) || 0;
        return sum + val;
      }, 0);
    }
    // Fallback: sum of all tickets purchased
    return allTickets.reduce((sum: number, t: any) => {
      const price = Number(t.raffle?.pricePerTicket || 0);
      return sum + price;
    }, 0);
  }, [transactions, allTickets]);

  const spendChartData = useMemo(() => {
    const now = new Date();
    const completedTx = transactions.filter(
      (t: any) => !t.status || t.status.toUpperCase() === "COMPLETED" || t.status.toUpperCase() === "PAID"
    );

    if (timeframe === "7D") {
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const days = [];
      const map = new Map<string, number>();

      for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const key = `${dayNames[d.getDay()]} ${d.getDate()}`;
        days.push(key);
        map.set(key, 0);
      }

      completedTx.forEach((t: any) => {
        const txDate = new Date(t.date || t.createdAt);
        const diffDays = Math.floor((now.getTime() - txDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays >= 0 && diffDays < 7) {
          const key = `${dayNames[txDate.getDay()]} ${txDate.getDate()}`;
          const amt = parseFloat(String(t.amount || "0").replace(/[^0-9.-]+/g, "")) || 0;
          if (map.has(key)) {
            map.set(key, (map.get(key) || 0) + amt);
          }
        }
      });

      return days.map((name) => ({ name, spend: Number((map.get(name) || 0).toFixed(2)) }));
    }

    if (timeframe === "1M") {
      const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
      const map = new Map<string, number>();
      weeks.forEach((w) => map.set(w, 0));

      completedTx.forEach((t: any) => {
        const txDate = new Date(t.date || t.createdAt);
        const diffDays = Math.floor((now.getTime() - txDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays >= 0 && diffDays < 30) {
          const weekIdx = Math.min(3, Math.floor((29 - diffDays) / 7.5));
          const key = weeks[weekIdx];
          const amt = parseFloat(String(t.amount || "0").replace(/[^0-9.-]+/g, "")) || 0;
          map.set(key, (map.get(key) || 0) + amt);
        }
      });

      return weeks.map((name) => ({ name, spend: Number((map.get(name) || 0).toFixed(2)) }));
    }

    if (timeframe === "3M") {
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const months = [];
      const map = new Map<string, number>();

      for (let i = 2; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = monthNames[d.getMonth()];
        months.push(key);
        map.set(key, 0);
      }

      completedTx.forEach((t: any) => {
        const txDate = new Date(t.date || t.createdAt);
        const key = monthNames[txDate.getMonth()];
        if (map.has(key)) {
          const amt = parseFloat(String(t.amount || "0").replace(/[^0-9.-]+/g, "")) || 0;
          map.set(key, (map.get(key) || 0) + amt);
        }
      });

      return months.map((name) => ({ name, spend: Number((map.get(name) || 0).toFixed(2)) }));
    }

    // "1Y"
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const months = [];
    const map = new Map<string, number>();

    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = monthNames[d.getMonth()];
      months.push(key);
      map.set(key, 0);
    }

    completedTx.forEach((t: any) => {
      const txDate = new Date(t.date || t.createdAt);
      const key = monthNames[txDate.getMonth()];
      if (map.has(key)) {
        const amt = parseFloat(String(t.amount || "0").replace(/[^0-9.-]+/g, "")) || 0;
        map.set(key, (map.get(key) || 0) + amt);
      }
    });

    return months.map((name) => ({ name, spend: Number((map.get(name) || 0).toFixed(2)) }));
  }, [transactions, timeframe]);

  const firstName = user?.firstName || "Player";

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8 max-w-[1660px] mx-auto w-full animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading font-black text-2xl lg:text-3xl text-white uppercase tracking-tight">
            Player Dashboard
          </h1>
          <p className="font-sans text-xs text-[#8A92A0]">
            Welcome back, {firstName}! Track your active competition entries, ticket spend, and recent prize wins.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/user/winners"
            className="px-4 py-2 rounded-xl bg-[#12141C] border border-white/10 hover:bg-white/5 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>🏆</span> My Winnings ({totalWins})
          </Link>
          <Link
            href="/live-raffles"
            className="btn-glossy-red px-4 py-2 rounded-xl text-white font-heading font-bold text-xs uppercase tracking-wider shadow-md active:scale-98 transition-all flex items-center gap-1.5"
          >
            <span>🎯</span> Browse Draws
          </Link>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 w-full">
        {/* Total Tickets */}
        <div className="bg-[#12141C] border border-white/10 rounded-2xl p-6 flex flex-col gap-3 shadow-2xl backdrop-blur-md">
          <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
            Total Tickets Purchased
          </p>
          <p className="font-heading font-black text-3xl lg:text-4xl leading-tight text-white">
            {isTicketsLoading ? "..." : allTickets.length}
          </p>
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 w-fit">
            <span className="font-sans text-[10px] font-bold text-emerald-400">
              {allTickets.length > 0 ? "Lifetime entries" : "No entries yet"}
            </span>
          </div>
        </div>

        {/* Active Entries */}
        <div className="bg-[#12141C] border border-white/10 rounded-2xl p-6 flex flex-col gap-3 shadow-2xl backdrop-blur-md">
          <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
            Active Entries
          </p>
          <p className="font-heading font-black text-3xl lg:text-4xl leading-tight text-white">
            {isTicketsLoading ? "..." : activeTickets.length}
          </p>
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#FF1E27]/10 border border-[#FF1E27]/30 w-fit">
            <span className="font-sans text-[10px] font-bold text-[#FF1E27]">
              {activeCompetitions.length} live draw{activeCompetitions.length === 1 ? "" : "s"}
            </span>
          </div>
        </div>

        {/* Won Competitions / Prizes */}
        <div className="bg-[#12141C] border border-white/10 rounded-2xl p-6 flex flex-col gap-3 shadow-2xl backdrop-blur-md">
          <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
            Won Prizes
          </p>
          <p className="font-heading font-black text-3xl lg:text-4xl leading-tight text-white">
            {isWinnersLoading ? "..." : totalWins}
          </p>
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 w-fit">
            <span className="font-sans text-[10px] font-bold text-amber-400">
              {instantWinsCount > 0 ? `⚡ ${instantWinsCount} Instant Win(s)` : `🏆 ${totalWins} Total Prize(s)`}
            </span>
          </div>
        </div>

        {/* Total Lifetime Spent */}
        <div className="bg-[#12141C] border border-white/10 rounded-2xl p-6 flex flex-col gap-3 shadow-2xl backdrop-blur-md">
          <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#8A92A0]">
            Total Lifetime Spent
          </p>
          <p className="font-heading font-black text-3xl lg:text-4xl leading-tight text-white">
            {isTransactionsLoading && isTicketsLoading
              ? "..."
              : `£${totalLifetimeSpent.toFixed(2)}`}
          </p>
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 w-fit">
            <span className="font-sans text-[10px] font-bold text-[#8A92A0]">
              Lifetime purchases
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: Ticket Spend Overview Chart */}
      <div className="w-full">
        <div className="w-full bg-[#12141C] border border-white/10 rounded-2xl p-6 flex flex-col min-h-[320px] shadow-2xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 sm:gap-0">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <span className="font-heading font-black text-2xl lg:text-3xl text-white leading-none">
                  £{spendChartData.reduce((acc, curr) => acc + curr.spend, 0).toFixed(2)}
                </span>
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                  <span className="font-heading text-[10px] font-black uppercase text-emerald-400">
                    Audited Transactions
                  </span>
                </div>
              </div>
              <span className="font-sans text-xs text-[#8A92A0] mt-1">
                Ticket Spend ({timeframe}) • Lifetime: £{totalLifetimeSpent.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#0B0C0E] p-1 rounded-xl border border-white/10">
              {(["7D", "1M", "3M", "1Y"] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period)}
                  className={`px-3 py-1 rounded-lg font-heading font-bold text-xs uppercase transition-all cursor-pointer ${
                    timeframe === period
                      ? "border border-[#FF1E27] bg-[#FF1E27] text-white shadow-[0_0_10px_rgba(255,30,39,0.5)]"
                      : "border border-transparent text-[#8A92A0] hover:text-white"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex-1 w-full relative min-h-[220px]">
            {isTransactionsLoading ? (
              <div className="w-full h-full min-h-[200px] flex items-center justify-center text-[#8A92A0] font-sans text-xs animate-pulse">
                Loading spend overview...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={spendChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUserSpend" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF1E27" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#FF1E27" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: "#8A92A0", fontSize: 11, fontFamily: "sans-serif" }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: "#8A92A0", fontSize: 11, fontFamily: "sans-serif" }}
                    tickFormatter={(val) => `£${val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}`}
                  />
                  <RechartsTooltip
                    cursor={{ stroke: "rgba(255, 30, 39, 0.3)", strokeWidth: 1, strokeDasharray: "4 4" }}
                    contentStyle={{ 
                      backgroundColor: "#12141C", 
                      borderColor: "rgba(255, 255, 255, 0.15)", 
                      borderRadius: "12px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
                      fontFamily: "sans-serif"
                    }}
                    itemStyle={{ color: "#FF1E27", fontWeight: "bold" }}
                    formatter={(val: any) => [
                      `£${Number(val || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 
                      "Ticket Spend"
                    ]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="spend" 
                    stroke="#FF1E27" 
                    strokeWidth={2.5}
                    fillOpacity={1} 
                    fill="url(#colorUserSpend)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Row 3: Active Entries & Recent Wins */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 w-full items-start">
        {/* My Active Entries */}
        <div className="xl:col-span-6 bg-[#12141C] border border-white/10 rounded-2xl p-6 flex flex-col shadow-2xl backdrop-blur-md">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
            <div>
              <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight">
                My Active Entries
              </h3>
              <p className="font-sans text-[11px] text-[#8A92A0]">
                Competitions you are currently participating in
              </p>
            </div>
            <Link
              href="/dashboard/user/tickets"
              className="flex items-center gap-1 font-sans font-bold text-xs text-[#FF1E27] hover:underline transition-all cursor-pointer"
            >
              View All
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>

          {isTicketsLoading ? (
            <div className="py-12 flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-2 border-[#FF1E27] border-t-transparent rounded-full animate-spin mb-2" />
              <span className="font-sans text-xs text-[#8A92A0]">Loading active entries...</span>
            </div>
          ) : activeCompetitions.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-14 h-14 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mb-3 text-2xl">
                🎟️
              </div>
              <h4 className="font-heading font-bold text-sm text-white mb-1">
                No active entries found
              </h4>
              <p className="font-sans text-xs text-[#8A92A0] max-w-[280px] mb-4">
                You do not have any tickets in active draws. Browse live competitions to participate!
              </p>
              <Link
                href="/live-raffles"
                className="btn-glossy-red px-4 py-2 rounded-xl text-white font-heading font-bold text-xs uppercase tracking-wider shadow-sm"
              >
                Browse Live Draws
              </Link>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-white/5">
              {activeCompetitions.map((item) => (
                <div
                  key={item.raffle.id}
                  className="py-3.5 flex items-center justify-between gap-3 hover:bg-white/5 px-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black/40 shrink-0 border border-white/10">
                      <Image
                        src={
                          item.raffle.images?.[0] ||
                          item.raffle.mainImage ||
                          "https://placehold.co/400x300/12141C/FF1E27?text=Draw"
                        }
                        alt={item.raffle.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <Link
                        href={`/live-raffles/${item.raffle.slug || item.raffle.id}`}
                        className="font-heading font-bold text-xs text-white truncate hover:text-[#FF1E27]"
                      >
                        {item.raffle.title}
                      </Link>
                      <span className="font-sans text-[11px] text-[#8A92A0] truncate">
                        Hosted by {item.raffle.host?.businessName || "Tuned Draws Official"}
                      </span>
                      <span className="font-sans text-[10px] text-[#8A92A0]/80 mt-0.5">
                        Draw Date:{" "}
                        {item.raffle.endDate
                          ? format(new Date(item.raffle.endDate), "dd MMM yyyy")
                          : "TBA"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="px-3 py-1 bg-[#0B0C0E] border border-white/10 rounded-lg text-center">
                      <span className="font-sans font-bold text-xs text-[#FF1E27]">
                        {item.ticketCount} {item.ticketCount === 1 ? "ticket" : "tickets"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Wins (Instant Wins & Main Draw Wins) */}
        <div className="xl:col-span-6 bg-[#12141C] border border-white/10 rounded-2xl p-6 flex flex-col shadow-2xl backdrop-blur-md">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight">
                  Recent Wins
                </h3>
                {instantWinsCount > 0 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-sans font-bold text-[9px] uppercase tracking-wider">
                    ⚡ {instantWinsCount} Instant Win{instantWinsCount === 1 ? "" : "s"}
                  </span>
                )}
              </div>
              <p className="font-sans text-[11px] text-[#8A92A0]">
                Your recent Instant Win prizes and Competition victories
              </p>
            </div>
            <Link
              href="/dashboard/user/winners"
              className="flex items-center gap-1 font-sans font-bold text-xs text-[#FF1E27] hover:underline transition-all cursor-pointer"
            >
              View All ({totalWins})
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>

          {isWinnersLoading ? (
            <div className="py-12 flex flex-col items-center justify-center">
              <div className="w-8 h-8 border-2 border-[#FF1E27] border-t-transparent rounded-full animate-spin mb-2" />
              <span className="font-sans text-xs text-[#8A92A0]">Loading your winning records...</span>
            </div>
          ) : recentWins.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-14 h-14 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mb-3 text-2xl shadow-xs">
                🏆
              </div>
              <h4 className="font-heading font-bold text-sm text-white mb-1">
                No wins recorded yet
              </h4>
              <p className="font-sans text-xs text-[#8A92A0] max-w-[280px] mb-4">
                Enter active competitions for your chance to win instant prizes, performance parts, and tuning services.
              </p>
              <Link
                href="/dashboard/user/competitions"
                className="btn-glossy-red px-4 py-2 rounded-xl text-white font-heading font-bold text-xs uppercase tracking-wider shadow-sm"
              >
                Explore Competitions
              </Link>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-white/5">
              {recentWins.map((win) => (
                <div
                  key={win.id}
                  className="py-3.5 flex items-center justify-between gap-3 hover:bg-white/5 px-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black/40 shrink-0 border border-white/10">
                      <Image
                        src={
                          win.prizeImage ||
                          win.raffle?.mainImage ||
                          "https://placehold.co/400x300/12141C/FF1E27?text=Prize"
                        }
                        alt={win.prizeName}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-heading font-bold text-xs text-white truncate">
                          {win.prizeName}
                        </span>
                        {win.winType === "INSTANT_WIN" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-sans font-bold text-[9px] uppercase tracking-wider">
                            ⚡ Instant Win
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-sans font-bold text-[9px] uppercase tracking-wider">
                            🏆 Main Draw
                          </span>
                        )}
                      </div>

                      <p className="font-sans text-[11px] text-[#8A92A0] truncate">
                        {win.raffle?.title || "Tuned Draws Competition"}
                      </p>

                      <div className="flex items-center gap-2 mt-0.5 text-[10px] font-sans text-[#8A92A0]">
                        <span className="font-mono font-semibold text-white">
                          Ticket #{win.ticketNumber}
                        </span>
                        {win.rrpValue ? (
                          <>
                            <span>•</span>
                            <span className="font-semibold text-emerald-400">
                              Value: £{Number(win.rrpValue).toFixed(2)}
                            </span>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0 gap-1.5">
                    <span className="font-sans text-[10px] text-[#8A92A0]">
                      {win.createdAt ? format(new Date(win.createdAt), "dd MMM yyyy") : ""}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-sans font-bold uppercase tracking-wider ${
                        win.deliveryStatus === "DELIVERED"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                          : win.deliveryStatus === "SHIPPED"
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {win.deliveryStatus === "DELIVERED"
                        ? "Delivered"
                        : win.deliveryStatus === "SHIPPED"
                        ? "Shipped"
                        : "Won / Pending"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
