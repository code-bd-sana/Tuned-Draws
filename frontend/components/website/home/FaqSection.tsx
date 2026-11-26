import Link from 'next/link';
import { ArrowRight, Heart, Plus } from 'lucide-react';
import { faqData } from '../../../data/homepage/faq.data';

export default function FaqSection() {
  return (
    <section id="faq" className="romantic-faq relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden="true" className="romantic-faq-glow" />
      <div className="container-custom relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.4fr] lg:gap-20">
          <div className="max-w-md">
            <p className="faq-eyebrow"><span /> Here to help</p>
            <h2 className="mt-5 font-serif text-4xl leading-[1.12] text-[#29211d] sm:text-5xl">A little clarity for your <em className="font-normal text-[#ae8351]">big day.</em></h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#776b60]">From finding your perfect prize to the excitement of the draw, here are the answers to your most common questions.</p>
            <div className="faq-contact mt-8 flex items-start gap-4 rounded-xl border border-[#eaded0] bg-white/65 p-5 sm:p-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#dfc9aa] bg-[#fbf5ed] text-[#a67940]"><Heart className="h-5 w-5" strokeWidth={1.4} /></span>
              <div><h3 className="font-serif text-xl text-[#302820]">Still wondering?</h3><p className="mt-1 text-sm leading-relaxed text-[#7b6f63]">Our team is here to help with any questions.</p><Link href="/contact" className="mt-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#9a703c] transition hover:text-[#624421]">Get in touch <ArrowRight className="h-4 w-4" /></Link></div>
            </div>
          </div>
          <div className="grid content-start gap-3">
            {faqData.slice(0, 6).map((faq, index) => (
              <details key={faq.id} className="romantic-faq-item rounded-xl border border-[#eaded0] bg-[#fffdf9]/90 px-5 shadow-[0_8px_25px_rgba(89,59,30,0.04)] sm:px-6">
                <summary className="flex cursor-pointer list-none items-center gap-4 py-5 text-left text-sm font-semibold leading-snug text-[#302820] sm:text-base">
                  <span className="font-serif text-sm font-normal text-[#c09b6d]">0{index + 1}</span>
                  <span className="min-w-0 flex-1">{faq.question}</span>
                  <span aria-hidden="true" className="romantic-faq-toggle flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#e5d5bf] text-[#a67940]"><Plus className="h-4 w-4" strokeWidth={1.8} /></span>
                </summary>
                <p className="pb-5 pl-8 pr-2 text-sm leading-7 text-[#766b60]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
