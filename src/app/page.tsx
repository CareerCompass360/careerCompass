import { CTASection } from "@/components/LandingPage/CTASection";
import { FeaturesSection } from "@/components/LandingPage/FeatureSection";
import { Footer } from "@/components/LandingPage/Footer";
import { Navbar } from "@/components/LandingPage/Navbar";
import { HeroSection } from "@/components/LandingPage/HeroSection";
import { ServicesSection } from "@/components/LandingPage/ServiceSection";
import { StatsSection } from "@/components/LandingPage/StatsSection";
import { TestimonialsSection } from "@/components/LandingPage/Testimonials";

export default function Home() {
  return (
       <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
