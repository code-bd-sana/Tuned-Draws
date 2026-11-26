"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Trophy, Users, Ticket, Zap } from "lucide-react";
import { raffleService } from "../../../services/raffle.service";

/** Renders live winner statistics in the Tuned Draws automotive visual system. */
export default function WinnersHero() {
  const [stats, setStats] = useState({
    prizesAwarded: "£0",
    totalWinners: 0,
    mainDrawWinners: 0,
    instantWinners: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await raffleService.getPublicWinnerStats();
        if (data) {
          const mainDrawWinners = Number(data.mainDrawWinners ?? 0);
          const instantWinners = Number(data.instantWinners ?? 0);
          const totalWinners = Number(
            data.totalWinners ?? mainDrawWinners + instantWinners
          );
          setStats({
            prizesAwarded: data.prizesAwarded || "£0",
            totalWinners,
            mainDrawWinners,
            instantWinners,
          });
        }
      } catch (error) {
        console.error("Failed to load winner stats", error);
      }
    }
    loadStats();
  }, []);

  const metrics = [
    {
      icon: <Trophy className="w-5 h-5 text-[#D4A863]" />,
      value: stats.prizesAwarded,
      label: "Prizes Awarded",
    },
    {
      icon: <Users className="w-5 h-5 text-[#D4A863]" />,
      value: `${stats.totalWinners.toLocaleString()}`,
      label: "Total Winners",
    },
    {
      icon: <Ticket className="w-5 h-5 text-[#D4A863]" />,
      value: `${stats.mainDrawWinners.toLocaleString()}`,
      label: "Main Draw Winners",
    },
    {
      icon: <Zap className="w-5 h-5 text-[#D4A863]" />,
      value: `${stats.instantWinners.toLocaleString()}`,
      label: "Instant Winners",
    },
  ];

  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#14110F] pt-28 pb-14 sm:pt-36 md:pb-16 text-white">
      {/* Background tuned performance vehicle image for Winners page (2nd image - Rear View) */}
      <Image
        src="/images/wedding-reception.png"
        alt="A candlelit wedding celebration"
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
          Hall of Fame · Verified Winners
        </span>
        <h1 className="mt-5 font-serif text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
          Celebrating every<br />
          <span className="text-[#D4A863] drop-shadow-[0_0_25px_rgba(212,168,99,0.55)]">
            <em className="font-normal">winning moment.</em>
          </span>
        </h1>
        <p className="mt-5 max-w-2xl rounded-2xl border border-white/10 bg-[#211C18]/80 p-4 font-sans text-sm font-medium leading-relaxed text-[#B6AA9C] shadow-2xl backdrop-blur-md sm:text-base">
          Real people and memorable prizes. Meet some of our competition winners.
        </p>
        <div className="mt-8 grid w-full max-w-4xl grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 divide-x sm:divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-[#211C18]/85 shadow-[0_12px_36px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          {metrics.map((m) => (
            <div key={m.label} className="flex flex-col items-center justify-center px-3 py-4 text-center sm:px-5 md:px-6">
              <div className="mb-1.5 flex justify-center">{m.icon}</div>
              <div className="font-heading text-lg font-black tracking-tight text-white sm:text-2xl">{m.value}</div>
              <div className="mt-0.5 font-sans text-[9px] font-bold tracking-wider text-[#B6AA9C] uppercase sm:text-[10px]">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
