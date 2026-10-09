import React, { Suspense } from "react";
import type { Metadata } from "next";
import WebsiteNavbar from "../../components/website/layout/WebsiteNavbar";
import WebsiteFooter from "../../components/website/layout/WebsiteFooter";
import LiveRafflesHero from "../../components/website/live-raffles/LiveRafflesHero";
import LiveRaffleGrid from "../../components/website/live-raffles/LiveRaffleGrid";

export const metadata: Metadata = {
  title: "Live Competitions | Tuned Draws",
  description:
    "Browse and enter active car modification and performance parts competitions. Performance parts, tuning packages, car wrapping, detailing, and track days.",
};

/**
 * Public Live Raffles Page.
 * Renders all active automotive draws with category, sorting, search, and layout controls.
 */
export default function LiveRafflesPage() {
  return (
    <>
      {/* Global Header Navigation */}
      <WebsiteNavbar />

      <main className="min-h-screen flex flex-col bg-[#0B0C0E] bg-tachometer-grid text-white selection:bg-[#FF1E27] selection:text-white">
        {/* Page Hero Section */}
        <LiveRafflesHero />

        {/* Suspense Boundary for Client Search Params Filtering Grid */}
        <Suspense
          fallback={
            <div className="container-custom py-24 text-center text-[#8A92A0] font-sans flex flex-col items-center justify-center gap-4">
              <div className="w-8 h-8 border-2 border-[#FF1E27] border-t-transparent rounded-full animate-spin" />
              <p className="font-heading text-xs font-bold uppercase tracking-wider text-[#D1D5DB]">
                Loading live competitions...
              </p>
            </div>
          }
        >
          <LiveRaffleGrid />
        </Suspense>
      </main>

      {/* Global Footer */}
      <WebsiteFooter />
    </>
  );
}
