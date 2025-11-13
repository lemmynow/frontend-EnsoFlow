"use client";

import { Hero } from "./Hero";
import { FeatureGrid } from "./FeatureGrid";
import { Demo } from "./Demo";
import { Testimonials } from "./Testimonials";
import { Pricing } from "./Pricing";
import { CTABanner } from "./CTABanner";
import { Footer } from "./Footer";

export function LandingPage() {
  return (
    <div className="relative bg-[#0A0A0C] overflow-hidden">
      {/* Main content */}
      <main className="relative">
        {/* Hero - Cinematic entrance with beam effects */}
        <Hero />

        {/* Features - Showcase core capabilities */}
        <FeatureGrid />

        {/* Demo - Floating browser with visual workflow */}
        <Demo />

        {/* Testimonials - Social proof with glow effects */}
        <Testimonials />

        {/* Pricing - Glassmorphism cards with beams */}
        <Pricing />

        {/* Final CTA - Last conversion opportunity */}
        <CTABanner />
      </main>

      {/* Footer - Dark with radial glow */}
      <Footer />
    </div>
  );
}
