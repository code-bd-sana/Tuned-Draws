import { StatItem } from "../../types/homepage.types";
import { Draw } from "../../types/draw.types";

export interface HeroData {
  badgeText: string;
  headingText: string;
  paragraphText: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  stats: StatItem[];
  featuredDraw: Draw;
}

export const heroData: HeroData = {
  badgeText: "WEDDING PRIZES, BRIDAL WEAR & HONEYMOONS",
  headingText: "Win Your Dream Wedding & Luxury Prizes",
  paragraphText: "Enter premium wedding draws from just £1 per ticket. Fair, transparent & fully verified. Over £180k in dream weddings, bridal wear & luxury honeymoons won by our community.",
  primaryCtaLabel: "Browse Live Draws",
  primaryCtaHref: "#live-draws",
  secondaryCtaLabel: "How It Works",
  secondaryCtaHref: "#how-it-works",
  stats: [
    {
      id: "hero-stat-1",
      value: "2,400",
      label: "Draws Completed",
    },

    {
      id: "hero-stat-3",
      value: "Verified",
      label: "Fair Draws",
    },
  ],
  featuredDraw: {
    id: "hero-feat-1",
    title: "Luxury 7-Night Maldives Honeymoon & Resort Package",
    description: "Worth £2,400. All-inclusive luxury resort stay with flights included, private beach villa, and romantic candlelit dinner experiences.",
    image: "/images/wedding-hero.png",
    ticketPrice: 2.50,
    totalTickets: 500,
    soldTickets: 342,
    endDate: "Ends in 2d 4h",
    status: "live",
    category: "honeymoons",
    worthPrice: 2400,
    isFeatured: true,
  },
};

//   s = {tt, th, hh, ht}
//  a complimant = 1/4
//  e = 1 - 1/4 = 3/4
