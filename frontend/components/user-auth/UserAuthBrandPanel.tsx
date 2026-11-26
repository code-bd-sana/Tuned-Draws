"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Sparkles, Heart } from "lucide-react";
import TunedDrawsBrandLogo from "../shared/TunedDrawsBrandLogo";

interface UserAuthBrandPanelProps {
  mode: "login" | "register" | "forgot" | "reset" | "verify";
}

export default function UserAuthBrandPanel({ mode }: UserAuthBrandPanelProps) {
  const trustStats = [
    {
      label: "100% Secure & Verified Live Draws",
      description: "UK-regulated competitions with provably fair winner selection",
      icon: <ShieldCheck className="w-5 h-5 text-[#D4A863]" />,
    },
    {
      label: "Wonderful Wedding Prizes",
      description: "Discover special prizes and experiences for your celebration",
      icon: <Sparkles className="w-5 h-5 text-[#D4A863]" />,
    },
    {
      label: "Made for Special Moments",
      description: "Explore ideas and opportunities for your wedding day",
      icon: <Heart className="w-5 h-5 text-[#D4A863]" />,
    },
  ];

  return (
    <div className="relative isolate flex h-full flex-col justify-between overflow-hidden border-b border-white/10 bg-[#14110F] bg-tachometer-grid px-6 py-8 md:px-[60px] lg:px-[70px] md:py-[50px] lg:py-[64px] lg:min-h-screen lg:border-r lg:border-b-0 text-white">
      {/* Ambient Crimson Red Lighting */}
      <div className="pointer-events-none absolute top-0 left-0 w-80 h-80 bg-[#94632F] opacity-[0.09] blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 right-0 w-64 h-64 bg-[#9B6A2F] opacity-[0.06] blur-[110px] rounded-full" />

      {/* Top Branding Logo */}
      <div className="relative z-10">
        <TunedDrawsBrandLogo />
      </div>

      {/* Center Body Panel */}
      <div className="relative z-10 my-10 lg:my-auto flex flex-col gap-7 w-full max-w-lg">
        {/* Community Pill Badge */}
        <div className="self-start bg-[#211C18] border border-[#D4A863]/30 px-3.5 py-1.5 rounded-full shadow-[0_0_12px_rgba(212,168,99,0.15)] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#94632F] animate-pulse" />
          <p className="font-sans font-bold text-[10px] md:text-xs text-[#D4A863] tracking-widest uppercase">
            WEDDING COMPETITIONS
          </p>
        </div>

        {/* Hero Headlines */}
        <div className="flex flex-col gap-3">
          <h1 className="font-heading font-black text-3xl md:text-[44px] text-white leading-[1.1] tracking-tight select-none">
            {mode === "login" ? (
              <>
                <span className="metallic-text block">WELCOME BACK.</span>
                <span className="text-[#D4A863] drop-shadow-[0_0_20px_rgba(212,168,99,0.5)]">
                  YOUR NEXT CHANCE AWAITS.
                </span>
              </>
            ) : (
              <>
                  <span className="metallic-text block">DREAM A LITTLE BIGGER.</span>
                <span className="text-[#D4A863] drop-shadow-[0_0_20px_rgba(212,168,99,0.5)]">
                  DISCOVER WEDDING PRIZES.
                </span>
              </>
            )}
          </h1>
          <p className="font-sans font-normal text-sm md:text-base text-[#9CA3AF] leading-relaxed">
            {mode === "login"
              ? "Access your dashboard, manage active ticket entries, and monitor upcoming live draws in real time."
              : "Create your official account to enter draws, track ticket purchases, and view live verifiable winners."}
          </p>
        </div>

        {/* Feature Details / Trust Highlights */}
        <div className="flex flex-col gap-3">
          {trustStats.map((stat, i) => (
            <div
              key={i}
              className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#211C18]/80 border border-white/5 hover:border-[#D4A863]/30 transition-all duration-200 group"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#302820] border border-[#D4A863]/25 shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_10px_rgba(212,168,99,0.15)]">
                {stat.icon}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-sans font-bold text-xs md:text-sm text-white group-hover:text-[#D4A863] transition-colors">
                  {stat.label}
                </span>
                <span className="font-sans text-[11px] text-[#B6AA9C] leading-snug">
                  {stat.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer Copy */}
      <div className="relative z-10 mt-8 lg:mt-0 pt-6 border-t border-white/10 lg:border-t-0 flex flex-wrap items-center gap-3 text-[11px] text-[#B6AA9C]">
        <span>© {new Date().getFullYear()} Wedding Draws Ltd</span>
        <span>•</span>
        <Link href="/privacy-policy" className="hover:text-white transition-colors">
          Privacy Policy
        </Link>
        <span>•</span>
        <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
          Terms & Conditions
        </Link>
        <span>•</span>
        <Link href="/host/register" className="text-[#D4A863] hover:underline font-semibold ml-auto">
          Host Portal →
        </Link>
      </div>
    </div>
  );
}
