import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { Toaster } from 'sonner';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Tuned Draws | Premium Automotive Sweepstakes & Builds',
  description:
    'Win track-ready supercars, custom high-horsepower builds, crate engines, and performance motorsport gear for less. Transparent, fair, and certified prize draws.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-[#0B0C0E] text-[#F3F4F6]">
        <Providers>{children}</Providers>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#12141C',
              border: '1px solid rgba(255, 30, 39, 0.25)',
              color: '#F3F4F6',
            },
            className: 'font-sans text-[14px]',
          }}
        />
      </body>
    </html>
  );
}
