"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { cn } from "../../lib/utils";

interface AuthSuccessStateProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function AuthSuccessState({
  title,
  description,
  buttonText = "Back to Homepage",
  buttonHref = "/",
}: AuthSuccessStateProps) {
  return (
    <div className="carbon-glass border border-[#D4A863]/20 p-8 md:p-12 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] flex flex-col items-center text-center animate-fadeIn max-w-xl mx-auto backdrop-blur-xl relative overflow-hidden">
      {/* Ambient Crimson Glow */}
      <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 bg-[#94632F] opacity-10 blur-[80px] rounded-full" />
      
      {/* Animated Success Circle Icon */}
      <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#211C18] border border-[#D4A863]/40 flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(212,168,99,0.3)]">
        <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-[#D4A863] animate-scaleIn" />
      </div>

      {/* Success Text */}
      <h2 className="font-heading font-black text-2xl md:text-3xl metallic-text mb-4">
        {title}
      </h2>
      <p className="font-sans text-sm md:text-base text-[#9CA3AF] leading-relaxed mb-8">
        {description}
      </p>

      {/* Action Button */}
      <Link
        href={buttonHref}
        className="w-full sm:w-auto px-8 btn-racing-red py-3.5 rounded-xl text-white font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(212,168,99,0.3)] hover:shadow-[0_0_25px_rgba(212,168,99,0.5)] transition-all flex items-center justify-center select-none uppercase cursor-pointer"
      >
        {buttonText}
      </Link>
    </div>
  );
}
