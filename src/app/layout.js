import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Colabify — Ads, Social & Conversion",
  description:
    "Colabify runs performance ad campaigns, social and influencer marketing, and creative that converts — for brands that need pipeline, not vanity metrics.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="cb-grid min-h-screen">
          <div className="relative min-h-screen">
            <div className="cb-noise" />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
