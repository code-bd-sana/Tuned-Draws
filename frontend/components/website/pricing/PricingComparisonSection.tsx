import React from "react";
import { COMPARISON_ROWS } from "../../../data/pricing/pricing-comparison.data";
import { cn } from "../../../lib/utils";

/**
 * Tabular comparison matrix for Free, Premium, and Pro features.
 * Features clean alternate row coloring, check/dash status indicators, and mobile scroll support.
 */
export default function PricingComparisonSection() {
  // Renders cell value helper: boolean checks or string labels
  const renderCell = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? (
        <div className="flex justify-center">
          <div className="w-6 h-6 rounded-full bg-[#FF1E27]/15 border border-[#FF1E27]/40 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-3.5 h-3.5 text-[#FF1E27] shrink-0"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="w-5 h-5 rounded-full bg-white/5 border border-white/5 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-3.5 h-3.5 text-white/20 shrink-0"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          </div>
        </div>
      );
    }
    return <span className="font-heading text-xs md:text-sm text-white font-bold tracking-wide uppercase">{value}</span>;
  };

  return (
    <section className="relative w-full border-b border-white/10 bg-[#0B0C0E] bg-tachometer-grid py-20 md:py-28 overflow-hidden">
      {/* Background ambient red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FF1E27]/8 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="container-custom relative">
        {/* Header Title */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FF1E27]/30 bg-[#12141C]/90 px-4 py-1.5 font-heading text-[10px] font-black tracking-[.2em] text-[#FF1E27] uppercase shadow-[0_0_15px_rgba(255,30,39,0.2)] backdrop-blur-md mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF1E27] animate-pulse shadow-[0_0_8px_rgba(255,30,39,0.8)]" />
            SPEC SHEET BREAKDOWN
          </span>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white tracking-tight uppercase">
            COMPARE HOSTING PLANS &amp; FEATURES
          </h2>
          <p className="mt-3 text-sm md:text-base text-[#8A92A0] font-sans max-w-xl mx-auto">
            Review detailed capabilities across all tiers to power your custom draws.
          </p>
        </div>

        {/* Scrollable Comparison Table Frame */}
        <div className="mx-auto w-full max-w-5xl overflow-x-auto rounded-2xl border border-white/10 bg-[#12141C]/90 shadow-2xl backdrop-blur-md">
          <table className="w-full min-w-[650px] border-collapse text-left">
            
            {/* Table Header */}
            <thead>
              <tr className="h-[64px] border-b border-white/10 bg-[#181B26]">
                <th className="w-2/5 px-6 font-heading text-xs font-black tracking-wider text-white uppercase md:text-sm">
                  Feature
                </th>
                <th className="w-1/5 px-6 text-center font-heading text-xs font-black tracking-wider text-white uppercase md:text-sm">
                  Free
                </th>
                <th className="w-1/5 px-6 text-center font-heading text-xs font-black tracking-wider text-[#FF1E27] uppercase md:text-sm">
                  Premium
                </th>
                <th className="w-1/5 px-6 text-center font-heading text-xs font-black tracking-wider text-white uppercase md:text-sm">
                  Pro
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {COMPARISON_ROWS.map((row, index) => (
                <tr
                  key={row.featureName}
                  className={cn(
                    "border-b border-white/5 transition-colors duration-200 hover:bg-white/[0.02]",
                    index % 2 === 0 ? "bg-[#12141C]/60" : "bg-[#151722]/60"
                  )}
                >
                  {/* Feature Label Name */}
                  <td className="font-sans font-medium text-xs md:text-sm text-[#D1D5DB] px-6 py-4.5">
                    {row.featureName}
                  </td>

                  {/* Free Value */}
                  <td className="text-center px-6 py-4.5 border-l border-white/5">
                    {renderCell(row.freeValue)}
                  </td>
                  
                  {/* Premium Value */}
                  <td className="text-center px-6 py-4.5 border-l border-white/5 bg-[#FF1E27]/[0.02]">
                    {renderCell(row.premiumValue)}
                  </td>
                  
                  {/* Pro Value */}
                  <td className="text-center px-6 py-4.5 border-l border-white/5">
                    {renderCell(row.proValue)}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </section>
  );
}


