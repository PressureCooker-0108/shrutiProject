"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, BookOpen, Sparkles } from "lucide-react";
import { MENU_ITEMS, MenuItem } from "@/data/menu";

interface MenuBookProps {
  onSelectItem: (item: MenuItem) => void;
}

interface Spread {
  id: string;
  title: string;
  category: string;
  leftPageItems: MenuItem[];
  rightPageItems: MenuItem[];
}

export default function MenuBook({ onSelectItem }: MenuBookProps) {
  const [spreadIndex, setSpreadIndex] = useState<number>(0); // 0 = Cover, 1 to 6 = Categories, 7 = Back Cover
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev" | null>(null);
  const [targetSpreadIndex, setTargetSpreadIndex] = useState<number | null>(null);

  // Group items by category to construct spreads
  const coffeeItems = MENU_ITEMS.filter((item) => item.category === "Coffee");
  const teaItems = MENU_ITEMS.filter((item) => item.category === "Tea & Matcha");
  const refresherItems = MENU_ITEMS.filter((item) => item.category === "Refresher");
  const frapItems = MENU_ITEMS.filter((item) => item.category === "Frappuccino");
  const foodItems = MENU_ITEMS.filter((item) => item.category === "Bakery & Food");

  const spreads: Spread[] = [
    {
      id: "cover",
      title: "Starbucks Rebrand Menu",
      category: "Cover",
      leftPageItems: [],
      rightPageItems: [],
    },
    {
      id: "coffee",
      title: "Signature Coffee",
      category: "Coffee",
      leftPageItems: coffeeItems.slice(0, 2),
      rightPageItems: coffeeItems.slice(2, 4),
    },
    {
      id: "tea",
      title: "Earthy Teas & Matchas",
      category: "Tea & Matcha",
      leftPageItems: teaItems.slice(0, 2),
      rightPageItems: teaItems.slice(2, 4),
    },
    {
      id: "refresher",
      title: "Vibrant Refreshers",
      category: "Refresher",
      leftPageItems: refresherItems.slice(0, 2),
      rightPageItems: refresherItems.slice(2, 3), // Pink drink
    },
    {
      id: "frap",
      title: "Ice-Blended Frappuccinos",
      category: "Frappuccino",
      leftPageItems: frapItems.slice(0, 2),
      rightPageItems: frapItems.slice(2, 5),
    },
    {
      id: "food-savory",
      title: "Warm Savory Food",
      category: "Bakery & Food",
      leftPageItems: foodItems.filter((i) => i.id.includes("wrap") || i.id.includes("sandwich") || i.id.includes("toast")).slice(0, 2),
      rightPageItems: foodItems.filter((i) => i.id.includes("wrap") || i.id.includes("sandwich") || i.id.includes("toast")).slice(2, 5),
    },
    {
      id: "food-sweet",
      title: "Flaky Sweets & Pastries",
      category: "Bakery & Food",
      leftPageItems: foodItems.filter((i) => !i.id.includes("wrap") && !i.id.includes("sandwich") && !i.id.includes("toast")).slice(0, 3),
      rightPageItems: foodItems.filter((i) => !i.id.includes("wrap") && !i.id.includes("sandwich") && !i.id.includes("toast")).slice(3, 6),
    },
    {
      id: "back-cover",
      title: "Back Cover",
      category: "Back",
      leftPageItems: [],
      rightPageItems: [],
    },
  ];

  const tabs = [
    { label: "Coffee", category: "Coffee", targetIndex: 1, color: "bg-[#5C4033]" },
    { label: "Tea", category: "Tea & Matcha", targetIndex: 2, color: "bg-[#00704A]" },
    { label: "Refresher", category: "Refresher", targetIndex: 3, color: "bg-[#D81B60]" },
    { label: "Frap", category: "Frappuccino", targetIndex: 4, color: "bg-[#C68B59]" },
    { label: "Food", category: "Bakery & Food", targetIndex: 5, color: "bg-[#8B5E3C]" },
  ];

  const handleTurnPage = (targetIndex: number) => {
    if (isFlipping || targetIndex === spreadIndex) return;

    setFlipDirection(targetIndex > spreadIndex ? "next" : "prev");
    setTargetSpreadIndex(targetIndex);
    setIsFlipping(true);

    setTimeout(() => {
      setSpreadIndex(targetIndex);
      setIsFlipping(false);
      setFlipDirection(null);
      setTargetSpreadIndex(null);
    }, 600); // Match CSS transition duration
  };

  const currentSpread = spreads[spreadIndex];

  const renderPage = (idx: number, side: "left" | "right") => {
    if (idx < 0 || idx >= spreads.length) return null;

    if (idx === 0) {
      if (side === "left") {
        return <div className="w-full h-full bg-[#1E3932] border-r border-black/5" />;
      }
      /* FRONT COVER */
      return (
        <div 
          onClick={() => handleTurnPage(1)}
          className="w-full h-full bg-[#1E3932] text-[#F2F0EB] flex flex-col items-center justify-center p-8 md:p-12 text-center cursor-pointer relative overflow-hidden group"
        >
          {/* Gold textures */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full border border-white/5 opacity-10" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full border border-white/5 opacity-10" />
          
          <div className="space-y-6 max-w-md relative z-10 group-hover:scale-102 transition-transform duration-500">
            <div className="flex justify-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo.svg"
                alt="Starbucks Siren"
                className="w-20 h-20 md:w-28 md:h-28 brightness-0 invert"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-black text-3xl md:text-5xl uppercase tracking-widest leading-none border-b-2 border-[#C68B59]/30 pb-4">
                The Menu
              </h3>
              <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#C68B59] mt-2 flex items-center justify-center gap-1">
                <Sparkles size={12} />
                Strategic Rebrand Presentation
                <Sparkles size={12} />
              </p>
            </div>
            <p className="text-[10px] md:text-xs text-[#F2F0EB]/60 uppercase font-semibold tracking-wider pt-6 animate-pulse">
              Click to Open Book
            </p>
          </div>
        </div>
      );
    }

    if (idx === 7) {
      if (side === "right") {
        return <div className="w-full h-full bg-[#1E3932]" />;
      }
      /* BACK COVER */
      return (
        <div 
          onClick={() => handleTurnPage(0)}
          className="w-full h-full bg-[#1E3932] text-[#F2F0EB] flex flex-col items-center justify-center p-8 text-center cursor-pointer relative overflow-hidden"
        >
          <div className="space-y-4 max-w-sm">
            <h3 className="font-display font-black text-2xl uppercase tracking-widest text-[#C68B59]">
              Starbucks
            </h3>
            <p className="text-xs text-[#F2F0EB]/50 leading-relaxed font-semibold">
              Academic overhaul presentation. Designed for premium aesthetics, engaging micro-animations, and interactive co-creation.
            </p>
            <p className="text-[10px] text-[#F2F0EB]/40 uppercase tracking-wider pt-8">
              Click to Close Book
            </p>
          </div>
        </div>
      );
    }

    /* STANDARD SPREAD */
    const pageItems = side === "left" ? spreads[idx].leftPageItems : spreads[idx].rightPageItems;
    const pageNum = side === "left" ? idx * 2 - 1 : idx * 2;
    const isLeft = side === "left";

    return (
      <div className={`w-full h-full p-4 md:p-8 flex flex-col justify-between bg-white relative ${isLeft ? "border-r border-black/5" : ""}`}>
        <div>
          {/* Page Header */}
          <div className="flex items-center justify-between border-b border-[#1E3932]/5 pb-2 mb-4">
            <h4 className="font-display font-black text-xs md:text-sm uppercase tracking-wider text-[#00704A]">
              {spreads[idx].title}
            </h4>
            <span className="text-[9px] font-bold text-[#1E3932]/45">Page {pageNum}</span>
          </div>

          {/* Page Items */}
          <div className="space-y-3">
            {pageItems.length > 0 ? (
              pageItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="group p-3 rounded-2xl hover:bg-[#F2F0EB]/50 transition-all duration-300 cursor-pointer flex gap-4 items-center border border-transparent hover:border-[#1E3932]/5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-xl shadow-sm group-hover:scale-102 transition-all duration-300"
                  />
                  <div className="flex-1 text-left">
                    <h5 className="font-display font-extrabold text-xs md:text-sm text-[#1E3932] group-hover:text-[#00704A] transition-colors leading-tight">
                      {item.name}
                    </h5>
                    <span className="text-[9px] uppercase font-bold text-[#1E3932]/50 tracking-wide mt-1 inline-block">
                      ${item.price.toFixed(2)} • {item.calories} cal
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-32 flex items-center justify-center text-xs text-[#1E3932]/40 uppercase tracking-wider font-bold">
                End of Section
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="menu-section" className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto space-y-12 select-none">
      {/* Header */}
      <div className="space-y-2 border-b border-[#1E3932]/5 pb-6 text-center max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#00704A] tracking-wider uppercase">
          <BookOpen size={14} className="text-[#00704A]" />
          <span>Flipping Menu Experience</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-display font-black text-[#1E3932] tracking-tight">
          The Signature Book
        </h2>
        <p className="text-sm md:text-base text-[#1E3932]/75">
          Flip through the pages of our interactive catalog. Click bookmarks to skip to categories, and select items to inspect their sassy profiles.
        </p>
      </div>

      {/* Book Container */}
      <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center py-6">
        
        {/* Navigation Buttons (Desktop) */}
        {spreadIndex > 0 && (
          <button
            onClick={() => handleTurnPage(spreadIndex - 1)}
            disabled={isFlipping}
            className="absolute left-[-20px] lg:left-[-60px] z-30 w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-md border border-[#1E3932]/10 flex items-center justify-center text-[#1E3932] hover:scale-105 transition-all cursor-pointer disabled:opacity-50"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Book Outer Wrapper */}
        {spreadIndex < spreads.length - 1 && (
          <button
            onClick={() => handleTurnPage(spreadIndex + 1)}
            disabled={isFlipping}
            className="absolute right-[-20px] lg:right-[-60px] z-30 w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-md border border-[#1E3932]/10 flex items-center justify-center text-[#1E3932] hover:scale-105 transition-all cursor-pointer disabled:opacity-50"
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Book Outer Wrapper */}
        <div className="relative w-full max-w-[840px] aspect-[16/10] md:aspect-[840/520] bg-[#F2F0EB] rounded-[36px] shadow-2xl p-4 md:p-6 border border-[#1E3932]/10 overflow-visible flex">
          
          {/* Vertical Bookmarks/Tabs on Right Edge */}
          {spreadIndex > 0 && spreadIndex < 7 && (
            <div className="absolute right-[-32px] md:right-[-48px] top-12 flex flex-col gap-1.5 z-20">
              {tabs.map((tab) => {
                const isActive = spreads[spreadIndex].category === tab.category;
                return (
                  <button
                    key={tab.label}
                    onClick={() => handleTurnPage(tab.targetIndex)}
                    className={`w-[44px] md:w-[64px] py-2 md:py-3 rounded-r-2xl font-display font-extrabold text-[9px] md:text-[11px] uppercase tracking-wider text-white shadow-md text-center transition-all duration-300 transform origin-left hover:scale-105 cursor-pointer ${tab.color} ${
                      isActive ? "scale-x-110 translate-x-1 font-black shadow-lg" : "opacity-75 hover:opacity-100"
                    }`}
                  >
                    <span className="writing-mode-vertical select-none">{tab.label[0]}<span className="hidden md:inline">{tab.label.substring(1)}</span></span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Book Inner Page Body */}
          <div className="relative flex-1 bg-white rounded-2xl border border-black/10 overflow-hidden shadow-inner flex perspective-2000">
            
            {/* Gutter / Center Shadow crease for depth */}
            {spreadIndex > 0 && spreadIndex < 7 && (
              <div className="absolute left-1/2 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-black/8 via-transparent to-black/8 -translate-x-1/2 z-10 pointer-events-none" />
            )}

            {/* SPREAD CONTENT VIEWS */}
            {!isFlipping ? (
              <>
                {renderPage(spreadIndex, "left")}
                {renderPage(spreadIndex, "right")}
              </>
            ) : (
              <>
                {flipDirection === "next" ? (
                  <>
                    {renderPage(spreadIndex, "left")}
                    {renderPage(targetSpreadIndex!, "right")}
                  </>
                ) : (
                  <>
                    {renderPage(targetSpreadIndex!, "left")}
                    {renderPage(spreadIndex, "right")}
                  </>
                )}
              </>
            )}

            {/* Page Flipping 3D overlay wrapper */}
            {isFlipping && targetSpreadIndex !== null && (
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: flipDirection === "next" ? -180 : 180 }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
                style={{
                  transformOrigin: flipDirection === "next" ? "left center" : "right center",
                  left: flipDirection === "next" ? "50%" : "0%",
                  width: "50%",
                  height: "100%",
                  transformStyle: "preserve-3d",
                  zIndex: 40,
                }}
                className="absolute top-0 bottom-0 pointer-events-none"
              >
                {/* FRONT FACE OF FLIPPING PAGE */}
                <div
                  style={{
                    backfaceVisibility: "hidden",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 2,
                  }}
                >
                  {flipDirection === "next"
                    ? renderPage(spreadIndex, "right")
                    : renderPage(spreadIndex, "left")}
                </div>

                {/* BACK FACE OF FLIPPING PAGE */}
                <div
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                  }}
                >
                  {flipDirection === "next"
                    ? renderPage(targetSpreadIndex, "left")
                    : renderPage(targetSpreadIndex, "right")}
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
