import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import VerifiedHostsList from "../../components/website/verified-hosts/VerifiedHostsList";
import WebsiteNavbar from "../../components/website/layout/WebsiteNavbar";
import WebsiteFooter from "../../components/website/layout/WebsiteFooter";

export const metadata: Metadata = {
  title: "Verified Hosts | Wedding Draws",
  description: "Browse verified bridal boutiques, wedding venues, and luxury suppliers hosting authentic wedding competitions.",
};

export default async function VerifiedHostsPage() {
  let verifiedHosts = [];
  try {
    const apiUrl = process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api/v1';
    const res = await fetch(`${apiUrl}/hosts/verified`, {
      cache: 'no-store'
    });

    if (res.ok) {
      const json = await res.json();
      const rawHosts = json.data || json;
      if (Array.isArray(rawHosts)) {
        verifiedHosts = rawHosts.filter(
          (host: any) => host && host.isVerified === true && !host.isBlocked
        );
      }
    }
  } catch (err) {
    console.error("Failed to fetch verified hosts", err);
  }

  return (
    <>
      <WebsiteNavbar />
      <main className="flex-grow bg-[#14110F] bg-tachometer-grid text-white">
        <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#14110F] pt-28 pb-14 sm:pt-36 md:pb-16 text-white">
          <Image
            src="/images/wedding-hero.png"
            alt="Wedding Draws luxury wedding competitions and prizes"
            fill
            priority
            className="-z-20 object-cover object-[75%_center] lg:object-center opacity-65 contrast-115"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#14110F] via-[#14110F]/85 to-[#14110F]/50" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#14110F] via-[#14110F]/30 to-[#14110F]/85" />
          <div className="absolute -top-32 left-1/3 w-[650px] h-[450px] bg-[#D4A863]/12 rounded-full blur-[160px] pointer-events-none -z-10" />
          <div className="container-custom relative">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#D4A863]/30 bg-[#211C18]/90 px-4 py-2 font-heading text-[10px] font-black tracking-[.18em] text-[#E5DCCD] uppercase shadow-[0_0_15px_rgba(212,168,99,0.2)] backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#94632F] animate-pulse shadow-[0_0_8px_rgba(212,168,99,0.8)]" />
                Trusted Wedding Partners
              </span>
              <h1 className="mt-5 font-heading text-4xl font-black leading-[.92] tracking-tight text-white uppercase sm:text-5xl md:text-6xl">
                MEET OUR VERIFIED<br />
                <span className="text-[#D4A863] drop-shadow-[0_0_25px_rgba(212,168,99,0.55)]">
                  WEDDING HOSTS
                </span>
              </h1>
              <p className="mt-5 max-w-2xl rounded-2xl border border-white/10 bg-[#211C18]/80 p-4 font-sans text-sm font-medium leading-relaxed text-[#B6AA9C] shadow-2xl backdrop-blur-md sm:text-base">
                Explore the fully vetted bridal boutiques, historic venues, photographers, and luxury suppliers hosting auditable Wedding Draws competitions.
              </p>
            </div>
          </div>
        </section>
        <section className="relative py-12 md:py-16">
          <div className="container-custom relative">
            <VerifiedHostsList hosts={verifiedHosts} />
          </div>
        </section>
      </main>
      <WebsiteFooter />
    </>
  );
}
