"use client";

import { useEffect, useRef, useState, cloneElement, ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";

// Magnetic Hover Component
interface MagneticProps {
  children: ReactElement;
}

export function Magnetic({ children }: MagneticProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      gsap.to(element, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return cloneElement(children, { ref } as any);
}

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // GSAP scroll trigger to transition nav bar background from transparent to solid white glass
  useEffect(() => {
    const navbar = navRef.current;
    if (!navbar) return;

    const ctx = gsap.context(() => {
      gsap.to(navbar, {
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid #e1e3e4",
        paddingTop: "14px",
        paddingBottom: "14px",
        scrollTrigger: {
          start: "top -30",
          end: "top -31",
          toggleActions: "play none none reverse",
          scrub: false,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Infrastructure", href: "/infrastructure" },
    { name: "Sustainability", href: "/sustainability" },
  ];

  const divisions = [
    {
      name: "Organics (Custom Synthesis)",
      href: "/organics",
      desc: "Custom synthesis & high-purity intermediates.",
    },
    {
      name: "Auxichem (Specialty Binders)",
      href: "/auxichem",
      desc: "Specialty binders, emulsions & adhesives.",
    },
    {
      name: "Plasto Pack (HDPE Packaging)",
      href: "/plastopack",
      desc: "Premium HDPE containers & packaging.",
    },
  ];

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 py-6 px-6 md:px-12 transition-all duration-300 pointer-events-auto bg-transparent border-b border-transparent"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2" aria-label="Devnandan Group Home">
          <span className="font-mono text-sm tracking-widest text-[#191c1d] group-hover:text-black transition-colors duration-300 uppercase">
            DEVNANDAN
          </span>
          <span className="h-1.5 w-1.5 rounded-none bg-black animate-pulse" />
          <span className="font-sans text-xs tracking-wider uppercase font-semibold text-[#555f70] group-hover:text-black transition-colors duration-300 hidden sm:inline">
            GROUP
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Magnetic key={link.href}>
              <Link
                href={link.href}
                className={`relative py-1 font-mono text-xs tracking-widest uppercase transition-colors duration-300 ${
                  pathname === link.href ? "text-black font-bold" : "text-[#555f70] hover:text-black"
                }`}
              >
                {link.name}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-black" />
                )}
              </Link>
            </Magnetic>
          ))}

          {/* Radix UI Dropdown Menu for Divisions */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button
                className="flex items-center gap-1.5 py-1 font-mono text-xs tracking-widest uppercase text-[#555f70] hover:text-black transition-colors duration-300 cursor-pointer outline-none border-none"
                aria-label="Toggle Divisions Sub-brands Menu"
              >
                Divisions <ChevronDown size={12} className="opacity-60" />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="z-50 min-w-[290px] p-1 mt-2 bg-white border border-black rounded-none shadow-none animate-in fade-in slide-in-from-top-2 duration-300 focus:outline-none"
                sideOffset={5}
                align="start"
              >
                {divisions.map((div) => (
                  <DropdownMenu.Item key={div.href} asChild>
                    <Link
                      href={div.href}
                      className="group flex items-center justify-between p-3 hover:bg-[#f8f9fa] border border-transparent hover:border-[#e1e3e4] transition-all duration-300 cursor-pointer outline-none rounded-none"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="font-sans text-xs font-bold text-[#191c1d] group-hover:text-black transition-colors duration-300">
                          {div.name}
                        </span>
                        <span className="font-sans text-[10px] text-[#555f70] group-hover:text-[#191c1d] transition-colors duration-300">
                          {div.desc}
                        </span>
                      </div>
                      <ArrowUpRight size={14} className="text-[#555f70] group-hover:text-black transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </nav>

        {/* Right CTA */}
        <div className="hidden md:block">
          <Magnetic>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2.5 font-mono text-xs tracking-widest uppercase bg-black text-white hover:bg-white hover:text-black hover:border-black border border-transparent transition-all duration-300 rounded-none"
              aria-label="Contact Devnandan Group"
            >
              Contact Us
            </Link>
          </Magnetic>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#555f70] hover:text-black transition-colors duration-300 cursor-pointer outline-none border-none"
          aria-label={mobileMenuOpen ? "Close Mobile Navigation Menu" : "Open Mobile Navigation Menu"}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] z-40 w-screen h-screen bg-[#f8f9fa]/95 backdrop-blur-xl border-t border-[#e1e3e4] flex flex-col p-8 animate-in fade-in slide-in-from-top-4 duration-300 md:hidden">
          <nav className="flex flex-col gap-6" aria-label="Mobile Navigation Drawer">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-mono text-sm tracking-widest uppercase transition-all duration-300 ${
                  pathname === link.href ? "text-black font-bold border-b border-black pb-1 self-start" : "text-[#555f70]"
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="h-[1px] bg-[#e1e3e4] my-2" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#555f70] font-semibold">
              Divisions
            </span>

            {divisions.map((div) => (
              <Link
                key={div.href}
                href={div.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-[#555f70] hover:text-black py-1 transition-colors duration-300 rounded-none"
              >
                <div className="flex flex-col">
                  <span className="font-sans text-sm font-bold text-[#191c1d]">{div.name}</span>
                  <span className="font-sans text-[10px] text-[#555f70]">{div.desc}</span>
                </div>
                <ArrowUpRight size={14} className="text-[#555f70]" />
              </Link>
            ))}

            <div className="h-[1px] bg-[#e1e3e4] my-2" />

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center py-3 w-full font-mono text-xs tracking-widest uppercase bg-black text-white font-semibold rounded-none border border-black hover:bg-white hover:text-black transition-colors duration-300 mt-4"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
