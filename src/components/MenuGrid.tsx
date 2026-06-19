"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Check, ShoppingBag, Sliders, ArrowRight } from "lucide-react";
import { MenuItem } from "@/data/menu";
import MenuBook from "./MenuBook";
import ParallaxCard from "./ParallaxCard";
import MenuItem3D from "./MenuItem3D";

interface MenuGridProps {
  onCustomizeDrink: (preset: Required<MenuItem>["preset"]) => void;
  onAddToCart: (itemName: string, price: number) => void;
}

export default function MenuGrid({ onCustomizeDrink, onAddToCart }: MenuGridProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  const handleAddToCart = (item: MenuItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onAddToCart(item.name, item.price);
    setAddedItemName(item.name);
    setTimeout(() => {
      setAddedItemName(null);
    }, 3000);
  };

  const handleCustomizeInLab = (item: MenuItem) => {
    if (item.preset) {
      onCustomizeDrink(item.preset);
      setSelectedItem(null);
    }
  };

  return (
    <div className="w-full">
      {/* Interactive Flipping Book Menu */}
      <MenuBook onSelectItem={setSelectedItem} />

      {/* Full-Screen Detailed Overlay with Parallax Card */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[var(--cold-brew)]/70 backdrop-blur-md"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              className={`w-full max-w-4xl rounded-[40px] overflow-hidden shadow-2xl bg-gradient-to-br ${selectedItem.bgColor} border border-white/20 max-h-[90vh] overflow-y-auto scrollbar-thin relative`}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-background/40 hover:bg-background/60 border border-white/30 flex items-center justify-center text-[var(--cold-brew)] hover:scale-105 transition-all z-10 cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-12 items-center">
                
                {/* Left Side: 3D Mouse Parallax Card */}
                <div className="flex flex-col items-center justify-center py-6">
                  <ParallaxCard className="w-72 h-72 md:w-80 md:h-80 rounded-[32px] shadow-2xl border-4 border-white/60 bg-background p-3 flex items-center justify-center relative overflow-hidden group">
                    
                    {/* Shadow layer */}
                    <div 
                      className="absolute inset-0 bg-[var(--cold-brew)]/5 blur-md transform translate-z-[-20px] pointer-events-none" 
                    />

                    {/* Interactive 3D Model Rendering */}
                    <div
                      style={{
                        transform: "translateZ(50px)",
                        transformStyle: "preserve-3d",
                      }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <MenuItem3D
                        category={selectedItem.category}
                        name={selectedItem.name}
                      />
                    </div>

                    {/* Floating Glow backdrop */}
                    <div 
                      className="absolute top-[-30%] left-[-30%] w-[160%] h-[160%] bg-radial-gradient from-white/20 to-transparent transform translate-z-[-10px] pointer-events-none" 
                    />
                  </ParallaxCard>
                </div>

                {/* Right Side: Details, Nutrition, and Sarcastic Joke */}
                <div className="space-y-6 md:space-y-8 text-left">
                  <div className="space-y-3">
                    <span className="px-3 py-1 rounded-full bg-background/50 border border-white/30 text-[9px] font-black uppercase tracking-widest text-primary inline-block">
                      {selectedItem.category}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-display font-black text-[var(--cold-brew)] leading-none tracking-tight">
                      {selectedItem.name}
                    </h2>
                    <p className="text-xs md:text-sm text-[var(--cold-brew)]/80 leading-relaxed font-semibold">
                      {selectedItem.description}
                    </p>
                  </div>

                  {/* Sarcastic Commentary Callout Box */}
                  <div className="bg-[var(--cold-brew)]/5 border-l-4 border-primary p-4 rounded-r-2xl italic text-xs md:text-sm text-[var(--cold-brew)]/90 font-bold shadow-inner">
                    &ldquo;{selectedItem.joke}&rdquo;
                  </div>

                  {/* Nutrition Grid */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-[var(--cold-brew)]/60">Nutrition Summary</h4>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="bg-background/40 backdrop-blur-sm rounded-xl p-2.5 border border-white/20 text-center">
                        <div className="text-[8px] text-[var(--cold-brew)]/60 font-bold uppercase">Calories</div>
                        <div className="text-xs font-black text-[var(--cold-brew)]">{selectedItem.calories}</div>
                      </div>
                      <div className="bg-background/40 backdrop-blur-sm rounded-xl p-2.5 border border-white/20 text-center">
                        <div className="text-[8px] text-[var(--cold-brew)]/60 font-bold uppercase">Caffeine</div>
                        <div className="text-xs font-black text-[var(--cold-brew)]">{selectedItem.caffeine}</div>
                      </div>
                      <div className="bg-background/40 backdrop-blur-sm rounded-xl p-2.5 border border-white/20 text-center">
                        <div className="text-[8px] text-[var(--cold-brew)]/60 font-bold uppercase">Sugar</div>
                        <div className="text-xs font-black text-[var(--cold-brew)]">{selectedItem.sugar}</div>
                      </div>
                      <div className="bg-background/40 backdrop-blur-sm rounded-xl p-2.5 border border-white/20 text-center">
                        <div className="text-[8px] text-[var(--cold-brew)]/60 font-bold uppercase">Fat</div>
                        <div className="text-xs font-black text-[var(--cold-brew)]">{selectedItem.fat}</div>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[var(--cold-brew)]/15">
                    {/* Add to Order Button */}
                    <button
                      onClick={() => handleAddToCart(selectedItem)}
                      className="flex-1 py-4 px-6 rounded-2xl bg-primary text-oat-milk font-bold text-xs uppercase tracking-wider transition-all hover:bg-primary/95 hover:scale-102 flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      {addedItemName === selectedItem.name ? (
                        <>
                          <Check size={16} />
                          <span>Added successfully!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={16} />
                          <span>Add to Order • ${selectedItem.price.toFixed(2)}</span>
                        </>
                      )}
                    </button>

                    {/* Customize in Lab Button */}
                    {selectedItem.preset && (
                      <button
                        onClick={() => handleCustomizeInLab(selectedItem)}
                        className="py-4 px-6 rounded-2xl bg-background/80 hover:bg-background text-primary font-bold text-xs uppercase tracking-wider transition-all hover:scale-102 border border-white/30 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                      >
                        <Sliders size={16} />
                        <span>Customize</span>
                        <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
