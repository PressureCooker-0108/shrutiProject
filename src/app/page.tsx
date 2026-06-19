"use client";

import React, { useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import MenuGrid from "@/components/MenuGrid";
import DrinkBuilder, { CustomizationState } from "@/components/DrinkBuilder";
import StoreLocator, { StarbucksStore } from "@/components/StoreLocator";

export default function Home() {
  // Page-wide Customization State for syncing quick order and custom drink building
  const [customization, setCustomization] = useState<CustomizationState>({
    base: "Cold Brew",
    milk: "None",
    sweetener: "None",
    topping: "None",
    ice: "Regular",
    size: "Grande",
  });

  // State to manage selected Starbucks Store details
  const [activeStore, setActiveStore] = useState({
    id: "kala-ghoda",
    name: "Starbucks Kala Ghoda",
    waitTime: "4 MINS",
    queueInfo: "Live preparation queue (3 orders ahead)",
  });

  const [cartCount, setCartCount] = useState(0);

  // Sync selection when "Customize" is clicked on a menu item
  const handleCustomizeDrink = (preset: Required<CustomizationState>) => {
    setCustomization(preset);
    
    // Smooth scroll down to the builder section
    const el = document.getElementById("builder");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Add to Cart handler
  const handleAddToCart = (itemName: string, price: number) => {
    setCartCount((prev) => prev + 1);
  };

  // Sync selection when quick/reorder is clicked in the Hero widget
  const handleQuickOrder = (drinkName: string) => {
    if (drinkName === "Iced Matcha Cold Foam Latte") {
      setCustomization({
        base: "Matcha Green",
        milk: "Oat Milk",
        sweetener: "Classic Syrup",
        topping: "Cold Foam",
        ice: "Regular",
        size: "Grande",
      });
    }

    // Smooth scroll down to builder
    const el = document.getElementById("builder");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSelectStore = (store: StarbucksStore) => {
    setActiveStore({
      id: store.id,
      name: store.name,
      waitTime: store.waitTime,
      queueInfo: store.queueInfo,
    });
  };

  // Scroll Progress calculations for coffee cup filling indicator
  const { scrollYProgress } = useScroll();
  // Transform scroll progress (0 to 1) to liquid rect Y coordinates
  // Empty cup corresponds to Y value 51 (rect is pushed down), full corresponds to 10 (top rim of cup)
  const liquidY = useTransform(scrollYProgress, [0, 1], [51, 10]);

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-background">
      {/* Drifting glowing ambient background blobs */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#FF2E93]/8 ambient-blob pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-[#D48C47]/10 ambient-blob pointer-events-none" style={{ animationDelay: "-5s", animationDuration: "25s" }} />
      <div className="absolute bottom-[20%] left-[-5%] w-[550px] h-[550px] bg-[#9C8EFA]/8 ambient-blob pointer-events-none" style={{ animationDelay: "-10s", animationDuration: "22s" }} />
      <div className="absolute bottom-[2%] right-[5%] w-[400px] h-[400px] bg-[#2B4D3D]/6 ambient-blob pointer-events-none" style={{ animationDelay: "-3s", animationDuration: "18s" }} />

      {/* Floating Coffee Cup Scroll Progress Indicator (Starbucks To-Go Cup design) */}
      <div className="fixed right-6 bottom-24 z-50 hidden md:flex flex-col items-center gap-1.5">
        <span className="text-[8px] font-bold tracking-widest text-[#2C2421]/60 uppercase text-center select-none pointer-events-none">
          Brew Fill
        </span>
        <div className="glass-card p-3 rounded-2xl bg-background/70 border border-white/50 shadow-md flex items-center justify-center">
          <svg width="36" height="54" viewBox="0 0 36 54" className="overflow-visible">
            <defs>
              {/* Cup inner clip path */}
              <clipPath id="scroll-cup-clip">
                <path d="M 9 12 L 27 12 L 23 48 A 3 3 0 0 1 20 51 L 16 51 A 3 3 0 0 1 13 48 Z" />
              </clipPath>
            </defs>

            {/* Cup empty inner background (White paper look!) */}
            <path
              d="M 9 12 L 27 12 L 23 48 A 3 3 0 0 1 20 51 L 16 51 A 3 3 0 0 1 13 48 Z"
              fill="#FFFFFF"
              stroke="#2C2421"
              strokeWidth="1.8"
            />

            {/* Liquid fill reacting to scroll */}
            <g clipPath="url(#scroll-cup-clip)">
              <motion.rect
                x="0"
                y="0"
                width="36"
                height="54"
                style={{ y: liquidY }}
                fill="#2B4D3D"
              />
            </g>

            {/* Cup Outer Outline */}
            <path
              d="M 9 12 L 27 12 L 23 48 A 3 3 0 0 1 20 51 L 16 51 A 3 3 0 0 1 13 48 Z"
              fill="none"
              stroke="#2C2421"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Circular Green Siren Logo emblem using the uploaded logo */}
            <image href="/siren-logo.png" x="12.5" y="24.5" width="11" height="11" />

            {/* Cup plastic lid with rim lip extending outwards and raised center mouthpiece */}
            {/* Flange rim lip */}
            <path
              d="M 6.5 12 L 29.5 12 L 28.5 9.5 L 7.5 9.5 Z"
              fill="#FFFFFF"
              stroke="#2C2421"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Raised center dome */}
            <path
              d="M 10 9.5 L 26 9.5 L 24 5.5 L 12 5.5 Z"
              fill="#FFFFFF"
              stroke="#2C2421"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Sipper spout highlight */}
            <rect x="16" y="4.5" width="4" height="1.5" rx="0.5" fill="#2B4D3D" />
          </svg>
        </div>
      </div>

      {/* Navigation Header */}
      <Navigation cartCount={cartCount} />

      {/* Main Content Sections */}
      <main className="flex-grow pt-16 pb-24 md:pt-24 space-y-16 relative z-10">
        {/* Hero Area featuring 'Commuter Mode' */}
        <HeroSection
          onQuickOrder={handleQuickOrder}
          activeStoreName={activeStore.name}
          activeStoreWaitTime={activeStore.waitTime}
          activeStoreQueueInfo={activeStore.queueInfo}
        />

        {/* Signature Menu Grid Section */}
        <MenuGrid 
          onCustomizeDrink={handleCustomizeDrink}
          onAddToCart={handleAddToCart}
        />

        {/* Custom Drink Lab Customizer */}
        <DrinkBuilder
          customization={customization}
          onChangeCustomization={setCustomization}
        />

        {/* Store Locator Section */}
        <StoreLocator
          selectedStoreId={activeStore.id}
          onSelectStore={handleSelectStore}
        />
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#2C2421] text-[#F4F0EB]/60 py-12 px-6 border-t border-[#2C2421]/15 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
             <img
              src="/siren-logo.png"
              alt="Starbucks Logo"
              className="w-8 h-8"
            />
            <span className="text-xl font-display font-black tracking-widest text-[#FAF8F5]">
              STARBUCKS
            </span>
          </div>
          
          <div className="text-xs text-center md:text-right space-y-1">
            <p>© {new Date().getFullYear()} Strategic Digital Presentation.</p>
            <p>Designed for academic web evaluation. No trademark infringement intended.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
