"use client";

import { Hero } from "./Hero";
import { FeatureGrid } from "./FeatureGrid";
import { Showcase } from "./Showcase";
import { Testimonials } from "./Testimonials";
import { CTABanner } from "./CTABanner";
import { Footer } from "./Footer";

export function LandingPage() {
  return (
    <div className="relative">
      {/* Main content */}
      <main>
        <Hero />
        <FeatureGrid />
        <Showcase />
        <Testimonials />
        <CTABanner />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
