import "./globals.css";
import Sidebar from "./components/Sidebar";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  variable: "--font-app",
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
      className={dmSans.variable}
      // 👇 alias --font-jakarta so old components still work
      style={{
        ["--font-jakarta" as any]: "var(--font-app)",
      }}
    >
      <body className="min-h-screen text-white antialiased font-[var(--font-app)]">

        {/* Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* Frame */}
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
