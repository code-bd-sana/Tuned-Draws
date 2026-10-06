"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Trophy, Users, ShieldCheck } from "lucide-react";
import { raffleService } from "../../../services/raffle.service";

/** Renders live winner statistics in the Tuned Draws automotive visual system. */
export default function WinnersHero() {
  const [stats, setStats] = useState({ prizesAwarded: "£0", totalWinners: 0, verifiedDraws: "0" });

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await raffleService.getPublicWinnerStats();
        if (data) setStats(data);
      } catch (error) {
        console.error("Failed to load winner stats", error);
      }
    }
    loadStats();
  }, []);

  const metrics = [
    { icon: <Trophy className="w-5 h-5 text-[#FF1E27]" />, value: stats.prizesAwarded, label: "Prizes Awarded" },
    { icon: <Users className="w-5 h-5 text-[#FF1E27]" />, value: `${stats.totalWinners.toLocaleString()}`, label: "Verified Winners" },
    { icon: <ShieldCheck className="w-5 h-5 text-[#FF1E27]" />, value: stats.verifiedDraws, label: "Audited Draws" },
  ];

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
          Hall of Fame · Verified Winners
        </span>
        <h1 className="mt-5 font-heading text-4xl font-black leading-[.92] tracking-tight text-white uppercase sm:text-5xl md:text-6xl">
          CELEBRATING EVERY<br />
          <span className="text-[#FF1E27] drop-shadow-[0_0_25px_rgba(255,30,39,0.55)]">
            WINNING MOMENT
          </span>
        </h1>
        <p className="mt-5 max-w-2xl rounded-2xl border border-white/10 bg-[#12141C]/80 p-4 font-sans text-sm font-medium leading-relaxed text-[#8A92A0] shadow-2xl backdrop-blur-md sm:text-base">
          Real enthusiasts, high-horsepower machines, and independently verifiable UK sweepstakes. Meet the Tuned Draws winners&apos; circle.
        </p>
        <div className="mt-8 grid w-full max-w-3xl grid-cols-3 divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-[#12141C]/85 shadow-[0_12px_36px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          {metrics.map((m) => (
            <div key={m.label} className="px-3 py-4 text-center sm:px-6">
              <div className="mb-1.5 flex justify-center">{m.icon}</div>
              <div className="font-heading text-lg font-black tracking-tight text-white sm:text-2xl">{m.value}</div>
              <div className="mt-0.5 font-sans text-[9px] font-bold tracking-wider text-[#8A92A0] uppercase sm:text-[10px]">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
