"use client";

import React from "react";

interface HostProfileHeaderProps {
  name: string;
  bio: string;
  logo: string;
  isVerified: boolean;
  drawsHosted: number;
  rating?: number | null;
  totalReviews?: number;
  memberSince: number;
}

export default function HostProfileHeader({
  name,
  bio,
  logo,
  isVerified,
  drawsHosted = 0,
  rating = null,
  totalReviews,
  memberSince = 2026,
}: HostProfileHeaderProps) {
  const [imgError, setImgError] = React.useState(false);

  const isImage = Boolean(
    logo &&
      !imgError &&
      (logo.startsWith("http://") ||
        logo.startsWith("https://") ||
        logo.startsWith("/") ||
        logo.startsWith("data:image/"))
  );

  const initials = name
    ? name
        .split(" ")
        .filter(Boolean)
        .map((w) => w[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "FD";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#211C18]/90 p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-md">
      {/* Subtle Background Glow Elements */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D4A863]/12 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-[#D4A863]/8 blur-3xl" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full">
          {/* Avatar Container */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#302820] border-2 border-[#D4A863]/40 p-1.5 shrink-0 shadow-[0_0_20px_rgba(212,168,99,0.2)] group">
            <div className="w-full h-full rounded-xl overflow-hidden bg-[#14110F] flex items-center justify-center">
              {isImage ? (
                <img
                  src={logo}
                  alt={name}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <span className="font-heading font-black text-white text-3xl sm:text-4xl tracking-wider">
                  {initials}
                </span>
              )}
            </div>
            {isVerified && (
              <div
                className="absolute -bottom-2 -right-2 bg-[#94632F] text-white p-1 rounded-full shadow-[0_0_10px_rgba(212,168,99,0.6)] border border-[#14110F]"
                title="Verified Host"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Host Info */}
          <div className="flex flex-col gap-2 flex-grow">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight">
                {name}
              </h1>
              {isVerified && (
                <span className="inline-flex items-center gap-1.5 bg-[#D4A863]/10 border border-[#D4A863]/30 text-[#D4A863] px-3 py-1 rounded-full text-xs font-heading font-black uppercase tracking-wider shadow-[0_0_10px_rgba(212,168,99,0.2)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#94632F] animate-pulse" />
                  Verified Host
                </span>
              )}
            </div>

            <p className="font-sans text-sm sm:text-base text-[#B6AA9C] max-w-2xl leading-relaxed">
              {bio}
            </p>

            {/* Stat Pills */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 mt-3">
              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-xl shadow-sm">
                <span className="text-base">🏎️</span>
                <span className="font-heading text-xs sm:text-sm font-bold text-white uppercase">
                  {drawsHosted} {drawsHosted === 1 ? "Draw" : "Draws"} Hosted
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-xl shadow-sm">
                <span className="text-[#D4A863] text-base">★</span>
                <span className="font-heading text-xs sm:text-sm font-bold text-white uppercase">
                  {rating !== null && rating !== undefined && totalReviews !== undefined && totalReviews > 0 ? (
                    <span>
                      {Number(rating).toFixed(1)} Host Rating{" "}
                      <span className="text-[#B6AA9C] font-sans lowercase font-normal">
                        ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
                      </span>
                    </span>
                  ) : (
                    <span>No reviews yet</span>
                  )}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-xl shadow-sm">
                <span className="text-base">🏁</span>
                <span className="font-heading text-xs sm:text-sm font-bold text-white uppercase">
                  Member since {memberSince}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
