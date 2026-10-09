"use client";

import React from "react";
import Link from "next/link";
import { Gauge } from "lucide-react";
import { cn } from "../../lib/utils";

interface TunedDrawsBrandLogoProps {
  className?: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
}

export default function TunedDrawsBrandLogo({
  className,
  subtitle = "PERFORMANCE & MOD COMPETITIONS",
  size = "md",
  href = "/",
}: TunedDrawsBrandLogoProps) {
  const iconSizes = {
    sm: "w-8 h-8 rounded-lg",
    md: "w-10 h-10 rounded-xl",
    lg: "w-12 h-12 rounded-2xl",
  };

  const svgSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const subtitleSizes = {
    sm: "text-[8px] tracking-[0.2em]",
    md: "text-[9px] tracking-[0.25em]",
    lg: "text-[10px] tracking-[0.25em]",
  };

  const content = (
    <div className={cn("inline-flex items-center gap-3 select-none group", className)}>
      <div
        className={cn(
          "bg-[#12141C] border border-[#FF1E27]/30 flex items-center justify-center shadow-[0_0_15px_rgba(255,30,39,0.25)] group-hover:border-[#FF1E27] group-hover:shadow-[0_0_20px_rgba(255,30,39,0.4)] transition-all shrink-0",
          iconSizes[size]
        )}
      >
        <Gauge
          className={cn(
            "text-[#FF1E27] group-hover:scale-110 transition-transform duration-300",
            svgSizes[size]
          )}
        />
      </div>
      <div className="flex flex-col">
        <span
          className={cn(
            "font-heading font-black tracking-wider leading-none",
            textSizes[size]
          )}
        >
          <span className="metallic-text">TUNED</span>{" "}
          <span className="text-[#FF1E27] drop-shadow-[0_0_12px_rgba(255,30,39,0.5)]">
            DRAWS
          </span>
        </span>
        {subtitle && (
          <span
            className={cn(
              "font-bold uppercase text-[#8A92A0] group-hover:text-[#D1D5DB] transition-colors mt-0.5",
              subtitleSizes[size]
            )}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="inline-flex">{content}</Link>;
  }

  return content;
}
