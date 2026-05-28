"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  // GSAP animations for timeline cards reveal
  useGSAP(() => {
    // 1. Title fade up
    gsap.fromTo(
      ".reveal-title",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.1 }
    );

    // 2. Timeline progression line
    const timelineItems = gsap.utils.toArray(".timeline-item");
    
    // Scale timeline progress line based on scroll
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 30%",
          end: "bottom 80%",
          scrub: true,
        },
      }
    );

    // Fade and reveal timeline nodes
    timelineItems.forEach((item: any) => {
      const card = item.querySelector(".timeline-card");
      const dot = item.querySelector(".timeline-dot");

      gsap.fromTo(
        [card, dot],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Mission items stagger hover trigger
    gsap.fromTo(
      ".mission-card",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".mission-matrix",
          start: "top 85%",
        },
      }
    );
  }, { scope: containerRef });

  const timelineData = [
    {
      year: "PHASE 01",
      title: "Chemical Formulation & Synthesis",
      desc: "Founded with a clear focus on custom organic synthesis, contract manufacturing, and supplying high-purity chemical intermediates to pharmaceutical and industrial partners.",
    },
    {
      year: "PHASE 02",
      title: "Auxichem Integration",
      desc: "Expanded into specialty polymer binders, water-based emulsions, and industrial adhesives, catering to textile, carpet flock, technical laminates, and coatings sectors.",
    },
    {
      year: "PHASE 03",
      title: "Plasto Pack Blow Molding",
      desc: "Acquired packaging manufacturing capabilities, installing advanced parison control blow molding machinery to fabricate premium leak-resistant HDPE industrial containers.",
    },
    {
      year: "PHASE 04",
      title: "Consolidated Group Governance",
      desc: "Unified all subsidiaries under the Devnandan Group, aligning R&D labs, deploying rigorous GMP QC protocols, and securing ZDHC Level 3 ecological certifications.",
    },
  ];

  const missionItems = [
    "Manufacture textile, carpet, flock, technical, paint & coating binders.",
    "Produce adhesives, hardeners & customized polyol systems.",
    "Provide durable application-specific plastic packaging solutions.",
    "Ensure batch-to-batch consistency and reliable performance.",
  ];

  return (
    <div ref={containerRef} className="w-full bg-[#f8f9fa] py-16 md:py-24 text-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-24">
        {/* Header */}
        <div className="flex flex-col gap-4 max-w-3xl">
          <span className="font-mono text-xs text-[#555f70] uppercase tracking-widest font-bold reveal-title">
            corporate profile
          </span>
          <h1 className="font-sans text-4xl md:text-6xl font-bold tracking-tight text-black leading-tight reveal-title">
            Authority, Science & Industrial Synergy.
          </h1>
          <p className="font-sans text-sm md:text-lg text-[#555f70] leading-relaxed reveal-title">
            Devnandan Group stands as a premier holding company providing integrated solutions across advanced chemical synthesis, specialty polymer binders, and high-performance industrial packaging.
          </p>
        </div>

        {/* Vision Section */}
        <section className="border-t border-[#e1e3e4] pt-16 flex flex-col md:flex-row gap-8 items-start" aria-labelledby="vision-heading">
          <div className="md:w-1/3 flex items-center gap-3">
            <Compass className="text-[#555f70]" size={20} />
            <h2 id="vision-heading" className="font-mono text-xs uppercase tracking-widest text-[#555f70] font-bold">
              Corporate Vision
            </h2>
          </div>
          <div className="md:w-2/3">
            <blockquote className="font-sans text-xl md:text-3xl font-light text-[#191c1d] leading-relaxed italic">
              &ldquo;To become a trusted and innovative industrial group delivering high-performance chemical solutions and reliable packaging systems, driven by quality, technology, sustainability and long-term customer value.&rdquo;
            </blockquote>
          </div>
        </section>

        {/* Storytelling Timeline */}
        <section className="border-t border-[#e1e3e4] pt-20 timeline-container" aria-labelledby="timeline-heading">
          <div className="flex flex-col gap-4 mb-16">
            <span className="font-mono text-xs text-[#555f70] uppercase tracking-widest font-bold">
              historical evolution
            </span>
            <h2 id="timeline-heading" className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-black">
              Development Timeline
            </h2>
          </div>

          {/* Vertical Timeline container */}
          <div className="relative max-w-3xl mx-auto py-8">
            {/* Center progression line */}
            <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-black/10 origin-top transform -translate-x-1/2" />
            <div
              ref={lineRef}
              className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-black origin-top transform -translate-x-1/2"
              style={{ transform: "scaleY(0)" }}
            />

            {/* Timeline items */}
            <div className="flex flex-col gap-12 md:gap-16">
              {timelineData.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={item.year}
                    className="timeline-item relative flex flex-col md:flex-row items-start md:items-center justify-between"
                  >
                    {/* Bullet dot */}
                    <div className="timeline-dot absolute left-[15px] md:left-1/2 w-4 h-4 rounded-none bg-white border-2 border-black transform -translate-x-1/2 z-10" />

                    {/* Left space/card */}
                    <div className={`w-full md:w-[45%] pl-8 md:pl-0 ${isEven ? "md:text-right" : "md:order-last md:text-left"}`}>
                      <div className="timeline-card bg-white border border-[#e1e3e4] hover:border-black rounded-none p-6 transition-colors duration-300 shadow-none">
                        <span className="font-mono text-xs text-[#555f70] uppercase tracking-widest block mb-2 font-bold">
                          {item.year}
                        </span>
                        <h3 className="font-sans text-lg font-bold text-black mb-2 leading-snug">
                          {item.title}
                        </h3>
                        <p className="font-sans text-xs text-[#555f70] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Spacer for vertical layout */}
                    <div className="hidden md:block w-[45%]" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mission Matrix Section */}
        <section className="border-t border-[#e1e3e4] pt-20" aria-labelledby="mission-heading">
          <div className="flex flex-col gap-4 mb-16">
            <span className="font-mono text-xs text-[#555f70] uppercase tracking-widest font-bold">
              core operational mission
            </span>
            <h2 id="mission-heading" className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-black">
              Mission Matrix
            </h2>
          </div>

          {/* Interactive Matrix Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mission-matrix">
            {missionItems.map((mission, index) => (
              <div
                key={index}
                className="mission-card group p-8 border border-[#e1e3e4] rounded-none bg-white hover:bg-[#f8f9fa] hover:border-black transition-all duration-300 flex items-start gap-5 shadow-none relative overflow-hidden"
              >
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-none bg-[#f9fafb] border border-[#e1e3e4] text-[#191c1d] group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300 font-mono text-xs font-bold">
                  0{index + 1}
                </div>

                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#555f70] group-hover:text-black transition-colors duration-300 font-bold">
                    Mission Vector
                  </span>
                  <p className="font-sans text-sm text-[#191c1d] leading-relaxed font-semibold">
                    {mission}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
