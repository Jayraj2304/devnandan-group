import type { Metadata } from "next";
import PlastoPackClient from "@/components/PlastoPackClient";

export const metadata: Metadata = {
  title: "Devnandan Plasto Pack | Industrial HDPE Packaging",
  description: "Devnandan Plasto Pack designs and manufactures heavy-duty, leak-proof HDPE plastic packaging containers from 20L to 60L featuring B&R Parison wall thickness control.",
  keywords: [
    "Industrial HDPE Packaging",
    "Jerry Cans Manufacturer India",
    "Mauser Type plastic drums",
    "Food grade virgin HDPE containers"
  ],
  alternates: {
    canonical: "https://devnandan.co.in/plastopack",
  }
};

export default function PlastoPackPage() {
  return <PlastoPackClient />;
}
