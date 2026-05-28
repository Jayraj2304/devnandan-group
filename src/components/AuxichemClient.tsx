"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, FileText, Beaker } from "lucide-react";
import ThreeCanvas from "@/components/ThreeCanvas";

gsap.registerPlugin(ScrollTrigger);

export default function AuxichemClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Hero text reveal
    gsap.fromTo(
      ".reveal-auxi-hero",
      { y: 45, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: "power4.out", stagger: 0.1 }
    );

    // 2. Data Bar reveal
    gsap.fromTo(
      ".data-bar-cell",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.08, scrollTrigger: { trigger: ".data-bar", start: "top 90%" } }
    );

    // 3. Bento Grid reveal
    gsap.fromTo(
      ".bento-card",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1, scrollTrigger: { trigger: ".bento-grid", start: "top 85%" } }
    );

    // 4. Specs Table reveal
    gsap.fromTo(
      ".specs-table-row",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.1, scrollTrigger: { trigger: ".specs-section", start: "top 85%" } }
    );
  }, { scope: containerRef });

  const stats = [
    { value: "APEO FREE", label: "ENVIRONMENTAL STANDARD" },
    { value: "NPEO FREE", label: "ENVIRONMENTAL STANDARD" },
    { value: "PFAS FREE", label: "CHEMISTRY COMPLIANCE" },
    { value: "LEVEL 3", label: "ZDHC CERTIFICATION" },
  ];

  const categories = [
    {
      title: "Textile Binders",
      desc: "Water-based emulsion polymers designed for printing, dyeing, and stiffening operations in apparel fabrication.",
    },
    {
      title: "Paint Binders",
      desc: "Co-polymer binders optimizing pigment loading, adhesion, and exterior weatherability metrics.",
    },
    {
      title: "Adhesives",
      desc: "Industrial formulations providing high shear strength, heat resistance, and customized curing parameters.",
    },
  ];

  const specRows = [
    { name: "Denicryl 3000", composition: "Self-Crosslinking Acrylic Co-polymer", appearance: "Milky White Emulsion", solid: "50% ± 1", ph: "8.0 - 9.0", viscosity: "200 - 500 cPs" },
    { name: "Kaizen PF", composition: "Aqueous Polyurethane Dispersion", appearance: "Translucent Liquid", solid: "35% ± 1", ph: "7.0 - 8.0", viscosity: "50 - 150 cPs" },
    { name: "Auxibond S-400", composition: "Styrene Acrylic Emulsion Polymer", appearance: "Milky White Liquid", solid: "48% ± 1", ph: "8.5 - 9.5", viscosity: "100 - 300 cPs" },
  ];

  const handleDownloadBrochure = () => {
    alert("Downloading Auxichem Division Profile PDF. (Mock Action)");
  };

  return (
    <div ref={containerRef} className="w-full bg-[#f8f9fa] text-black">
      {/* Background WebGL */}
      <ThreeCanvas />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto" aria-labelledby="auxi-heading">
        <div className="flex flex-col gap-6 max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-widest text-[#555f70] font-bold reveal-auxi-hero">
            DEVNANDAN AUXICHEM LLP
          </span>
          <h1
            id="auxi-heading"
            className="font-sans text-4xl md:text-7xl font-bold tracking-tight text-black leading-[1.1] reveal-auxi-hero"
          >
            The Bond That Never Breaks.
          </h1>
          <p className="font-sans text-sm md:text-lg text-[#555f70] leading-relaxed max-w-[550px] mt-2 reveal-auxi-hero">
            Environmentally friendly, high-performance binders and polymer emulsions engineered for diverse industrial and textile manufacturing lines.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 reveal-auxi-hero">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3.5 font-mono text-xs tracking-widest uppercase bg-black text-white hover:bg-white hover:text-black hover:border-black border border-transparent transition-all duration-300 rounded-none font-bold gap-2"
            >
              Request formulation trial <ArrowRight size={14} />
            </Link>
            <button
              onClick={handleDownloadBrochure}
              className="inline-flex items-center justify-center px-6 py-3.5 font-mono text-xs tracking-widest uppercase bg-transparent border border-black text-black hover:bg-[#edeeef] transition-all duration-300 rounded-none cursor-pointer font-bold gap-2"
            >
              Download Brochure <FileText size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 5-Column Data Bar */}
      <section className="data-bar border-y border-black bg-white select-none relative z-10" aria-label="Auxichem Compliance Data">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 text-center">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="data-bar-cell p-6 border-b sm:border-b-0 sm:border-r border-[#e1e3e4] last:border-r-0 flex flex-col justify-center gap-1 min-h-[90px]"
            >
              <span className="font-mono text-base font-bold text-black uppercase">{stat.value}</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#555f70] font-bold">
                {stat.label}
              </span>
            </div>
          ))}
          {/* Interactive Brochure Cell */}
          <button
            onClick={handleDownloadBrochure}
            className="data-bar-cell p-6 bg-white text-black hover:bg-black hover:text-white border-t sm:border-t-0 sm:border-l border-black transition-all duration-300 font-mono text-xs tracking-widest uppercase text-center cursor-pointer flex items-center justify-center gap-2 font-bold min-h-[90px] rounded-none outline-none"
            aria-label="Download Auxichem Division Profile PDF"
          >
            ↓ Download Division Profile
          </button>
        </div>
      </section>

      {/* Product Categories (Bento Grid) */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-white" aria-labelledby="bento-heading">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs text-[#555f70] uppercase tracking-widest font-bold">
              product classification
            </span>
            <h2
              id="bento-heading"
              className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-black"
            >
              Binder Categories
            </h2>
          </div>

          {/* Bento grid layout */}
          <div className="bento-grid grid grid-cols-1 md:grid-cols-3 border border-[#e1e3e4] rounded-none overflow-hidden">
            {categories.map((cat) => (
              <div
                key={cat.title}
                className="bento-card bg-white border border-[#e1e3e4] hover:bg-[#f3f4f5] hover:border-black p-8 flex flex-col justify-between h-[280px] rounded-none shadow-none transition-colors duration-300"
              >
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-[10px] text-[#555f70] font-bold uppercase tracking-widest">
                    Operational Vector
                  </span>
                  <h3 className="font-sans text-2xl font-bold text-black leading-tight">
                    {cat.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-[#555f70] leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Single Inquire Specifications Button */}
          <div className="flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 font-mono text-xs tracking-widest uppercase bg-black text-white hover:bg-white hover:text-black border border-black transition-all duration-300 rounded-none font-bold gap-2"
            >
              Inquire Specifications <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Technical Specs Table (Spreadsheet design) */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#f8f9fa] border-t border-[#e1e3e4] specs-section" aria-labelledby="table-heading">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs text-[#555f70] uppercase tracking-widest font-bold">
              quality index parameters
            </span>
            <h2
              id="table-heading"
              className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-black"
            >
              Technical Specifications
            </h2>
          </div>

          {/* Spreadsheet table container */}
          <div className="overflow-x-auto border border-black rounded-none shadow-none">
            <table className="w-full text-left border-collapse bg-white font-sans text-xs">
              <thead>
                <tr className="bg-[#f9fafb] border-b border-black">
                  <th className="p-4 border-r border-black font-mono text-[10px] uppercase tracking-widest text-[#555f70] font-bold">
                    Product Name
                  </th>
                  <th className="p-4 border-r border-black font-mono text-[10px] uppercase tracking-widest text-[#555f70] font-bold">
                    Chemical Composition
                  </th>
                  <th className="p-4 border-r border-black font-mono text-[10px] uppercase tracking-widest text-[#555f70] font-bold">
                    Appearance
                  </th>
                  <th className="p-4 border-r border-black font-mono text-[10px] uppercase tracking-widest text-[#555f70] font-bold">
                    Solid %
                  </th>
                  <th className="p-4 border-r border-black font-mono text-[10px] uppercase tracking-widest text-[#555f70] font-bold">
                    pH
                  </th>
                  <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-[#555f70] font-bold">
                    Viscosity
                  </th>
                </tr>
              </thead>
              <tbody>
                {specRows.map((row) => (
                  <tr
                    key={row.name}
                    className="specs-table-row border-b border-[#e1e3e4] last:border-b-0 hover:bg-[#f3f4f5]/50 transition-colors duration-300"
                  >
                    <td className="p-4 border-r border-[#e1e3e4] font-mono text-xs font-bold text-black">
                      {row.name}
                    </td>
                    <td className="p-4 border-r border-[#e1e3e4] font-sans text-xs text-[#555f70]">
                      {row.composition}
                    </td>
                    <td className="p-4 border-r border-[#e1e3e4] font-sans text-xs text-[#555f70]">
                      {row.appearance}
                    </td>
                    <td className="p-4 border-r border-[#e1e3e4] font-mono text-xs text-[#191c1d]">
                      {row.solid}
                    </td>
                    <td className="p-4 border-r border-[#e1e3e4] font-mono text-xs text-[#191c1d]">
                      {row.ph}
                    </td>
                    <td className="p-4 font-mono text-xs text-[#191c1d]">
                      {row.viscosity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
