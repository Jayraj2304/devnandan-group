"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, FileText, CheckCircle2 } from "lucide-react";
import ThreeCanvas from "@/components/ThreeCanvas";

export default function OrganicsClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Hero text reveals
    gsap.fromTo(
      ".reveal-org-hero",
      { y: 45, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: "power4.out", stagger: 0.1 }
    );

    // 2. Data Bar stagger
    gsap.fromTo(
      ".data-bar-cell",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.08, scrollTrigger: { trigger: ".data-bar", start: "top 90%" } }
    );

    // 3. Services matrix stagger
    gsap.fromTo(
      ".service-cell",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.12, scrollTrigger: { trigger: ".services-grid", start: "top 85%" } }
    );

    // 4. Vertical progress line scale in pipeline
    const pipelineItems = gsap.utils.toArray(".pipeline-step");
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".pipeline-container",
          start: "top 35%",
          end: "bottom 75%",
          scrub: true,
        },
      }
    );

    // 5. Stagger reveal pipeline cards
    pipelineItems.forEach((step: any) => {
      const content = step.querySelector(".step-content");
      const dot = step.querySelector(".step-dot");

      gsap.fromTo(
        [content, dot],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, { scope: containerRef });

  const stats = [
    { value: "99.6%", label: "BATCH CONSISTENCY" },
    { value: "50 KG → 12 MT", label: "PRODUCTION RANGE" },
    { value: "< 14 DAYS", label: "PILOT VELOCITY" },
    { value: "NDA", label: "BY DEFAULT" },
  ];

  const services = [
    {
      title: "Custom Synthesis",
      desc: "Bench retro-synthesis with three candidate paths mapped by R&D specialists to guarantee optimum yield and purity outcomes.",
    },
    {
      title: "Contract Manufacturing",
      desc: "Dedicated bays, glass-lined and SS reactors from 1 kL to 6 kL capacity running under rigorous GMP QC guidelines.",
    },
    {
      title: "Pilot Campaigns",
      desc: "50 kg to 500 kg batch validation run in dedicated pilot reactors to verify reaction parameters before scaling.",
    },
    {
      title: "Toll Processing",
      desc: "Processing of customer-supplied raw chemicals with strict compliance, yield, and purity profile metrics guaranteed.",
    },
  ];

  const pipeline = [
    { step: "01", name: "Brief & NDA", desc: "Rigorous alignment on target molecule profiles, specifications, purity tolerances, and immediate NDA execution." },
    { step: "02", name: "Route Scoping", desc: "Our chemists map synthetic paths in laboratory benches to establish chemical feasibility, yield expectations, and safety profiles." },
    { step: "03", name: "Pilot Campaign", desc: "Small-scale validation runs in 50L–500L pilot reactors to compile thermal dynamics, cycle configurations, and impurity profiles." },
    { step: "04", name: "Scale Production", desc: "Transitioning production to our full-scale 1 kL to 6 kL glass-lined reactor bays under computer-controlled recipe validation." },
    { step: "05", name: "Lifecycle Care", desc: "Post-batch QC reporting, raw material safety declarations, and ongoing logistics coordinate alignment for regular campaign runs." },
  ];

  const handleDownloadBrochure = () => {
    alert("Downloading Organics Division Profile PDF. (Mock Action)");
  };

  return (
    <div ref={containerRef} className="w-full bg-[#f8f9fa] text-black">
      {/* Background WebGL */}
      <ThreeCanvas />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto" aria-labelledby="org-heading">
        <div className="flex flex-col gap-6 max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-widest text-[#555f70] font-bold reveal-org-hero">
            DEVNANDAN ORGANICS
          </span>
          <h1
            id="org-heading"
            className="font-sans text-4xl md:text-7xl font-bold tracking-tight text-black leading-[1.1] reveal-org-hero"
          >
            Specialty chemistry with a clean ledger.
          </h1>
          <p className="font-sans text-sm md:text-lg text-[#555f70] leading-relaxed max-w-[550px] mt-2 reveal-org-hero">
            Custom synthesis and contract manufacturing of high-purity organic intermediates engineered for modern pharmaceutical and polymer clients.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 reveal-org-hero">
            <button className="inline-flex items-center justify-center px-6 py-3.5 font-mono text-xs tracking-widest uppercase bg-black text-white hover:bg-white hover:text-black hover:border-black border border-transparent transition-all duration-300 rounded-none cursor-pointer font-bold gap-2">
              Start a synthesis brief <ArrowRight size={14} />
            </button>
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
      <section className="data-bar border-y border-black bg-white select-none relative z-10" aria-label="Organics Performance Data">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 text-center">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="data-bar-cell p-6 border-b sm:border-b-0 sm:border-r border-[#e1e3e4] last:border-r-0 flex flex-col justify-center gap-1 min-h-[90px]"
            >
              <span className="font-mono text-lg font-bold text-black">{stat.value}</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#555f70] font-bold">
                {stat.label}
              </span>
            </div>
          ))}
          {/* Interactive Brochure Cell */}
          <button
            onClick={handleDownloadBrochure}
            className="data-bar-cell p-6 bg-white text-black hover:bg-black hover:text-white border-t sm:border-t-0 sm:border-l border-black transition-all duration-300 font-mono text-xs tracking-widest uppercase text-center cursor-pointer flex items-center justify-center gap-2 font-bold min-h-[90px] rounded-none outline-none"
            aria-label="Download Organics Division Profile PDF"
          >
            ↓ Download Division Profile
          </button>
        </div>
      </section>

      {/* Services Matrix (2x2 Grid) */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-white" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs text-[#555f70] uppercase tracking-widest font-bold">
              core chemical competencies
            </span>
            <h2
              id="services-heading"
              className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-black"
            >
              Services Matrix
            </h2>
          </div>

          {/* Fully boxed 2x2 grid */}
          <div className="services-grid grid grid-cols-1 md:grid-cols-2 border border-[#e1e3e4] rounded-none overflow-hidden">
            {services.map((srv, idx) => (
              <div
                key={srv.title}
                className="service-cell p-8 md:p-12 bg-white border border-[#e1e3e4] hover:bg-[#f8f9fa] hover:border-black rounded-none shadow-none transition-all duration-300 flex flex-col gap-6"
              >
                <span className="font-mono text-xs text-[#555f70] font-bold block">
                  CAPABILITY 0{idx + 1}
                </span>
                <h3 className="font-sans text-2xl font-bold text-black leading-tight">
                  {srv.title}
                </h3>
                <p className="font-sans text-sm text-[#555f70] leading-relaxed">
                  {srv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Pipeline (Timeline with GSAP indicators) */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#f8f9fa] border-t border-[#e1e3e4] pipeline-container" aria-labelledby="pipeline-heading">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs text-[#555f70] uppercase tracking-widest font-bold">
              BENCH TO SHIFT LOGISTICS
            </span>
            <h2
              id="pipeline-heading"
              className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-black"
            >
              Process Pipeline
            </h2>
          </div>

          {/* Pipeline timeline */}
          <div className="relative max-w-3xl mx-auto py-8">
            {/* Center progress line */}
            <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-black/10 origin-top" />
            <div
              ref={lineRef}
              className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-black origin-top"
              style={{ transform: "scaleY(0)" }}
            />

            <div className="flex flex-col gap-12">
              {pipeline.map((step) => (
                <div key={step.step} className="pipeline-step relative flex items-start pl-10">
                  {/* Step dot indicator */}
                  <div className="step-dot absolute left-[15px] w-3 h-3 rounded-none bg-white border-2 border-black transform -translate-x-1/2 mt-1.5 z-10" />

                  <div className="step-content bg-white border border-[#e1e3e4] hover:border-black p-6 rounded-none shadow-none flex flex-col gap-2 transition-colors duration-300 w-full">
                    <span className="font-mono text-xs text-[#555f70] font-bold">
                      STEP {step.step} • {step.name}
                    </span>
                    <p className="font-sans text-xs text-[#555f70] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
