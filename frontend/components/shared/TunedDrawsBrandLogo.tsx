"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
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
  priority = false,
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
    subtitle !== "PERFORMANCE & MOD COMPETITIONS" &&
    subtitle !== "YOUR MODS OUR PLATFORM";

  const content = (
    <div className={cn("inline-flex flex-col items-start select-none group", className)}>
      <div className="relative transition-transform duration-300 group-hover:scale-[1.02] flex items-center">
        <Image
          src="/logo_transparent.png"
          alt="Tuned Draws - Your Mods Our Platform"
          width={940}
          height={412}
          priority={priority || size === "md"}
          className={cn(
            "w-auto object-contain transition-all duration-300 drop-shadow-[0_0_12px_rgba(255,30,39,0.22)] group-hover:drop-shadow-[0_0_20px_rgba(255,30,39,0.5)]",
            sizeClasses[size],
            imageClassName
          )}
        />
      </div>
      {isCustomSubtitle && (
        <span className="font-heading text-[9px] md:text-[10px] uppercase font-bold tracking-[0.25em] text-[#FF1E27] mt-1 pl-1">
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
