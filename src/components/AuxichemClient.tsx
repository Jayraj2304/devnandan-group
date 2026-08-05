"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import ThreeCanvas from "@/components/ThreeCanvas";

gsap.registerPlugin(ScrollTrigger);

export default function AuxichemClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All Categories");

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

    // 3b. Sub-Brands reveal
    gsap.fromTo(
      ".subbrand-card",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1, scrollTrigger: { trigger: ".subbrands-grid", start: "top 85%" } }
    );

    // 4. Specs Table reveal
    gsap.fromTo(
      ".specs-table-row",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.1, scrollTrigger: { trigger: ".specs-section", start: "top 85%" } }
    );
  }, { scope: containerRef });

  const stats = [
    { value: "2 MT → 60 MT", label: "PRODUCTION SCALE" },
    { value: "99.60%", label: "BATCH CONSISTENCY" },
    { value: "7 DAYS", label: "TURNAROUND LEAD TIME" },
    { value: "STP / MTP R&D REPORT", label: "COMPLIANCE & QUALITY ASSURANCE" },
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
    { name: "Denicryl 3000", composition: "Self-Crosslinking Acrylic Co-polymer", appearance: "Milky White Emulsion", solid: "50% ± 1", ph: "8.0 - 9.0", viscosity: "200 - 500 cPs", category: "Textile Binders" },
    { name: "Kaizen PF", composition: "Aqueous Polyurethane Dispersion", appearance: "Translucent Liquid", solid: "35% ± 1", ph: "7.0 - 8.0", viscosity: "50 - 150 cPs", category: "Paint Binders" },
    { name: "Auxibond S-400", composition: "Styrene Acrylic Emulsion Polymer", appearance: "Milky White Liquid", solid: "48% ± 1", ph: "8.5 - 9.5", viscosity: "100 - 300 cPs", category: "Industrial Adhesives" },
  ];

  return (
    <div ref={containerRef} className="w-full bg-[#f8f9fa] text-black">
      {/* Background WebGL */}
      <ThreeCanvas />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto" aria-labelledby="auxi-heading">
        <div className="flex flex-col lg:flex-row items-center gap-12">
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
            </div>
          </div>

          <div className="flex-shrink-0 w-full max-w-[280px] lg:max-w-[320px]">
            <div className="border border-[#e1e3e4] bg-white p-6 flex flex-col gap-4 h-full">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] tracking-widest text-[#555f70]">REACTOR R-04 · LIVE</span>
                <span className="h-2 w-2 rounded-full bg-[#191c1d] animate-pulse" />
              </div>
              <svg viewBox="0 0 280 320" className="flex-1 max-h-[280px] w-full" aria-hidden="true">
                <defs>
                  <linearGradient id="reactor-liq" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#191c1d" stopOpacity="0.25"/>
                    <stop offset="1" stopColor="#191c1d" stopOpacity="0.4"/>
                  </linearGradient>
                  <clipPath id="reactor-clip">
                    <path d="M 70 80 L 70 240 Q 70 280 110 280 L 170 280 Q 210 280 210 240 L 210 80 Z"/>
                  </clipPath>
                </defs>
                {/* Reactor outline */}
                <path d="M 70 60 L 210 60 L 210 80 L 70 80 Z" fill="none" stroke="#191c1d" strokeWidth="1.2"/>
                <path d="M 70 80 L 70 240 Q 70 280 110 280 L 170 280 Q 210 280 210 240 L 210 80" fill="none" stroke="#191c1d" strokeWidth="1.2"/>
                {/* Liquid */}
                <g clipPath="url(#reactor-clip)">
                  <rect x="60" y="160" width="160" height="200" fill="url(#reactor-liq)"/>
                  <path d="M 60 160 Q 100 152 140 160 T 220 160 L 220 180 L 60 180 Z" fill="#191c1d" opacity="0.2">
                    <animate attributeName="d" dur="3s" repeatCount="indefinite"
                      values="M 60 160 Q 100 152 140 160 T 220 160 L 220 180 L 60 180 Z;
                              M 60 160 Q 100 168 140 160 T 220 160 L 220 180 L 60 180 Z;
                              M 60 160 Q 100 152 140 160 T 220 160 L 220 180 L 60 180 Z"/>
                  </path>
                  {/* Rising particles */}
                  {Array.from({ length: 14 }).map((_, i) => (
                    <circle key={i} cx={80 + ((i * 11) % 120)} cy={260} r="2" fill="#fff" stroke="#555f70" strokeWidth="0.5" opacity="0.7">
                      <animate attributeName="cy" dur={`${3 + i * 0.2}s`} repeatCount="indefinite" values="260;180;260"/>
                      <animate attributeName="opacity" dur={`${3 + i * 0.2}s`} repeatCount="indefinite" values="0;0.7;0"/>
                    </circle>
                  ))}
                </g>
                {/* Stirrer shaft (static) */}
                <line x1="140" y1="40" x2="140" y2="240" stroke="#191c1d" strokeWidth="1.5"/>
                {/* Stirrer blades (rotating around 140,240) */}
                <g>
                  <line x1="100" y1="240" x2="180" y2="240" stroke="#191c1d" strokeWidth="2"/>
                  <line x1="110" y1="250" x2="170" y2="230" stroke="#191c1d" strokeWidth="2"/>
                  <animateTransform attributeName="transform" type="rotate" from="0 140 240" to="360 140 240" dur="1.2s" repeatCount="indefinite"/>
                </g>
                {/* Inlet/outlet labels */}
                <line x1="40" y1="100" x2="70" y2="100" stroke="#191c1d" strokeWidth="1.5"/>
                <line x1="210" y1="260" x2="240" y2="260" stroke="#191c1d" strokeWidth="1.5"/>
                <text x="40" y="92" fontSize="8" fontFamily="monospace" fill="#555f70" letterSpacing="1">MONOMER FEED</text>
                <text x="240" y="252" fontSize="8" fontFamily="monospace" fill="#555f70" letterSpacing="1" textAnchor="end">DISCHARGE</text>
              </svg>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "TEMP", value: "78.2°C" },
                  { label: "RPM", value: "240" },
                  { label: "pH", value: "7.4" },
                  { label: "VOLUME", value: "4.2 m³" },
                ].map((item) => (
                  <div key={item.label} className="border border-[#e1e3e4] p-2 flex flex-col gap-0.5">
                    <span className="font-mono text-[10px] uppercase text-[#555f70]">{item.label}</span>
                    <span className="font-mono text-sm font-bold text-black">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Compatibility Badges */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto pb-12" aria-label="Environmental Compatibility Badges">
        <div className="flex flex-wrap gap-3">
          {["APEO Free", "NPEO Free", "PFAS Free", "ZDHC Level 3"].map((badge) => (
            <span key={badge} className="inline-flex items-center px-4 py-2 border border-black font-mono text-xs tracking-widest uppercase font-bold text-black rounded-none">
              {badge}
            </span>
          ))}
        </div>
      </section>

      {/* 5-Column Data Bar */}
      <section className="data-bar border-y border-black bg-white select-none relative z-10" aria-label="Auxichem Compliance Data">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-center">
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

      {/* Sub-Brands Showcase */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-white border-t border-[#e1e3e4]" aria-labelledby="subbrands-heading">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs text-[#555f70] uppercase tracking-widest font-bold">
              group sub-brand portfolio
            </span>
            <h2 id="subbrands-heading" className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-black">
              Sub-Brands
            </h2>
          </div>
          <div className="subbrands-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="subbrand-card bg-white border border-[#e1e3e4] hover:border-black p-8 flex flex-col justify-between h-[280px] rounded-none transition-colors duration-300">
              <div className="flex flex-col gap-4">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4L36 36H4L20 4Z" stroke="#191c1d" strokeWidth="2" />
                </svg>
                <h3 className="font-sans text-xl font-bold text-black">Brand Alpha</h3>
                <p className="font-sans text-xs text-[#555f70] leading-relaxed">Textile-grade binder systems engineered for high-throughput lines.</p>
              </div>
            </div>
            <div className="subbrand-card bg-white border border-[#e1e3e4] hover:border-black p-8 flex flex-col justify-between h-[280px] rounded-none transition-colors duration-300">
              <div className="flex flex-col gap-4">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="16" stroke="#191c1d" strokeWidth="2" />
                </svg>
                <h3 className="font-sans text-xl font-bold text-black">Brand Beta</h3>
                <p className="font-sans text-xs text-[#555f70] leading-relaxed">Industrial adhesive solutions for demanding structural applications.</p>
              </div>
            </div>
            <div className="subbrand-card bg-white border border-[#e1e3e4] hover:border-black p-8 flex flex-col justify-between h-[280px] rounded-none transition-colors duration-300">
              <div className="flex flex-col gap-4">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="6" width="28" height="28" stroke="#191c1d" strokeWidth="2" />
                </svg>
                <h3 className="font-sans text-xl font-bold text-black">Brand Gamma</h3>
                <p className="font-sans text-xs text-[#555f70] leading-relaxed">Co-polymer dispersions optimized for paint and coating formulations.</p>
              </div>
            </div>
            <div className="subbrand-card bg-white border border-[#e1e3e4] hover:border-black p-8 flex flex-col justify-between h-[280px] rounded-none transition-colors duration-300">
              <div className="flex flex-col gap-4">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 4L36 20L20 36L4 20L20 4Z" stroke="#191c1d" strokeWidth="2" />
                </svg>
                <h3 className="font-sans text-xl font-bold text-black">Brand Delta</h3>
                <p className="font-sans text-xs text-[#555f70] leading-relaxed">Specialty polymer emulsions for niche industrial bonding needs.</p>
              </div>
            </div>
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

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {["All Categories", ...categories.map((cat) => cat.title)].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`font-mono text-xs uppercase tracking-widest border border-black px-4 py-2 rounded-none transition-all duration-300 font-bold cursor-pointer ${
                  activeCategory === tab
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-[#edeeef]"
                }`}
              >
                {tab}
              </button>
            ))}
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
                {specRows
                  .filter((row) => activeCategory === "All Categories" || row.category === activeCategory)
                  .map((row) => (
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
