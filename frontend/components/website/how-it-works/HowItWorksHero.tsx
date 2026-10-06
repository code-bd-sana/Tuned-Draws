import React from "react";
import Image from "next/image";

/** Campaign header for the Tuned Draws automotive sweepstakes guide. */
export default function HowItWorksHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#0B0C0E] pt-28 pb-14 sm:pt-36 md:pb-16 text-white">
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

      <div className="container-custom relative flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#FF1E27]/30 bg-[#12141C]/90 px-4 py-2 font-heading text-[10px] font-black tracking-[.18em] text-[#D1D5DB] uppercase shadow-[0_0_15px_rgba(255,30,39,0.2)] backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-[#FF1E27] animate-pulse shadow-[0_0_8px_rgba(255,30,39,0.8)]" />
          Simple · Transparent · Regulated
        </span>
        <h1 className="mt-5 max-w-4xl font-heading text-4xl font-black leading-[.92] tracking-tight text-white uppercase sm:text-5xl md:text-6xl">
          YOUR ROUTE TO THE<br />
          <span className="text-[#FF1E27] drop-shadow-[0_0_25px_rgba(255,30,39,0.55)]">
            DRIVER&apos;S SEAT
          </span>
        </h1>
        <p className="mt-5 max-w-2xl rounded-2xl border border-white/10 bg-[#12141C]/80 p-4 font-sans text-sm font-medium leading-relaxed text-[#8A92A0] shadow-2xl backdrop-blur-md sm:text-base">
          Whether you&apos;re entering for a high-boost track build or hosting a verified draw, every stage is automated, fair, and certifiably audited.
        </p>
      </div>
    </section>
  );
}
