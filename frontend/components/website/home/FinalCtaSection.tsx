"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "../../../lib/utils";
import { raffleService, PublicHostPreviewStats } from "../../../services/raffle.service";

const BULLETS = [
  "Set your own ticket pricing & allocation volume",
  "Escrow-protected next-day host payouts",
  "Direct exposure to our active automotive community",
  "Fair and transparent 10% platform commission",
];

/**
 * Host CTA section — split layout with host benefits + live dashboard preview card.
 */
export default function FinalCtaSection() {
  const [stats, setStats] = useState<PublicHostPreviewStats>({
    activeDraws: 0,
    ticketsSold: 0,
    totalEarned: 0,
    targetPercent: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    raffleService.getPublicHostPreviewStats()
      .then((data) => {
        if (data) setStats(data);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section id="host-info" className="py-20 bg-[#0B0C0E] border-t border-white/10 relative">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* LEFT — Host Info */}
          <div className="flex flex-col items-start">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#12141C] border border-[#FF1E27]/30 text-[#FF1E27] text-[10px] font-heading font-black uppercase tracking-widest mb-7 shadow-[0_0_15px_rgba(255,30,39,0.2)]">
              🏎️ For Tuners, Workshops &amp; Hosts
            </span>

            <h2 className="font-heading text-[38px] sm:text-[46px] font-black leading-[0.92] text-white uppercase mb-5">
              RUN YOUR OWN<br />
              <span className="text-[#FF1E27] drop-shadow-[0_0_15px_rgba(255,30,39,0.5)]">AUTOMOTIVE DRAW</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#8A92A0] leading-relaxed mb-8 max-w-md">
              Monetize project cars, crate motors, or aftermarket parts as an established workshop, builder, or brand. We handle payments, compliance, and winner verification.
            </p>

            {/* Bullets */}
            <ul className="flex flex-col gap-3.5 mb-10 w-full">
              {BULLETS.map((b, i) => (
                <li key={i} className="flex items-start gap-3 font-sans text-xs sm:text-sm text-[#D1D5DB]">
                  <div className="w-5 h-5 rounded-full bg-[#12141C] border border-[#FF1E27]/40 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_8px_rgba(255,30,39,0.3)]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 text-[#FF1E27]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  {b}
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/host/register"
                className="btn-racing-red px-8 py-3.5 text-white font-heading text-xs font-black tracking-widest uppercase rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(255,30,39,0.35)] hover:shadow-[0_0_30px_rgba(255,30,39,0.6)] cursor-pointer"
              >
                ⚡ Start Hosting
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-3.5 bg-[#12141C] hover:bg-[#1A1D27] text-[#D1D5DB] hover:text-white font-heading text-xs font-bold tracking-wider uppercase rounded-xl border border-white/10 hover:border-[#FF1E27]/40 transition-all duration-200 shadow-sm cursor-pointer"
              >
                View Pricing
              </Link>
            </div>
          </div>

          {/* RIGHT — Dashboard Preview */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[480px] bg-[#12141C] border border-white/10 rounded-2xl p-7 shadow-2xl hover:border-[#FF1E27]/40 hover:shadow-[0_0_30px_rgba(255,30,39,0.2)] transition-all duration-300">

              {/* Card Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                <div>
                  <h3 className="font-heading font-black text-sm text-white uppercase tracking-wide">Host Dashboard</h3>
                  <p className="font-sans text-[11px] text-[#8A92A0] mt-0.5">Live platform telemetry</p>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-white bg-[#1A1D27] px-2.5 py-1.5 rounded-full border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse shadow-[0_0_6px_rgba(22,163,74,0.8)]" />
                  Live Platform
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { value: isLoading ? "..." : stats.activeDraws, label: "Active Draws" },
                  { value: isLoading ? "..." : stats.ticketsSold.toLocaleString('en-GB'), label: "Tickets Sold" },
                  { value: isLoading ? "..." : formatCurrency(stats.totalEarned, 0), label: "Total Earned" },
                ].map((s) => (
                  <div key={s.label} className="bg-[#1A1D27] border border-white/5 rounded-xl p-3.5 text-center">
                    <span className="font-heading text-lg font-black text-white block">{s.value}</span>
                    <span className="font-heading text-[9px] text-[#8A92A0] font-bold uppercase tracking-wider mt-0.5 block">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div className="pt-5 border-t border-white/10">
                <div className="flex justify-between items-center text-xs text-[#8A92A0] mb-3 font-semibold">
                  <span>Draw Capacity Progress</span>
                  <span className="text-[#FF1E27] font-black">{isLoading ? "..." : `${stats.targetPercent}%`}</span>
                </div>
                <div className="w-full h-2.5 bg-[#1A1D27] rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-[#FF1E27] to-[#B3000C] rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(255,30,39,0.5)]"
                    style={{ width: `${isLoading ? 0 : stats.targetPercent}%` }}
                  />
                </div>
                <p className="font-sans text-[11px] text-[#8A92A0] mt-2.5">
                  {isLoading ? "Loading sales telemetry..." : `${stats.targetPercent}% average draw sell-out rate across verified automotive hosts.`}
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
