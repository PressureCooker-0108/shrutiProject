"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, User, Sun, Moon } from "lucide-react";

interface NavigationProps {
  cartCount?: number;
}

export default function Navigation({ cartCount = 0 }: NavigationProps) {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

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

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

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
          boxShadow: isScrolled
            ? "0 2px 32px rgba(30,57,50,0.10)"
            : "0 1px 0px rgba(30,57,50,0.05)",
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 hidden md:block backdrop-blur-lg border-b border-foreground/6 px-8 py-3 transition-colors duration-300 ${
          isScrolled ? "bg-background/95" : "bg-background/78"
        }`}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between h-14">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 hover-scale transition-custom">
            <img
              src="/siren-logo.png"
              alt="Starbucks Logo"
              className="w-9 h-9"
            />
            <span className="text-xl font-display font-black tracking-widest text-primary dark:text-foreground">
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
                      ? "text-primary"
                      : "text-foreground/55 hover:text-primary"
                  }`}
                >
                  {link.label}

                  {/* Animated sliding underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-primary rounded-full transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />

                  {/* Active dot below underline */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
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
              className="text-sm font-bold text-foreground hover:text-primary transition-custom"
            >
              Sign In
            </a>

            <button className="px-5 py-2 rounded-full bg-primary text-background dark:text-[var(--cold-brew)] font-bold text-xs uppercase tracking-wider transition-custom hover-scale shadow-sm">
              Join Now
            </button>

            <button className="w-9 h-9 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center text-foreground transition-custom hover-scale">
              <User size={16} />
            </button>

            <button 
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center text-foreground transition-custom hover-scale"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            <div className="w-px h-6 bg-foreground/10" />

            <button className="flex items-center gap-2 text-foreground hover:text-primary transition-custom hover-scale relative">
              <ShoppingBag size={18} />
              <motion.span
                key={cartCount}
                initial={{ scale: 1.6 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 14 }}
                className="absolute -top-1.5 -right-2 bg-primary text-background dark:text-[var(--cold-brew)] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile Bottom Nav Pill ──────────────────────── */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[95%] max-w-sm">
        <nav className="h-16 px-4 rounded-full flex items-center justify-around shadow-lg border border-foreground/10 bg-background/92 backdrop-blur-md transition-colors duration-300">
          {navLinks.map((link) => {
            const isActive = activeSection === link.section;
            return (
              <a
                key={link.section}
                href={link.href}
                className={`flex flex-col items-center gap-0.5 transition-all duration-300 px-3 py-2 rounded-2xl ${
                  isActive
                    ? "text-primary bg-primary/8"
                    : "text-foreground/60 hover:text-primary"
                }`}
              >
                <span className="text-xs font-bold font-display uppercase tracking-wider">
                  {link.label.split(" ")[0]}
                </span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-primary" />
                )}
              </a>
            );
          })}

          <div className="w-px h-8 bg-foreground/10 self-center" />

          {/* Mobile Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground/5 text-foreground transition-custom hover-scale"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary text-background dark:text-[var(--cold-brew)] transition-custom hover-scale">
            <ShoppingBag size={18} />
            <motion.span
              key={cartCount}
              initial={{ scale: 1.6 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 14 }}
              className="absolute -top-1 -right-1 bg-[#E0115F] text-oat-milk text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
            >
              {cartCount}
            </motion.span>
          </button>
        </nav>
      </div>
    </>
  );
}
