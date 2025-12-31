import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import Sidebar from "./components/Sidebar";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  variable: "--font-jakarta",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen text-white antialiased ${plusJakarta.variable}`}>

        {/* Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-black/45" />
        </div>

        {/* App Frame */}
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
