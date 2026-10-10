"use client";

import React, { useState } from "react";
import { UserWinner } from "@/services/user.service";
import {
  useSubmitReviewMutation,
  useUpdateReviewMutation,
} from "@/hooks/useReviewHooks";
import { toast } from "sonner";

interface LeaveReviewModalProps {
  winner: UserWinner;
  isOpen: boolean;
  onClose: () => void;
}

const RATING_LABELS: Record<number, string> = {
  1: "1 Star - Very Poor",
  2: "2 Stars - Poor",
  3: "3 Stars - Average",
  4: "4 Stars - Great Experience",
  5: "5 Stars - Outstanding & Reliable!",
};

export default function LeaveReviewModal({
  winner,
  isOpen,
  onClose,
}: LeaveReviewModalProps) {
  const isEditing = Boolean(winner.hasReviewed && winner.review);

  const [rating, setRating] = useState<number>(winner.review?.rating || 5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>(winner.review?.comment || "");

  const submitMutation = useSubmitReviewMutation();
  const updateMutation = useUpdateReviewMutation();

  const isPending = submitMutation.isPending || updateMutation.isPending;

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating || rating < 1 || rating > 5) {
      toast.error("Please select a star rating between 1 and 5.");
      return;
    }

    try {
      if (isEditing && winner.review?.id) {
        await updateMutation.mutateAsync({
          id: winner.review.id,
          payload: { rating, comment },
        });
        toast.success("Review updated successfully!");
      } else {
        await submitMutation.mutateAsync({
          winnerId: winner.id,
          rating,
          comment,
        });
        toast.success("Thank you! Your verified review has been published.");
      }
      onClose();
    } catch (err: any) {
      toast.error("Failed to submit review", {
        description:
          err?.response?.data?.message || err?.message || "Please try again.",
      });
    }
  };

  const activeStarRating = hoverRating || rating;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-[#12141C] border border-white/10 rounded-2xl max-w-[540px] w-full p-6 sm:p-8 flex flex-col gap-6 shadow-2xl relative animate-scaleUp text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Background Glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#FF1E27]/10 blur-3xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#8A92A0] hover:text-white transition-colors p-1"
          aria-label="Close dialog"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[22px]">⭐</span>
            <h2 className="font-heading font-black text-xl sm:text-2xl text-white uppercase tracking-tight">
              {isEditing ? "Edit Your Review" : "Rate & Review Host"}
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-[13px] text-[#8A92A0]">
            Leave your verified winner feedback for{" "}
            <strong className="text-white font-semibold">
              {winner.raffle?.hostBusinessName || "the competition host"}
            </strong>
            .
          </p>
        </div>

        {/* Won Product Details Preview Box */}
        <div className="bg-[#0B0C0E] border border-white/10 rounded-xl p-4 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[22px] shrink-0">
            {winner.winType === "INSTANT_WIN" ? "⚡" : "🏆"}
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-heading text-[10px] uppercase font-bold tracking-wider text-[#FF1E27]">
                {winner.winType === "INSTANT_WIN" ? "Instant Win Prize" : "Grand Prize Win"}
              </span>
              <span className="text-[10px] text-[#8A92A0]">• Ticket #{winner.ticketNumber}</span>
            </div>
            <span className="font-heading font-bold text-[15px] text-white truncate mt-0.5">
              {winner.prizeName}
            </span>
            <span className="font-sans text-xs text-[#8A92A0] truncate">
              {winner.raffle?.title}
            </span>
          </div>
        </div>

        {/* Review Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Star Rating Selector */}
          <div className="flex flex-col items-center justify-center gap-2 py-4 bg-[#0B0C0E] border border-white/10 rounded-xl">
            <span className="font-heading text-[11px] uppercase tracking-wider text-[#8A92A0] font-bold">
              Select Your Rating
            </span>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 cursor-pointer transition-transform duration-150 hover:scale-125 focus:outline-none"
                >
                  <svg
                    className={`w-8 h-8 transition-colors ${
                      star <= activeStarRating
                        ? "text-[#EAB308] fill-[#EAB308] drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]"
                        : "text-white/20 fill-transparent"
                    }`}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499c.195-.39.771-.39.966 0l2.484 4.969 5.433.791c.42.061.587.576.283.876l-3.93 3.83 1.026 5.405c.08.423-.365.747-.738.547L12 18.254l-4.864 2.563c-.372.2-.818-.124-.738-.547l1.026-5.405-3.93-3.83c-.304-.3-.138-.815.283-.876l5.433-.791 2.484-4.969Z"
                    />
                  </svg>
                </button>
              ))}
            </div>
            <span className="font-heading text-xs font-bold text-[#EAB308] min-h-[20px]">
              {RATING_LABELS[activeStarRating] || "Click to rate"}
            </span>
          </div>

          {/* Feedback Text Area */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="review-comment" className="font-heading text-xs font-bold text-white uppercase tracking-wider">
                Your Review &amp; Experience (Optional)
              </label>
              <span className="font-sans text-[10px] text-[#8A92A0]">
                {comment.length} / 1000 characters
              </span>
            </div>
            <textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={1000}
              rows={4}
              placeholder="Tell other players how your prize experience was (e.g. delivery speed, communication, packaging, item condition)..."
              className="w-full bg-[#0B0C0E] border border-white/10 rounded-xl p-3 text-xs sm:text-[13px] text-white placeholder-[#8A92A0]/60 focus:outline-none focus:border-[#FF1E27] transition-colors resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-4 py-2.5 rounded-xl bg-transparent border border-white/10 hover:border-white/20 text-[#8A92A0] hover:text-white font-heading text-xs uppercase font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 rounded-xl bg-[#FF1E27] hover:bg-[#E01921] disabled:opacity-50 text-white font-heading font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(255,30,39,0.35)]"
            >
              {isPending && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {isEditing ? "Save Review" : "Publish Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
