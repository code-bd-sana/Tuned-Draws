import Link from 'next/link';
import { Check } from 'lucide-react';

export default function FinalCtaSection() {
  return (
    <section className="wedding-supplier relative overflow-hidden bg-[#111] text-white">
      <div className="container-custom relative z-10 py-16 md:py-20">
        <div className="max-w-xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#d4a863]">For wedding suppliers</p>
          <h2 className="wedding-title text-4xl sm:text-5xl">Host Your Own Competitions</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/85">Reach new customers, showcase your business and share unforgettable prizes with couples planning their special day.</p>
          <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            {['Easy to set up', 'A transparent platform', 'Support from our team', 'Showcase your business'].map(item => (
              <li key={item} className="flex items-center gap-2"><Check className="h-5 w-5 rounded-full bg-[#d4a863] p-1 text-black" />{item}</li>
            ))}
          </ul>
          <Link href="/host/register" className="btn-racing-red mt-8 inline-block rounded-sm px-8 py-3.5 text-xs font-bold uppercase tracking-wider">Find out more →</Link>
        </div>
      </div>
    </section>
  );
}
