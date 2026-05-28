"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, FileText, CheckCircle2 } from "lucide-react";
import ThreeCanvas from "@/components/ThreeCanvas";

gsap.registerPlugin(ScrollTrigger);

// Jerry Can Blueprint SVG Icon
function JerryCanSvg() {
  return (
    <svg viewBox="0 0 100 120" className="h-40 w-40 text-black stroke-[1px] stroke-black fill-none select-none">
      {/* Outer Jerry Can container path */}
      <path d="M25,25 L75,25 L75,110 L25,110 Z" />
      {/* Handle */}
      <path d="M40,25 L40,12 L60,12 L60,25" />
      {/* Spout Cap */}
      <rect x="28" y="15" width="10" height="10" />
      {/* Grip lines */}
      <line x1="35" y1="40" x2="65" y2="40" />
      <line x1="35" y1="65" x2="65" y2="65" />
      <line x1="35" y1="90" x2="65" y2="90" />
      {/* Blueprint grid dots background */}
      <circle cx="50" cy="52" r="1" className="fill-black" />
    </svg>
  );
}

// Mauser Type Drum Blueprint SVG
function MauserDrumSvg() {
  return (
    <svg viewBox="0 0 100 120" className="h-40 w-40 text-black stroke-[1px] stroke-black fill-none select-none">
      {/* Cylinder outer boundary */}
      <rect x="25" y="15" width="50" height="95" />
      {/* Top and Bottom Caps */}
      <ellipse cx="50" cy="15" rx="25" ry="5" />
      <ellipse cx="50" cy="110" rx="25" ry="5" />
      {/* Structural reinforcing rings */}
      <line x1="25" y1="45" x2="75" y2="45" />
      <line x1="25" y1="80" x2="75" y2="80" />
      {/* Top handles/spouts */}
      <circle cx="38" cy="11" r="3" />
      <circle cx="62" cy="11" r="3" />
    </svg>
  );
}

// Rocket Type Drum Blueprint SVG
function RocketDrumSvg() {
  return (
    <svg viewBox="0 0 100 120" className="h-40 w-40 text-black stroke-[1px] stroke-black fill-none select-none">
      {/* Outer body with tapered shoulders */}
      <path d="M30,22 L70,22 L75,32 L75,108 L25,108 L25,32 Z" />
      {/* Reinforcing rings */}
      <path d="M25,50 L75,50" />
      <path d="M25,75 L75,75" />
      {/* Cap ring */}
      <rect x="42" y="14" width="16" height="8" />
      {/* Handle detail */}
      <path d="M35,22 L35,16 L42,16" />
      <path d="M65,22 L65,16 L58,16" />
    </svg>
  );
}

// Open Top Drum Blueprint SVG
function OpenTopSvg() {
  return (
    <svg viewBox="0 0 100 120" className="h-40 w-40 text-black stroke-[1px] stroke-black fill-none select-none">
      {/* Tapered open top container barrel */}
      <path d="M28,20 L72,20 L75,110 L25,110 Z" />
      {/* Top open lid rim ring */}
      <rect x="26" y="16" width="48" height="4" />
      {/* Lid metal lock band */}
      <rect x="25" y="24" width="50" height="3" />
      {/* Hand grips */}
      <path d="M25,48 L18,48 L18,58 L25,58" />
      <path d="M75,48 L82,48 L82,58 L75,58" />
    </svg>
  );
}

export default function PlastoPackClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Hero text reveal
    gsap.fromTo(
      ".reveal-plasto-hero",
      { y: 45, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: "power4.out", stagger: 0.1 }
    );

    // 2. Specs Bar reveal
    gsap.fromTo(
      ".data-bar-cell",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.08, scrollTrigger: { trigger: ".data-bar", start: "top 90%" } }
    );

    // 3. Catalog Grid reveal
    gsap.fromTo(
      ".catalog-cell",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.1, scrollTrigger: { trigger: ".catalog-grid", start: "top 85%" } }
    );

    // 4. QC Matrix reveal
    gsap.fromTo(
      ".qc-row",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.08, scrollTrigger: { trigger: ".qc-section", start: "top 85%" } }
    );
  }, { scope: containerRef });

  const stats = [
    { value: "200-POINT", label: "PARISON CONTROL" },
    { value: "100% VIRGIN", label: "HDPE FOOD-GRADE" },
    { value: "DOUBLE LAYER", label: "FUSION TECHNOLOGY" },
    { value: "UN APPROVED", label: "SAFETY STANDARDS" },
  ];

  const catalog = [
    {
      title: "20L / 25L Mauser Type",
      desc: "Standard heavy-duty industrial drums with double-seal caps suitable for chemical formulation transport.",
      svg: <MauserDrumSvg />,
    },
    {
      title: "35L Jerry Can",
      desc: "Compact, rectangular footprint optimization featuring calibrated top handles and pouring caps.",
      svg: <JerryCanSvg />,
    },
    {
      title: "50L / 55L Rocket Type",
      desc: "Heavyweight shipping drums featuring interlocking profiles for safe stacking, base slots, and high-impact corners.",
      svg: <RocketDrumSvg />,
    },
    {
      title: "35L / 60L Full Open Top",
      desc: "Wide-mouth containers with galvanised steel locking rings for thick polymers, slurries, and solid chemical intermediates.",
      svg: <OpenTopSvg />,
    },
  ];

  const qcMatrix = [
    { name: "Cap Fitment & Torque Test", desc: "Thread tolerance check, torque pressure calibration, zero gas leak checks.", status: "100% PASS" },
    { name: "Wall Thickness Distribution Check", desc: "Ultrasonic sensor verification along 200 parison points to ensure base corners thickness.", status: "100% PASS" },
    { name: "Vertical Drop Test", desc: "Full container drops from 1.8 meters on concrete at extreme low-temperature configs.", status: "1.8M RATED" },
    { name: "Hydraulic Leak Test", desc: "Compressed air internal load checks to verify lock-seals and cap gaskets.", status: "0.2 BAR PASS" },
    { name: "Stack Load Compression Test", desc: "Continuous weight stacking for 28 days under simulated 45°C warehousing conditions.", status: "3-TIER PASS" },
  ];

  const handleDownloadBrochure = () => {
    alert("Downloading Plasto Pack Division Profile PDF. (Mock Action)");
  };

  return (
    <div ref={containerRef} className="w-full bg-[#f8f9fa] text-black">
      {/* Background WebGL */}
      <ThreeCanvas />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto" aria-labelledby="plasto-heading">
        <div className="flex flex-col gap-6 max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-widest text-[#555f70] font-bold reveal-plasto-hero">
            DEVNANDAN PLASTO PACK
          </span>
          <h1
            id="plasto-heading"
            className="font-sans text-4xl md:text-7xl font-bold tracking-tight text-black leading-[1.1] reveal-plasto-hero"
          >
            World-Class HDPE Packaging.
          </h1>
          <p className="font-sans text-sm md:text-lg text-[#555f70] leading-relaxed max-w-[550px] mt-2 reveal-plasto-hero">
            Premium-quality, leak-proof industrial plastic packaging containers engineered for hazardous fluids and food-grade raw materials storage.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 reveal-plasto-hero">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3.5 font-mono text-xs tracking-widest uppercase bg-black text-white hover:bg-white hover:text-black hover:border-black border border-transparent transition-all duration-300 rounded-none font-bold gap-2"
            >
              Request container quote <ArrowRight size={14} />
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
      <section className="data-bar border-y border-black bg-white select-none relative z-10" aria-label="Plasto Pack Engineering Data">
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
            aria-label="Download Plasto Pack Division Profile PDF"
          >
            ↓ Download Division Profile
          </button>
        </div>
      </section>

      {/* Product Catalog Grid (Bento style SVGs) */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-white" aria-labelledby="catalog-heading">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs text-[#555f70] uppercase tracking-widest font-bold">
              container classification
            </span>
            <h2
              id="catalog-heading"
              className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-black"
            >
              Product Catalog
            </h2>
          </div>

          {/* Blueprint style grid */}
          <div className="catalog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-[#e1e3e4] rounded-none overflow-hidden">
            {catalog.map((item) => (
              <div
                key={item.title}
                className="catalog-cell bg-white border border-[#e1e3e4] hover:bg-[#f8f9fa] hover:border-black p-6 md:p-8 rounded-none shadow-none flex flex-col items-center justify-between min-h-[420px] transition-all duration-300"
              >
                {/* SVG Visual blueprint container */}
                <div className="h-48 w-full flex items-center justify-center bg-[#f8f9fa] border border-[#e1e3e4] rounded-none p-4 relative group-hover:bg-white transition-colors duration-300 select-none">
                  {item.svg}
                </div>

                <div className="flex flex-col gap-3 w-full mt-6">
                  <h3 className="font-sans text-lg font-bold text-black leading-snug">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-[#555f70] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-black hover:text-[#555f70] font-bold self-start mt-4 border-b border-black pb-0.5"
                >
                  Configure Container <ArrowRight size={10} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Control Matrix (Technical Checklist) */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#f8f9fa] border-t border-[#e1e3e4] qc-section" aria-labelledby="qc-heading">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs text-[#555f70] uppercase tracking-widest font-bold">
              structural reliability checks
            </span>
            <h2
              id="qc-heading"
              className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-black"
            >
              Quality Control Matrix
            </h2>
          </div>

          {/* Boxed list checklist */}
          <div className="flex flex-col border border-black rounded-none overflow-hidden shadow-none">
            {qcMatrix.map((item, idx) => (
              <div
                key={idx}
                className="qc-row flex flex-col md:flex-row justify-between items-start md:items-center p-6 border-b border-[#e1e3e4] bg-white last:border-b-0 hover:bg-[#f8f9fa]/50 transition-colors duration-300"
              >
                <div className="flex gap-4 items-center">
                  <CheckCircle2 size={18} className="text-black flex-shrink-0" />
                  <div className="flex flex-col font-sans">
                    <span className="text-sm font-bold text-black">{item.name}</span>
                    <span className="text-xs text-[#555f70] leading-relaxed">{item.desc}</span>
                  </div>
                </div>
                <span className="mt-4 md:mt-0 font-mono text-[10px] tracking-widest uppercase bg-[#f9fafb] border border-[#e1e3e4] px-3 py-1.5 font-bold text-[#555f70] rounded-none">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
