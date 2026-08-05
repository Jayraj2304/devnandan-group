"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import ThreeCanvas from "@/components/ThreeCanvas";

gsap.registerPlugin(ScrollTrigger);

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
    { value: "1 MT → 60 MT", label: "PRODUCTION RANGE" },
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

  return (
    <div ref={containerRef} className="w-full bg-[#f8f9fa] text-black">
      {/* Background WebGL */}
      <ThreeCanvas />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto" aria-labelledby="org-heading">
        <div className="flex flex-col lg:flex-row items-center gap-12">
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
            </div>
          </div>

          {/* Animated Flask Illustration */}
          <div className="flex-shrink-0 w-full max-w-[280px] lg:max-w-[320px]">
            <div className="border border-[#e1e3e4] bg-white p-6 flex flex-col gap-4 h-full">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] tracking-widest text-[#555f70]">PILOT R-02 · LOT 24-A091</span>
                <span className="h-2 w-2 rounded-full bg-[#191c1d] animate-pulse" />
              </div>
              <svg viewBox="0 0 280 320" className="flex-1 max-h-[280px] w-full" aria-hidden="true">
                <defs>
                  <linearGradient id="flask-liq" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#191c1d" stopOpacity="0.25" />
                    <stop offset="1" stopColor="#191c1d" stopOpacity="0.4" />
                  </linearGradient>
                  <clipPath id="flask-clip">
                    <path d="M 120 60 L 160 60 L 160 140 L 220 240 Q 230 280 190 290 L 90 290 Q 50 280 60 240 L 120 140 Z" />
                  </clipPath>
                </defs>
                {/* Flask outline */}
                <path
                  d="M 120 60 L 160 60 L 160 140 L 220 240 Q 230 280 190 290 L 90 290 Q 50 280 60 240 L 120 140 Z"
                  fill="none"
                  stroke="#191c1d"
                  strokeWidth="1.5"
                />
                <line x1="120" y1="60" x2="160" y2="60" stroke="#191c1d" strokeWidth="1.5" />
                {/* Liquid */}
                <g clipPath="url(#flask-clip)">
                  <rect x="40" y="200" width="200" height="120" fill="url(#flask-liq)" />
                  <path
                    d="M 40 200 Q 90 192 140 200 T 240 200 L 240 215 L 40 215 Z"
                    fill="#191c1d"
                    opacity="0.2"
                  >
                    <animate
                      attributeName="d"
                      dur="4s"
                      repeatCount="indefinite"
                      values="M 40 200 Q 90 192 140 200 T 240 200 L 240 215 L 40 215 Z;M 40 200 Q 90 208 140 200 T 240 200 L 240 215 L 40 215 Z;M 40 200 Q 90 192 140 200 T 240 200 L 240 215 L 40 215 Z"
                    />
                  </path>
                  {/* Bubbles */}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <circle
                      key={i}
                      cx={80 + ((i * 22) % 140)}
                      cy={280}
                      r={1.5 + (i % 3) * 0.5}
                      fill="#fff"
                      stroke="#555f70"
                      strokeWidth="0.5"
                      opacity="0.6"
                    >
                      <animate
                        attributeName="cy"
                        dur={`${3 + i * 0.3}s`}
                        repeatCount="indefinite"
                        values="280;205"
                      />
                      <animate
                        attributeName="opacity"
                        dur={`${3 + i * 0.3}s`}
                        repeatCount="indefinite"
                        values="0;0.7;0"
                      />
                    </circle>
                  ))}
                </g>
                {/* Measurement marks */}
                {[230, 210, 190, 170].map((y, i) => (
                  <g key={y}>
                    <line x1="200" y1={y} x2="215" y2={y} stroke="#555f70" strokeWidth="0.8" />
                    <text x="220" y={y + 3} fontSize="7" fontFamily="monospace" fill="#555f70">
                      {(2 - i * 0.5).toFixed(1)}L
                    </text>
                  </g>
                ))}
              </svg>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "PURITY", value: "99.84%" },
                  { label: "YIELD", value: "87.2%" },
                  { label: "HPLC", value: "PASS" },
                  { label: "KF", value: "0.04%" },
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

      {/* 5-Column Data Bar */}
      <section className="data-bar border-y border-black bg-white select-none relative z-10" aria-label="Organics Performance Data">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-center">
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
