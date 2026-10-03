import { NavLink, SocialLink } from "../types/common.types";

export const BRAND_NAME = "Tuned Draws";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Competitions", href: "/live-raffles" },
  { label: "Winners", href: "/winners" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Verified Hosts", href: "/verified-hosts" },
  { label: "Contact", href: "/contact" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "Facebook", href: "https://facebook.com", iconName: "facebook" },
  { platform: "Instagram", href: "https://instagram.com", iconName: "instagram" },
];

export const FOOTER_SECTIONS = [
  {
    title: "Competitions",
    links: [
      { label: "All Live Draws", href: "/live-raffles" },
      { label: "Tuned Supercars & Builds", href: "/live-raffles?category=supercars" },
      { label: "Performance Engines & Turbos", href: "/live-raffles?category=performance" },
      { label: "Wheels, Brakes & Suspension", href: "/live-raffles?category=parts" },
      { label: "Track Days & VIP Experiences", href: "/live-raffles?category=experiences" },
    ],
  },
  {
    title: "For Hosts",
    links: [
      { label: "Start Hosting", href: "/#host-info" },
      { label: "Pricing & Fees", href: "/pricing" },
      { label: "Verified Hosts", href: "/verified-hosts" },
    ],
  },
  {
    title: "Support & Legal",
    links: [
      { label: "FAQ", href: "/#faq" },
      { label: "Contact Support", href: "/contact" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Free Entry Method", href: "/terms#free-entry" },
    ],
  },
];
