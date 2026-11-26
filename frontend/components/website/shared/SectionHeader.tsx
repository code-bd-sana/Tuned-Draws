import React from "react";
import { cn } from "../../../lib/utils";

interface SectionHeaderProps {
  badgeText?: string;
  headingText: string;
  paragraphText?: string;
  centered?: boolean;
}

/**
 * Reusable section title component matching Tuned Draws automotive design layout.
 */
export default function SectionHeader({
  badgeText,
  headingText,
  paragraphText,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col mb-12 max-w-2xl",
        centered ? "mx-auto text-center items-center" : "text-left items-start"
      )}
    >
      {badgeText && (
        <div className="inline-flex items-center gap-2 bg-[#211C18] border border-[#D4A863]/30 px-3.5 py-1.5 rounded-full text-[10px] font-heading font-black uppercase tracking-widest text-[#D4A863] mb-4 shadow-[0_0_12px_rgba(212,168,99,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#94632F] animate-pulse" />
          {badgeText}
        </div>
      )}
      
      <h2 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-tight mb-3">
        {headingText}
      </h2>
      
      {paragraphText && (
        <p className="font-sans text-xs sm:text-sm text-[#B6AA9C] leading-relaxed">
          {paragraphText}
        </p>
      )}
    </div>
  );
}
