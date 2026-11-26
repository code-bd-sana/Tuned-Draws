'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Heart, MapPin, Sparkles } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { raffleService, type RecentWinner } from '@/services/raffle.service';

function WinnerAvatar({ winner }: { winner: RecentWinner }) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#e5d3b9] bg-[#f4eadc] font-serif text-lg text-[#9a713e]">
      {winner.avatarUrl && !imageFailed ? (
        <Image src={winner.avatarUrl} alt="" fill unoptimized sizes="56px" className="object-cover" onError={() => setImageFailed(true)} />
      ) : (winner.initials || winner.name?.charAt(0) || '✦')}
    </div>
  );
}

export default function WinnersSection() {
  const [winners, setWinners] = useState<RecentWinner[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    raffleService.getRecentWinners()
      .then(setWinners)
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="recent-winners" className="wedding-light winners-section relative overflow-hidden py-20 sm:py-24">
      <div className="container-custom relative z-10">
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="wedding-eyebrow mb-3 flex items-center gap-3"><span className="h-px w-9 bg-[#c8a36f]" /> Real people, special moments</p>
            <h2 className="text-4xl leading-tight sm:text-5xl">A Little Love, <span className="italic text-[#ad824a]">A Little Luck.</span></h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#766c60]">Every prize has a story. Meet the people behind some of our recent wins.</p>
          </div>
          <Link href="/winners" className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full border border-[#bd9a6b] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#76542c] transition hover:bg-[#eadcc9]">View all winners <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.6fr]">
          <div className="relative flex min-h-[290px] overflow-hidden rounded-sm bg-[#4a3829] sm:min-h-[340px] lg:min-h-[400px]">
            <Image src="/images/wedding-flowers.png" alt="" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
            <div className="winner-feature-copy relative mt-auto p-7 text-white sm:p-9">
              <Heart className="mb-4 h-7 w-7 text-[#eed2a4]" strokeWidth={1.2} />
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#efd2a2]">Moments worth celebrating</p>
              <p className="mt-3 max-w-xs font-serif text-3xl leading-tight sm:text-4xl" style={{ color: '#fffaf2', textShadow: '0 2px 12px rgba(0,0,0,0.65)' }}>Here&apos;s to happy beginnings.</p>
            </div>
          </div>

          {winners.length > 0 ? (
            <div className={`grid content-center gap-4 ${winners.length > 1 ? 'sm:grid-cols-2' : ''}`}>
              {winners.slice(0, 4).map((winner) => {
                const wonDate = new Date(winner.whenWon);
                const dateLabel = Number.isNaN(wonDate.getTime()) ? null : formatDistanceToNow(wonDate, { addSuffix: true });
                return (
                  <article key={winner.id} className="flex flex-col rounded-sm border border-[#e9ddce] bg-[#fffdf9] p-6 shadow-[0_10px_32px_rgba(82,59,31,0.05)] sm:p-8">
                    <div className="flex items-start gap-4">
                      <WinnerAvatar winner={winner} />
                      <div className="min-w-0 pt-1">
                        <h3 className="truncate font-serif text-xl font-normal text-[#29221b]">{winner.name}</h3>
                        {winner.location && <p className="mt-1 flex items-center gap-1 text-xs text-[#887d70]"><MapPin className="h-3 w-3 text-[#b69262]" />{winner.location}</p>}
                      </div>
                    </div>
                    <div className="mt-5 border-t border-[#eee5d9] pt-4">
                      <p className="wedding-eyebrow mb-1.5">Prize won</p>
                      <p className="line-clamp-2 font-serif text-lg leading-snug text-[#3b3024]">{winner.prizeWon}</p>
                      {dateLabel && <p className="mt-2 text-xs text-[#938575]">{dateLabel}</p>}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="flex min-h-[290px] flex-col items-center justify-center rounded-sm border border-[#e9ddce] bg-[#fffdf9] px-8 py-12 text-center sm:min-h-[340px] lg:min-h-[400px]">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#dfc9a8] bg-[#faf4eb] text-[#ad824a]"><Sparkles className="h-7 w-7" strokeWidth={1.2} /></div>
              <h3 className="font-serif text-2xl font-normal text-[#342b22]">{loading ? 'Gathering the latest stories' : failed ? 'Stories are taking a moment' : 'Your story could be next'}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#817668]">{loading ? 'Please wait while we load our recent winners.' : failed ? 'We couldn’t load recent winners just now. Please try again later.' : 'Our latest winner stories will be shared here as they become available.'}</p>
              {!loading && <Link href="/live-raffles" className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#946a35] hover:text-[#68491f]">Explore competitions <ArrowRight className="h-4 w-4" /></Link>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
