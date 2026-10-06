"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BillingCycle } from "../../../types/pricing.types";
import PricingPlanGrid from "./PricingPlanGrid";
import { cn } from "../../../lib/utils";

/**
 * Pricing hero section with billing toggle (monthly/yearly) and pricing plan cards.
 * Styled in Tuned Draws dark automotive carbon and Electric Racing Red aesthetic.
 */
export default function PricingHero() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  return (
    <section className="relative isolate w-full overflow-hidden border-b border-white/10 bg-[#0B0C0E] pt-28 pb-16 md:pt-36 md:pb-20 text-white">
      {/* Background tuned supercar image with dark cinematic gradient overlays */}
      <Image
        src="/images/tuned-hero-bg.jpg"
        alt="Tuned Draws high performance custom supercar"
        fill
        priority
        className="-z-20 object-cover object-[75%_center] lg:object-center opacity-65 contrast-115"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0B0C0E] via-[#0B0C0E]/85 to-[#0B0C0E]/50" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/30 to-[#0B0C0E]/85" />
      <div className="absolute -top-32 left-1/3 w-[650px] h-[450px] bg-[#FF1E27]/12 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="container-custom relative flex flex-col items-center z-10">
        
        {/* Host Badge Label */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF1E27]/30 bg-[#12141C]/90 px-4 py-2 font-heading text-[10px] font-black tracking-[.18em] text-[#D1D5DB] uppercase shadow-[0_0_15px_rgba(255,30,39,0.2)] backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-[#FF1E27] animate-pulse shadow-[0_0_8px_rgba(255,30,39,0.8)]" />
          FOR HOSTS &amp; PERFORMANCE BUILDERS
        </div>

        {/* Hero Headers */}
        <h1 className="mb-4 max-w-3xl text-center font-heading text-4xl font-black leading-[.92] tracking-tight text-white uppercase sm:text-5xl md:text-6xl">
          CHOOSE YOUR <span className="text-[#FF1E27] drop-shadow-[0_0_25px_rgba(255,30,39,0.55)]">HOSTING PLAN</span>
        </h1>
        
        <p className="mb-8 max-w-xl rounded-2xl border border-white/10 bg-[#12141C]/80 p-4 text-center font-sans text-sm text-[#8A92A0] shadow-2xl backdrop-blur-md sm:text-base">
          Start free, upgrade as you grow. Zero hidden commission fees.
        </p>

        {/* Custom Toggle Billing Switcher */}
        <div className="mb-14 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-[#12141C]/90 p-1.5 shadow-2xl backdrop-blur-xl select-none">
          <button
            type="button"
            onClick={() => setBillingCycle("monthly")}
            className={cn(
              "rounded-full px-6 py-2.5 text-xs md:text-sm font-heading font-black uppercase tracking-wider transition-all duration-300 cursor-pointer select-none",
              billingCycle === "monthly"
                ? "bg-[#FF1E27] text-white shadow-[0_0_15px_rgba(255,30,39,0.4)]"
                : "text-[#8A92A0] hover:text-white"
            )}
          >
            Monthly
          </button>
          
          <button
            type="button"
            onClick={() => setBillingCycle("yearly")}
            className={cn(
              "rounded-full px-6 py-2.5 text-xs md:text-sm font-heading font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 select-none",
              billingCycle === "yearly"
                ? "bg-[#FF1E27] text-white shadow-[0_0_15px_rgba(255,30,39,0.4)]"
                : "text-[#8A92A0] hover:text-white"
            )}
          >
            Yearly
            <span className={cn(
              "text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider transition-all duration-300",
              billingCycle === "yearly"
                ? "bg-black/40 text-white"
                : "bg-[#FF1E27]/20 border border-[#FF1E27]/40 text-[#FF1E27]"
            )}>
              SAVE 20%
            </span>
          </button>
        </div>

        {/* Render Plans Grid */}
        <PricingPlanGrid billingCycle={billingCycle} />

      </div>
    </section>
  );
}
