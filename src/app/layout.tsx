import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-white antialiased">

        {/* === BACKGROUND === */}
        <div className="fixed inset-0 -z-10">
          <img
            src="/backgrounds/aether-mediterranean-dawn.webp"   // ← drop the one you want here
            className="w-full h-full object-cover select-none"
            draggable={false}
          />

          {/* Overlay – we tune this per background */}
          <div className="absolute inset-0 bg-black/45" />

          {/* Optional blue tint for aquatic themes */}
          {/* <div className="absolute inset-0 bg-blue-500/10 mix-blend-soft-light" /> */}
        </div>

        {children}
      </body>
    </html>
  );
}
