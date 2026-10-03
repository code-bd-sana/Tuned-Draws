import React from "react";
import Link from "next/link";

const STEPS = [
  {
    n: 1,
    emoji: "🏎️",
    title: "Pick Your Machine",
    desc: "Browse active automotive competitions — tuned supercars, crate engines, turbo packages, performance wheel setups, or VIP track days.",
  },
  {
    n: 2,
    emoji: "🎟️",
    title: "Select Your Tickets",
    desc: "Answer the qualifying knowledge question and claim your tickets securely. Instant number allocation with free postal entry options.",
  },
  {
    n: 3,
    emoji: "🏆",
    title: "Win & Take Delivery",
    desc: "When ticket sales conclude, the winner is drawn live using a certified random draw system for a transparent, verifiable result.",
  },
];

/**
 * How It Works section — 3-step automotive workflow layout.
 */
export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-[#0B0C0E] border-t border-white/10 relative">
      <div className="container-custom">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12141C] border border-[#FF1E27]/30 text-[10px] font-heading font-black uppercase tracking-widest text-[#FF1E27] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
            SIMPLE 3-STEP PROCESS
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            How Tuned Draws Works
          </h2>
          <p className="font-sans text-sm text-[#8A92A0] mt-3 max-w-md mx-auto leading-relaxed">
            Enter automotive sweepstakes in three easy steps and win high-horsepower builds. Transparent, secure, and certified.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-[52px] left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-transparent via-[#FF1E27]/30 to-transparent z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
            {STEPS.map((step) => (
              <div key={step.n} className="flex flex-col items-center text-center group">
                {/* Circle */}
                <div className="relative mb-7">
                  <div className="w-[104px] h-[104px] rounded-2xl bg-[#12141C] border border-white/10 flex items-center justify-center text-4xl shadow-xl group-hover:border-[#FF1E27]/60 group-hover:shadow-[0_0_30px_rgba(255,30,39,0.3)] transition-all duration-300">
                    {step.emoji}
                  </div>
                  {/* Number badge */}
                  <span className="absolute -top-1 -right-1 w-7 h-7 flex items-center justify-center bg-[#FF1E27] text-white font-heading font-black text-xs rounded-full shadow-[0_0_10px_rgba(255,30,39,0.7)]">
                    {step.n}
                  </span>
                </div>

                <h3 className="font-heading font-black text-lg text-white mb-2 uppercase tracking-wide group-hover:text-[#FF1E27] transition-colors">
                  {step.title}
                </h3>
                <p className="font-sans text-xs text-[#8A92A0] leading-relaxed max-w-xs">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-14">
          <Link
            href="/host-rules"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#12141C] border border-white/10 text-[#D1D5DB] font-heading text-xs font-black tracking-wider uppercase rounded-xl hover:border-[#FF1E27]/50 hover:text-white transition-all duration-200 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-[#FF1E27]">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 1 1 1.054.955l-.448 1.002a.75.75 0 0 1-1.059.416l-.018-.01a.75.75 0 0 1-.416-1.059l.448-1.002Zm.75-3c.414 0 .75-.336.75-.75s-.336-.75-.75-.75-.75.336-.75.75.336.75.75.75Zm-.008 9a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z" />
            </svg>
            Read Full Host Rules
          </Link>
        </div>

      </div>
    </section>
  );
}
