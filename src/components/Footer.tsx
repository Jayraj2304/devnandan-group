"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bigTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const bigText = bigTextRef.current;
    if (!bigText) return;

    const ctx = gsap.context(() => {
      // Large typographic reveal animation on scroll
      gsap.fromTo(
        bigText,
        {
          yPercent: 40,
          opacity: 0.1,
        },
        {
          yPercent: 0,
          opacity: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const internalLinks = [
    { name: "About Us", href: "/about" },
    { name: "Infrastructure", href: "/infrastructure" },
    { name: "Sustainability", href: "/sustainability" },
    { name: "Contact us", href: "/contact" },
  ];

  const divisions = [
    { name: "Organics (Custom Synthesis)", href: "/organics" },
    { name: "Auxichem (Specialty Binders)", href: "/auxichem" },
    { name: "Plasto Pack (HDPE Packaging)", href: "/plastopack" },
  ];

  return (
    <footer
      ref={containerRef}
      className="relative z-10 w-full bg-white border-t border-[#e1e3e4] py-16 md:py-24 px-6 md:px-12 overflow-hidden"
      aria-label="Corporate Footer"
    >
      {/* Scroll Reveal Typographic Background */}
      <div className="absolute bottom-[-10%] left-0 right-0 pointer-events-none select-none text-center hidden md:block">
        <h2
          ref={bigTextRef}
          className="font-sans text-[12vw] font-bold tracking-tighter uppercase text-[#e1e3e4] leading-none inline-block origin-bottom transition-all duration-300"
          style={{ opacity: 0.1 }}
        >
          DEVNANDAN
        </h2>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-12">
        {/* Col 1: Corporate Details */}
        <div className="md:col-span-1 flex flex-col gap-4">
          <Link href="/" className="font-mono text-sm tracking-widest text-[#191c1d] uppercase font-bold outline-none" aria-label="Devnandan Group Home">
            DEVNANDAN GROUP
          </Link>
          <p className="font-sans text-xs text-[#555f70] leading-relaxed max-w-[280px]">
            Manufacturers of High-Performance Chemical Solutions & Reliable Plastic Packaging Systems.
          </p>
        </div>

        {/* Col 2: Outbound divisions */}
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#555f70] font-bold">
            Divisions
          </span>
          <nav className="flex flex-col gap-2.5" aria-label="Divisions Outbound Links">
            {divisions.map((div) => (
              <Link
                key={div.name}
                href={div.href}
                className="font-sans text-xs text-[#555f70] hover:text-black transition-colors duration-300 outline-none"
              >
                {div.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Col 3: Internal Links */}
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#555f70] font-bold">
            Company
          </span>
          <nav className="flex flex-col gap-2.5" aria-label="Company Internal Links">
            {internalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-sans text-xs text-[#555f70] hover:text-black transition-colors duration-300 outline-none"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Col 4: Corporate Info & Policies */}
        <div className="flex flex-col gap-4 justify-between">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#555f70] font-bold">
              Legal
            </span>
            <Link
              href="/privacy-policy"
              className="font-sans text-xs text-[#555f70] hover:text-black transition-colors duration-300 outline-none"
            >
              Privacy Policy
            </Link>
          </div>
          <span className="font-mono text-[10px] text-zinc-400 mt-6 md:mt-0 font-medium">
            © 2026 DEVNANDAN GROUP.
          </span>
        </div>
      </div>
    </footer>
  );
}
