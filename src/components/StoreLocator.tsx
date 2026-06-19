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
    id: "pike-place",
    name: "Pike Place Marketplace",
    distance: "0.2 miles",
    address: "1912 Pike Pl, Seattle, WA 98101",
    waitTime: "3 MINS",
    queueInfo: "Live preparation queue (4 orders ahead)",
    busyLevel: "Low",
    pinX: 110,
    pinY: 130,
  },
  {
    id: "pine-street",
    name: "Pine Street Center",
    distance: "0.8 miles",
    address: "700 Pine St, Seattle, WA 98101",
    waitTime: "9 MINS",
    queueInfo: "Medium prep queue (11 orders ahead)",
    busyLevel: "Medium",
    pinX: 220,
    pinY: 90,
  },
  {
    id: "downtown-link",
    name: "Seattle Downtown Link",
    distance: "1.2 miles",
    address: "1301 5th Ave, Seattle, WA 98101",
    waitTime: "14 MINS",
    queueInfo: "Heavy prep queue (18 orders ahead)",
    busyLevel: "High",
    pinX: 180,
    pinY: 220,
  },
];

export default function StoreLocator({ selectedStoreId, onSelectStore }: StoreLocatorProps) {
  return (
    <section id="locator" className="py-16 md:py-24 px-6 md:px-8 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#00704A] tracking-wider uppercase">
          <Navigation size={14} className="text-[#C68B59]" />
          <span>Location Services</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-[#1E3932]">
          Find Nearby Starbucks
        </h2>
        <p className="text-sm md:text-base text-[#1E3932]/70 max-w-xl">
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
                      ? "bg-white border-[#00704A] shadow-md shadow-[#00704A]/5"
                      : "bg-white border-[#1E3932]/5 hover:border-[#1E3932]/15"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-display font-extrabold text-lg text-[#1E3932]">
                        {store.name}
                      </h4>
                      <p className="text-xs text-[#1E3932]/60 mt-1 font-medium flex items-center gap-1">
                        <MapPin size={12} className="text-[#1E3932]/40" />
                        <span>{store.address}</span>
                      </p>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#F2F0EB] text-[#1E3932]/60 border border-[#1E3932]/5">
                      {store.distance}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-[#1E3932]/5">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-[#1E3932]/40" />
                      <div className="text-xs font-bold text-[#1E3932]/80">
                        Wait Time: <span className="text-[#00704A]">{store.waitTime}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectStore(store);
                      }}
                      className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-wider font-extrabold transition-custom hover-scale ${
                        isSelected
                          ? "bg-[#00704A] text-[#F2F0EB]"
                          : "bg-[#1E3932]/5 text-[#1E3932] hover:bg-[#1E3932]/10"
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
          <div className="w-full h-full rounded-[40px] relative overflow-hidden bg-[#F2F0EB] border border-[#1E3932]/5 shadow-sm flex items-center justify-center p-6 min-h-[380px]">
            {/* Ambient glows behind the map */}
            <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-[#FF2E93]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-[#00704A]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between pointer-events-none">
              <span className="text-[10px] uppercase font-bold text-[#1E3932]/60 tracking-wider">
                Live Local Coffee Map
              </span>
              <span className="text-[10px] text-[#1E3932]/40 italic">
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
                {/* Main highway */}
                <path d="M-10 150 Q 150 120 350 150" fill="none" stroke="#1E3932" strokeWidth="8" strokeLinecap="round" />
                {/* Downtown grid streets */}
                <line x1="60" y1="-10" x2="60" y2="310" stroke="#1E3932" strokeWidth="4.5" />
                <line x1="150" y1="-10" x2="150" y2="310" stroke="#1E3932" strokeWidth="4.5" />
                <line x1="240" y1="-10" x2="240" y2="310" stroke="#1E3932" strokeWidth="4.5" />
                
                <line x1="-10" y1="80" x2="350" y2="80" stroke="#1E3932" strokeWidth="4" />
                <line x1="-10" y1="210" x2="350" y2="210" stroke="#1E3932" strokeWidth="4" />
              </g>

              {/* Green Park Area */}
              <rect x="25" y="15" width="90" height="90" rx="12" fill="#00704A" fillOpacity="0.04" stroke="#00704A" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
              <text x="70" y="60" textAnchor="middle" fill="#00704A" fillOpacity="0.4" fontSize="8" fontWeight="bold" className="tracking-widest uppercase select-none">
                Pike Park
              </text>

              {/* Water Bay Area (Seattle Waterfront) */}
              <path d="M -20 -20 Q 30 110 -20 320" fill="#9C8EFA" fillOpacity="0.05" stroke="#9C8EFA" strokeWidth="1.5" strokeOpacity="0.2" />
              <text x="15" y="240" textAnchor="middle" transform="rotate(-75 15 240)" fill="#9C8EFA" fillOpacity="0.5" fontSize="8" fontWeight="bold" className="tracking-widest uppercase select-none">
                Elliott Bay
              </text>

              {/* User Position Beacon */}
              <g>
                <circle cx="80" cy="180" r="10" fill="#9C8EFA" fillOpacity="0.15" />
                <circle cx="80" cy="180" r="4.5" fill="#9C8EFA" stroke="#FFFFFF" strokeWidth="1.5" className="animate-pulse" />
                <text x="80" y="196" textAnchor="middle" fill="#1E3932" fillOpacity="0.6" fontSize="7" fontWeight="bold" className="tracking-wider uppercase select-none">
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
                        stroke="#00704A"
                        strokeWidth="1.5"
                        strokeDasharray="2 2"
                      />
                    )}

                    <circle
                      cx={store.pinX}
                      cy={store.pinY}
                      r={isSelected ? "9" : "6"}
                      fill={isSelected ? "#00704A" : "#C68B59"}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      className="transition-all duration-300 shadow-sm"
                    />

                    {/* Simple pin stem for selected store */}
                    {isSelected && (
                      <path d={`M ${store.pinX} ${store.pinY} L ${store.pinX} ${store.pinY + 12}`} stroke="#00704A" strokeWidth="1.5" />
                    )}

                    {/* Store Title */}
                    <text
                      x={store.pinX}
                      y={store.pinY - 12}
                      textAnchor="middle"
                      fill="#1E3932"
                      fillOpacity={isSelected ? 1 : 0.6}
                      fontSize={isSelected ? "9" : "7.5"}
                      fontWeight="bold"
                      className="pointer-events-none select-none tracking-tight bg-white px-1"
                    >
                      {store.name.split(" ")[0]}
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
