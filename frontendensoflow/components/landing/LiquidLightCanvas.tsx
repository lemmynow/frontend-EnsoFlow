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
  const canvasRef = useRef<HTMLDivElement>(null);

  // Track scroll progress for shader animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / scrollHeight;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
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
        />
      </Canvas>
    </div>
  );
}
