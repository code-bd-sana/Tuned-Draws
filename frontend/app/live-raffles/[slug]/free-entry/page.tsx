import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import WebsiteNavbar from "../../../../components/website/layout/WebsiteNavbar";
import WebsiteFooter from "../../../../components/website/layout/WebsiteFooter";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const metadata: Metadata = {
  title: "Free Postal Entry Information | Wedding Draws",
};

export default async function FreeEntryPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <>
      <WebsiteNavbar />
      <main className="flex-grow bg-[#14110F] bg-tachometer-grid pt-28 pb-20 text-white selection:bg-[#94632F] selection:text-white">
        <div className="container-custom max-w-3xl">
          <Link
            href={`/live-raffles/${slug}`}
            className="text-xs font-heading font-bold uppercase tracking-wider text-[#B6AA9C] hover:text-[#D4A863] transition-colors flex items-center gap-1.5 mb-8 w-fit"
          >
            ← Back to Competition
          </Link>
          
          <div className="rounded-2xl border border-white/10 bg-[#211C18] p-6 shadow-2xl md:p-10">
            <h1 className="font-heading font-black text-3xl text-white mb-6 uppercase tracking-tight">
              Free Postal Entry Protocol
            </h1>
            
            <div className="space-y-6 text-sm text-[#B6AA9C] leading-relaxed font-sans">
              <p>
                To enter this competition for free by post, you must send an unenclosed postcard containing the following information:
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-[#D4A863]">
                <li><span className="text-[#E5DCCD]">The title of the wedding competition you wish to enter.</span></li>
                <li><span className="text-[#E5DCCD]">Your full legal name and residential address.</span></li>
                <li><span className="text-[#E5DCCD]">Your date of birth (you must be 18 or older).</span></li>
                <li><span className="text-[#E5DCCD]">Your contact telephone number and registered account email address.</span></li>
                <li><span className="text-[#E5DCCD]">The correct answer to the competition qualifying question (if applicable).</span></li>
              </ul>
              
              <div className="bg-[#302820] border border-white/10 p-5 rounded-xl my-6">
                <h3 className="font-heading font-bold text-white mb-2 uppercase text-xs tracking-wider">
                  Send your entry to:
                </h3>
                <p className="text-[#E5DCCD] font-mono text-xs leading-relaxed">
                  Wedding Draws Ltd<br />
                  Synergy House, Lawson Street<br />
                  North Shields<br />
                  NE29 6TG
                </p>
              </div>
              
              <p className="font-bold text-white font-heading text-xs uppercase tracking-wider">
                Regulatory Requirements:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#B6AA9C]">
                <li>Postal entries are limited to one entry per household per competition.</li>
                <li>Your entry must arrive before the closing date of the draw. Entries received after this date will not be processed.</li>
                <li>All free entries must be handwritten and clearly legible. Illegible entries will be disqualified.</li>
                <li>By submitting, you confirm you have read and agreed to our official Terms and Conditions.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <WebsiteFooter />
    </>
  );
}
