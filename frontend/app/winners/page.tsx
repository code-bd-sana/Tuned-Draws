import React from "react";
import type { Metadata } from "next";
import WebsiteNavbar from "../../components/website/layout/WebsiteNavbar";
import WebsiteFooter from "../../components/website/layout/WebsiteFooter";
import WinnersHero from "../../components/website/winners/WinnersHero";
import WinnersGrid from "../../components/website/winners/WinnersGrid";
import WinnerHighlightCard from "../../components/website/winners/WinnerHighlightCard";

export const metadata: Metadata = {
  title: "Winners Gallery | Tuned Draws",
  description:
    "See all the completed automotive competition winners. Check past draw dates, verified performance parts, tuning packages, and audit records.",
};

/**
 * Public 'Winners' page route at `/winners`.
 * Composes layout for header navbar, hero stats, filtering grids, testimonial highlight, and footer.
 */
export default function WinnersPage() {
  return (
    <>
      {/* Sticky top navbar */}
      <WebsiteNavbar />

      <main className="min-h-screen flex flex-col bg-[#0B0C0E] bg-tachometer-grid text-white selection:bg-[#FF1E27] selection:text-white">
        {/* Page Hero with stats counters */}
        <WinnersHero />

        {/* Stateful timeline grid + pagination card list */}
        <WinnersGrid />

        {/* Featured winner testimonial row */}
        <WinnerHighlightCard />
      </main>

      {/* Global website footer */}
      <WebsiteFooter />
    </>
  );
}
