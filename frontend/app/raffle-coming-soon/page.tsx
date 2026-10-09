import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import WebsiteNavbar from "../../components/website/layout/WebsiteNavbar";
import ComingSoonHero from "../../components/website/coming-soon/ComingSoonHero";
import EarlyAccessForm from "../../components/website/coming-soon/EarlyAccessForm";
import InterestBenefits from "../../components/website/coming-soon/InterestBenefits";
import TunedDrawsBrandLogo from "../../components/shared/TunedDrawsBrandLogo";

export const metadata: Metadata = {
  title: "Early Access VIP | Tuned Draws",
  description:
    "Join the official VIP waitlist for Tuned Draws. Win car modification services, performance parts upgrades, and track experiences.",
};

/**
 * Public 'Coming Soon' lead registration landing page at `/raffle-coming-soon`.
 * Premium dark automotive split layout with vehicle showcase, countdown, form, and benefits grid.
 */
export default function RaffleComingSoonPage() {
  return (
    <>
      <WebsiteNavbar />

      <main className="min-h-screen bg-[#0B0C0E] bg-tachometer-grid pt-24 lg:pt-28 relative overflow-hidden text-white selection:bg-[#FF1E27] selection:text-white">

        {/* Ambient background glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-[20%] -left-[15%] w-[70%] h-[70%] bg-[#FF1E27]/8 rounded-full blur-[160px]" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-[#B3000C]/6 rounded-full blur-[130px]" />
        </div>

        {/* HERO */}
        <div className="container-custom relative z-10 pb-16 pt-4">
          <ComingSoonHero />
        </div>

        {/* Divider accent */}
        <div className="relative z-10 h-px bg-gradient-to-r from-transparent via-[#FF1E27]/40 to-transparent" />

        {/* FORM SECTION */}
        <div className="relative z-10 py-16">
          <div className="container-custom">
            <div className="text-center mb-10">
              <span className="text-[11px] font-heading font-black uppercase tracking-[0.2em] text-[#FF1E27]">
                Step 1 of 1
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase mt-1">
                Reserve Your Spot
              </h2>
              <p className="font-sans text-sm text-[#8A92A0] mt-2 max-w-sm mx-auto">
                Takes 30 seconds. No payment required.
              </p>
            </div>
            <EarlyAccessForm />
          </div>
        </div>

        {/* Divider accent */}
        <div className="relative z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* BENEFITS SECTION */}
        <div className="relative z-10 py-16">
          <div className="container-custom">
            <InterestBenefits />
          </div>
        </div>

        {/* FOOTER STRIP */}
        <div className="relative z-10 border-t border-white/10 py-8 bg-[#0B0C0E]/90">
          <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4">
            <TunedDrawsBrandLogo size="sm" href="/" />
            <p className="font-sans text-xs text-[#8A92A0] text-center sm:text-right">
              © {new Date().getFullYear()} Tuned Draws Ltd · UK Registered · All Rights Reserved
            </p>
          </div>
        </div>

      </main>
    </>
  );
}
