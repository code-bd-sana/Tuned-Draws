import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Diamond, ShieldCheck, Heart, Users, Sparkles } from 'lucide-react';

const benefits = [
  { icon: Diamond, title: 'Luxury prizes', text: 'From wedding suppliers' },
  { icon: ShieldCheck, title: 'Trusted hosts', text: 'Discover inspiring businesses' },
  { icon: Heart, title: 'Simple & secure', text: 'Easy to enter online' },
  { icon: Users, title: 'Real support', text: 'Here to help along the way' },
];

export default function HeroSection() {
  return (
    <>
      <section className="wedding-hero relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#111] pt-24">
        <div className="wedding-hero-image absolute inset-0">
          <Image src="/images/wedding-hero.png" alt="A couple celebrating their wedding among ivory flowers" fill priority sizes="100vw" className="wedding-desktop-image object-cover object-[70%_center]" />
          <Image src="/images/wedding-hero-mobile.png" alt="" fill priority sizes="100vw" className="wedding-mobile-image object-cover" />
        </div>
        <div className="wedding-hero-overlay absolute inset-0" />
        <div className="wedding-hero-content container-custom relative z-10 py-20 text-center lg:text-left">
          <div className="max-w-[650px]">
            <p className="wedding-hero-badge mb-7 inline-flex items-center gap-2 rounded-full border border-[#d4ad6f]/40 bg-black/30 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.23em] text-[#edca8d] sm:text-xs"><Sparkles className="h-3 w-3" /> Exclusive wedding competitions <Sparkles className="h-3 w-3" /></p>
            <h1 className="wedding-title text-[clamp(2.6rem,7vw,6.4rem)] leading-[0.98] text-[#fffaf1]">Win Your<br /><span className="italic text-[#e6bd7c]">Dream Wedding</span></h1>
            <p className="wedding-hero-description mx-auto mt-6 max-w-md text-base leading-relaxed text-[#eee7db]/85 lg:mx-0 sm:text-lg">Discover beautiful prizes, unforgettable experiences and special touches for your big day from wedding suppliers.</p>
            <div className="wedding-hero-actions mt-9 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Link href="/live-raffles" className="btn-racing-red inline-flex items-center justify-center gap-4 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-wider">Explore competitions <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/how-it-works" className="inline-flex items-center justify-center rounded-full border border-[#d4ad6f]/70 bg-black/20 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white/10">How it works</Link>
            </div>
            <div className="mt-10 hidden max-w-xl grid-cols-3 gap-4 border-t border-[#d8c3a0]/25 pt-6 text-left md:grid">
              <div className="flex items-center gap-3"><Diamond className="h-6 w-6 shrink-0 text-[#d4ad6f]" strokeWidth={1.4} /><span className="text-[10px] uppercase tracking-wider text-white/70"><strong className="block font-serif text-sm normal-case tracking-normal text-[#edca8d]">Special prizes</strong>For your big day</span></div>
              <div className="flex items-center gap-3"><Heart className="h-6 w-6 shrink-0 text-[#d4ad6f]" strokeWidth={1.4} /><span className="text-[10px] uppercase tracking-wider text-white/70"><strong className="block font-serif text-sm normal-case tracking-normal text-[#edca8d]">Made for couples</strong>Memorable moments</span></div>
              <div className="flex items-center gap-3"><ShieldCheck className="h-6 w-6 shrink-0 text-[#d4ad6f]" strokeWidth={1.4} /><span className="text-[10px] uppercase tracking-wider text-white/70"><strong className="block font-serif text-sm normal-case tracking-normal text-[#edca8d]">Simple &amp; secure</strong>Enter with confidence</span></div>
            </div>
          </div>
        </div>
      </section>
      <section className="wedding-benefits bg-[#faf6ef] text-[#17130f]">
        <div className="container-custom grid grid-cols-2 gap-y-7 py-8 md:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col items-center gap-2 px-3 text-center md:border-r md:border-[#dcc9ad] md:last:border-0">
              <Icon className="h-8 w-8 text-[#a97831]" strokeWidth={1.4} />
              <h2 className="text-[11px] font-bold uppercase tracking-wider">{title}</h2>
              <p className="text-xs text-[#625c53]">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
