import type { Metadata } from "next";
import ContactClient from "@/components/ContactClient";

export const metadata: Metadata = {
  title: "Contact Devnandan Group | B2B Procurement and Chemical Factories",
  description: "Get in touch with Devnandan Group's R&D, corporate offices in Ahmedabad, and chemical/packaging factories in Kadi and Mehsana. Submit synthesis and bulk HDPE packaging volume inquiries.",
  keywords: [
    "Contact Devnandan Group",
    "Chemical Factory Kadi Mehsana",
    "Devnandan office Ahmedabad",
    "Procurement inquiry Devnandan"
  ],
  alternates: {
    canonical: "https://devnandan.co.in/contact",
  }
};

export default function ContactPage() {
  return <ContactClient />;
}
