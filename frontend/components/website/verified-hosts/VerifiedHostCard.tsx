import React from "react";
import Link from "next/link";
import { VerifiedHost } from "../../../types/host.types";

interface VerifiedHostCardProps {
  host: VerifiedHost;
}

export default function VerifiedHostCard({ host }: VerifiedHostCardProps) {
  const [imgError, setImgError] = React.useState(false);

  const isImage = Boolean(
    host.logo &&
    !imgError &&
    (host.logo.startsWith('http://') ||
     host.logo.startsWith('https://') ||
     host.logo.startsWith('/') ||
     host.logo.startsWith('data:image/'))
  );

  const initials = host.name
    ? host.name
        .split(' ')
        .filter(Boolean)
        .map((w) => w[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'FD';

  return (
    <Link href={`/hosts/${host.slug}`} className="block h-full">
      <div className="group relative flex min-h-[220px] w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#12141C]/80 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF1E27]/40 hover:shadow-[0_10px_30px_rgba(255,30,39,0.2)]">
        
        {/* Subtle hover gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FF1E27]/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="flex flex-col gap-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-[#181B26] shadow-md group-hover:border-[#FF1E27]/40 transition-colors duration-300">
              {isImage ? (
                <img
                  src={host.logo}
                  alt={host.name}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <span className="font-heading text-lg font-black text-white tracking-wider">{initials}</span>
              )}
            </div>
            {host.isVerified && (
              <span className="flex items-center gap-1.5 rounded-full border border-[#FF1E27]/30 bg-[#FF1E27]/10 px-2.5 py-1 text-[10px] font-heading font-black tracking-wide text-[#FF1E27] uppercase shadow-[0_0_10px_rgba(255,30,39,0.2)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF1E27] animate-pulse" /> Verified
              </span>
            )}
          </div>
          
          <div className="flex flex-col gap-1.5">
            <h3 className="font-heading text-lg font-black text-white uppercase tracking-wide transition-colors group-hover:text-[#FF1E27]">
              {host.name}
            </h3>
            <span className="line-clamp-2 font-sans text-xs sm:text-[13px] leading-relaxed text-[#8A92A0]">
              {host.description || "Verified Tuned Draws partner hosting auditable performance automotive competitions."}
            </span>
          </div>
        </div>
        
        <div className="relative z-10 mt-6 flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-3 font-heading text-xs font-bold text-[#8A92A0]">
            <span className="text-white">{host.competitionCount} Draws</span>
            {host.averageRating && (
              <span className="flex items-center gap-1 text-[#D1D5DB]">
                <span className="text-[#FF1E27]">★</span> {host.averageRating}
              </span>
            )}
          </div>
          <span className="flex -translate-x-2 items-center gap-1 font-heading text-xs font-black uppercase text-[#FF1E27] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            View Garage 
            <svg className="w-3 h-3 translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
