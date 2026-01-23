import "./globals.css";

import { LoanProvider } from "./providers/LoanContext";
import { DM_Sans, Geist } from "next/font/google";
import type { Metadata } from "next";

const bodyFont = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Geist({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aether",
  description: "Loan simulation dashboard",
  icons: {
    icon: "/favicon-aether.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body className="min-h-screen text-white antialiased font-[var(--font-body)]">
        {/* === BACKGROUND === */}
        <div className="fixed inset-0 -z-10">
          <img
            src="/backgrounds/wave.webp"
            alt=""
            className="w-full h-full object-cover brightness-[1.2] contrast-[1.15] select-none pointer-events-none"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#05070f]/70 via-[#0b1230]/40 to-[#05070f]/80" />
        </div>

        {/* === APP FRAME === */}
        <LoanProvider>
          <div className="flex min-h-screen">
            
            <main className="flex-1 flex justify-center items-start">
              {children}
            </main>
          </div>
        </LoanProvider>
      </body>
    </html>
  );
}
