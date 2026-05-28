import type { Metadata } from "next";
import AboutClient from "@/components/AboutClient";

export const metadata: Metadata = {
  title: "About Devnandan Group | B2B Corporate Science & Chemistry Holding",
  description: "Learn about the heritage, corporate mission, and structural timeline of Devnandan Group - authority manufacturers of custom synthesis chemical intermediates, emulsions, and premium HDPE plastic packaging.",
  keywords: [
    "Devnandan Group Heritage",
    "Chemical Manufacturing History",
    "Corporate Mission Chemistry",
    "B2B Holding Group India"
  ],
  alternates: {
    canonical: "https://devnandan.co.in/about",
  }
};

export default function AboutPage() {
  return <AboutClient />;
}
