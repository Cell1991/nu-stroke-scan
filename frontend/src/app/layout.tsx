import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "NU Stroke Scan · Clinical Decision Support",
  description: "Non-Contrast Brain CT Stroke Lesion Segmentation & Neuro-Imaging Decision Support",
  icons: {
    icon: "/brand_icon_trans.png",
    shortcut: "/brand_icon_trans.png",
    apple: "/brand_icon_trans.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${manrope.variable} ${spaceGrotesk.variable} font-sans`}>{children}</body></html>;
}
