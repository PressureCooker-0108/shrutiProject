"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Clock, MapPin, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";

interface HeroSectionProps {
  onQuickOrder: (drinkName: string) => void;
  activeStoreName?: string;
  activeStoreWaitTime?: string;
  activeStoreQueueInfo?: string;
}

export default function HeroSection({
  onQuickOrder,
  activeStoreName = "Starbucks Kala Ghoda",
  activeStoreWaitTime = "4 MINS",
  activeStoreQueueInfo = "Live preparation queue (3 orders ahead)",
}: HeroSectionProps) {
  const [commuterMode, setCommuterMode] = useState(true);
  const [greeting, setGreeting] = useState("Good morning");
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    const hrs = new Date().getHours();
    if (hrs < 12) setGreeting("Good morning");
    else if (hrs < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const handleQuickReorder = () => {
    setOrdered(true);
    onQuickOrder("Iced Matcha Cold Foam Latte");
    setTimeout(() => {
      setOrdered(false);
    }, 4000);
  };

  return (
    <section id="commuter" className="relative w-full py-24 md:py-32 px-6 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
      
      {/* Hero Content Column */}
      <div className="flex-1 space-y-8 text-left relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase">
          <Sparkles size={12} className="text-[#C68B59]" />
          <span>Starbucks Digital Rebrand</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-display font-black text-[var(--cold-brew)] leading-[1.05] tracking-tight">
          {greeting}, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[var(--cold-brew)] to-primary">Commuter</span>
        </h1>
        
        <p className="text-[var(--cold-brew)]/80 max-w-xl text-base md:text-lg leading-relaxed font-medium">
          Welcome to the new digital destination. Switch on Commuter Mode for instant queue times and one-tap reorders, or scroll down to brew your mood.
        </p>

        {/* Action Toggle between Commuter and Regular view */}
        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={() => setCommuterMode(true)}
            className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-custom hover-scale flex items-center gap-2 ${
              commuterMode
                ? "bg-[var(--cold-brew)] text-oat-milk shadow-md"
                : "bg-background/40 text-[var(--cold-brew)]/80 hover:text-[var(--cold-brew)] hover:bg-background/60 border border-white/40"
            }`}
          >
            <Zap size={13} className={commuterMode ? "fill-[#F2F0EB] text-oat-milk" : ""} />
            <span>Commuter Mode</span>
          </button>
          
          <button
            onClick={() => setCommuterMode(false)}
            className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-custom hover-scale ${
              !commuterMode
                ? "bg-[var(--cold-brew)] text-oat-milk shadow-md"
                : "bg-background/40 text-[var(--cold-brew)]/80 hover:text-[var(--cold-brew)] hover:bg-background/60 border border-white/40"
            }`}
          >
            Explore Menu
          </button>
        </div>
      </div>

      {/* Hero Widget Column (Translucent Glassmorphic Widget Container) */}
      <div className="w-full lg:w-[480px] relative z-10">
        
        {/* Decorative Glowing Rings behind the card */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#FF2E93]/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#9C8EFA]/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDelay: "1s" }} />

        <AnimatePresence mode="wait">
          {commuterMode ? (
            <motion.div
              key="commuter-widget"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="w-full rounded-[40px] p-8 glass-card space-y-6 relative overflow-hidden animate-glow"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[var(--cold-brew)]/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF2E93] animate-ping" />
                  <span className="text-[10px] font-bold text-[var(--cold-brew)]/60 tracking-widest uppercase">
                    Live Store Status
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[var(--cold-brew)]/70 text-xs font-bold uppercase tracking-wider">
                  <MapPin size={12} className="text-primary" />
                  <span>{activeStoreName}</span>
                </div>
              </div>

              {/* Live Queue Time Visualizer */}
              <div className="flex items-center gap-5 py-2">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-primary to-[var(--cold-brew)] text-oat-milk shadow-md shadow-primary/15">
                  <Clock size={28} />
                </div>
                <div>
                  <div className="text-4xl font-display font-black text-[var(--cold-brew)] tracking-tight leading-none">
                    {activeStoreWaitTime} WAIT
                  </div>
                  <div className="text-xs text-[var(--cold-brew)]/70 mt-1.5 font-medium">
                    {activeStoreQueueInfo}
                  </div>
                </div>
              </div>

              {/* Custom One-Tap Reorder Section */}
              <div className="rounded-[28px] bg-background/70 p-5 border border-white/60 space-y-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] uppercase font-black tracking-wider text-[#C68B59]">
                      Your Daily Ritual
                    </span>
                    <h3 className="font-extrabold text-sm text-[var(--cold-brew)] mt-0.5">
                      Iced Matcha Cold Foam Latte
                    </h3>
                    <p className="text-xs text-[var(--cold-brew)]/60 mt-0.5 font-medium">
                      Venti • Oat Milk • Lavender Foam
                    </p>
                  </div>
                  <span className="text-sm font-black text-[var(--cold-brew)]">$6.75</span>
                </div>

                <AnimatePresence mode="wait">
                  {ordered ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-[var(--cold-brew)] text-oat-milk flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider shadow-md"
                    >
                      <CheckCircle2 size={16} className="text-[#9C8EFA]" />
                      <span>Order Placed! Warming up Cup</span>
                    </motion.div>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleQuickReorder}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-[var(--cold-brew)] text-oat-milk flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider transition-custom hover-scale shadow-md shadow-primary/10 hover:shadow-primary/25 cursor-pointer"
                    >
                      <Zap size={12} className="fill-[#F2F0EB]" />
                      <span>One-Tap Reorder</span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="standard-widget"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="w-full rounded-[40px] p-8 glass-card space-y-6 relative overflow-hidden"
            >
              <h3 className="text-2xl font-display font-black text-[var(--cold-brew)] border-b border-[var(--cold-brew)]/10 pb-4">
                What&apos;s Brewing Today
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-background/50 border border-transparent hover:border-white/40 transition-custom cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center text-xl shadow-inner">
                    🍵
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-[var(--cold-brew)]">Matcha Lavender Latte</h4>
                    <p className="text-xs text-[var(--cold-brew)]/60 font-medium">Creamy, floral, and energizing</p>
                  </div>
                  <ChevronRight size={16} className="text-[var(--cold-brew)]/40" />
                </div>

                <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-background/50 border border-transparent hover:border-white/40 transition-custom cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF2E93]/15 to-[#FF2E93]/5 flex items-center justify-center text-xl shadow-inner">
                    🍓
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-[var(--cold-brew)]">Dragonfruit Refresher</h4>
                    <p className="text-xs text-[var(--cold-brew)]/60 font-medium">Crisp, vibrant fruit energy</p>
                  </div>
                  <ChevronRight size={16} className="text-[var(--cold-brew)]/40" />
                </div>

                <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-background/50 border border-transparent hover:border-white/40 transition-custom cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D48C47]/15 to-[#D48C47]/5 flex items-center justify-center text-xl shadow-inner">
                    ☕
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-[var(--cold-brew)]">Salted Caramel Brew</h4>
                    <p className="text-xs text-[var(--cold-brew)]/60 font-medium">Rich cold brew with sweet foam</p>
                  </div>
                  <ChevronRight size={16} className="text-[var(--cold-brew)]/40" />
                </div>
              </div>

              <a
                href="#builder"
                className="block text-center w-full py-4 rounded-xl border-2 border-primary text-primary text-xs font-bold uppercase tracking-wider transition-custom hover-scale hover:bg-primary hover:text-oat-milk hover:shadow-md"
              >
                Go to Drink Customizer
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
