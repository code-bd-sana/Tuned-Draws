import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NewsletterSection() {
  return (
    <section className="wedding-closing relative overflow-hidden py-16 text-white sm:py-20">
      <div className="container-custom relative z-10 flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
        <div>
          <p className="wedding-eyebrow mb-3 text-[#e1bd83]">Your day, made special</p>
          <h2 className="wedding-title text-4xl sm:text-5xl">A little more magic awaits.</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#e5dbcd]/80">Explore competitions and discover something wonderful for your wedding.</p>
        </div>
        <Link href="/live-raffles" className="btn-racing-red inline-flex shrink-0 items-center gap-3 rounded-full px-7 py-4 text-xs font-bold uppercase tracking-wider">Explore competitions <ArrowRight className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}
