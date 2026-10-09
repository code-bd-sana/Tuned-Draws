"use client";

import React from "react";
import { Car, Percent, ShieldCheck, Trophy, Lock, Truck } from "lucide-react";

const BENEFITS = [
  {
    icon: <Car className="w-6 h-6 text-[#FF1E27]" />,
    title: "Launch Day Mod Packages",
    description:
      "Be first to enter inaugural competitions — stage tuning kits, custom exhaust setups, full wraps & detailing packages.",
    tag: "Enthusiasts",
  },
  {
    icon: <Percent className="w-6 h-6 text-[#FF1E27]" />,
    title: "Zero Host Platform Fees",
    description:
      "Performance garages, tuners & styling shops who register early lock in zero platform fees for their first 3 competitions.",
    tag: "Workshops & Hosts",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-[#FF1E27]" />,
    title: "100% Verified Services",
    description:
      "Every modification service and performance parts package is verified authentic, and fully compliant with UK prize competition regulations.",
    tag: "All Members",
  },
];

/**
 * Premium VIP Early Access Privileges section — Tuned Draws.
 * High-performance dark carbon cards with red accents and metallic headers.
 */
export default function InterestBenefits() {
  return (
    <section className="w-full max-w-6xl mx-auto px-2 md:px-0 pb-6 text-white">

      {/* Section header */}
      <div className="text-center mb-10">
        <span className="inline-block text-[11px] font-heading font-black uppercase tracking-[0.22em] text-[#FF1E27] mb-3">
          Why Register Early?
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          VIP Waitlist Privileges
        </h2>
        <p className="font-sans text-sm text-[#8A92A0] mt-3 max-w-lg mx-auto leading-relaxed">
          Founding members unlock exclusive ticket drops, VIP early entry, and zero host commissions.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BENEFITS.map((b) => (
          <div
            key={b.title}
            className="group relative bg-[#12141C] border border-white/10 rounded-2xl p-7 flex flex-col gap-4 hover:border-[#FF1E27]/40 hover:shadow-[0_0_30px_rgba(255,30,39,0.2)] transition-all duration-300 overflow-hidden"
          >
            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[#FF1E27]/5 via-transparent to-transparent pointer-events-none rounded-2xl" />

            {/* Top row */}
            <div className="flex items-center justify-between">
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#1A1D27] border border-[#FF1E27]/25 flex items-center justify-center text-xl group-hover:border-[#FF1E27]/50 transition-all duration-300 shrink-0 shadow-[0_0_12px_rgba(255,30,39,0.15)]">
                {b.icon}
              </div>
              {/* Tag */}
              <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#8A92A0] border border-white/10 rounded-full px-3 py-1 bg-[#1A1D27]">
                {b.tag}
              </span>
            </div>

            {/* Text */}
            <div>
              <h4 className="font-heading text-lg font-black text-white mb-2 uppercase group-hover:text-[#FF1E27] transition-colors">{b.title}</h4>
              <p className="font-sans text-sm text-[#8A92A0] leading-relaxed">{b.description}</p>
            </div>

            {/* Bottom accent line */}
            <div className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#FF1E27] to-[#B3000C] rounded-full transition-all duration-500 ease-out mt-auto" />
          </div>
        ))}
      </div>

      {/* Bottom strip */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 py-5 px-6 bg-[#12141C] border border-white/10 rounded-2xl shadow-xl">
        {[
          { icon: <Trophy className="w-4 h-4 text-[#FF1E27]" />, text: "UK Prize Competition Compliant" },
          { icon: <Lock className="w-4 h-4 text-[#16A34A]" />, text: "GDPR & Encrypted Data Protection" },
          { icon: <Truck className="w-4 h-4 text-[#FF1E27]" />, text: "Parts Delivery & Workshop Bookings Nationwide" },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2.5 text-[#D1D5DB]">
            <span>{item.icon}</span>
            <span className="font-heading font-bold text-xs uppercase tracking-wider">{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
