import type { Metadata } from "next";
import SustainabilityClient from "@/components/SustainabilityClient";

export const metadata: Metadata = {
  title: "Environmental Sustainability & ZDHC Level 3 | Devnandan Group",
  description: "Learn about the ecological commitment of Devnandan Group. ZLD-ready effluent treatment plant, 92% solvent recycle rate, ZDHC Level 3 compliance, and APEO/PFAS-free specialty binders.",
  keywords: [
    "ZDHC Level 3 India",
    "APEO NPEO free textile binders",
    "Zero Liquid Discharge chemical plant",
    "PFAS Free emulsions packaging"
  ],
  alternates: {
    canonical: "https://devnandan.co.in/sustainability",
  }
};

export default function SustainabilityPage() {
  return <SustainabilityClient />;
}
