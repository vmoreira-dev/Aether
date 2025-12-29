export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen text-white antialiased">
        <div className="fixed inset-0 -z-10">
          <img
            src="/backgrounds/aether-sunset.webp"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {children}
      </body>
    </html>
  );
}
