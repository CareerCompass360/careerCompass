"use client"

import { CTASection } from "@/components/LandingPage/CTASection";
import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { HeroSection } from "@/components/LandingPage/HeroSection";
import { ServicesSection } from "@/components/LandingPage/ServiceSection";
import { useEffect } from "react";

export default function Home() {
  // Handle hash navigation when page loads
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <HeroSection />
        <ServicesSection />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
