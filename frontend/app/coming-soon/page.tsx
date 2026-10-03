'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Gauge, 
  ArrowLeft, 
  ShieldCheck, 
  Flame, 
  Sparkles, 
  Car, 
  Lock 
} from 'lucide-react';
import TunedDrawsBrandLogo from '../../components/shared/TunedDrawsBrandLogo';

function ComingSoonContent() {
  const searchParams = useSearchParams();
  const rawTarget = searchParams.get('target') || '';
  
  // Format target route name for user clarity
  const formattedTarget = rawTarget
    ? rawTarget.replace(/^\//, '').split('/')[0].replace(/-/g, ' ').toUpperCase()
    : 'EXPERIENCE';

  return (
    <div className="min-h-screen bg-[#07080A] text-[#F3F4F6] relative overflow-hidden flex flex-col justify-between selection:bg-[#FF1E27] selection:text-white">
      {/* Cinematic studio overhead lighting falloff */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-[#FF1E27]/12 via-[#B3000C]/5 to-transparent blur-[140px] -z-0" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-t from-white/[0.03] to-transparent blur-[120px] -z-0" />
      
      {/* Ambient micro-grid backdrop */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03] -z-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Top Header */}
      <header className="relative z-10 w-full border-b border-white/[0.08] bg-[#07080A]/80 backdrop-blur-xl">
        <div className="container-custom py-4 flex items-center justify-between">
          <TunedDrawsBrandLogo size="md" href="/" />

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] text-[#9CA3AF]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
              Platform Dyno Stage
            </span>
            <Link
              href="/"
              className="btn-cinema-dark text-xs font-bold uppercase tracking-wider px-3.5 py-2 inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Main</span> Arena
            </Link>
          </div>
        </div>
      </header>

      {/* Main Hero Card Container */}
      <main className="relative z-10 container-custom py-16 lg:py-24 flex-1 flex items-center justify-center">
        <div className="w-full max-w-3xl">
          {/* Main Smoked 3D Card */}
          <div className="card-3d-cinema p-8 sm:p-12 md:p-14 relative overflow-hidden text-center">
            {/* Top red specular line accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1E27] to-transparent" />

            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] mb-6">
              <Gauge className="w-4 h-4 text-[#FF1E27] animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-[11px] font-heading font-bold uppercase tracking-widest text-[#D1D5DB]">
                CALIBRATING {formattedTarget} ARENA
              </span>
            </div>

            {/* Cinematic Headline */}
            <h1 className="cinema-title-3d font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-5">
              LAUNCH PROTOCOL IN PROGRESS
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#9CA3AF] max-w-xl mx-auto leading-relaxed mb-10 font-sans">
              The <span className="text-white font-semibold">{formattedTarget}</span> portal is currently undergoing final dyno testing and certified sweepstakes compliance. Our high-octane automotive draws, live block allocations, and instant key releases will unlock shortly.
            </p>

            {/* Quick Action Navigation Buttons */}
            <div className="pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/"
                className="btn-cinema-red px-6 py-3 text-xs sm:text-sm font-heading font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-[0_4px_20px_rgba(255,30,39,0.35)]"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Live Draws
              </Link>

              <Link
                href="/login"
                className="btn-cinema-dark px-6 py-3 text-xs sm:text-sm font-heading font-bold uppercase tracking-wider inline-flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-[#FF1E27]" />
                Sign In
              </Link>

              <Link
                href="/host/register"
                className="btn-cinema-dark px-6 py-3 text-xs sm:text-sm font-heading font-bold uppercase tracking-wider inline-flex items-center gap-2"
              >
                <Flame className="w-4 h-4 text-[#FF1E27]" />
                Host a Draw
              </Link>
            </div>
          </div>

          {/* Three Feature Highlight Badges Below Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6">
            <div className="rounded-xl bg-[#0B0C0E]/70 border border-white/[0.06] p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#FF1E27] shrink-0">
                <Car className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-heading font-bold uppercase text-white">Turnkey Builds</p>
                <p className="text-[11px] text-[#8A92A0]">Track & street supercars</p>
              </div>
            </div>

            <div className="rounded-xl bg-[#0B0C0E]/70 border border-white/[0.06] p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#FF1E27] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-heading font-bold uppercase text-white">Certified Fair</p>
                <p className="text-[11px] text-[#8A92A0]">RNG verified draws</p>
              </div>
            </div>

            <div className="rounded-xl bg-[#0B0C0E]/70 border border-white/[0.06] p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-[#FF1E27] shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-heading font-bold uppercase text-white">Instant Wins</p>
                <p className="text-[11px] text-[#8A92A0]">Real-time key claims</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Strip */}
      <footer className="relative z-10 border-t border-white/[0.06] py-5 bg-[#07080A]/90">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs text-[#6B7280]">
            © {new Date().getFullYear()} Tuned Draws. Certified Automotive Sweepstakes Platform.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-wider text-[#8A92A0]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/20">·</span>
            <Link href="/login" className="hover:text-white transition-colors">Sign In</Link>
            <span className="text-white/20">·</span>
            <Link href="/register" className="hover:text-white transition-colors">Create Account</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function ComingSoonPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#07080A] flex items-center justify-center text-white font-mono text-sm">
        Initializing Tuned Draws Arena...
      </div>
    }>
      <ComingSoonContent />
    </Suspense>
  );
}
