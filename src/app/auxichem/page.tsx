import type { Metadata } from "next";
import AuxichemClient from "@/components/AuxichemClient";

export const metadata: Metadata = {
  title: "Devnandan Auxichem LLP | Specialty Binders & Emulsions",
  description: "Devnandan Auxichem LLP manufactures specialty binders, polymer emulsions, industrial adhesives, and construction chemicals complying with ZDHC Level 3 requirements.",
  keywords: [
    "Specialty Binders India",
    "Polymer Emulsions Manufacturing",
    "APEO free textile binders",
    "Industrial Adhesives Auxichem"
  ],
  alternates: {
    canonical: "https://devnandan.co.in/auxichem",
  }
};

export default function AuxichemPage() {
  return <AuxichemClient />;
}
