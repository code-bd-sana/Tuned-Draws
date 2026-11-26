import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';

export default function FeaturedStorySection() {
  return (
    <section className="bg-[#faf6f1] px-4 py-14 sm:px-5 sm:py-24">
      <div className="mx-auto grid max-w-[1200px] items-center gap-7 rounded-2xl border border-[#eadccc] bg-white p-4 shadow-[0_20px_65px_rgba(70,48,25,0.05)] sm:gap-10 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
        <div className="relative overflow-hidden rounded-xl bg-[#5d4936] shadow-[0_20px_45px_rgba(50,34,20,0.17)]">
          <div className="relative aspect-[3/2] sm:aspect-[4/3]">
            <Image src="/images/featured-couple.png" alt="A couple walking together in a garden" fill sizes="(max-width: 640px) calc(100vw - 64px), (max-width: 1024px) calc(100vw - 120px), 520px" className="object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
            <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-[#e5c890]/30 bg-[#211a13]/80 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#f4dfb7] sm:left-5 sm:top-5 sm:px-4 sm:text-[10px]"><Sparkles className="h-3 w-3" /> A moment to remember</div>
            <div className="absolute bottom-4 left-4 right-4 text-white sm:bottom-6 sm:left-6 sm:right-6"><p className="font-serif text-2xl leading-tight text-white sm:text-3xl">Every love story is special.</p><p className="mt-1 text-xs text-white/90 sm:mt-2 sm:text-sm">Celebrating the moments that matter most.</p></div>
          </div>
        </div>

        <div className="py-1">
          <p className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#a77a3f]"><span className="h-1.5 w-1.5 rounded-full bg-[#c59a5b]" /> Made for memorable moments</p>
          <h2 className="wedding-title max-w-xl text-3xl leading-[1.12] text-[#211b16] sm:text-5xl">Your dream day deserves a little <span className="italic text-[#b58a50]">extra magic.</span></h2>
          <p className="mt-6 border-l-2 border-[#caa66e] bg-[#faf6f0] px-5 py-4 text-sm leading-7 text-[#75695d]">From the smallest details to unforgettable celebrations, discover opportunities to make your wedding story your own.</p>
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#eee4d8] pt-6">
            <div className="rounded-lg border border-[#eadfd1] bg-[#fcf9f5] p-4"><Heart className="mb-2 h-5 w-5 text-[#b58a50]" strokeWidth={1.5} /><p className="font-serif text-lg text-[#2c251e]">Special moments</p><p className="mt-1 text-xs leading-relaxed text-[#82766a]">For your big day</p></div>
            <div className="rounded-lg border border-[#eadfd1] bg-[#fcf9f5] p-4"><Sparkles className="mb-2 h-5 w-5 text-[#b58a50]" strokeWidth={1.5} /><p className="font-serif text-lg text-[#2c251e]">Lovely prizes</p><p className="mt-1 text-xs leading-relaxed text-[#82766a]">Discover what&apos;s on offer</p></div>
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/winners" className="btn-racing-red inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-xs font-bold uppercase tracking-wider">See winner stories <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/live-raffles" className="inline-flex items-center rounded-full border border-[#d9c5aa] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#705637] transition hover:bg-[#f7f0e7]">Browse competitions</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
