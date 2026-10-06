"use client";

import React, { useState } from "react";
import Link from "next/link";
import DrawCard from "../shared/DrawCard";

interface HostProfileTabsProps {
  raffles?: any[];
  name?: string;
  bio?: string;
  location?: string;
}

export default function HostProfileTabs({
  raffles = [],
  name = "Host",
  bio = "",
  location = "",
}: HostProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<"active" | "past" | "reviews" | "about">("active");

  const isPastRaffle = (r: any) => {
    if (r.status === "ENDED" || r.status === "COMPLETED" || r.status === "CANCELLED") {
      return true;
    }
    const end = r.rawEndDate || r.endDate;
    if (end) {
      const parsed = new Date(end);
      if (!isNaN(parsed.getTime()) && parsed.getTime() <= Date.now()) {
        return true;
      }
    }
    const total = Number(r.totalTickets ?? 0);
    const sold = Number(r.ticketsSold ?? r.soldTickets ?? 0);
    if (total > 0 && sold >= total) {
      return true;
    }
    return false;
  };

  const formatDraw = (r: any): any => {
    const isPast = isPastRaffle(r);
    return {
      id: r.id,
      title: r.title,
      description: r.description,
      image: r.mainImage || r.image || "",
      ticketPrice: Number(r.pricePerTicket ?? r.ticketPrice ?? 0),
      totalTickets: Number(r.totalTickets ?? 0),
      soldTickets: Number(r.ticketsSold ?? r.soldTickets ?? 0),
      rawEndDate: r.endDate,
      endDate: isPast
        ? "Draw Closed"
        : r.endDate
        ? new Date(r.endDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "Closing Soon",
      status: isPast ? "ended" : "live",
      category: r.category || "general",
      slug: r.slug || r.id,
      worthPrice: r.mainPrizeValue
        ? Number(r.mainPrizeValue)
        : r.worthPrice
        ? Number(r.worthPrice)
        : undefined,
      mainPrizeValue: r.mainPrizeValue ? Number(r.mainPrizeValue) : undefined,
      instantWinsCount:
        r._count?.instantWins ||
        (Array.isArray(r.instantWins) ? r.instantWins.length : 0) ||
        0,
      isInstantWin:
        (r._count?.instantWins ||
          (Array.isArray(r.instantWins) ? r.instantWins.length : 0) ||
          0) > 0,
    };
  };

  const liveDraws = raffles.filter((r) => r.status === "ACTIVE" && !isPastRaffle(r)).map(formatDraw);
  const pastDraws = raffles.filter((r) => isPastRaffle(r)).map(formatDraw);

  return (
    <div className="flex flex-col mt-4">
      {/* Tab Navigation */}
      <div className="flex items-center gap-2 sm:gap-4 border-b border-white/10 mb-8 overflow-x-auto scrollbar-none pb-0.5">
        <button
          onClick={() => setActiveTab("active")}
          className={`pb-3.5 pt-2 px-4 font-heading text-xs uppercase tracking-wider font-black transition-all border-b-2 -mb-[1px] whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            activeTab === "active"
              ? "border-[#FF1E27] text-white"
              : "border-transparent text-[#8A92A0] hover:text-white"
          }`}
        >
          <span>Active Draws</span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-black transition-colors ${
              activeTab === "active"
                ? "bg-[#FF1E27] text-white shadow-[0_0_10px_rgba(255,30,39,0.5)]"
                : "bg-white/10 text-[#8A92A0]"
            }`}
          >
            {liveDraws.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("past")}
          className={`pb-3.5 pt-2 px-4 font-heading text-xs uppercase tracking-wider font-black transition-all border-b-2 -mb-[1px] whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            activeTab === "past"
              ? "border-[#FF1E27] text-white"
              : "border-transparent text-[#8A92A0] hover:text-white"
          }`}
        >
          <span>Past Draws</span>
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-black transition-colors ${
              activeTab === "past"
                ? "bg-[#FF1E27] text-white shadow-[0_0_10px_rgba(255,30,39,0.5)]"
                : "bg-white/10 text-[#8A92A0]"
            }`}
          >
            {pastDraws.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-3.5 pt-2 px-4 font-heading text-xs uppercase tracking-wider font-black transition-all border-b-2 -mb-[1px] whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            activeTab === "reviews"
              ? "border-[#FF1E27] text-white"
              : "border-transparent text-[#8A92A0] hover:text-white"
          }`}
        >
          <span>Reviews</span>
        </button>

        <button
          onClick={() => setActiveTab("about")}
          className={`pb-3.5 pt-2 px-4 font-heading text-xs uppercase tracking-wider font-black transition-all border-b-2 -mb-[1px] whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            activeTab === "about"
              ? "border-[#FF1E27] text-white"
              : "border-transparent text-[#8A92A0] hover:text-white"
          }`}
        >
          <span>About Host</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="min-h-[360px]">
        {activeTab === "active" && (
          <div className="animate-in fade-in duration-300">
            {liveDraws.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {liveDraws.map((draw) => (
                  <DrawCard key={draw.id} draw={draw} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center rounded-2xl border border-white/10 bg-[#12141C]/80 shadow-2xl my-2 backdrop-blur-md">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-4 text-[#FF1E27] shadow-inner">
                  🏎️
                </div>
                <h3 className="font-heading font-black text-xl sm:text-2xl text-white mb-2 uppercase tracking-tight">
                  No Active Draws At The Moment
                </h3>
                <p className="font-sans text-sm text-[#8A92A0] max-w-md mb-6 leading-relaxed">
                  <strong className="text-white">{name}</strong> does not have any live automotive draws running right now. Check back soon or explore live draws from other verified builders!
                </p>
                <Link
                  href="/live-raffles"
                  className="inline-flex items-center justify-center gap-2 font-heading font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FF1E27] to-[#B3000C] text-white shadow-[0_0_20px_rgba(255,30,39,0.4)] transition-all hover:scale-105"
                >
                  Explore All Live Competitions →
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === "past" && (
          <div className="animate-in fade-in duration-300">
            {pastDraws.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {pastDraws.map((draw) => (
                  <DrawCard key={draw.id} draw={draw} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center rounded-2xl border border-white/10 bg-[#12141C]/80 shadow-2xl my-2 backdrop-blur-md">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-4 text-[#FF1E27] shadow-inner">
                  🏆
                </div>
                <h3 className="font-heading font-black text-xl sm:text-2xl text-white mb-2 uppercase tracking-tight">
                  No Past Draws Yet
                </h3>
                <p className="font-sans text-sm text-[#8A92A0] max-w-md leading-relaxed">
                  This host hasn't completed any competitions yet. Completed draw history and winning tickets will appear here once draws wrap up.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="animate-in fade-in duration-300">
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center rounded-2xl border border-white/10 bg-[#12141C]/80 shadow-2xl my-2 backdrop-blur-md">
              <div className="w-16 h-16 rounded-2xl bg-[#FF1E27]/10 border border-[#FF1E27]/30 flex items-center justify-center text-3xl mb-4 text-[#FF1E27] shadow-inner">
                ⭐
              </div>
              <h3 className="font-heading font-black text-xl sm:text-2xl text-white mb-2 uppercase tracking-tight">
                Host Ratings &amp; Reviews
              </h3>
              <p className="font-sans text-sm text-[#8A92A0] max-w-md leading-relaxed mb-4">
                Verified ticket buyers can leave feedback after completing draws with <strong className="text-white">{name}</strong>.
              </p>
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                <span className="text-[#FF1E27] font-heading font-black text-lg">★ 5.0</span>
                <span className="text-xs font-heading font-bold uppercase text-[#D1D5DB]">Verified Host Standard</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div className="animate-in fade-in duration-300">
            <div className="rounded-2xl border border-white/10 bg-[#12141C]/80 p-6 sm:p-8 shadow-2xl my-2 max-w-3xl backdrop-blur-md">
              <h3 className="font-heading font-black text-xl text-white mb-3 uppercase tracking-tight">
                About {name}
              </h3>
              <p className="font-sans text-sm text-[#8A92A0] leading-relaxed mb-4">
                {bio || `${name} is an officially verified partner on Tuned Draws, delivering authentic automotive builds, transparent audited draws, and instant win opportunities.`}
              </p>
              {location && (
                <div className="flex items-center gap-2 text-xs font-semibold text-[#D1D5DB] mb-6">
                  <span>📍</span>
                  <span>Based in {location}</span>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xl">🛡️</span>
                  <div>
                    <div className="font-heading text-xs font-bold text-white uppercase">Fully Vetted</div>
                    <div className="font-sans text-[11px] text-[#8A92A0]">Verified Partner</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xl">🏎️</span>
                  <div>
                    <div className="font-heading text-xs font-bold text-white uppercase">Performance Builds</div>
                    <div className="font-sans text-[11px] text-[#8A92A0]">Supercars &amp; Engines</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xl">⚡</span>
                  <div>
                    <div className="font-heading text-xs font-bold text-white uppercase">Instant Payouts</div>
                    <div className="font-sans text-[11px] text-[#8A92A0]">Guaranteed Delivery</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
