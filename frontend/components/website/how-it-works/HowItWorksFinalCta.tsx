import React from "react";
import Link from "next/link";

/**
 * Renders the bottom CTA block encouraging users to participate or host drawings.
 */
export default function HowItWorksFinalCta() {
  return (
    <section className="relative isolate overflow-hidden border-t border-white/10 bg-[#14110F] py-20 md:py-28 select-none">
      {/* Background ambient red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4A863]/12 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="container-custom relative flex flex-col items-center gap-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#D4A863]/30 bg-[#211C18]/90 px-4 py-1.5 font-heading text-[10px] font-black tracking-[.2em] text-[#D4A863] uppercase shadow-[0_0_15px_rgba(212,168,99,0.2)] backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#94632F] animate-pulse shadow-[0_0_8px_rgba(212,168,99,0.8)]" />
          START YOUR JOURNEY
        </span>

        <h2 className="max-w-2xl font-heading text-3xl font-black text-white uppercase sm:text-4xl md:text-5xl leading-tight">
          READY FOR YOUR <br />
          <span className="text-[#D4A863] drop-shadow-[0_0_25px_rgba(212,168,99,0.5)]">
            DREAM WEDDING?
          </span>
        </h2>

        <p className="max-w-xl font-sans text-sm md:text-base text-[#B6AA9C] leading-relaxed">
          Explore competitions, choose your tickets and look forward to the draw.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
          <Link
            href="/live-raffles"
            className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#94632F] to-[#70471F] px-8 py-3.5 font-heading text-sm font-black tracking-wider text-white uppercase shadow-[0_0_25px_rgba(212,168,99,0.4)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(212,168,99,0.7)] hover:scale-105 active:scale-95 text-center"
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
