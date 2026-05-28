import type { Metadata } from "next";
import OrganicsClient from "@/components/OrganicsClient";

export const metadata: Metadata = {
  title: "Devnandan Organics | Custom Synthesis & Contract Manufacturing",
  description: "Devnandan Organics is a specialized division of Devnandan Group, providing contract manufacturing and custom synthesis of high-purity organic intermediates.",
  keywords: [
    "Custom Synthesis India",
    "Contract Chemical Manufacturing",
    "Organic Intermediates Synthesis",
    "Devnandan Organics"
  ],
  alternates: {
    canonical: "https://devnandan.co.in/organics",
  }
};

export default function OrganicsPage() {
  return <OrganicsClient />;
}
