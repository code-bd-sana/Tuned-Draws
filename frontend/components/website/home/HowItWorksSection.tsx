import Link from 'next/link';
import { Heart, Ticket, Sparkles, ArrowRight } from 'lucide-react';

const steps = [
  { icon: Heart, title: 'Find something you love', text: 'Explore beautiful wedding prizes and choose the one that speaks to you.' },
  { icon: Ticket, title: 'Select your tickets', text: 'Answer the question, choose your tickets and enter securely online.' },
  { icon: Sparkles, title: 'Let the magic unfold', text: 'When the competition closes, follow the draw and see who wins.' },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="romantic-steps relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden="true" className="romantic-steps-floral" />
      <div className="container-custom relative z-10">
        <div className="mx-auto mb-12 max-w-xl text-center sm:mb-16">
          <p className="romantic-eyebrow"><span /> A little love, a little luck <span /></p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-[#29211d] sm:text-5xl">Three Simple <em className="font-normal text-[#ae8351]">Steps</em></h2>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#776b60]">From a little wish to a beautiful possibility, your journey begins here.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <article key={title} className="romantic-step-card group relative flex items-start gap-5 overflow-hidden rounded-xl border border-[#eaded0] bg-[#fffdf9]/90 p-6 text-left shadow-[0_12px_35px_rgba(89,59,30,0.05)] sm:p-8 md:min-h-[280px] md:flex-col md:items-center md:justify-center md:gap-0 md:text-center">
              <span aria-hidden="true" className="romantic-step-number absolute right-5 top-3 font-serif text-5xl leading-none text-[#e8d8c4]">0{index + 1}</span>
              <div className="romantic-step-icon relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#d9ba8f] bg-[#fbf5ed] text-[#a67940] md:mb-6 md:h-20 md:w-20"><Icon className="h-7 w-7 md:h-8 md:w-8" strokeWidth={1.15} /></div>
              <div className="relative min-w-0 pt-1 md:pt-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#ae8351]">Step 0{index + 1}</p>
                <h3 className="mt-2 font-serif text-xl font-normal leading-tight text-[#302820] sm:text-2xl">{title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#7b6f63]">{text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center sm:mt-12"><Link href="/how-it-works" className="group inline-flex items-center gap-3 rounded-full border border-[#bf9b6a] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#795933] transition hover:bg-[#f0e3d2]">Discover how it works <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></div>
      </div>
    </section>
  );
}
