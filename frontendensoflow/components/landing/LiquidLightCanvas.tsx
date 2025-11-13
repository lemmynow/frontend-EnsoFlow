"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { LiquidLightShader } from "./LiquidLightShader";

interface LiquidLightCanvasProps {
  variant?: "hero" | "features" | "pre-collision" | "post-collision";
  opacity?: number;
  className?: string;
}

export function LiquidLightCanvas({
  variant = "hero",
  opacity = 1,
  className = ""
}: LiquidLightCanvasProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());

  // Track scroll progress and velocity for shader animations
  useEffect(() => {
    let rafId: number | null = null;
    let pendingUpdate = false;

    const updateScrollState = () => {
      const now = Date.now();
      const currentScrollY = window.scrollY;
      const deltaTime = now - lastScrollTime.current;
      const deltaScroll = currentScrollY - lastScrollY.current;

      // Calculate scroll velocity (pixels per millisecond)
      const velocity = deltaTime > 0 ? Math.abs(deltaScroll / deltaTime) : 0;

      // Smooth the velocity with exponential decay
      setScrollVelocity(prev => prev * 0.85 + velocity * 0.15);

      // Update scroll progress
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? currentScrollY / scrollHeight : 0;
      setScrollProgress(progress);

      lastScrollY.current = currentScrollY;
      lastScrollTime.current = now;
      pendingUpdate = false;
    };

    const handleScroll = () => {
      // Only schedule one update per frame
      if (!pendingUpdate) {
        pendingUpdate = true;
        rafId = requestAnimationFrame(updateScrollState);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollState(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      className={`fixed inset-0 z-0 pointer-events-none ${className}`}
      style={{
        mixBlendMode: 'screen', // Additive blending with page content
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 50,
        }}
        dpr={[1, 2]} // Pixel ratio for retina displays
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        {/* Ambient light for subtle environment */}
        <ambientLight intensity={0.2} />

        {/* Liquid light shader */}
        <LiquidLightShader
          variant={variant}
          opacity={opacity}
          scrollProgress={scrollProgress}
          scrollVelocity={scrollVelocity}
        />
      </Canvas>
    </div>
  );
}
