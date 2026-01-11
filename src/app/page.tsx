import { CTASection } from "@/components/LandingPage/CTASection";
import { Footer } from "@/components/LandingPage/Footer";
import { Navbar } from "@/components/LandingPage/Navbar";
import { HeroSection } from "@/components/LandingPage/HeroSection";
import { ServicesSection } from "@/components/LandingPage/ServiceSection";

export default function Home() {
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
