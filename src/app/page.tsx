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
    id: "pike-place",
    name: "Pike Place Marketplace",
    waitTime: "3 MINS",
    queueInfo: "Live preparation queue (4 orders ahead)",
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
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-[#F4F0EB]">
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
        <div className="glass-card p-3 rounded-2xl bg-white/70 border border-white/50 shadow-md flex items-center justify-center">
          <svg width="36" height="54" viewBox="0 0 36 54" className="overflow-visible">
            <defs>
              {/* Cup inner clip path */}
              <clipPath id="scroll-cup-clip">
                <path d="M 9 10 L 27 10 L 23 48 A 3 3 0 0 1 20 51 L 16 51 A 3 3 0 0 1 13 48 Z" />
              </clipPath>
            </defs>

            {/* Cup empty inner background */}
            <path
              d="M 9 10 L 27 10 L 23 48 A 3 3 0 0 1 20 51 L 16 51 A 3 3 0 0 1 13 48 Z"
              fill="#2C2421"
              fillOpacity="0.06"
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

            {/* Cup cardboard sleeve */}
            <path
              d="M 10.3 22 L 25.7 22 L 24.3 38 L 11.7 38 Z"
              fill="#C68B59"
              stroke="#2C2421"
              strokeWidth="0.8"
              strokeOpacity="0.25"
            />

            {/* Green Siren logo emblem on the sleeve */}
            <circle cx="18" cy="30" r="4" fill="#2B4D3D" />
            <circle cx="18" cy="30" r="1.5" fill="#FAF8F5" />

            {/* Glass shine highlight */}
            <path
              d="M 9 10 L 15 10 L 17 48 L 16 48 Z"
              fill="#FAF8F5"
              fillOpacity="0.25"
              pointerEvents="none"
            />

            {/* Cup Outer Outline */}
            <path
              d="M 9 10 L 27 10 L 23 48 A 3 3 0 0 1 20 51 L 16 51 A 3 3 0 0 1 13 48 Z"
              fill="none"
              stroke="#2C2421"
              strokeWidth="2.2"
              strokeOpacity="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Cup plastic lid flat top */}
            <path
              d="M 7 10 L 29 10 L 28 8 A 1.2 1.2 0 0 0 26.8 6.8 L 9.2 6.8 A 1.2 1.2 0 0 0 8 8 Z"
              fill="#FAF8F5"
              stroke="#2C2421"
              strokeWidth="1.8"
              strokeOpacity="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Cup plastic lid sip spout plug */}
            <path
              d="M 16 6.8 L 20 6.8 L 19.2 4.8 L 16.8 4.8 Z"
              fill="#2C2421"
              fillOpacity="0.8"
            />
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
              src="https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo.svg"
              alt="Starbucks Logo"
              className="w-8 h-8 brightness-0 invert"
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
