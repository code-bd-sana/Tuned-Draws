import React from "react";
import Link from "next/link";

/**
 * Renders the bottom CTA block encouraging users to participate or host drawings.
 */
export default function HowItWorksFinalCta() {
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-[#0B0C0E] py-20 md:py-28 select-none">
      {/* Background ambient red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FF1E27]/12 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="container-custom relative flex flex-col items-center gap-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#FF1E27]/30 bg-[#12141C]/90 px-4 py-1.5 font-heading text-[10px] font-black tracking-[.2em] text-[#FF1E27] uppercase shadow-[0_0_15px_rgba(255,30,39,0.2)] backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF1E27] animate-pulse shadow-[0_0_8px_rgba(255,30,39,0.8)]" />
          START YOUR ENGINES
        </span>

        <h2 className="max-w-2xl font-heading text-3xl font-black text-white uppercase sm:text-4xl md:text-5xl leading-tight">
          READY TO UPGRADE YOUR <br />
          <span className="text-[#FF1E27] drop-shadow-[0_0_25px_rgba(255,30,39,0.5)]">
            MODIFIED CAR?
          </span>
        </h2>

        <p className="max-w-xl font-sans text-sm md:text-base text-[#8A92A0] leading-relaxed">
          Join thousands of petrolheads entering transparent, regulated automotive competitions. Guaranteed draws, verified winners, direct UK delivery &amp; workshop bookings.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
          <Link
            href="/live-raffles"
            className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#FF1E27] to-[#B3000C] px-8 py-3.5 font-heading text-sm font-black tracking-wider text-white uppercase shadow-[0_0_25px_rgba(255,30,39,0.4)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(255,30,39,0.7)] hover:scale-105 active:scale-95 text-center"
          >
            Browse Live Draws
          </Link>
          <Link
            href="/#host-info"
            className="w-full sm:w-auto rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 font-heading text-sm font-black tracking-wider text-white uppercase backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:scale-105 active:scale-95 text-center"
          >
            Host a Competition
          </Link>
        </div>
      </div>
    </section>
  );
}
