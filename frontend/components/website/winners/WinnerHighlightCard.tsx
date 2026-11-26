import React from "react";
import Image from "next/image";

/**
 * Highlights a featured winner testimonial with quote text and a photo showcase.
 * Styled in Tuned Draws dark carbon and Electric Racing Red design.
 */
export default function WinnerHighlightCard() {
  const quoteIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className="w-10 h-10 text-[#D4A863]"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );

  return (
    <section className="select-none border-t border-white/10 bg-[#14110F] py-16 md:py-24 text-white relative">
      {/* Ambient Red Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] bg-[#D4A863]/8 rounded-full blur-[140px]" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center max-w-6xl mx-auto">
          
          {/* LEFT: Featured Winner Photo Card */}
          <div className="lg:col-span-6 w-full">
            <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] rounded-2xl border border-white/10 overflow-hidden bg-[#211C18] shadow-2xl group">
              <Image
                src="/images/wedding-flowers.png"
                alt="Ivory and blush wedding flowers"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14110F] via-transparent to-transparent" />
              {/* Overlay Label Badge */}
              <div className="absolute bottom-5 left-5 bg-[#14110F]/85 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-[10px] font-heading font-black text-[#D4A863] tracking-widest uppercase shadow-md">
                Moments to celebrate
              </div>
            </div>
          </div>

          {/* RIGHT: Testimonial Quotation */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <div className="shrink-0">{quoteIcon}</div>
            
            <p className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-white leading-relaxed uppercase tracking-tight">
              Every celebration begins with a dream. Discover the stories and prizes shared by our community.
            </p>

            <div className="flex flex-col gap-1 border-l-2 border-[#D4A863] pl-4">
              <span className="font-heading font-black text-sm sm:text-base text-white">
                Your story could be next
              </span>
              <span className="font-sans text-xs sm:text-sm text-[#B6AA9C]">
                Explore competitions and discover something special.
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
