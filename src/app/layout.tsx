import "./globals.css";
import Sidebar from "./components/Sidebar";
import { DM_Sans } from "next/font/google";
import { Geist } from "next/font/google";

const bodyFont = DM_Sans({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Geist({
  subsets: ["latin"],
  weight: ["500","600","700","800"],
  variable: "--font-display",
  display: "swap",
});

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

          {/* Smooth gradient wash to hide texture */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#05070f]/70 via-[#0b1230]/40 to-[#05070f]/80" />
        </div>

        {/* === APP FRAME === */}
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 flex justify-center items-start">
            {children}
          </main>
        </div>

      </body>
    </html>
  );
}
