"use client";

import React, { useState } from "react";
import { useHostDashboardReviewsQuery } from "@/hooks/useReviewHooks";
import HostReviewCard from "@/components/website/host-reviews/HostReviewCard";
import { cn } from "@/lib/utils";

export default function HostReviewsDashboardPage() {
  const [page, setPage] = useState(1);
  const [selectedRating, setSelectedRating] = useState<number | undefined>(undefined);

  const { data, isLoading, isError } = useHostDashboardReviewsQuery({
    page,
    limit: 12,
    rating: selectedRating,
  });

  const actualData = (data as any)?.data && (data as any)?.data?.reviews !== undefined ? (data as any).data : data;
  const reviews = actualData?.reviews || [];
  const stats = actualData?.stats;
  const meta = (data as any)?.meta || actualData?.meta;

  const totalReviews = stats?.totalReviews || 0;
  const averageRating = stats?.averageRating;
  const fiveStarCount = stats?.breakdown?.[5] || 0;
  const fourStarCount = stats?.breakdown?.[4] || 0;
  const positiveCount = fiveStarCount + fourStarCount;
  const satisfactionRate =
    totalReviews > 0 ? Math.round((positiveCount / totalReviews) * 100) : 100;

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8 max-w-[1660px] mx-auto w-full animate-fadeIn text-white">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading text-2xl lg:text-3xl font-black text-white uppercase tracking-tight">
            Customer Reviews
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#8A92A0] mt-1">
            Monitor winner feedback, host reputation metrics, and prize delivery reviews.
          </p>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* Average Rating */}
        <div className="bg-[#12141C] border border-white/10 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <span className="font-heading text-[11px] uppercase tracking-wider text-[#8A92A0] font-bold">
              Average Rating
            </span>
            <span className="text-[18px] text-[#EAB308]">★</span>
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-heading font-black text-[34px] text-white leading-none">
              {averageRating !== null && averageRating !== undefined
                ? Number(averageRating).toFixed(1)
                : "—"}
            </span>
            <span className="font-sans text-xs text-[#8A92A0]">/ 5.0</span>
          </div>
          <span className="font-sans text-xs text-[#FF1E27] mt-2 font-medium">
            Public reputation score
          </span>
        </div>

        {/* Total Reviews */}
        <div className="bg-[#12141C] border border-white/10 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <span className="font-heading text-[11px] uppercase tracking-wider text-[#8A92A0] font-bold">
              Total Reviews
            </span>
            <span className="text-[18px]">🏆</span>
          </div>
          <div className="mt-3">
            <span className="font-heading font-black text-[34px] text-white leading-none">
              {totalReviews}
            </span>
          </div>
          <span className="font-sans text-xs text-[#8A92A0] mt-2">
            Verified competition winners
          </span>
        </div>

        {/* 5-Star Reviews */}
        <div className="bg-[#12141C] border border-white/10 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <span className="font-heading text-[11px] uppercase tracking-wider text-[#8A92A0] font-bold">
              5-Star Feedback
            </span>
            <span className="text-[18px]">🌟</span>
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="font-heading font-black text-[34px] text-[#EAB308] leading-none">
              {fiveStarCount}
            </span>
            <span className="font-sans text-xs text-[#8A92A0]">
              ({stats?.percentages?.[5] || 0}%)
            </span>
          </div>
          <span className="font-sans text-xs text-[#EAB308] mt-2 font-medium">
            Perfect ratings received
          </span>
        </div>

        {/* Satisfaction Rate */}
        <div className="bg-[#12141C] border border-white/10 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between">
            <span className="font-heading text-[11px] uppercase tracking-wider text-[#8A92A0] font-bold">
              Satisfaction Rate
            </span>
            <span className="text-[18px]">👍</span>
          </div>
          <div className="mt-3">
            <span className="font-heading font-black text-[34px] text-emerald-400 leading-none">
              {satisfactionRate}%
            </span>
          </div>
          <span className="font-sans text-xs text-emerald-400 mt-2 font-medium">
            4 &amp; 5-star positive ratings
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-[#12141C] border border-white/10 p-3 rounded-xl">
        <button
          onClick={() => {
            setSelectedRating(undefined);
            setPage(1);
          }}
          className={cn(
            "h-8 px-4 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer",
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
                "h-8 px-4 rounded-lg text-xs font-heading font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5",
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

      {/* Reviews List */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
        <div className="flex flex-col items-center justify-center py-20 text-center gap-3 bg-[#12141C] border border-white/10 rounded-2xl">
          <span className="text-[36px]">⭐</span>
          <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight">
            {selectedRating ? `No ${selectedRating}-Star Reviews` : "No Reviews Received Yet"}
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#8A92A0] max-w-[380px] leading-relaxed">
            {selectedRating
              ? `No reviews found for ${selectedRating} stars.`
              : "When players win prizes in your competitions, they can leave verified reviews and ratings here."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review) => (
            <HostReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4 border-t border-white/10">
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
