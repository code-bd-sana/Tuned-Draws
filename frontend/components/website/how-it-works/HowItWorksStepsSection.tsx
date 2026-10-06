"use client";

import React, { useState } from "react";
import { entrantSteps, hostSteps } from "../../../data/how-it-works/how-it-works-steps.data";
import { cn } from "../../../lib/utils";

/**
 * Interactive steps section allowing toggling between Entrant and Host guides.
 * Renders a responsive vertical timeline with circles and connecting vertical lines.
 */
export default function HowItWorksStepsSection() {
  const [activeTab, setActiveTab] = useState<"entrants" | "hosts">("entrants");

  const steps = activeTab === "entrants" ? entrantSteps : hostSteps;

  return (
    <section className="relative py-16 md:py-24 bg-[#0B0C0E] bg-tachometer-grid overflow-hidden border-b border-white/5">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#FF1E27]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#FF1E27]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-custom relative">
        {/* Tab Swapper Segment Capsule */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#12141C]/90 p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-md select-none">
            <button
              onClick={() => setActiveTab("entrants")}
              className={cn(
                "px-6 py-2.5 rounded-full font-heading text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer",
                activeTab === "entrants"
                  ? "bg-[#FF1E27] text-white shadow-[0_0_20px_rgba(255,30,39,0.5)] border border-[#FF1E27]"
                  : "text-[#8A92A0] hover:text-white"
              )}
            >
              I Want to Enter Draws
            </button>
            <button
              onClick={() => setActiveTab("hosts")}
              className={cn(
                "px-6 py-2.5 rounded-full font-heading text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer",
                activeTab === "hosts"
                  ? "bg-[#FF1E27] text-white shadow-[0_0_20px_rgba(255,30,39,0.5)] border border-[#FF1E27]"
                  : "text-[#8A92A0] hover:text-white"
              )}
            >
              I Want to Host Draws
            </button>
          </div>
        </div>

        {/* Timeline Layout */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="relative pl-14 sm:pl-20">
            {/* Connecting Vertical Red/White Gradient Line */}
            <div className="absolute bottom-[28px] left-[27px] top-[28px] w-[2px] bg-gradient-to-b from-[#FF1E27]/80 via-white/15 to-[#FF1E27]/80 sm:left-[27px]" />

            {/* List of Timeline Steps */}
            <div className="flex flex-col gap-8 sm:gap-10">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="relative flex flex-col sm:flex-row gap-4 sm:gap-6 items-start group"
                >
                  {/* Circular Number Indicator with Red Glow */}
                  <div className="absolute left-[-56px] z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#12141C] font-heading text-base font-black text-white shadow-[0_0_15px_rgba(0,0,0,0.8)] select-none transition-all duration-300 group-hover:border-[#FF1E27] group-hover:text-[#FF1E27] group-hover:shadow-[0_0_20px_rgba(255,30,39,0.4)] group-hover:scale-105 sm:left-[-80px]">
                    {String(step.stepNumber).padStart(2, "0")}
                  </div>

                  {/* Step Description Card */}
                  <div className="w-full rounded-2xl border border-white/10 bg-[#12141C]/80 p-6 shadow-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#FF1E27]/40 hover:shadow-[0_10px_30px_rgba(255,30,39,0.15)] sm:p-8">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-heading text-[10px] font-black uppercase tracking-[0.2em] text-[#FF1E27]">
                        Stage {String(step.stepNumber).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-heading font-black text-lg md:text-xl text-white tracking-wide mb-2 uppercase">
                      {step.title}
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-[#8A92A0] leading-relaxed max-w-[933px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
