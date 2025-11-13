"use client";

import { Hero } from "./Hero";
import { Showcase } from "./Showcase";
import { FeatureGrid } from "./FeatureGrid";
import { CTABanner } from "./CTABanner";
import { Footer } from "./Footer";

export function LandingPage() {
  return (
    <div className="relative bg-gradient-to-b from-[#0B0B0F] via-[#0A0A0E] to-[#0E0E14] overflow-hidden">
      {/* All sections flow continuously with the beam as the spine */}
      <main className="relative">
        {/* Hero - Cinematic entrance with beam flowing */}
        <Hero />

        {/* Showcase - Product mockup with beam passing behind */}
        <Showcase />

        {/* Features - Cards arranged around the beam */}
        <FeatureGrid />

        {/* Final CTA - Beam fades out into light horizon */}
        <CTABanner />
      </main>

      {/* Footer - Minimal with gradient fade */}
      <Footer />
    </div>
  );
}
