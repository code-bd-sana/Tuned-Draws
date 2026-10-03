"use client";

import React, { useEffect, useState } from "react";
import { trustBenefitsData } from "../../../data/homepage/trust-benefits.data";
import { raffleService } from "../../../services/raffle.service";

const ICONS: Record<string, React.ReactNode> = {
  ShieldCheckIcon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.75 3.75 0 0 1 21 12Z" />
    </svg>
  ),
  LockClosedIcon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  ),
  SparklesIcon: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 21l-.813-5.096L3 15l5.096-.813L9 9l.813 5.096L15 15l-5.096.813ZM19.071 5.929 18.5 9l-.571-3.071L15 5.5l3.071-.571L18.5 2l.571 3.071L22 5.5l-2.929.571Z" />
    </svg>
  ),
};

/**
 * Trust & Statistics section — dark automotive marquee + benefits grid.
 */
export default function TrustBenefitsSection() {
  const [stats, setStats] = useState<{ id: number; value: string; label: string }[]>([]);

  useEffect(() => {
    raffleService.getPublicStats()
      .then(data => { if (data?.length) setStats(data); })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 bg-[#0B0C0E] border-t border-white/10 relative">
      <div className="container-custom">

        {/* Marquee strip */}
        {stats.length > 0 && (
          <div className="relative w-full overflow-hidden bg-[#12141C] border border-white/10 rounded-2xl shadow-xl mb-16 py-5">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#12141C] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#12141C] to-transparent z-10 pointer-events-none" />
            <div className="flex w-max animate-marquee gap-20">
              {[...stats, ...stats, ...stats, ...stats].map((stat, i) => (
                <div key={`${stat.id}-${i}`} className="shrink-0 min-w-[200px] flex flex-col items-center">
                  <span className="font-heading text-2xl font-black text-white">{stat.value}</span>
                  <span className="font-heading text-[10px] font-bold text-[#FF1E27] uppercase tracking-wider mt-0.5">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12141C] border border-[#FF1E27]/30 text-[10px] font-heading font-black uppercase tracking-widest text-[#FF1E27] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
            VERIFIED INTEGRITY
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Engineered for Enthusiasts, By Enthusiasts
          </h2>
          <p className="font-sans text-sm text-[#8A92A0] mt-3 max-w-md mx-auto leading-relaxed">
            Every detail of Tuned Draws is designed to give you a secure, transparent, and adrenaline-fueled experience.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {trustBenefitsData.map((benefit) => (
            <div
              key={benefit.id}
              className="group relative bg-[#12141C] border border-white/10 rounded-2xl p-7 flex flex-col gap-4 hover:border-[#FF1E27]/40 hover:shadow-[0_0_30px_rgba(255,30,39,0.2)] transition-all duration-300 overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#FF1E27]/5 via-transparent to-transparent pointer-events-none rounded-2xl" />

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-[#1A1D27] border border-white/10 flex items-center justify-center text-[#FF1E27] group-hover:bg-[#FF1E27] group-hover:text-white group-hover:border-[#FF1E27] group-hover:shadow-[0_0_20px_rgba(255,30,39,0.6)] transition-all duration-300 shrink-0">
                {ICONS[benefit.iconName]}
              </div>

              <h3 className="font-heading font-black text-lg text-white uppercase tracking-wide group-hover:text-[#FF1E27] transition-colors">{benefit.title}</h3>
              <p className="font-sans text-xs text-[#8A92A0] leading-relaxed">{benefit.description}</p>

              {/* Animated bottom line */}
              <div className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#FF1E27] to-[#B3000C] rounded-full transition-all duration-500 ease-out mt-auto" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
