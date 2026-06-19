"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, User } from "lucide-react";

interface NavigationProps {
  cartCount?: number;
}

export default function Navigation({ cartCount = 0 }: NavigationProps) {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      // Check from bottom-most section upward so the furthest-scrolled section wins
      const sections = ["store-locator", "builder", "menu-section"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection("hero");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Run once on mount to set initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Signature Menu", href: "#menu-section", section: "menu-section" },
    { label: "Custom Lab",     href: "#builder",       section: "builder" },
    { label: "Find Store",     href: "#store-locator", section: "store-locator" },
  ];

  return (
    <>
      {/* ── Desktop Header ─────────────────────────────── */}
      <motion.header
        initial={false}
        animate={{
          backgroundColor: isScrolled
            ? "rgba(242, 240, 235, 0.97)"
            : "rgba(242, 240, 235, 0.78)",
          boxShadow: isScrolled
            ? "0 2px 32px rgba(30,57,50,0.10)"
            : "0 1px 0px rgba(30,57,50,0.05)",
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 hidden md:block backdrop-blur-lg border-b border-[#1E3932]/6 px-8 py-3"
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between h-14">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 hover-scale transition-custom">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo.svg"
              alt="Starbucks Logo"
              className="w-9 h-9"
            />
            <span className="text-xl font-display font-black tracking-widest text-[#00704A]">
              STARBUCKS
            </span>
          </a>

          {/* Nav Links */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.section;
              return (
                <a
                  key={link.section}
                  href={link.href}
                  className={`relative py-1.5 font-display text-sm font-bold tracking-wider uppercase transition-all duration-300 group ${
                    isActive
                      ? "text-[#00704A]"
                      : "text-[#1E3932]/55 hover:text-[#00704A]"
                  }`}
                >
                  {link.label}

                  {/* Animated sliding underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[#00704A] rounded-full transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />

                  {/* Active dot below underline */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00704A]"
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm font-bold text-[#1E3932] hover:text-[#00704A] transition-custom"
            >
              Sign In
            </a>

            <button className="px-5 py-2 rounded-full bg-[#00704A] text-[#F2F0EB] font-bold text-xs uppercase tracking-wider transition-custom hover-scale shadow-sm">
              Join Now
            </button>

            <button className="w-9 h-9 rounded-full bg-[#1E3932]/5 hover:bg-[#1E3932]/10 flex items-center justify-center text-[#1E3932] transition-custom hover-scale">
              <User size={16} />
            </button>

            <div className="w-px h-6 bg-[#1E3932]/10" />

            <button className="flex items-center gap-2 text-[#1E3932] hover:text-[#00704A] transition-custom hover-scale relative">
              <ShoppingBag size={18} />
              <motion.span
                key={cartCount}
                initial={{ scale: 1.6 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 14 }}
                className="absolute -top-1.5 -right-2 bg-[#00704A] text-[#F2F0EB] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile Bottom Nav Pill ──────────────────────── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-sm">
        <nav className="h-16 px-4 rounded-full flex items-center justify-around shadow-lg border border-[#1E3932]/10 bg-[#FFFFFF]/92 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.section;
            return (
              <a
                key={link.section}
                href={link.href}
                className={`flex flex-col items-center gap-0.5 transition-all duration-300 px-3 py-2 rounded-2xl ${
                  isActive
                    ? "text-[#00704A] bg-[#00704A]/8"
                    : "text-[#1E3932]/60 hover:text-[#00704A]"
                }`}
              >
                <span className="text-xs font-bold font-display uppercase tracking-wider">
                  {link.label.split(" ")[0]}
                </span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-[#00704A]" />
                )}
              </a>
            );
          })}

          <div className="w-px h-8 bg-[#1E3932]/10 self-center" />

          <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#00704A] text-[#F2F0EB] transition-custom hover-scale">
            <ShoppingBag size={18} />
            <motion.span
              key={cartCount}
              initial={{ scale: 1.6 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 14 }}
              className="absolute -top-1 -right-1 bg-[#E0115F] text-[#F2F0EB] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
            >
              {cartCount}
            </motion.span>
          </button>
        </nav>
      </div>
    </>
  );
}
