"use client";

import React from "react";
import Link from "next/link";
import { cn } from "../../lib/utils";

interface TunedDrawsBrandLogoProps {
  className?: string;
  imageClassName?: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  priority?: boolean;
}

export default function TunedDrawsBrandLogo({
  className,
  imageClassName,
  subtitle,
  size = "md",
  href = "/",
}: TunedDrawsBrandLogoProps) {
  // Height configurations optimized for responsive display and aspect ratio 2.28:1
  const sizeClasses = {
    sm: "h-[34px] sm:h-[38px]",
    md: "h-[42px] md:h-[48px]",
    lg: "h-[54px] md:h-[62px]",
    xl: "h-[70px] md:h-[80px]",
  };

  const isCustomSubtitle =
    Boolean(subtitle) &&
    subtitle !== "WEDDING & HONEYMOON COMPETITIONS" &&
    subtitle !== "YOUR WEDDING OUR PLATFORM";

  const content = (
    <div className={cn("inline-flex flex-col items-start select-none group", className)}>
      <div className={cn("flex flex-col items-center justify-center text-[#d4ab72]", sizeClasses[size], imageClassName)}>
        <span className="font-serif text-[28px] leading-none tracking-tight">Wedding</span>
        <span className="mt-1 text-[8px] font-semibold uppercase tracking-[0.45em]">Draws</span>
      </div>
      {isCustomSubtitle && (
        <span className="font-heading text-[9px] md:text-[10px] uppercase font-bold tracking-[0.25em] text-[#D4A863] mt-1 pl-1">
          {subtitle}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center focus:outline-none shrink-0">
        {content}
      </Link>
    );
  }

  return content;
}
