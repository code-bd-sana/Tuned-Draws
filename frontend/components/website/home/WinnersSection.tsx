"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { raffleService, RecentWinner } from '@/services/raffle.service';

/**
 * Recent Winners section — dark automotive carbon cards.
 */
export default function WinnersSection() {
  const [winners, setWinners] = useState<RecentWinner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    raffleService.getRecentWinners()
      .then(data => setWinners(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading || winners.length === 0) return null;

  return (
    <section id="recent-winners" className="py-20 bg-[#0B0C0E] border-t border-white/10 relative">
      <div className="container-custom">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12141C] border border-[#FF1E27]/30 text-[10px] font-heading font-black uppercase tracking-widest text-[#FF1E27] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
            COMMUNITY WINS
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Recent Winners
          </h2>
          <p className="font-sans text-sm text-[#8A92A0] mt-3 max-w-md mx-auto leading-relaxed">
            Real enthusiasts, real dream builds. See our most recent lucky winners and their verified prize deliveries.
          </p>
        </div>

        {/* Winners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {winners.map((winner) => (
            <div
              key={winner.id}
              className="group bg-[#12141C] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-[#FF1E27]/40 hover:shadow-[0_0_25px_rgba(255,30,39,0.2)] transition-all duration-300"
            >
              {/* Avatar + Status */}
              <div className="flex items-center justify-between mb-5">
                {winner.avatarUrl ? (
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/15 shadow-sm">
                    <Image src={winner.avatarUrl} alt={winner.name} fill unoptimized sizes="48px" className="object-cover" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-[#1A1D27] border border-white/10 flex items-center justify-center font-heading font-black text-white text-sm shadow-sm">
                    {winner.initials}
                  </div>
                )}

                <span className="inline-flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-700/50 px-2.5 py-1 rounded-full text-[9px] font-black text-emerald-400 tracking-wide uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {winner.statusText}
                </span>
              </div>

              {/* Name + Location */}
              <h3 className="font-heading font-black text-base text-white mb-0.5 group-hover:text-[#FF1E27] transition-colors">{winner.name}</h3>
              <p className="font-sans text-[11px] text-[#8A92A0] mb-4">{winner.location}</p>

              {/* Divider */}
              <div className="h-px bg-white/10 my-3" />

              {/* Prize */}
              <div className="mb-4">
                <span className="text-[9px] text-[#8A92A0] uppercase tracking-wider font-bold block mb-1">Prize Won</span>
                <span className="font-heading font-black text-sm text-[#FF1E27] line-clamp-2">{winner.prizeWon}</span>
              </div>

              {/* Timestamp */}
              <p className="font-sans text-[10px] text-[#8A92A0] italic mt-auto">
                {formatDistanceToNow(new Date(winner.whenWon), { addSuffix: true })}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
