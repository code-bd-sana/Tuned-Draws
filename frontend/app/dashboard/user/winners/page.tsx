"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useMyWinnersQuery } from "@/hooks/useUserHooks";
import { UserWinner } from "@/services/user.service";
import LeaveReviewModal from "@/components/dashboard/user/winners/LeaveReviewModal";

export default function UserWinnersPage() {
  const { data: winners, isLoading, isError } = useMyWinnersQuery();
  const [filter, setFilter] = useState<"ALL" | "INSTANT_WIN" | "MAIN_DRAW">("ALL");
  const [search, setSearch] = useState("");
  const [selectedWinnerForReview, setSelectedWinnerForReview] = useState<UserWinner | null>(null);

  const allWinners = winners || [];

  const instantWinsCount = allWinners.filter((w) => w.winType === "INSTANT_WIN").length;
  const mainDrawWinsCount = allWinners.filter((w) => w.winType === "MAIN_DRAW").length;
  const totalWins = allWinners.length;

  const filteredWinners = allWinners.filter((w) => {
    const matchesFilter =
      filter === "ALL" ? true : w.winType === filter;
    const matchesSearch =
      search.trim() === ""
        ? true
        : w.prizeName.toLowerCase().includes(search.toLowerCase()) ||
          w.raffle.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8 max-w-[1660px] mx-auto w-full animate-fadeIn">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-heading text-2xl lg:text-3xl font-black text-white uppercase tracking-tight">
            My Winnings &amp; Prizes
          </h1>
          <p className="font-sans text-xs text-[#B6AA9C] mt-1">
            Track all your Instant Wins and Main Competition Draw victories.
          </p>
        </div>
        <Link
          href="/dashboard/user/competitions"
          className="btn-racing-red px-5 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white shadow-lg active:scale-98 transition-all flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Enter More Competitions
        </Link>
      </div>

      {/* Stats KPI Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
        {/* Total Wins */}
        <div className="bg-[#211C18] border border-white/10 rounded-2xl p-6 flex flex-col gap-3 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#B6AA9C]">
              Total Won Prizes
            </p>
            <div className="w-9 h-9 rounded-full bg-[#D4A863]/10 border border-[#D4A863]/30 flex items-center justify-center text-[#D4A863] shadow-xs">
              🏆
            </div>
          </div>
          <p className="font-heading font-black text-3xl lg:text-4xl leading-tight text-white">
            {totalWins}
          </p>
          <span className="font-sans font-semibold text-xs text-[#B6AA9C]">
            Lifetime claims across all competitions
          </span>
        </div>

        {/* Instant Wins */}
        <div className="bg-[#211C18] border border-white/10 rounded-2xl p-6 flex flex-col gap-3 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#B6AA9C]">
              Instant Wins
            </p>
            <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-xs">
              ⚡
            </div>
          </div>
          <p className="font-heading font-black text-3xl lg:text-4xl leading-tight text-amber-400">
            {instantWinsCount}
          </p>

          <span className="font-sans font-semibold text-xs text-[#B6AA9C]">
            Instant prizes matched on ticket purchase
          </span>
        </div>

        {/* Main Draw Wins */}
        <div className="bg-[#211C18] border border-white/10 rounded-2xl p-6 flex flex-col gap-3 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#B6AA9C]">
              Main Competition Wins
            </p>
            <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-xs">
              🎖️
            </div>
          </div>
          <p className="font-heading font-black text-3xl lg:text-4xl leading-tight text-emerald-400">
            {mainDrawWinsCount}
          </p>
          <span className="font-sans font-semibold text-xs text-[#B6AA9C]">
            Grand prizes won in official draws
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-[#211C18] border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-4 py-2 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              filter === "ALL"
                ? "bg-[#94632F] text-white shadow-[0_0_12px_rgba(212,168,99,0.5)] border border-[#D4A863]"
                : "bg-[#14110F] border border-white/10 text-[#B6AA9C] hover:text-white"
            }`}
          >
            All Wins ({totalWins})
          </button>
          <button
            onClick={() => setFilter("INSTANT_WIN")}
            className={`px-4 py-2 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              filter === "INSTANT_WIN"
                ? "bg-amber-500/20 border border-amber-500/40 text-amber-300 shadow-xs"
                : "bg-[#14110F] border border-white/10 text-[#B6AA9C] hover:text-amber-400"
            }`}
          >
            <span>⚡</span> Instant Wins ({instantWinsCount})
          </button>
          <button
            onClick={() => setFilter("MAIN_DRAW")}
            className={`px-4 py-2 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              filter === "MAIN_DRAW"
                ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shadow-xs"
                : "bg-[#14110F] border border-white/10 text-[#B6AA9C] hover:text-emerald-400"
            }`}
          >
            <span>🏆</span> Main Draw Wins ({mainDrawWinsCount})
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-[300px]">
          <input
            type="text"
            placeholder="Search prize or competition..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 bg-[#14110F] border border-white/10 rounded-xl px-3 pr-8 text-xs text-white placeholder:text-[#B6AA9C]/50 focus:outline-none focus:border-[#D4A863] focus:ring-1 focus:ring-[#D4A863]/30 transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#B6AA9C] hover:text-white cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-[#211C18] border border-white/10 rounded-2xl shadow-2xl">
          <div className="w-10 h-10 border-2 border-[#D4A863] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-sans font-bold text-xs text-[#B6AA9C]">Loading your prize history...</p>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-16 bg-[#211C18] border border-red-500/20 rounded-2xl shadow-2xl">
          <p className="font-sans font-bold text-xs text-red-400">Failed to load winning records. Please refresh the page.</p>
        </div>
      ) : filteredWinners.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-20 bg-[#211C18] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
          <div className="w-20 h-20 bg-white/5 rounded-full border border-white/10 flex items-center justify-center mb-5 text-3xl">
            🏆
          </div>
          <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight mb-2">
            {allWinners.length === 0 ? "No Prizes Won Yet" : "No Matching Prizes Found"}
          </h3>
          <p className="font-sans text-xs text-[#B6AA9C] max-w-[420px] mb-6">
            {allWinners.length === 0
              ? "You haven't won any instant prizes or main draws yet. Buy tickets to test your luck and unlock instant wins!"
              : "No prizes match your current filter or search criteria."}
          </p>
          <Link
            href="/dashboard/user/competitions"
            className="btn-racing-red px-6 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-white shadow-lg active:scale-98 transition-all"
          >
            Explore Live Competitions
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {filteredWinners.map((win: UserWinner) => {
            const isInstant = win.winType === "INSTANT_WIN";

            const displayImage =
              win.prizeImage ||
              win.raffle?.mainImage ||
              "/images/wedding-flowers.png";

            const wonDateFormatted = win.createdAt
              ? format(new Date(win.createdAt), "dd MMM yyyy")
              : "N/A";

            return (
              <div
                key={win.id}
                className="bg-[#211C18] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl backdrop-blur-md transition-all hover:-translate-y-1 hover:border-[#D4A863]/40"
              >
                {/* Card Top Banner Image Header */}
                <div className="relative w-full aspect-[16/10] bg-black/50 overflow-hidden">
                  <Image
                    src={displayImage}
                    alt={win.prizeName}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#211C18] via-transparent to-black/70" />

                  {/* Badge Top Left */}
                  <div className="absolute top-3 left-3">
                    {isInstant ? (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 backdrop-blur-md shadow-xs">
                        <span className="text-xs">⚡</span>
                        <span className="font-sans font-bold text-[10px] uppercase tracking-wider">
                          Instant Win Prize
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 backdrop-blur-md shadow-xs">
                        <span className="text-xs">🏆</span>
                        <span className="font-sans font-bold text-[10px] uppercase tracking-wider">
                          Main Draw Winner
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Ticket Number Top Right */}
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 shadow-xs">
                    <span className="font-mono text-xs font-bold text-white">
                      Ticket #{win.ticketNumber.toString().padStart(4, "0")}
                    </span>
                  </div>

                  {/* Prize Title overlay on image bottom */}
                  <div className="absolute bottom-3 left-4 right-4 flex flex-col">
                    <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-[#D4A863] drop-shadow-sm">
                      {isInstant ? "Instant Reward" : "Grand Prize Winner"}
                    </span>
                    <h3 className="font-heading font-black text-base lg:text-lg text-white line-clamp-1">
                      {win.prizeName}
                    </h3>
                  </div>
                </div>

                {/* Card Body Details */}
                <div className="p-5 flex flex-col gap-4 flex-1 justify-between">
                  <div className="flex flex-col gap-3">
                    {/* Competition Name */}
                    <div className="flex flex-col gap-0.5">
                      <span className="font-sans text-[10px] text-[#B6AA9C] uppercase tracking-wider font-bold">
                        Competition
                      </span>
                      <Link
                        href={`/live-raffles/${win.raffle.slug}`}
                        className="font-heading font-bold text-sm text-white hover:text-[#D4A863] transition-colors line-clamp-1"
                      >
                        {win.raffle.title}
                      </Link>
                    </div>

                    {/* Host & Date info */}
                    <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/10">
                      <div className="flex flex-col">
                        <span className="font-sans text-[10px] text-[#B6AA9C] uppercase font-bold">
                          Hosted By
                        </span>
                        <span className="font-sans text-xs font-semibold text-[#D4A863] truncate">
                          {win.raffle.hostBusinessName || "Wedding Draws Official"}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-sans text-[10px] text-[#B6AA9C] uppercase font-bold">
                          Won On
                        </span>
                        <span className="font-sans text-xs font-semibold text-white">
                          {wonDateFormatted}
                        </span>
                      </div>
                    </div>

                    {/* RRP / Value if available */}
                    {win.rrpValue !== null && (
                      <div className="flex justify-between items-center px-3 py-2 rounded-xl bg-[#14110F] border border-white/10">
                        <span className="font-sans font-semibold text-xs text-[#B6AA9C]">Prize Value (RRP):</span>
                        <span className="font-heading font-black text-sm text-emerald-400">
                          £{Number(win.rrpValue).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Delivery / Claim Status Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-1">
                    <span className="font-sans text-xs font-semibold text-[#B6AA9C]">Fulfillment:</span>
                    <div
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider border ${
                        win.deliveryStatus === "DELIVERED"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : win.deliveryStatus === "SHIPPED"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                      {win.deliveryStatus === "DELIVERED"
                        ? "Delivered"
                        : win.deliveryStatus === "SHIPPED"
                        ? "Dispatched"
                        : "Claim Processing"}
                    </div>
                  </div>

                  {/* Review Host Section */}
                  <div className="flex items-center justify-between bg-[#14110F] border border-white/10 p-2.5 rounded-xl mt-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-[13px] text-[#EAB308]">★</span>
                      <span className="text-[11px] font-sans text-[#B6AA9C] truncate">
                        {win.hasReviewed ? "Your Rating:" : "Host Review:"}
                      </span>
                      {win.hasReviewed && win.review && (
                        <span className="text-[11px] font-heading font-black text-[#EAB308]">
                          {win.review.rating}/5
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedWinnerForReview(win)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ${
                        win.hasReviewed
                          ? "bg-white/5 border border-white/15 text-white hover:bg-white/10"
                          : "bg-[#94632F] hover:bg-[#805023] text-white shadow-[0_0_10px_rgba(212,168,99,0.3)]"
                      }`}
                    >
                      {win.hasReviewed ? "Edit Review" : "Review Host"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Leave / Edit Review Modal */}
      {selectedWinnerForReview && (
        <LeaveReviewModal
          winner={selectedWinnerForReview}
          isOpen={Boolean(selectedWinnerForReview)}
          onClose={() => setSelectedWinnerForReview(null)}
        />
      )}
    </div>
  );
}
