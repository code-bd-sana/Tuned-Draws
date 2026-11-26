import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import WebsiteNavbar from "../../components/website/layout/WebsiteNavbar";
import WebsiteFooter from "../../components/website/layout/WebsiteFooter";
import { ShieldCheck, Award, Radio, Truck, ArrowLeft, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Host Rules & Guidelines | Wedding Draws",
  description:
    "Official operational rules, prize authenticity, live draw protocols, and fulfillment standards for verified Wedding Draws hosts.",
};

export default function HostRulesPage() {
  return (
    <>
      <WebsiteNavbar />
      <main className="flex-grow bg-[#14110F] bg-tachometer-grid pt-28 pb-24 text-white selection:bg-[#94632F] selection:text-white">
        <div className="container-custom max-w-4xl mx-auto px-4">
          <Link
            href="/"
            className="text-xs font-semibold text-[#B6AA9C] hover:text-white transition-colors inline-flex items-center gap-1.5 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="rounded-2xl border border-white/10 bg-[#211C18] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Header accent */}
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#D4A863]/10 border border-[#D4A863]/30 text-[#D4A863]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Merchant Standard
              </span>
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mb-4">
              Host Rules &amp; Operational Standards
            </h1>

            <p className="font-sans text-sm text-[#B6AA9C] leading-relaxed mb-8">
              As a Verified Host on <strong className="text-white">Wedding Draws</strong>, you are expected to maintain the highest standards of integrity, transparency, and timely customer service. Please review our mandatory guidelines below.
            </p>

            {/* Operational Standards Grid */}
            <div className="space-y-6 text-sm text-[#B6AA9C] leading-relaxed font-sans">
              {/* Rule 1 */}
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#D4A863]/10 border border-[#D4A863]/30 flex items-center justify-center text-[#D4A863] shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-black text-base text-white uppercase tracking-wide">
                    1. Prize Authenticity &amp; Accuracy
                  </h3>
                </div>
                <p>
                  All items offered as prizes—including bespoke bridal wear, honeymoon vouchers, venue hire, photography packages, and luxury wedding accessories—must be 100% authentic, brand-new or accurately documented, and strictly match the descriptions and media uploaded to your competition.
                </p>
              </div>

              {/* Rule 2 */}
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                    <Radio className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-black text-base text-white uppercase tracking-wide">
                    2. Live Draws &amp; Random Number Audit
                  </h3>
                </div>
                <p>
                  Every scheduled manual draw must be broadcast live via verified streams with clear, unfiltered screen sharing of the provably fair random selection tool. Automated system draws are powered by tamper-proof server-side random seeds that are publicly inspectable.
                </p>
              </div>

              {/* Rule 3 */}
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-black text-base text-white uppercase tracking-wide">
                    3. Dispatch &amp; Prize Delivery Timeline
                  </h3>
                </div>
                <p>
                  Hosts are required to dispatch physical prizes or confirm service booking details within 7 working days of winner verification. Valid courier tracking numbers or service confirmations must be submitted through your host portal to verify fulfillment and release host proceeds.
                </p>
              </div>

              {/* Rule 4 */}
              <div className="p-5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3 mb-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <h3 className="font-heading font-black text-base text-white uppercase tracking-wide">
                    4. Anti-Fraud &amp; Zero Shill Policy
                  </h3>
                </div>
                <p>
                  Hosts, their immediate family members, and business associates are strictly prohibited from purchasing tickets in their own hosted competitions. Any detected manipulation will result in immediate account suspension, forfeiture of host balance, and referral to regulatory authorities.
                </p>
              </div>

              <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#B6AA9C]">
                  Need guidance on host compliance or draw scheduling?
                </p>
                <Link
                  href="/contact"
                  className="px-5 py-2.5 rounded-xl bg-[#94632F] hover:bg-[#9B6A2F] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(212,168,99,0.35)] shrink-0"
                >
                  Contact Support Crew
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <WebsiteFooter />
    </>
  );
}
