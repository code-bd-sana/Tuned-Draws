"use client";

import React, { useState } from "react";
import { PRICING_FAQ } from "../../../data/pricing/pricing-faq.data";
import AccordionItem from "../shared/AccordionItem";

/**
 * Pricing Page FAQ Section using the shared AccordionItem component.
 * Allows expansion of one question at a time.
 */
export default function PricingFaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative w-full border-b border-white/10 bg-[#14110F] bg-tachometer-grid py-20 md:py-28 overflow-hidden">
      {/* Background ambient red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#D4A863]/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container-custom max-w-3xl flex flex-col items-center relative">
        
        {/* Title Heading */}
        <span className="inline-flex items-center gap-2 rounded-full border border-[#D4A863]/30 bg-[#211C18]/90 px-4 py-1.5 font-heading text-[10px] font-black tracking-[.2em] text-[#D4A863] uppercase shadow-[0_0_15px_rgba(212,168,99,0.2)] backdrop-blur-md mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[#94632F] animate-pulse shadow-[0_0_8px_rgba(212,168,99,0.8)]" />
          HAVE QUESTIONS?
        </span>
        <h2 className="font-heading font-black text-3xl md:text-5xl text-white text-center mb-12 tracking-tight uppercase">
          FREQUENTLY ASKED QUESTIONS
        </h2>

        {/* Accordions Wrapper */}
        <div className="flex w-full flex-col rounded-2xl border border-white/10 bg-[#211C18]/90 p-4 sm:p-6 shadow-2xl backdrop-blur-md divide-y divide-white/5">
          {PRICING_FAQ.map((faq) => (
            <AccordionItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
