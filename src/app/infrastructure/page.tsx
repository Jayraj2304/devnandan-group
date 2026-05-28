import type { Metadata } from "next";
import InfrastructureClient from "@/components/InfrastructureClient";

export const metadata: Metadata = {
  title: "Industrial Infrastructure | Devnandan Group Plant Capacity",
  description: "Explore the scale and capacity of Devnandan Group's manufacturing plants. 38,500 sq ft chemical synthesis reactors from 1-6 kL, Class 10000 cleanroom, and 200-point B&R parison blow molding containers.",
  keywords: [
    "Chemical Synthesis Infrastructure",
    "Glass-lined Reactor Capacity",
    "B&R Parison blow molding machinery",
    "Devnandan manufacturing facilities"
  ],
  alternates: {
    canonical: "https://devnandan.co.in/infrastructure",
  }
};

export default function InfrastructurePage() {
  return <InfrastructureClient />;
}
