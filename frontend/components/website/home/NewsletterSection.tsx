"use client";

import React, { useState } from "react";

/**
 * Newsletter Section — dark automotive carbon email subscription module.
 */
export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="py-20 bg-[#0B0C0E] border-t border-white/10 relative">
      <div className="container-custom">

        <div className="relative bg-[#12141C] border border-white/10 rounded-3xl px-8 md:px-16 py-14 md:py-16 max-w-5xl mx-auto text-center overflow-hidden shadow-2xl">
          {/* Decorative speed gauge rings */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full border border-white/5 pointer-events-none" />
          
          {/* Crimson ambient glow */}
          <div className="absolute top-0 right-1/4 w-[50%] h-[80%] bg-[#FF1E27]/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1D27] border border-[#FF1E27]/30 text-[#FF1E27] text-[10px] font-heading font-black uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(255,30,39,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E27] animate-pulse" />
              TUNED DRAWS DISPATCH
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-black text-white mb-4 leading-tight uppercase">
              Never Miss a Supercar Draw
            </h2>
            <p className="font-sans text-sm text-[#8A92A0] leading-relaxed mb-10 max-w-lg mx-auto">
              Get instant notifications when new tuned vehicle sweepstakes, crate motors, track packages, or instant-win prizes go live. Unsubscribe anytime.
            </p>

            {subscribed ? (
              <div className="inline-flex items-center gap-3 px-6 py-4 bg-[#1A1D27] border border-emerald-500/30 rounded-2xl text-white font-sans text-sm font-semibold shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-emerald-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <span>You&apos;re now on the VIP grid! Watch your inbox. 🏁</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#1A1D27] border border-white/10 focus:border-[#FF1E27] text-white placeholder:text-[#8A92A0] px-5 py-3.5 rounded-xl text-sm font-sans outline-none transition-colors duration-200 shadow-inner"
                />
                <button
                  type="submit"
                  className="btn-racing-red px-7 py-3.5 text-white font-heading text-xs font-black tracking-widest uppercase rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(255,30,39,0.35)] hover:shadow-[0_0_30px_rgba(255,30,39,0.6)] cursor-pointer whitespace-nowrap active:scale-95"
                >
                  Subscribe →
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
