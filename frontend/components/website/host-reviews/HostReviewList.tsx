"use client";

import React, { useState } from "react";
import { useHostReviewsQuery } from "@/hooks/useReviewHooks";
import HostReviewCard from "./HostReviewCard";
import { cn } from "@/lib/utils";

interface HostReviewListProps {
  hostId: string;
}

export default function HostReviewList({ hostId }: HostReviewListProps) {
  const [page, setPage] = useState(1);
  const [selectedRating, setSelectedRating] = useState<number | undefined>(undefined);

  const { data, isLoading, isError } = useHostReviewsQuery(hostId, {
    page,
    limit: 9,
    rating: selectedRating,
  });

  const actualData = (data as any)?.data && (data as any)?.data?.reviews !== undefined ? (data as any).data : data;
  const reviews = actualData?.reviews || [];
  const stats = actualData?.stats;
  const totalReviews = stats?.totalReviews || 0;
  const averageRating = stats?.averageRating;
  const meta = (data as any)?.meta || actualData?.meta;

  return (
    <div className="flex flex-col gap-8 w-full animate-fadeIn text-white">
      {/* 1. Rating Summary & Star Breakdown */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-6 sm:p-8 rounded-2xl bg-[#12141C] border border-white/10 shadow-xl backdrop-blur-md">
        {/* Left: Overall Rating Score */}
        <div className="flex flex-col items-center justify-center text-center md:border-r md:border-white/10 md:pr-10 shrink-0 min-w-[200px]">
          <span className="font-heading font-black text-5xl sm:text-6xl text-white tracking-tight">
            {averageRating !== null && averageRating !== undefined
              ? Number(averageRating).toFixed(1)
              : "—"}
          </span>

          <div className="flex items-center gap-1.5 my-2 text-[#EAB308] text-xl">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={
                  averageRating && i < Math.round(averageRating)
                    ? "opacity-100"
                    : "opacity-20 text-white"
                }
              >
                ★
              </span>
            ))}
          </div>

          <span className="font-heading text-xs uppercase font-bold text-white tracking-wider">
            {totalReviews > 0
              ? `${totalReviews} Verified ${totalReviews === 1 ? "Review" : "Reviews"}`
              : "No reviews yet"}
          </span>
          <span className="font-sans text-[11px] text-[#8A92A0] mt-1">
            Based on genuine winners
          </span>
        </div>

        {/* Right: Star Distribution Bars */}
        <div className="flex flex-col justify-center gap-2.5 flex-1 w-full max-w-[500px]">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = stats?.breakdown?.[star] || 0;
            const percent = stats?.percentages?.[star] || 0;
            const isSelected = selectedRating === star;

            return (
              <button
                key={star}
                onClick={() => {
                  setSelectedRating(isSelected ? undefined : star);
                  setPage(1);
                }}
                className={cn(
                  "flex items-center gap-3 w-full group py-1.5 px-3 rounded-xl transition-colors cursor-pointer text-left",
                  isSelected ? "bg-white/10" : "hover:bg-white/5"
                )}
              >
                <div className="flex items-center gap-1 w-12 text-xs font-heading font-bold text-white shrink-0">
                  <span>{star}</span>
                  <span className="text-[#EAB308]">★</span>
                </div>

                <div className="flex-1 h-2 bg-[#0B0C0E] border border-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FF1E27] rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <div className="w-16 text-right font-sans text-xs text-[#8A92A0] shrink-0">
                  {count} ({percent}%)
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Star Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => {
            setSelectedRating(undefined);
            setPage(1);
          }}
          className={cn(
            "h-8 px-4 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer",
            selectedRating === undefined
              ? "bg-[#FF1E27] text-white shadow-[0_0_10px_rgba(255,30,39,0.3)]"
              : "bg-white/5 border border-white/10 text-[#8A92A0] hover:text-white"
          )}
        >
          All Reviews ({totalReviews})
        </button>
        {[5, 4, 3, 2, 1].map((star) => {
          const count = stats?.breakdown?.[star] || 0;
          return (
            <button
              key={star}
              onClick={() => {
                setSelectedRating(selectedRating === star ? undefined : star);
                setPage(1);
              }}
              className={cn(
                "h-8 px-4 rounded-full text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1",
                selectedRating === star
                  ? "bg-[#FF1E27] text-white shadow-[0_0_10px_rgba(255,30,39,0.3)]"
                  : "bg-white/5 border border-white/10 text-[#8A92A0] hover:text-white"
              )}
            >
              <span>{star} ★</span>
              <span className="opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* 3. Review Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#12141C] border border-white/10 rounded-2xl p-5 h-40 animate-pulse"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-12 bg-[#12141C] border border-red-500/20 rounded-2xl">
          <p className="font-sans text-sm text-red-400">
            Failed to load reviews. Please refresh the page.
          </p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-3 bg-[#12141C] border border-white/10 rounded-2xl max-w-[600px] mx-auto w-full">
          <span className="text-[36px]">⭐</span>
          <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight">
            {selectedRating
              ? `No ${selectedRating}-Star Reviews`
              : "No Host Reviews Yet"}
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#8A92A0] max-w-[360px] leading-relaxed">
            {selectedRating
              ? `This host has no reviews matching the ${selectedRating}-star filter. Try selecting "All Reviews".`
              : "Reviews are left by verified winners after winning a main draw or instant prize from this host."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <HostReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}

      {/* Pagination if multiple pages */}
      {meta && meta.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4 pt-4 border-t border-white/10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-xl border border-white/10 text-[#8A92A0] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-xs font-heading font-bold uppercase transition-colors"
          >
            Previous
          </button>
          <span className="text-xs font-sans text-[#8A92A0] px-2">
            Page {page} of {meta.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
            disabled={page === meta.totalPages}
            className="px-4 py-2 rounded-xl border border-white/10 text-[#8A92A0] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-xs font-heading font-bold uppercase transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
