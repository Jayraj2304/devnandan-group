"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Database, Cpu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function InfrastructureClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<"chemical" | "packaging">("chemical");

  useGSAP(() => {
    // 1. Hero text reveal
    gsap.fromTo(
      ".reveal-infra-title",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.1 }
    );

    // 2. Smooth reveal animation for left visual panel on load
    gsap.fromTo(
      ".reveal-infra-card",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
    );

    // 3. Split screen scroll trigger (only on desktop >= 768px)
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Pin the left column while the right column scrolls
      ScrollTrigger.create({
        trigger: ".split-section",
        start: "top 15%",
        end: "bottom 95%",
        pin: leftColRef.current,
        pinSpacing: false,
        scrub: true,
      });

      // Section tracking to update the active state and visual representation on the left column
      ScrollTrigger.create({
        trigger: "#infra-chemical",
        start: "top 30%",
        end: "bottom 30%",
        onToggle: (self) => {
          if (self.isActive) setActiveSection("chemical");
        },
      });

      ScrollTrigger.create({
        trigger: "#infra-packaging",
        start: "top 30%",
        end: "bottom 30%",
        onToggle: (self) => {
          if (self.isActive) setActiveSection("packaging");
        },
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  const chemicalDetails = [
    { label: "FACILITY SIZE", value: "38,500 SQ FT" },
    { label: "PILOT REACTORS", value: "10L / 50L / 200L / 500L" },
    { label: "PRODUCTION REACTORS", value: "1 kL to 6 kL Capacity" },
    { label: "ANALYTICAL LAB", value: "Captive HPLC, GC, NMR, KF & IR" },
    { label: "ENVIRONMENT CONTROL", value: "Class 10000 Cleanroom" },
  ];

  const packagingDetails = [
    { label: "WALL THICKNESS CONTROL", value: "200-Point B&R Parison" },
    { label: "CONTAINER CAPACITIES", value: "20 Liters to 60 Liters" },
    { label: "RAW MATERIAL GRADE", value: "100% Virgin Food-Grade HDPE" },
    { label: "FABRICATION MODEL", value: "Precision Blow Molding" },
  ];

  return (
    <div ref={containerRef} className="w-full bg-[#f8f9fa] py-16 md:py-24 text-black">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20 flex flex-col gap-4 max-w-4xl" aria-labelledby="infra-heading">
        <span className="font-mono text-xs text-[#555f70] uppercase tracking-widest font-bold reveal-infra-title">
          industrial capacity
        </span>
        <h1 id="infra-heading" className="font-sans text-4xl md:text-6xl font-bold tracking-tight text-black leading-tight reveal-infra-title">
          Engineered for Scale & Precision.
        </h1>
        <p className="font-sans text-sm md:text-lg text-[#555f70] leading-relaxed reveal-infra-title">
          Our advanced fabrication sites host high-capacity reactors, custom synthesis equipment, cleanrooms, and computerized parison blow molding machinery to meet strict B2B delivery targets.
        </p>
      </section>

      {/* Split Screen Content Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 split-section relative" aria-label="Infrastructure Facilities Detail">
        {/* Left Column (Sticky Visual Panel) */}
        <div
          ref={leftColRef}
          className="w-full h-auto md:h-[65vh] flex flex-col justify-center"
        >
          <div className="reveal-infra-card bg-white border border-black rounded-none p-8 md:p-10 flex flex-col justify-between h-[300px] md:h-full relative overflow-hidden shadow-none opacity-0">
            
            {/* Visual Header depending on active section */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#555f70] font-bold">
                ACTIVE INFRASTRUCTURE NODE
              </span>
              <h2 className="font-sans text-2xl md:text-4xl font-bold text-black transition-all duration-300">
                {activeSection === "chemical" ? "Chemical Systems" : "Packaging Systems"}
              </h2>
              <p className="font-sans text-xs md:text-sm text-[#555f70] transition-all duration-300 leading-relaxed">
                {activeSection === "chemical"
                  ? "High-tech facility equipped for complex synthesis, raw materials processing, and analytical quality validation."
                  : "Precision-controlled blow molding plant fabricating high-durability containers for industrial chemical containment."}
              </p>
            </div>

            {/* Grid Metrics visual indicator */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-[#e1e3e4] font-mono">
              {activeSection === "chemical" ? (
                <>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#555f70] font-bold">REACTOR CAPACITIES</span>
                    <span className="text-sm font-semibold text-black mt-1">1 - 6 kL Range</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#555f70] font-bold">QC RATING</span>
                    <span className="text-sm font-semibold text-black mt-1">GMP-Aligned Lab</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#555f70] font-bold">PARISON RESOLUTION</span>
                    <span className="text-sm font-semibold text-black mt-1">200-Point Control</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#555f70] font-bold">MATERIAL STANDARDS</span>
                    <span className="text-sm font-semibold text-black mt-1">100% Virgin HDPE</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (Scrolling Description Blocks) */}
        <div ref={rightColRef} className="flex flex-col gap-24 md:gap-32 pb-16">
          {/* Section 1: Chemical Infrastructure */}
          <div
            id="infra-chemical"
            className="flex flex-col gap-8 scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <Database className="text-[#555f70]" size={20} />
              <span className="font-mono text-xs uppercase tracking-widest text-[#555f70] font-bold">
                Synthesis & formulation plant
              </span>
            </div>
            
            <h3 className="font-sans text-3xl font-bold text-black tracking-tight">
              Chemical Infrastructure
            </h3>

            <p className="font-sans text-sm text-[#555f70] leading-relaxed">
              Devnandan Group's chemical footprint centers around a modern, custom-synthesis plant spanning over 38,500 square feet. Engineered to comply with rigorous international regulatory codes, this facility handles scaling operations from bench-scale chemical R&D to multi-ton production campaigns.
            </p>

            {/* Boxed Grid Layout */}
            <div className="flex flex-col border border-[#e1e3e4] mt-4 rounded-none overflow-hidden">
              {chemicalDetails.map((detail, idx) => (
                <div key={idx} className="flex justify-between items-center py-3.5 px-4 border-b border-[#e1e3e4] bg-white last:border-b-0">
                  <span className="font-mono text-xs text-[#555f70] font-bold">{detail.label}</span>
                  <span className="text-xs font-semibold text-black text-right">{detail.value}</span>
                </div>
              ))}
            </div>

            <p className="font-sans text-xs text-[#555f70] leading-relaxed mt-2 bg-[#f9fafb] border border-black p-4 rounded-none shadow-none">
              Our captive analytics lab features high-performance chromatography (HPLC, GC), NMR instrumentation, Karl Fischer titration, and infrared spectroscopy (IR) to ensure batch-to-batch molecular consistency. Cleanroom zoning restricts ambient pollutants to meet Class 10000 packaging parameters.
            </p>
          </div>

          {/* Section 2: Packaging Infrastructure */}
          <div
            id="infra-packaging"
            className="flex flex-col gap-8 scroll-mt-24"
          >
            <div className="flex items-center gap-3">
              <Cpu className="text-[#555f70]" size={20} />
              <span className="font-mono text-xs uppercase tracking-widest text-[#555f70] font-bold">
                HDPE blow molding plant
              </span>
            </div>

            <h3 className="font-sans text-3xl font-bold text-black tracking-tight">
              Packaging Infrastructure
            </h3>

            <p className="font-sans text-sm text-[#555f70] leading-relaxed">
              Our plastic fabrication facilities utilize advanced high-density blow molding lines to manufacture heavy-duty HDPE containers. Operating under fully automated feedback loops, these systems ensure structural integrity, drop safety, and chemical containment reliability.
            </p>

            {/* Boxed Grid Layout */}
            <div className="flex flex-col border border-[#e1e3e4] mt-4 rounded-none overflow-hidden">
              {packagingDetails.map((detail, idx) => (
                <div key={idx} className="flex justify-between items-center py-3.5 px-4 border-b border-[#e1e3e4] bg-white last:border-b-0">
                  <span className="font-mono text-xs text-[#555f70] font-bold">{detail.label}</span>
                  <span className="text-xs font-semibold text-black text-right">{detail.value}</span>
                </div>
              ))}
            </div>

            <p className="font-sans text-xs text-[#555f70] leading-relaxed mt-2 bg-[#f9fafb] border border-black p-4 rounded-none shadow-none">
              By utilizing computerized B&R parison control systems, our machinery tracks 200 calibration points along each preform container wall. This guarantees uniform thickness distribution, preventing thinning at the base or corners, and ensuring heavy-duty drop safety for hazardous fluid logistics.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
