"use client";

import React from "react";
import { ShoppingBag, User } from "lucide-react";

interface NavLinkProps {
  label: string;
  href: string;
  active?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ label, href, active }) => {
  return (
    <a
      href={href}
      className={`relative py-1 font-display text-sm font-bold tracking-wider transition-custom uppercase ${
        active
          ? "text-[#2B4D3D] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#2B4D3D]"
          : "text-[#2C2421]/70 hover:text-[#2B4D3D]"
      }`}
    >
      {label}
    </a>
  );
};

interface NavigationProps {
  cartCount?: number;
}

export default function Navigation({ cartCount = 0 }: NavigationProps) {
  return (
    <>
      {/* Desktop Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 hidden md:block bg-[#F4F0EB]/95 backdrop-blur-md border-b border-[#2C2421]/5 px-8 py-3">
        <nav className="max-w-7xl mx-auto flex items-center justify-between h-14">
          {/* Logo - Starbucks official brand logo and green text */}
          <a href="#" className="flex items-center gap-2.5 hover-scale transition-custom">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo.svg"
              alt="Starbucks Logo"
              className="w-9 h-9"
            />
            <span className="text-xl font-display font-black tracking-widest text-[#2B4D3D]">
              STARBUCKS
            </span>
          </a>

          {/* Navigation Links (Matches screenshot) */}
          <div className="flex items-center gap-8">
            <NavLink label="Signature Menu" href="#menu-section" active />
            <NavLink label="Custom Lab" href="#builder" />
            <NavLink label="Find Store" href="#store-locator" />
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm font-bold text-[#2C2421] hover:text-[#2B4D3D] transition-custom">
              Sign In
            </a>
            
            <button className="px-5 py-2 rounded-full bg-[#2B4D3D] text-[#F4F0EB] font-bold text-xs uppercase tracking-wider transition-custom hover-scale shadow-sm">
              Join Now
            </button>

            <button className="w-9 h-9 rounded-full bg-[#2C2421]/5 hover:bg-[#2C2421]/10 flex items-center justify-center text-[#2C2421] transition-custom hover-scale relative">
              <User size={16} />
            </button>

            <div className="w-px h-6 bg-[#2C2421]/10"></div>

            <button className="flex items-center gap-2 text-[#2C2421] hover:text-[#2B4D3D] transition-custom hover-scale relative">
              <ShoppingBag size={18} />
              <span className="absolute -top-1.5 -right-2 bg-[#2B4D3D] text-[#F4F0EB] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Floating Bottom Nav Pill */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-sm">
        <nav className="h-16 px-4 rounded-full glass-panel flex items-center justify-around shadow-lg border border-[#2C2421]/10 bg-[#FAF8F5]/85">
          <a href="#menu-section" className="flex flex-col items-center text-[#2B4D3D] hover:text-[#2B4D3D]">
            <span className="text-xs font-bold font-display uppercase tracking-wider">Menu</span>
          </a>
          <a href="#builder" className="flex flex-col items-center text-[#2C2421]/70 hover:text-[#2B4D3D]">
            <span className="text-xs font-bold font-display uppercase tracking-wider">Lab</span>
          </a>
          <a href="#store-locator" className="flex flex-col items-center text-[#2C2421]/70 hover:text-[#2B4D3D]">
            <span className="text-xs font-bold font-display uppercase tracking-wider">Store</span>
          </a>
          
          <div className="w-px h-8 bg-[#2C2421]/10 self-center"></div>
          
          <button className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#2B4D3D] text-[#F4F0EB] transition-custom hover-scale">
            <ShoppingBag size={18} />
            <span className="absolute -top-1 -right-1 bg-[#E0115F] text-[#F4F0EB] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </button>
        </nav>
      </div>
    </>
  );
}
