import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flutter Widget Odyssey",
  description:
    "Experience an immersive, animated journey through an interactive Flutter widget with parallax storytelling and live code previews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground transition-colors duration-500`}
      >
        <ThemeProvider>
          <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
            {/* gradient backdrop */}
            <div className="pointer-events-none fixed inset-0 -z-10">
              <div className="absolute inset-0 bg-mesh-light opacity-80 transition-opacity duration-700 dark:bg-mesh-dark dark:opacity-100" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--glow-rgb),0.22),transparent_55%)] blur-3xl" />
            </div>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
