"use client";

import React from "react";
import { MapPin, Navigation, Clock, Sparkles } from "lucide-react";

export interface StarbucksStore {
  id: string;
  name: string;
  distance: string;
  address: string;
  waitTime: string;
  queueInfo: string;
  busyLevel: "Low" | "Medium" | "High";
  pinX: number;
  pinY: number;
}

interface StoreLocatorProps {
  selectedStoreId: string;
  onSelectStore: (store: StarbucksStore) => void;
}

export const STORES: StarbucksStore[] = [
  {
    id: "kala-ghoda",
    name: "Starbucks Kala Ghoda",
    distance: "0.3 km",
    address: "Elphinstone Building, Horniman Circle, Fort, Mumbai 400001",
    waitTime: "4 MINS",
    queueInfo: "Live preparation queue (3 orders ahead)",
    busyLevel: "Low",
    pinX: 200,
    pinY: 100,
  },
  {
    id: "churchgate",
    name: "Starbucks Churchgate",
    distance: "1.1 km",
    address: "Stadium House, Veer Nariman Rd, Churchgate, Mumbai 400020",
    waitTime: "8 MINS",
    queueInfo: "Medium prep queue (9 orders ahead)",
    busyLevel: "Medium",
    pinX: 80,
    pinY: 140,
  },
  {
    id: "cuffe-parade",
    name: "Starbucks Cuffe Parade",
    distance: "2.4 km",
    address: "President Arcade, Cuffe Parade, Mumbai 400005",
    waitTime: "15 MINS",
    queueInfo: "Heavy prep queue (20 orders ahead)",
    busyLevel: "High",
    pinX: 130,
    pinY: 250,
  },
];

export default function StoreLocator({ selectedStoreId, onSelectStore }: StoreLocatorProps) {
  return (
    <section id="store-locator" className="py-16 md:py-24 px-6 md:px-8 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-primary tracking-wider uppercase">
          <Navigation size={14} className="text-[#C68B59]" />
          <span>Location Services</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[var(--cold-brew)]">
          Find Nearby Starbucks
        </h2>
        <p className="text-sm md:text-base text-[var(--cold-brew)]/70 max-w-xl">
          View nearby locations, check live wait times, and select a store to optimize your one-tap reorder speed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Stores List (Col-span 5) */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            {STORES.map((store) => {
              const isSelected = store.id === selectedStoreId;
              
              return (
                <div
                  key={store.id}
                  onClick={() => onSelectStore(store)}
                  className={`p-6 rounded-[28px] text-left transition-custom hover-scale cursor-pointer flex flex-col justify-between gap-4 border ${
                    isSelected
                      ? "bg-background border-primary shadow-md shadow-primary/5"
                      : "bg-background border-[var(--cold-brew)]/5 hover:border-[var(--cold-brew)]/15"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-display font-extrabold text-lg text-[var(--cold-brew)]">
                        {store.name}
                      </h4>
                      <p className="text-xs text-[var(--cold-brew)]/60 mt-1 font-medium flex items-center gap-1">
                        <MapPin size={12} className="text-[var(--cold-brew)]/40" />
                        <span>{store.address}</span>
                      </p>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-oat-milk text-[var(--cold-brew)]/60 border border-[var(--cold-brew)]/5">
                      {store.distance}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-[var(--cold-brew)]/5">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-[var(--cold-brew)]/40" />
                      <div className="text-xs font-bold text-[var(--cold-brew)]/80">
                        Wait Time: <span className="text-primary">{store.waitTime}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectStore(store);
                      }}
                      className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-wider font-extrabold transition-custom hover-scale ${
                        isSelected
                          ? "bg-primary text-oat-milk"
                          : "bg-[var(--cold-brew)]/5 text-[var(--cold-brew)] hover:bg-[var(--cold-brew)]/10"
                      }`}
                    >
                      {isSelected ? "Selected Store" : "Set as My Store"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Styled Map Visualizer (Col-span 7) */}
        <div className="lg:col-span-7 h-full min-h-[380px] lg:min-h-[460px]">
          <div className="w-full h-full rounded-[40px] relative overflow-hidden bg-oat-milk border border-[var(--cold-brew)]/5 shadow-sm flex items-center justify-center p-6 min-h-[380px]">
            {/* Ambient glows behind the map */}
            <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-[#FF2E93]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between pointer-events-none">
              <span className="text-[10px] uppercase font-bold text-[var(--cold-brew)]/60 tracking-wider">
                Live Local Coffee Map (South Mumbai)
              </span>
              <span className="text-[10px] text-[var(--cold-brew)]/40 italic">
                Interactive Map - Click pins to select store
              </span>
            </div>

            {/* SVG Styled Mock Map */}
            <svg viewBox="0 0 340 300" className="relative z-20 w-[95%] h-[95%] overflow-visible">
              {/* Grid backdrop */}
              <defs>
                <pattern id="map-grid" width="20" width-units="userSpaceOnUse" height="20" height-units="userSpaceOnUse" patternTransform="rotate(15)">
                  <line x1="0" y1="0" x2="20" y2="0" stroke="rgba(30,57,50,0.02)" strokeWidth="1" />
                  <line x1="0" y1="0" x2="0" y2="20" stroke="rgba(30,57,50,0.02)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#map-grid)" />

              {/* Road Map Lines */}
              <g opacity="0.15">
                {/* Main roads */}
                <path d="M-10 150 Q 150 120 350 150" fill="none" stroke="var(--cold-brew)" strokeWidth="8" strokeLinecap="round" />
                <line x1="60" y1="-10" x2="60" y2="310" stroke="var(--cold-brew)" strokeWidth="4.5" />
                <line x1="150" y1="-10" x2="150" y2="310" stroke="var(--cold-brew)" strokeWidth="4.5" />
                <line x1="240" y1="-10" x2="240" y2="310" stroke="var(--cold-brew)" strokeWidth="4.5" />
                
                <line x1="-10" y1="80" x2="350" y2="80" stroke="var(--cold-brew)" strokeWidth="4" />
                <line x1="-10" y1="210" x2="350" y2="210" stroke="var(--cold-brew)" strokeWidth="4" />
              </g>

              {/* Green Park Area */}
              <rect x="180" y="35" width="80" height="45" rx="8" fill="var(--primary)" fillOpacity="0.04" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
              <text x="220" y="60" textAnchor="middle" fill="var(--primary)" fillOpacity="0.4" fontSize="8" fontWeight="bold" className="tracking-widest uppercase select-none">
                Horniman Circle
              </text>

              {/* Oval Maidan Green Area */}
              <rect x="25" y="65" width="40" height="90" rx="8" fill="var(--primary)" fillOpacity="0.04" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
              <text x="45" y="115" textAnchor="middle" transform="rotate(-90 45 115)" fill="var(--primary)" fillOpacity="0.4" fontSize="7.5" fontWeight="bold" className="tracking-widest uppercase select-none">
                Oval Maidan
              </text>

              {/* Arabian Sea */}
              <path d="M -20 -20 Q 30 110 -20 320" fill="#9C8EFA" fillOpacity="0.05" stroke="#9C8EFA" strokeWidth="1.5" strokeOpacity="0.2" />
              <text x="15" y="240" textAnchor="middle" transform="rotate(-75 15 240)" fill="#9C8EFA" fillOpacity="0.5" fontSize="8" fontWeight="bold" className="tracking-widest uppercase select-none">
                Arabian Sea
              </text>

              {/* User Position Beacon */}
              <g>
                <circle cx="120" cy="110" r="10" fill="#9C8EFA" fillOpacity="0.15" />
                <circle cx="120" cy="110" r="4.5" fill="#9C8EFA" stroke="#FFFFFF" strokeWidth="1.5" className="animate-pulse" />
                <text x="120" y="126" textAnchor="middle" fill="var(--cold-brew)" fillOpacity="0.6" fontSize="7" fontWeight="bold" className="tracking-wider uppercase select-none">
                  Your Location
                </text>
              </g>

              {/* Store Pins */}
              {STORES.map((store) => {
                const isSelected = store.id === selectedStoreId;
                
                return (
                  <g
                    key={store.id}
                    className="cursor-pointer"
                    onClick={() => onSelectStore(store)}
                  >
                    {/* Glowing outer ring for active store pin */}
                    {isSelected && (
                      <circle
                        cx={store.pinX}
                        cy={store.pinY}
                        r="14"
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="1.5"
                        strokeDasharray="2 2"
                      />
                    )}

                    <circle
                      cx={store.pinX}
                      cy={store.pinY}
                      r={isSelected ? "9" : "6"}
                      fill={isSelected ? "var(--primary)" : "#C68B59"}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      className="transition-all duration-300 shadow-sm"
                    />

                    {/* Simple pin stem for selected store */}
                    {isSelected && (
                      <path d={`M ${store.pinX} ${store.pinY} L ${store.pinX} ${store.pinY + 12}`} stroke="var(--primary)" strokeWidth="1.5" />
                    )}

                    {/* Store Title */}
                    <text
                      x={store.pinX}
                      y={store.pinY - 12}
                      textAnchor="middle"
                      fill="var(--cold-brew)"
                      fillOpacity={isSelected ? 1 : 0.6}
                      fontSize={isSelected ? "9" : "7.5"}
                      fontWeight="bold"
                      className="pointer-events-none select-none tracking-tight bg-background px-1"
                    >
                      {store.name.replace("Starbucks ", "")}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
