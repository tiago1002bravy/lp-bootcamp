import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "ClickUp Bootcamp • IA + Processos em 12 dias",
  description:
    "A primeira metodologia que integra ClickUp + Make + IA para automatizar processos de ponta a ponta. 11 a 23 de Agosto.",
  metadataBase: new URL("https://lp.local"),
  openGraph: {
    title: "ClickUp Bootcamp • IA + Processos em 12 dias",
    description:
      "Integre IA aos processos (ClickUp + Make + ChatGPT) e organize sua empresa inteira em 12 dias.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-radial pointer-events-none fixed inset-0 -z-10" />
        {children}
      </body>
    </html>
  );
}
