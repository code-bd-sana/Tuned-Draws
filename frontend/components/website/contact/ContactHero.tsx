import React from "react";
import Image from "next/image";

/**
 * Contact Page Hero component matching the Tuned Draws dark automotive aesthetic.
 */
export default function ContactHero() {
  return (
    <section className="relative isolate w-full overflow-hidden border-b border-white/10 bg-[#14110F] pt-28 pb-14 sm:pt-36 md:pb-16 text-white">
      {/* Background tuned performance vehicle image with dark cinematic gradient overlays */}
      <Image
        src="/images/wedding-hero.png"
        alt="A couple celebrating their wedding"
        fill
        priority
        className="-z-20 object-cover object-[75%_center] lg:object-center opacity-85 contrast-110 brightness-105"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#14110F] via-[#14110F]/75 to-[#14110F]/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#14110F] via-transparent to-[#14110F]/60" />
      <div className="absolute -top-32 left-1/3 w-[650px] h-[450px] bg-[#D4A863]/12 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="container-custom relative flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#D4A863]/30 bg-[#211C18]/90 px-4 py-2 font-heading text-[10px] font-black tracking-[.18em] text-[#E5DCCD] uppercase shadow-[0_0_15px_rgba(212,168,99,0.2)] backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-[#94632F] animate-pulse shadow-[0_0_8px_rgba(212,168,99,0.8)]" />
          Paddock Support · 24/7 Response
        </span>
        
        {/* Title */}
        <h1 className="mb-3 mt-5 font-heading text-4xl font-black leading-[.92] tracking-tight text-white uppercase sm:text-5xl md:text-6xl">
          GET IN <span className="text-[#D4A863] drop-shadow-[0_0_25px_rgba(212,168,99,0.55)]">TOUCH</span>
        </h1>
        
        {/* Subtitle */}
        <p className="max-w-2xl rounded-2xl border border-white/10 bg-[#211C18]/80 p-4 font-sans text-sm leading-relaxed text-[#B6AA9C] shadow-2xl backdrop-blur-md sm:text-base">
          Questions about active ticket allocations, instant key payouts, or host verifications? Our pit crew is ready to assist.
        </p>

      </div>
    </section>
  );
}
