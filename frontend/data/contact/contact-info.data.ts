import { ContactInfoCardItem } from "../../types/contact.types";

export const CONTACT_INFO_ITEMS: ContactInfoCardItem[] = [
  {
    id: "email",
    title: "Email Support",
    description: "Get in touch via official email.",
    value: "info@tuneddraws.com",
    href: "mailto:info@tuneddraws.com",
    type: "email",
  },
  {
    id: "whatsapp",
    title: "Wedding Support",
    description: "Chat directly with Wedding Draws Support on WhatsApp.",
    value: "07466 347548",
    href: "https://wa.me/447466347548?text=Hello%20Wedding%20Draws%20Customer%20Service%2C%20I%20have%20an%20inquiry",
    type: "whatsapp",
  },
  {
    id: "time",
    title: "Response Time",
    description: "Average turnaround time.",
    value: "Within 24 hours",
    type: "time",
  },
];
