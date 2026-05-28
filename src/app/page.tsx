import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Devnandan Group | Advanced Chemistry & Industrial Packaging Solutions",
  description: "Devnandan Group is a leading B2B chemical and packaging holding company. Explore our specialized divisions in custom synthesis intermediates, specialty binders, and premium HDPE plastic packaging.",
  keywords: [
    "Devnandan Organics",
    "Devnandan Auxichem",
    "Devnandan Plasto Pack",
    "Custom Chemical Manufacturing India",
    "HDPE blow molding containers",
    "Specialty binders polymer emulsions"
  ],
  alternates: {
    canonical: "https://devnandan.co.in",
  }
};

export default function Home() {
  return <HomeClient />;
}
