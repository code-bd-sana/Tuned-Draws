"use client";

import React from "react";
import HostAuthBrandPanel from "./HostAuthBrandPanel";

interface HostAuthLayoutProps {
  children: React.ReactNode;
  mode: "login" | "register";
  currentStep?: number;
}

export default function HostAuthLayout({
  children,
  mode,
  currentStep = 1,
}: HostAuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#0B0C0E] bg-tachometer-grid lg:grid lg:grid-cols-[38%_62%] text-white selection:bg-[#FF1E27] selection:text-white">
      {/* Ambient Crimson Red Glow Highlights */}
      <div className="pointer-events-none fixed top-0 left-1/3 w-[600px] h-[350px] bg-[#FF1E27] opacity-[0.06] blur-[150px] rounded-full z-0" />
      <div className="pointer-events-none fixed bottom-0 right-0 w-[500px] h-[400px] bg-[#B3000C] opacity-[0.05] blur-[140px] rounded-full z-0" />

      {/* Left panel - brand and status */}
      <div className="relative z-10 w-full lg:h-screen lg:sticky lg:top-0">
        <HostAuthBrandPanel mode={mode} currentStep={currentStep} />
      </div>

      {/* Right panel - form content card */}
      <main className="relative z-10 flex w-full items-center justify-center overflow-y-auto p-4 sm:p-6 md:p-10 lg:p-14 xl:p-20">
        <div className="w-full max-w-2xl flex flex-col justify-center">
          {children}
        </div>
      </main>
    </div>
  );
}
