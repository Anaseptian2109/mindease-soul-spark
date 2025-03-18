
import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/landing/LoadingScreen";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { DigitalSystemsSection } from "@/components/landing/DigitalSystemsSection";
import { AdvancedTechnologiesSection } from "@/components/landing/AdvancedTechnologiesSection";
import { NeuralInterfaceSection } from "@/components/landing/NeuralInterfaceSection";
import { HealthTrackingSection } from "@/components/landing/HealthTrackingSection";
import { SecuritySection } from "@/components/landing/SecuritySection";
import { CTASection } from "@/components/landing/CTASection";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <HeroSection />
      <FeaturesSection />
      <DigitalSystemsSection />
      <AdvancedTechnologiesSection />
      <NeuralInterfaceSection />
      <HealthTrackingSection />
      <SecuritySection />
      <CTASection />
    </div>
  );
};

export default Index;
