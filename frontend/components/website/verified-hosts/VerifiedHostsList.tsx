"use client";

import React, { useState } from "react";
import { VerifiedHost } from "../../../types/host.types";
import VerifiedHostCard from "./VerifiedHostCard";
import { cn } from "../../../lib/utils";

interface VerifiedHostsListProps {
  hosts: VerifiedHost[];
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function VerifiedHostsList({ hosts }: VerifiedHostsListProps) {
  const [activeLetter, setActiveLetter] = useState<string>("ALL");

  const verifiedOnlyHosts = hosts.filter(
    (host) => host && host.isVerified === true && !host.isBlocked
  );

  const filteredHosts = activeLetter === "ALL" 
    ? verifiedOnlyHosts 
    : verifiedOnlyHosts.filter(host => host.name.toUpperCase().startsWith(activeLetter));

  return (
    <div className="flex flex-col w-full">
      {/* A-Z Filter */}
      <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-white/10 pb-6">
        <button
          onClick={() => setActiveLetter("ALL")}
          className={cn(
            "h-[38px] px-4 rounded-xl font-heading text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer select-none",
            activeLetter === "ALL"
              ? "bg-gradient-to-r from-[#FF1E27] to-[#B3000C] text-white shadow-[0_0_20px_rgba(255,30,39,0.4)] border border-[#FF1E27]"
              : "border border-white/10 bg-[#12141C] text-[#8A92A0] hover:border-white/30 hover:text-white"
          )}
        >
          All
        </button>
        {ALPHABET.map((letter) => (
          <button
            key={letter}
            onClick={() => setActiveLetter(letter)}
            className={cn(
              "w-[38px] h-[38px] rounded-xl flex items-center justify-center font-heading text-xs font-black uppercase transition-all duration-200 cursor-pointer select-none",
              activeLetter === letter
                ? "bg-gradient-to-r from-[#FF1E27] to-[#B3000C] text-white shadow-[0_0_20px_rgba(255,30,39,0.4)] border border-[#FF1E27]"
                : "border border-white/10 bg-[#12141C] text-[#8A92A0] hover:border-white/30 hover:text-white"
            )}
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredHosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredHosts.map((host) => (
            <VerifiedHostCard key={host.id} host={host} />
          ))}
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-[600px] flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-[#12141C]/80 px-8 py-20 text-center shadow-2xl backdrop-blur-md">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl shadow-inner">
            🔍
          </div>
          <span className="font-heading text-[10px] font-black tracking-[.2em] text-[#FF1E27] uppercase">
            HOST DIRECTORY
          </span>
          <h3 className="font-heading text-2xl font-black text-white uppercase tracking-tight">
            NO HOSTS FOUND
          </h3>
          <p className="max-w-[360px] font-sans text-sm leading-relaxed text-[#8A92A0]">
            {activeLetter === "ALL"
              ? "There are no verified automotive hosts active right now. Please check back soon or explore live draws."
              : <>We couldn&apos;t find a verified host starting with &quot;{activeLetter}&quot;. Try selecting &quot;All&quot; to view the complete garage directory.</>}
          </p>
        </div>
      )}
    </div>
  );
}
