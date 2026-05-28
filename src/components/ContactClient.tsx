"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";

export default function ContactClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Form state
  const [formValues, setFormValues] = useState({
    name: "",
    company: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // GSAP title animations
  useGSAP(() => {
    gsap.fromTo(
      ".reveal-contact-title",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.1 }
    );
  }, { scope: containerRef });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.name || !formValues.email || !formValues.message) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate API request delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormValues({
        name: "",
        company: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const locations = [
    {
      title: "R&D & Marketing",
      address: "S/25-26, Municipal Karmacharinagar, Sola Road, Ghatlodiya, Ahmedabad – 380061.",
    },
    {
      title: "Chemical Factory",
      address: "Survey No. 2501, Opp. Torrent Pharma Ltd., Village Rajpur, Ta. Kadi, Mehsana – 382715.",
    },
    {
      title: "Packaging Factory",
      address: "Plot No. 9, Kamla Amrut Industrial Park, Indrad, Ta. Kadi - 382715.",
    },
  ];

  return (
    <div ref={containerRef} className="w-full bg-[#f8f9fa] py-16 md:py-24 text-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-20">
        
        {/* Header */}
        <section className="flex flex-col gap-4 max-w-4xl" aria-labelledby="contact-heading">
          <span className="font-mono text-xs text-[#555f70] uppercase tracking-widest font-bold reveal-contact-title">
            connect with our group
          </span>
          <h1 id="contact-heading" className="font-sans text-4xl md:text-6xl font-bold tracking-tight text-black leading-tight reveal-contact-title">
            Partner with Devnandan.
          </h1>
          <p className="font-sans text-sm md:text-lg text-[#555f70] leading-relaxed reveal-contact-title">
            Submit your material parameters, synthesis requirements, or heavy-duty packaging specifications. Our technical R&D and dispatch teams will align on your project.
          </p>
        </section>

        {/* 2-Column Split Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 border-t border-[#e1e3e4] pt-16" aria-label="Corporate Coordinates & Inquiry Form">
          {/* Left Column: Physical Locations */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs text-[#555f70] uppercase tracking-widest font-bold">
                OFFICES & PRODUCTION PLANTS
              </span>
              <h2 className="font-sans text-2xl font-bold text-black tracking-tight">
                Our Coordinates
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              {locations.map((loc, idx) => (
                <div key={idx} className="flex gap-4 items-start p-6 bg-white border border-[#e1e3e4] rounded-none shadow-none hover:border-black transition-colors duration-300">
                  <div className="mt-1 flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-none bg-[#f9fafb] border border-[#e1e3e4] text-[#191c1d]">
                    <MapPin size={14} />
                  </div>
                  <div className="flex flex-col gap-1 font-sans">
                    <span className="text-xs font-bold text-[#191c1d] uppercase tracking-wider font-mono">
                      {loc.title}
                    </span>
                    <p className="text-xs md:text-sm text-[#555f70] leading-relaxed max-w-md">
                      {loc.address}
                    </p>
                  </div>
                </div>
              ))}

              {/* Email channel */}
              <div className="flex gap-4 items-start p-6 bg-white border border-[#e1e3e4] rounded-none shadow-none hover:border-black transition-colors duration-300">
                <div className="mt-1 flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-none bg-[#f9fafb] border border-[#e1e3e4] text-[#191c1d]">
                  <Mail size={14} />
                </div>
                <div className="flex flex-col gap-1 font-sans">
                  <span className="text-xs font-bold text-[#191c1d] uppercase tracking-wider font-mono">
                    Email Correspondence
                  </span>
                  <a
                    href="mailto:info@devnandan.co.in"
                    className="text-xs md:text-sm text-black hover:text-[#555f70] font-semibold transition-colors"
                  >
                    info@devnandan.co.in
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Floating-Label Form */}
          <div className="bg-white border border-black rounded-none p-8 md:p-10 shadow-none">
            <div className="flex flex-col gap-2 mb-8">
              <span className="font-mono text-[10px] text-[#555f70] uppercase tracking-widest font-bold">
                TECHNICAL INQUIRY MODULE
              </span>
              <h2 className="font-sans text-xl font-bold text-black tracking-tight">
                Submit Material Parameter Request
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-sans">
              {/* Name */}
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formValues.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  disabled={isSubmitting}
                  className="peer w-full bg-transparent border border-t-transparent border-l-transparent border-r-transparent border-b-[#cbd5e1] focus:border-black py-2.5 px-1 focus:px-3 text-sm text-black placeholder-transparent focus:outline-none transition-all rounded-none"
                />
                <label
                  htmlFor="name"
                  className="absolute left-1 -top-3.5 text-[#555f70] text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-zinc-500 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-xs"
                >
                  Full Name
                </label>
              </div>

              {/* Company */}
              <div className="relative">
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formValues.company}
                  onChange={handleChange}
                  placeholder="Company / Enterprise"
                  disabled={isSubmitting}
                  className="peer w-full bg-transparent border border-t-transparent border-l-transparent border-r-transparent border-b-[#cbd5e1] focus:border-black py-2.5 px-1 focus:px-3 text-sm text-black placeholder-transparent focus:outline-none transition-all rounded-none"
                />
                <label
                  htmlFor="company"
                  className="absolute left-1 -top-3.5 text-[#555f70] text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-zinc-500 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-xs"
                >
                  Company / Enterprise
                </label>
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  placeholder="Corporate Email"
                  required
                  disabled={isSubmitting}
                  className="peer w-full bg-transparent border border-t-transparent border-l-transparent border-r-transparent border-b-[#cbd5e1] focus:border-black py-2.5 px-1 focus:px-3 text-sm text-black placeholder-transparent focus:outline-none transition-all rounded-none"
                />
                <label
                  htmlFor="email"
                  className="absolute left-1 -top-3.5 text-[#555f70] text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-zinc-500 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-xs"
                >
                  Corporate Email
                </label>
              </div>

              {/* Subject */}
              <div className="relative">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formValues.subject}
                  onChange={handleChange}
                  placeholder="Subject / Project Scope"
                  disabled={isSubmitting}
                  className="peer w-full bg-transparent border border-t-transparent border-l-transparent border-r-transparent border-b-[#cbd5e1] focus:border-black py-2.5 px-1 focus:px-3 text-sm text-black placeholder-transparent focus:outline-none transition-all rounded-none"
                />
                <label
                  htmlFor="subject"
                  className="absolute left-1 -top-3.5 text-[#555f70] text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-zinc-500 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-xs"
                >
                  Subject / Project Scope
                </label>
              </div>

              {/* Message */}
              <div className="relative mt-2">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formValues.message}
                  onChange={handleChange}
                  placeholder="Describe synthesis profile, binder target, or packaging volumes..."
                  required
                  disabled={isSubmitting}
                  className="peer w-full bg-transparent border border-t-transparent border-l-transparent border-r-transparent border-b-[#cbd5e1] focus:border-black py-2.5 px-1 focus:px-3 text-sm text-black placeholder-transparent focus:outline-none resize-none transition-all rounded-none"
                />
                <label
                  htmlFor="message"
                  className="absolute left-1 -top-3.5 text-[#555f70] text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-zinc-500 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-xs"
                >
                  Message
                </label>
              </div>

              {/* Submit trigger button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-4 font-mono text-xs tracking-widest uppercase bg-black text-white hover:bg-white hover:text-black hover:border-black border border-transparent transition-all duration-300 rounded-none disabled:opacity-50 cursor-pointer font-bold"
              >
                {isSubmitting ? (
                  <>
                    Processing Request <Loader2 size={14} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Submit Inquiry <Send size={14} />
                  </>
                )}
              </button>

              {/* Status indicators */}
              {submitStatus === "success" && (
                <p className="text-xs text-emerald-600 font-sans mt-2 text-center font-bold">
                  Request successfully logged. Our technical division team will contact you shortly.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-xs text-red-600 font-sans mt-2 text-center font-bold">
                  Communication anomaly encountered. Please retry or contact info@devnandan.co.in directly.
                </p>
              )}
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
