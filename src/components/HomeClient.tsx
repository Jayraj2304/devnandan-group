"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowRight } from "lucide-react";
import ThreeCanvas from "@/components/ThreeCanvas";

gsap.registerPlugin(ScrollTrigger);

// Type definitions
interface TiltCardProps {
  title: string;
  desc: string;
  details: string[];
  link: string;
  index: number;
}

// 3D Tilt Card Component
function TiltCard({ title, desc, details, link, index }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const xc = width / 2;
    const yc = height / 2;

    const tiltX = (yc - y) / 16;
    const tiltY = (x - xc) / 16;

    gsap.to(card, {
      rotateX: tiltX,
      rotateY: tiltY,
      scale: 1.01,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="division-card-animate flex-shrink-0 w-[85vw] md:w-[28rem] h-[50vh] md:h-[26rem] bg-white border border-[#e1e3e4] hover:bg-[#f8f9fa] rounded-none p-8 md:p-10 flex flex-col justify-between select-none shadow-none hover:border-black transition-colors duration-300 opacity-0"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="flex flex-col gap-6" style={{ transform: "translateZ(20px)" }}>
        <span className="font-mono text-xs text-[#555f70] uppercase tracking-widest">
          DIVISION 0{index + 1}
        </span>
        <h3 className="font-sans text-2xl md:text-3xl font-bold tracking-tight text-black leading-tight">
          {title}
        </h3>
        <p className="font-sans text-sm md:text-sm text-[#333e4f] leading-relaxed">
          {desc}
        </p>
        <ul className="flex flex-col gap-2 mt-2">
          {details.map((detail, idx) => (
            <li key={idx} className="font-mono text-xs md:text-sm text-[#4c4546] flex items-center gap-2">
              <span className="h-1 w-1 bg-black rounded-none" />
              {detail}
            </li>
          ))}
        </ul>
      </div>
      <Link
        href={link}
        className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-black hover:text-[#555f70] transition-colors duration-300 self-start mt-6 group border-b border-black pb-0.5"
        style={{ transform: "translateZ(10px)" }}
        aria-label={`Explore division ${title}`}
      >
        Explore Division <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}

export default function HomeClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackWrapperRef = useRef<HTMLDivElement>(null);

  const divisions = [
    {
      title: "Devnandan Organics",
      desc: "Custom synthesis and contract manufacturing of high-purity organic intermediates for pharmaceuticals and chemical formulation partners.",
      details: ["Custom organic synthesis models", "High-purity intermediate synthesis", "GMP-aligned quality control", "Reactor capacities up to 6 kL"],
      link: "/organics",
    },
    {
      title: "Devnandan Auxichem LLP",
      desc: "Specialty binders, polymer emulsions, adhesives, construction chemicals, and technical coating polymers.",
      details: ["Textile and technical binders", "Water-based emulsion polymers", "High-performance adhesives", "Batch-to-batch consistency"],
      link: "/auxichem",
    },
    {
      title: "Devnandan Plasto Pack",
      desc: "Premium-quality HDPE containers and industrial plastic packaging solutions featuring precise wall thickness control.",
      details: ["Blow molding from 20L to 60L", "Advanced B&R Parison control", "100% food-grade virgin HDPE", "Zero-leak wall thickness design"],
      link: "/plastopack",
    }
  ];

  // GSAP animations for Hero text reveals
  useGSAP(() => {
    // 1. Hero text fade up
    const tl = gsap.timeline();
    tl.fromTo(
      ".reveal-hero-text",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.1 }
    ).fromTo(
      ".reveal-hero-sub",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );

    // 2. Horizontal scroll layout (dynamic based on viewport and card size)
    const container = containerRef.current;
    const trigger = triggerRef.current;
    const wrapper = trackWrapperRef.current;
    if (!container || !trigger || !wrapper) return;

    // Staggered reveal animation for division cards when section comes into view
    gsap.fromTo(
      ".division-card-animate",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: trigger,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      }
    );

    let ctx: any;

    const setupScroll = () => {
      if (ctx) ctx.revert();

      const contentWidth = 1408; // 3 cards of 448px + 2 gaps of 32px
      const viewportWidth = window.innerWidth;
      const exceeds = contentWidth > viewportWidth;

      if (exceeds) {
        wrapper.classList.remove("xl:justify-center");
        wrapper.classList.add("justify-start");
        
        if (viewportWidth >= 1280) {
          container.style.paddingLeft = "calc((100vw - 1280px) / 2 + 3rem)";
          container.style.paddingRight = "calc((100vw - 1280px) / 2 + 3rem)";
        } else if (viewportWidth >= 768) {
          container.style.paddingLeft = "3rem";
          container.style.paddingRight = "3rem";
        } else {
          container.style.paddingLeft = "1.5rem";
          container.style.paddingRight = "1.5rem";
        }

        const getScrollAmount = () => {
          return container.scrollWidth - window.innerWidth;
        };

        ctx = gsap.context(() => {
          gsap.to(container, {
            x: () => -getScrollAmount(),
            ease: "none",
            scrollTrigger: {
              trigger: trigger,
              pin: true,
              scrub: 0.5,
              start: "top top",
              end: () => `+=${getScrollAmount()}`,
              invalidateOnRefresh: true,
            },
          });
        });
      } else {
        // Fits in viewport -> Center the cards instead of scrolling
        wrapper.classList.remove("justify-start");
        wrapper.classList.add("xl:justify-center");
        
        container.style.paddingLeft = "0px";
        container.style.paddingRight = "0px";
        gsap.set(container, { x: 0 });
      }
    };

    setupScroll();
    window.addEventListener("resize", setupScroll);

    return () => {
      window.removeEventListener("resize", setupScroll);
      if (ctx) ctx.revert();
    };
  }, { scope: heroRef });

  const scrollDownToDivisions = () => {
    const divisionsSection = triggerRef.current;
    if (divisionsSection) {
      divisionsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={heroRef} className="w-full">
      {/* Light-theme WebGL background */}
      <ThreeCanvas />

      {/* Hero Section */}
      <section className="relative h-[calc(100vh-70px)] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto" aria-labelledby="hero-heading">
        <div className="flex flex-col gap-6 max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-widest text-[#555f70] font-bold reveal-hero-text">
            B2B INDUSTRIAL HOLDINGS
          </span>
          <h1
            id="hero-heading"
            className="font-sans text-4xl md:text-7xl font-bold tracking-tight text-[#191c1d] leading-[1.1] reveal-hero-text"
          >
            Excellence, Engineered at Scale.
          </h1>
          <p className="font-sans text-sm md:text-lg text-[#333e4f] leading-relaxed max-w-[550px] mt-2 reveal-hero-sub">
            The Devnandan Group engineers authority-driven chemical systems, customized synthesis molecules, and reliable, high-integrity packaging containers for global enterprise operations.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 reveal-hero-sub">
            <button
              onClick={scrollDownToDivisions}
              className="inline-flex items-center justify-center px-6 py-3.5 font-mono text-xs tracking-widest uppercase bg-black text-white hover:bg-white hover:text-black hover:border-black border border-transparent transition-all duration-300 rounded-none cursor-pointer font-bold"
            >
              Explore Divisions
            </button>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3.5 font-mono text-xs tracking-widest uppercase bg-transparent border border-black text-black hover:bg-[#edeeef] transition-all duration-300 rounded-none font-bold gap-2"
            >
              Our Heritage <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-6 md:left-12 flex items-center gap-3">
          <span className="font-mono text-xs tracking-widest text-[#555f70] uppercase font-bold">
            Scroll to Navigate
          </span>
          <ArrowDown size={12} className="text-[#555f70] animate-bounce" />
        </div>
      </section>

      {/* Divisions Section (Horizontal Pin Scroll) */}
      <section
        ref={triggerRef}
        className="relative min-h-screen bg-[#f8f9fa] border-t border-[#e1e3e4] overflow-hidden"
        aria-labelledby="divisions-heading"
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden w-full">
          {/* Pinned Title & Description */}
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-xs text-[#555f70] uppercase tracking-widest font-bold">
                subsidiary portfolios
              </span>
              <h2
                id="divisions-heading"
                className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-black"
              >
                The Divisions
              </h2>
            </div>
            <p className="font-sans text-sm md:text-sm text-[#333e4f] max-w-sm mt-4 md:mt-0 leading-relaxed">
              Discover our structured organizational sectors spanning specialty organics, technical binder solutions, and high-performance packaging fabrication.
            </p>
          </div>

          {/* Cards Track */}
          <div ref={trackWrapperRef} className="w-full overflow-hidden flex justify-start">
            <div
              ref={containerRef}
              className="flex items-center gap-8 w-max pl-6 md:pl-12 xl:pl-[calc((100vw_-_1280px)_/_2_+_3rem)] pr-6 md:pr-12 xl:pr-[calc((100vw_-_1280px)_/_2_+_3rem)]"
            >
              {divisions.map((div, index) => (
                <TiltCard
                  key={div.title}
                  title={div.title}
                  desc={div.desc}
                  details={div.details}
                  link={div.link}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Marquee Section */}
      <section className="py-8 border-y border-black bg-white overflow-hidden" aria-label="Corporate Accreditation Marquee">
        <div className="w-full overflow-hidden select-none">
          <div className="animate-marquee flex items-center gap-24 whitespace-nowrap">
            {/* Logo 1: Hexagon mark */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path d="M18 2L32 10V26L18 34L4 26V10L18 2Z" stroke="#191c1d" strokeWidth="1.5" fill="none"/>
              <path d="M18 10L25 14V22L18 26L11 22V14L18 10Z" stroke="#555f70" strokeWidth="1" fill="none"/>
            </svg>
            {/* Logo 2: Chevron mark */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path d="M8 12L18 6L28 12" stroke="#191c1d" strokeWidth="1.5" strokeLinecap="square" fill="none"/>
              <path d="M8 20L18 14L28 20" stroke="#555f70" strokeWidth="1" strokeLinecap="square" fill="none"/>
              <path d="M8 28L18 22L28 28" stroke="#191c1d" strokeWidth="1.5" strokeLinecap="square" fill="none"/>
            </svg>
            {/* Logo 3: Circle-ring mark */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <circle cx="18" cy="18" r="14" stroke="#191c1d" strokeWidth="1.5" fill="none"/>
              <circle cx="18" cy="18" r="8" stroke="#555f70" strokeWidth="1" fill="none"/>
              <circle cx="18" cy="18" r="2" fill="#191c1d"/>
            </svg>
            {/* Logo 4: Triangle mark */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path d="M18 4L33 32H3L18 4Z" stroke="#191c1d" strokeWidth="1.5" fill="none"/>
              <path d="M18 14L26 28H10L18 14Z" stroke="#555f70" strokeWidth="1" fill="none"/>
            </svg>
            {/* Logo 5: Square-grid mark */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <rect x="4" y="4" width="12" height="12" stroke="#191c1d" strokeWidth="1.5" fill="none"/>
              <rect x="20" y="4" width="12" height="12" stroke="#555f70" strokeWidth="1" fill="none"/>
              <rect x="4" y="20" width="12" height="12" stroke="#555f70" strokeWidth="1" fill="none"/>
              <rect x="20" y="20" width="12" height="12" stroke="#191c1d" strokeWidth="1.5" fill="none"/>
            </svg>
            {/* Logo 6: Diamond mark */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path d="M18 2L34 18L18 34L2 18L18 2Z" stroke="#191c1d" strokeWidth="1.5" fill="none"/>
              <path d="M18 10L26 18L18 26L10 18L18 10Z" stroke="#555f70" strokeWidth="1" fill="none"/>
            </svg>

            {/* Duplicate set for seamless loop */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path d="M18 2L32 10V26L18 34L4 26V10L18 2Z" stroke="#191c1d" strokeWidth="1.5" fill="none"/>
              <path d="M18 10L25 14V22L18 26L11 22V14L18 10Z" stroke="#555f70" strokeWidth="1" fill="none"/>
            </svg>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path d="M8 12L18 6L28 12" stroke="#191c1d" strokeWidth="1.5" strokeLinecap="square" fill="none"/>
              <path d="M8 20L18 14L28 20" stroke="#555f70" strokeWidth="1" strokeLinecap="square" fill="none"/>
              <path d="M8 28L18 22L28 28" stroke="#191c1d" strokeWidth="1.5" strokeLinecap="square" fill="none"/>
            </svg>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <circle cx="18" cy="18" r="14" stroke="#191c1d" strokeWidth="1.5" fill="none"/>
              <circle cx="18" cy="18" r="8" stroke="#555f70" strokeWidth="1" fill="none"/>
              <circle cx="18" cy="18" r="2" fill="#191c1d"/>
            </svg>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path d="M18 4L33 32H3L18 4Z" stroke="#191c1d" strokeWidth="1.5" fill="none"/>
              <path d="M18 14L26 28H10L18 14Z" stroke="#555f70" strokeWidth="1" fill="none"/>
            </svg>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <rect x="4" y="4" width="12" height="12" stroke="#191c1d" strokeWidth="1.5" fill="none"/>
              <rect x="20" y="4" width="12" height="12" stroke="#555f70" strokeWidth="1" fill="none"/>
              <rect x="4" y="20" width="12" height="12" stroke="#555f70" strokeWidth="1" fill="none"/>
              <rect x="20" y="20" width="12" height="12" stroke="#191c1d" strokeWidth="1.5" fill="none"/>
            </svg>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
              <path d="M18 2L34 18L18 34L2 18L18 2Z" stroke="#191c1d" strokeWidth="1.5" fill="none"/>
              <path d="M18 10L26 18L18 26L10 18L18 10Z" stroke="#555f70" strokeWidth="1" fill="none"/>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
