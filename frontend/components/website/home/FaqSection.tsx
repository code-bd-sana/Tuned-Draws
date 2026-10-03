"use client";

import React, { useState } from "react";
import AccordionItem from "../shared/AccordionItem";
import { faqData } from "../../../data/homepage/faq.data";
import Link from "next/link";

/**
 * FAQ Section — dark automotive carbon split layout with interactive accordion.
 */
export default function FaqSection() {
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");

  return (
    <section id="faq" className="py-20 bg-[#0B0C0E] border-t border-white/10 relative">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* LEFT — Context */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12141C] border border-[#FF1E27]/30 text-[10px] font-heading font-black uppercase tracking-widest text-[#FF1E27] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-white mb-4 leading-tight uppercase">
              Common Questions
            </h2>
            <p className="font-sans text-sm text-[#8A92A0] leading-relaxed mb-8 max-w-sm">
              Everything you need to know about entering automotive prize draws, hosting competitions, ticket allocations, and prize handovers on Tuned Draws.
            </p>

            {/* Contact Card */}
            <div className="w-full bg-[#12141C] border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="text-2xl mb-3">💬</div>
              <h4 className="font-heading font-black text-base text-white mb-1 uppercase">Still have questions?</h4>
              <p className="font-sans text-xs text-[#8A92A0] mb-5 leading-relaxed">
                Our support team is available Mon–Fri, 9am–5pm GMT. We typically reply within 2 hours.
              </p>
              <Link
                href="/contact"
                className="btn-racing-red inline-flex items-center gap-2 px-5 py-3 text-white font-heading text-xs font-black tracking-wider uppercase rounded-xl transition-all duration-200 shadow-[0_0_15px_rgba(255,30,39,0.3)] hover:shadow-[0_0_25px_rgba(255,30,39,0.5)] cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                Contact Support
              </Link>
            </div>
          </div>

          {/* RIGHT — Accordion */}
          <div className="lg:col-span-7 w-full">
            <div className="bg-[#12141C] border border-white/10 rounded-2xl overflow-hidden shadow-xl divide-y divide-white/5">
              {faqData.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaqId === faq.id}
                  onToggle={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
