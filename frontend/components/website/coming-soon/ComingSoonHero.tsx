"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import TunedDrawsBrandLogo from "../../shared/TunedDrawsBrandLogo";
import { ShieldCheck } from "lucide-react";

const TARGET_LAUNCH_TIMESTAMP = new Date("2026-11-01T12:00:00Z").getTime();

/**
 * High-performance Tuned Draws Early Access Hero.
 * Two-column split: left = brand story, right = vehicle showcase.
 * Countdown timer below.
 */
export default function ComingSoonHero() {
  const [timeLeft, setTimeLeft] = useState({ days: 30, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    let target = TARGET_LAUNCH_TIMESTAMP;
    const stored = localStorage.getItem("tuned_launch_ts");
    if (stored) {
      target = parseInt(stored, 10);
    } else {
      localStorage.setItem("tuned_launch_ts", String(TARGET_LAUNCH_TIMESTAMP));
    }

    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="w-full max-w-6xl mx-auto text-white">

      {/* TOP BADGE */}
      <div className="flex justify-center mb-10">
        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4A863]/30 bg-[#211C18] text-[#E5DCCD] text-[11px] font-heading font-black uppercase tracking-[0.18em] shadow-[0_0_15px_rgba(212,168,99,0.2)]">
          <span className="w-2 h-2 rounded-full bg-[#94632F] animate-pulse shadow-[0_0_8px_rgba(212,168,99,0.8)]" />
          VIP Early Access — Founding Members Only
        </span>
      </div>

      {/* SPLIT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* LEFT — Brand Story */}
        <div className="flex flex-col items-start text-left order-2 lg:order-1">
          {/* Official Brand Logo */}
          <div className="mb-6">
            <TunedDrawsBrandLogo subtitle="WEDDING & HONEYMOON COMPETITIONS" />
          </div>

          {/* Tagline */}
          <p className="text-[#B6AA9C] text-base sm:text-lg leading-relaxed mb-8 max-w-md font-sans">
            Win <strong className="text-white font-semibold">luxury honeymoon packages</strong>, designer bridal gowns, venue hire &amp; exclusive{" "}
            <strong className="text-[#D4A863] font-semibold">wedding supplier experiences</strong> — for couples across the UK.
          </p>

          {/* Stat Pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            {[
              { value: "1,200+", label: "Couples Registered" },
              { value: "£0", label: "Entry Min. Price" },
              { value: "100%", label: "Verified Services" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center px-5 py-3 bg-[#211C18] border border-white/10 rounded-2xl shadow-xl min-w-[100px]"
              >
                <span className="font-heading text-2xl font-black text-white">{stat.value}</span>
                <span className="font-sans text-[10px] font-bold text-[#B6AA9C] uppercase tracking-wider mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Trust strip */}
          <div className="flex items-center gap-2 text-xs text-[#B6AA9C] font-medium">
            <ShieldCheck className="w-4 h-4 text-[#D4A863]" />
            UK Competition Compliant · Provably Fair RNG · Zero Spam
          </div>
        </div>

        {/* RIGHT — Vehicle Image Showcase */}
        <div className="relative order-1 lg:order-2 flex justify-center">
          {/* Decorative ring */}
          <div className="absolute inset-[-16px] rounded-[36px] border border-white/10 pointer-events-none" />

          {/* Outer glow */}
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[#D4A863]/15 via-transparent to-transparent blur-2xl pointer-events-none" />

          {/* Card */}
          <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/15 shadow-2xl group bg-[#211C18]">
            <Image
              src="/images/wedding-hero.png"
              alt="Wedding Draws Competitions"
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90"
              priority
            />
            {/* Bottom gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#14110F] via-transparent to-transparent" />

            {/* Floating bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
              <div>
                <p className="text-[#D4A863] text-[10px] font-heading font-black uppercase tracking-widest mb-1">Inaugural Launch Edition</p>
                <p className="font-heading text-white text-lg font-black leading-tight uppercase">Custom 700HP Build</p>
              </div>
              <span className="px-3 py-1.5 bg-[#211C18]/80 backdrop-blur-md border border-white/15 rounded-full text-white text-[10px] font-heading font-bold uppercase tracking-wide">
                Season 1
              </span>
            </div>

            {/* Top-right badge */}
            <div className="absolute top-4 right-4 px-3 py-1 bg-[#94632F] rounded-full text-white text-[10px] font-heading font-black uppercase tracking-wide shadow-lg">
              Featured
            </div>
          </div>
        </div>
      </div>

      {/* COUNTDOWN TIMER */}
      <div className="mt-14 flex flex-col items-center">
        <p className="text-[11px] font-heading font-bold text-[#B6AA9C] uppercase tracking-[0.2em] mb-5">
          Official Launch Countdown
        </p>
        <div className="flex items-stretch gap-3 sm:gap-5">
          {[
            { value: pad(timeLeft.days), label: "Days" },
            { value: pad(timeLeft.hours), label: "Hours" },
            { value: pad(timeLeft.minutes), label: "Mins" },
            { value: pad(timeLeft.seconds), label: "Secs", accent: true },
          ].map((unit, i) => (
            <React.Fragment key={unit.label}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-[68px] sm:w-[84px] h-[72px] sm:h-[88px] flex items-center justify-center rounded-2xl border shadow-xl ${
                    unit.accent
                      ? "bg-[#94632F] border-[#D4A863] shadow-[0_0_20px_rgba(212,168,99,0.5)]"
                      : "bg-[#211C18] border-white/10"
                  }`}
                >
                  <span
                    className={`font-heading text-3xl sm:text-4xl font-black tabular-nums ${
                      unit.accent ? "text-white" : "text-white"
                    }`}
                  >
                    {unit.value}
                  </span>
                </div>
                <span className="mt-2 text-[10px] sm:text-[11px] font-heading font-bold text-[#B6AA9C] uppercase tracking-widest">
                  {unit.label}
                </span>
              </div>
              {i < 3 && (
                <div className="flex items-center pb-7">
                  <span className="text-2xl font-black text-white/20">:</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

    </section>
  );
}
