import React from "react";
import WebsiteNavbar from "@/components/website/layout/WebsiteNavbar";
import WebsiteFooter from "@/components/website/layout/WebsiteFooter";
import { UserCheck, ShieldCheck, Ticket, Trophy, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    id: 1,
    title: "Host Onboarding & Competition Creation",
    role: "Host",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
    icon: <UserCheck className="w-5 h-5 text-emerald-400" />,
    description: "Verified operators and artisan builders register and select an active hosting tier. Once active, hosts configure competitions, ticket quantities, and instant-win tiers.",
    details: [
      "Merchant registers with verified HOST profile.",
      "Selects subscription tier (Free, Premium, or Pro).",
      "Drafts a new Competition with media, ticket volume, and draw schedule.",
      "Assigns instant-win prizes to designated ticket numbers."
    ]
  },
  {
    id: 2,
    title: "Admin Moderation & Quality Approval",
    role: "Admin",
    badgeColor: "bg-[#FF1E27]/10 text-[#FF1E27] border-[#FF1E27]/30",
    icon: <ShieldCheck className="w-5 h-5 text-[#FF1E27]" />,
    description: "Platform administrators review newly submitted competitions to audit prize documentation, rules, and regulatory compliance before publication.",
    details: [
      "Admin reviews pending submissions in the Moderation Queue.",
      "Audits prize authenticity, terms, and instant-win tables.",
      "Approves the competition (Status promoted to ACTIVE).",
      "Competition goes live immediately on the public board."
    ]
  },
  {
    id: 3,
    title: "Entrant Ticket Purchase & Instant Wins",
    role: "Client",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/25",
    icon: <Ticket className="w-5 h-5 text-blue-400" />,
    description: "Entrants browse live draws, select ticket counts, and complete secure checkout. The engine calculates instant wins in real-time.",
    details: [
      "Client selects lucky numbers or triggers quick-pick auto allocator.",
      "Completes secure checkout via PCI-compliant gateway.",
      "System verifies ticket numbers against instant-win tables instantly.",
      "Instant win claims are dispatched to winner portals in real-time."
    ]
  },
  {
    id: 4,
    title: "Provably Fair Live Draw & Winner Selection",
    role: "System / Host",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/25",
    icon: <Trophy className="w-5 h-5 text-amber-400" />,
    description: "At the scheduled draw date or when sellout is reached, the main prize draw executes via automated cryptographic random seeds or verified live streams.",
    details: [
      "Draw schedule reaches countdown expiration or 100% sellout.",
      "Provably fair random number generator selects the winning ticket.",
      "Winner is notified immediately via SMS, email, and portal notification.",
      "Result is recorded permanently on the public Winners Gallery."
    ]
  },
  {
    id: 5,
    title: "Prize Fulfillment & Host Escrow Payout",
    role: "Fulfillment",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/25",
    icon: <DollarSign className="w-5 h-5 text-purple-400" />,
    description: "The host dispatches the physical prize to the verified winner. Once delivery tracking is confirmed, host escrow proceeds are released.",
    details: [
      "Winner completes identity & delivery address verification.",
      "Host ships item via tracked courier and uploads proof of transit.",
      "Admin audits delivery confirmation.",
      "Escrow net payout is transferred to host merchant bank account."
    ]
  }
];

export default function OverviewPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0C0E] bg-tachometer-grid font-sans text-white selection:bg-[#FF1E27] selection:text-white">
      <WebsiteNavbar />

      <main className="flex-grow pt-28 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 sm:mb-20">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FF1E27]/10 border border-[#FF1E27]/30 text-[#FF1E27] mb-3">
              Platform Architecture
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight mb-4">
              Lifecycle &amp; System Flow
            </h1>
            <p className="text-sm md:text-base text-[#8A92A0] max-w-2xl mx-auto leading-relaxed">
              Interactive high-level overview of the Tuned Draws platform. Understand how Hosts, Admins, and Entrants interact securely from launch to prize delivery.
            </p>
          </div>

          {/* Timeline Container */}
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {steps.map((step) => (
              <div
                key={step.id}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                {/* Timeline Icon */}
                <div className="flex items-center justify-center w-11 h-11 rounded-2xl border border-white/15 bg-[#12141C] shadow-2xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-110">
                  {step.icon}
                </div>

                {/* Timeline Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 sm:p-7 rounded-2xl bg-[#12141C] border border-white/10 hover:border-[#FF1E27]/40 shadow-xl transition-all duration-300 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3.5">
                    <span
                      className={`text-[10px] font-heading font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${step.badgeColor}`}
                    >
                      {step.role}
                    </span>
                    <span className="font-heading font-black text-xs text-[#8A92A0]">
                      Step 0{step.id}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight mb-2.5">
                    {step.title}
                  </h3>

                  <p className="text-xs text-[#8A92A0] leading-relaxed mb-4">
                    {step.description}
                  </p>

                  <ul className="space-y-1.5 pt-3 border-t border-white/5">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px] text-[#D1D5DB]">
                        <span className="text-[#FF1E27] font-bold mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout */}
          <div className="mt-20 p-8 rounded-2xl bg-[#12141C] border border-white/10 text-center max-w-2xl mx-auto shadow-2xl">
            <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tight mb-2">
              Ready to Experience Tuned Draws?
            </h3>
            <p className="text-xs text-[#8A92A0] mb-6">
              Browse live competitions or apply to become an authorized hosting merchant.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/live-raffles"
                className="btn-racing-red px-6 py-2.5 rounded-xl text-white font-heading font-black text-xs uppercase tracking-wider inline-flex items-center gap-1.5"
              >
                <span>Live Competitions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/host/register"
                className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all"
              >
                Become a Host
              </Link>
            </div>
          </div>
        </div>
      </main>

      <WebsiteFooter />
    </div>
  );
}
