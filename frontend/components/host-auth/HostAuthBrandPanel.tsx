"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Zap, BarChart3, Check } from "lucide-react";
import { cn } from "../../lib/utils";
import TunedDrawsBrandLogo from "../shared/TunedDrawsBrandLogo";

interface HostAuthBrandPanelProps {
  mode: "login" | "register";
  currentStep?: number;
}

export default function HostAuthBrandPanel({
  mode,
  currentStep = 1,
}: HostAuthBrandPanelProps) {
  // Trust stats for Login screen
  const trustStats = [
    {
      label: "2,400+ Verified Draws Completed",
      description: "Proven automotive raffle platform with full compliance",
      icon: <ShieldCheck className="w-5 h-5 text-[#FF1E27]" />,
    },
    {
      label: "£500K+ Fast Host Payouts",
      description: "Direct settlements to verified UK business bank accounts",
      icon: <Zap className="w-5 h-5 text-[#FF1E27]" />,
    },
    {
      label: "Real-Time Telemetry & Sales Analytics",
      description: "Live conversion tracking, ticket heatmaps, and entrant data",
      icon: <BarChart3 className="w-5 h-5 text-[#FF1E27]" />,
    },
  ];

  // 5 Synchronized Steps matching HostRegistrationForm 1:1
  const registrationSteps = [
    { order: 1, stepId: 1, label: "Account Credentials" },
    { order: 2, stepId: 2, label: "Host Profile" },
    { order: 3, stepId: 3, label: "Business Information" },
    { order: 4, stepId: 4, label: "Logo & Workshop Bio" },
    { order: 5, stepId: 8, label: "Review & Go Live" },
  ];

  const stepOrderMap: Record<number, number> = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    8: 5,
  };

  const currentStepOrder = stepOrderMap[currentStep] || 1;

  const getStepStatus = (order: number) => {
    if (currentStepOrder === order) return "active";
    if (currentStepOrder > order) return "completed";
    return "inactive";
  };

  return (
    <div className="relative isolate flex h-full flex-col justify-between overflow-hidden border-b border-white/10 bg-[#0B0C0E] bg-tachometer-grid px-6 py-8 md:px-[60px] lg:px-[70px] md:py-[50px] lg:py-[64px] lg:min-h-screen lg:border-r lg:border-b-0 text-white">
      {/* Ambient Crimson Glow */}
      <div className="pointer-events-none absolute top-0 left-0 w-80 h-80 bg-[#FF1E27] opacity-[0.09] blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 right-0 w-64 h-64 bg-[#B3000C] opacity-[0.06] blur-[110px] rounded-full" />

      {/* Top Branding Logo */}
      <div className="relative z-10">
        <TunedDrawsBrandLogo subtitle="HOST PARTNER NETWORK" />
      </div>

      {/* Center Body Panel */}
      <div className="relative z-10 my-10 lg:my-auto flex flex-col gap-8 w-full max-w-[560px]">
        {/* Header Text Group */}
        <div className="flex flex-col gap-4 items-start">
          {/* Badge */}
          <div className="self-start bg-[#12141C] border border-[#FF1E27]/30 px-3.5 py-1.5 rounded-full shadow-[0_0_12px_rgba(255,30,39,0.15)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF1E27] animate-pulse" />
            <p className="font-sans font-bold text-[10px] md:text-xs text-[#FF1E27] tracking-widest uppercase">
              {mode === "login" ? "HOST COMMAND CENTER" : "VERIFIED HOST NETWORK"}
            </p>
          </div>

          {/* Hero Headlines */}
          <div className="flex flex-col gap-2">
            <h1 className="font-heading font-black text-3xl md:text-[42px] text-white leading-[1.15] tracking-tight select-none">
              {mode === "login" ? (
                <>
                  <span className="metallic-text block">MANAGE YOUR DRAWS.</span>
                  <span className="text-[#FF1E27] drop-shadow-[0_0_20px_rgba(255,30,39,0.5)]">
                    HOST PORTAL LOGIN.
                  </span>
                </>
              ) : (
                <>
                  <span className="metallic-text block">RUN YOUR OWN RAFFLES.</span>
                  <span className="text-[#FF1E27] drop-shadow-[0_0_20px_rgba(255,30,39,0.5)]">
                    BECOME A VERIFIED HOST.
                  </span>
                </>
              )}
            </h1>
            <p className="font-sans font-normal text-sm md:text-base text-[#9CA3AF] leading-relaxed max-w-md">
              {mode === "login"
                ? "Log in to manage your vehicle raffles, monitor live ticket sales, and track your host earnings."
                : "Apply in minutes. Our automotive verification team reviews and approves host applications within 24 hours."}
            </p>
          </div>
        </div>

        {/* Feature Details / Tracker */}
        <div className="mt-2">
          {mode === "login" ? (
            /* Login Trust Stats list */
            <div className="flex flex-col gap-3">
              {trustStats.map((stat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#12141C]/80 border border-white/5 hover:border-[#FF1E27]/30 transition-all duration-200 group"
                >
                  <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#1A1D27] border border-[#FF1E27]/25 shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_10px_rgba(255,30,39,0.15)]">
                    {stat.icon}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-sans font-bold text-xs md:text-sm text-white group-hover:text-[#FF1E27] transition-colors">
                      {stat.label}
                    </span>
                    <span className="font-sans text-[11px] text-[#8A92A0] leading-snug">
                      {stat.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Registration stepper */
            <div className="flex flex-col gap-0 select-none">
              {registrationSteps.map((stepItem, index) => {
                const status = getStepStatus(stepItem.order);
                const isLast = index === registrationSteps.length - 1;

                return (
                  <div key={stepItem.order} className="flex gap-3.5 items-start">
                    {/* Visual Connector Column */}
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-xl border transition-all duration-300 font-heading text-xs font-bold",
                          status === "active" &&
                            "bg-gradient-to-r from-[#FF1E27] to-[#B3000C] border-[#FF1E27] text-white shadow-[0_0_15px_rgba(255,30,39,0.5)] ring-4 ring-[#FF1E27]/20",
                          status === "completed" &&
                            "bg-[#FF1E27]/20 border-[#FF1E27]/60 text-[#FF1E27]",
                          status === "inactive" &&
                            "bg-[#12141C] border-white/10 text-[#6B7280]"
                        )}
                      >
                        {status === "completed" ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : (
                          stepItem.order
                        )}
                      </div>
                      {!isLast && (
                        <div className="py-1">
                          <div
                            className={cn(
                              "w-0.5 h-7 transition-colors duration-300",
                              status === "completed" || status === "active"
                                ? "bg-[#FF1E27]/60"
                                : "bg-white/10"
                            )}
                          />
                        </div>
                      )}
                    </div>

                    {/* Step Label Column */}
                    <div className="pt-1 pb-6">
                      <p
                        className={cn(
                          "font-sans text-sm transition-colors duration-300 whitespace-nowrap",
                          status === "active" && "text-white font-bold tracking-tight",
                          status === "completed" && "text-[#D1D5DB] font-semibold",
                          status === "inactive" && "text-[#6B7280] font-medium"
                        )}
                      >
                        {stepItem.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer Copy */}
      <div className="relative z-10 mt-8 lg:mt-0 pt-6 border-t border-white/10 lg:border-t-0 flex flex-wrap items-center gap-3 text-[11px] text-[#8A92A0]">
        <span>© {new Date().getFullYear()} Tuned Draws Ltd</span>
        <span>•</span>
        <Link href="/privacy-policy" className="hover:text-white transition-colors">
          Privacy Policy
        </Link>
        <span>•</span>
        <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
          Terms & Conditions
        </Link>
        <span>•</span>
        <Link href="/login" className="text-[#FF1E27] hover:underline font-semibold ml-auto">
          Player Login →
        </Link>
      </div>
    </div>
  );
}
