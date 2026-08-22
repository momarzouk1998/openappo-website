import React from "react";
import CustomCursor from "@/components/ui/CustomCursor";
import CanvasParticles from "@/components/canvas/CanvasParticles";
import HeaderNav from "@/components/sections/HeaderNav";
import HeroSection from "@/components/sections/HeroSection";
import PartnersSection from "@/components/sections/PartnersSection";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import TerminalContactSection from "@/components/sections/TerminalContactSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#05070B] text-slate-100 overflow-x-hidden selection:bg-[#00F0FF] selection:text-[#05070B]">
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Dynamic Interactive Particles Background */}
      <CanvasParticles />

      {/* Navigation Header */}
      <HeaderNav />

      {/* Main Sections */}
      <HeroSection />
      <PartnersSection />
      <CapabilitiesSection />
      <TerminalContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
