"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Gauge } from "lucide-react";
import WebsiteNavbar from "../../../components/website/layout/WebsiteNavbar";
import WebsiteFooter from "../../../components/website/layout/WebsiteFooter";

export default function RaffleDetailsErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Live raffle page error boundary caught:", error);
  }, [error]);

  return (
    <>
      <WebsiteNavbar />
      <main className="min-h-[70vh] flex items-center justify-center bg-[#0B0C0E] bg-tachometer-grid pt-24 pb-16 px-4 text-white">
        <div className="bg-[#12141C] border border-white/10 rounded-2xl p-8 sm:p-12 max-w-md w-full text-center shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-[#1A1D27] border border-[#FF1E27]/30 flex items-center justify-center mx-auto mb-5 text-[#FF1E27] shadow-[0_0_15px_rgba(255,30,39,0.2)]">
            <Gauge className="w-8 h-8" />
          </div>
          <h2 className="font-heading font-black text-2xl text-white uppercase tracking-tight mb-2">
            Competition Unavailable
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#8A92A0] leading-relaxed mb-6">
            We couldn&apos;t load this competition details right now. It may have ended or experienced a temporary dyno connection issue.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="btn-racing-red w-full sm:w-auto px-6 py-2.5 rounded-xl font-heading font-black text-xs uppercase tracking-wider text-white transition-all cursor-pointer shadow-[0_4px_20px_rgba(255,30,39,0.35)]"
            >
              Try Again
            </button>
            <Link
              href="/live-raffles"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider bg-[#1A1D27] border border-white/10 text-white hover:border-[#FF1E27]/40 transition-all text-center"
            >
              Browse Draws
            </Link>
          </div>
        </div>
      </main>
      <WebsiteFooter />
    </>
  );
}
