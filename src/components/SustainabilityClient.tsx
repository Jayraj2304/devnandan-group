"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Recycle, ShieldCheck } from "lucide-react";

export default function SustainabilityClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [solventRate, setSolventRate] = useState(0);
  const [zdhcLevel, setZdhcLevel] = useState(0);

  // GSAP animations for brutalist block triggers
  useGSAP(() => {
    // 1. Hero text reveal
    gsap.fromTo(
      ".reveal-sust-title",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.1 }
    );

    // 2. Animated numbers
    const rateObj = { val: 0 };
    gsap.to(rateObj, {
      val: 92,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".sust-metrics",
        start: "top 85%",
      },
      onUpdate: () => setSolventRate(Math.floor(rateObj.val)),
    });

    const levelObj = { val: 0 };
    gsap.to(levelObj, {
      val: 3,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".sust-metrics",
        start: "top 85%",
      },
      onUpdate: () => setZdhcLevel(Math.floor(levelObj.val)),
    });

    // Stagger block entries on scroll
    gsap.fromTo(
      ".brutalist-block",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".brutalist-grid",
          start: "top 85%",
        },
      }
    );
  }, { scope: containerRef });

  const complianceStandards = [
    {
      title: "APEO & NPEO Free Products",
      desc: "All chemical formulation outputs are fully alkylphenol ethoxylate-free to protect aquatic biosystems and comply with EU REACH requirements.",
    },
    {
      title: "PFAS & PFOA Free Formulations",
      desc: "Our binders and specialty polymer emulsions are formulated without per- and polyfluoroalkyl substances, ensuring safe handling and decomposition.",
    },
    {
      title: "100% Food-Grade Virgin HDPE",
      desc: "Plasto Pack containers use non-recycled high-density polyethylene, free from heavy metal contaminants, ensuring chemical safety and zero-leach storage.",
    },
  ];

  return (
    <div ref={containerRef} className="w-full bg-[#f8f9fa] py-16 md:py-24 text-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-20">
        
        {/* Header */}
        <section className="flex flex-col gap-4 max-w-4xl" aria-labelledby="sust-heading">
          <span className="font-mono text-xs text-[#4d7c0f] uppercase tracking-widest font-bold reveal-sust-title">
            ecological mandate
          </span>
          <h1 id="sust-heading" className="font-sans text-4xl md:text-6xl font-bold tracking-tight text-black leading-tight reveal-sust-title">
            Sustainability, Compliance & Future Engineering.
          </h1>
          <p className="font-sans text-sm md:text-lg text-[#555f70] leading-relaxed reveal-sust-title">
            At Devnandan Group, sustainability is not a marketing directive—it is an engineered constraint. We design zero-discharge chemical formulations, recycle solvents, and build packaging systems that protect people and the environment.
          </p>
        </section>

        {/* Nature-inspired Brutalist Metrics Banner */}
        <section className="border-2 border-black bg-white p-8 md:p-12 rounded-none sust-metrics relative overflow-hidden shadow-none" aria-label="Key Ecological Metrics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center relative z-10">
            {/* Metric 1 */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#555f70] font-bold">
                EFFLUENT MANAGEMENT SYSTEM
              </span>
              <h2 className="font-sans text-3xl font-extrabold text-black leading-none">
                Zero Liquid Discharge
              </h2>
              <p className="font-sans text-xs text-[#555f70] leading-relaxed">
                ZLD-ready effluent treatment plant operating under strict thermal recovery, ensuring zero hazardous waste returns to local water channels.
              </p>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col gap-3 border-y md:border-y-0 md:border-x border-[#e1e3e4] py-6 md:py-0 md:px-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#4d7c0f] font-bold">
                SOLVENT RECYCLING INDEX
              </span>
              <h2 className="font-mono text-5xl md:text-6xl font-black text-black leading-none">
                {solventRate}%
              </h2>
              <p className="font-sans text-xs text-[#555f70] leading-relaxed">
                Our synthesis reactors recover and recycle volatile solvents directly back into processing loops, reducing chemical footprints.
              </p>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#555f70] font-bold">
                GLOBAL COMPLIANCE RATING
              </span>
              <h2 className="font-mono text-3xl md:text-4xl font-bold text-black leading-none uppercase">
                ZDHC Level {zdhcLevel}
              </h2>
              <p className="font-sans text-xs text-[#555f70] leading-relaxed">
                Certified Level 3 Zero Discharge of Hazardous Chemicals standard compliance, guaranteeing clean inputs and process chemistry.
              </p>
            </div>
          </div>
        </section>

        {/* Brutalist Grid Section */}
        <section className="flex flex-col gap-8" aria-labelledby="standards-heading">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-[#555f70] uppercase tracking-widest font-bold">
              operational metrics
            </span>
            <h2 id="standards-heading" className="font-sans text-2xl md:text-4xl font-bold text-black">
              Compliance Framework
            </h2>
          </div>

          {/* Brutalist Blocks */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 brutalist-grid">
            {complianceStandards.map((std, idx) => (
              <div
                key={idx}
                className="brutalist-block border-2 border-black bg-white p-8 flex flex-col justify-between h-[300px] hover:border-[#4d7c0f] hover:bg-[#f8f9fa] transition-all duration-300 rounded-none shadow-none"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#4d7c0f] tracking-widest uppercase font-bold">
                      STANDARD 0{idx + 1}
                    </span>
                    {idx === 2 ? <Recycle size={16} className="text-[#555f70]" /> : <ShieldCheck size={16} className="text-[#555f70]" />}
                  </div>
                  <h3 className="font-sans text-xl font-bold text-black leading-tight">
                    {std.title}
                  </h3>
                  <p className="font-sans text-xs text-[#555f70] leading-relaxed">
                    {std.desc}
                  </p>
                </div>
                
                <span className="font-mono text-[10px] text-[#555f70] uppercase tracking-wider font-bold">
                  Verified Compliance Standard
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
