"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { CollisionShader } from "./CollisionShader";

interface CollisionCanvasProps {
  hasCollided: boolean;
  className?: string;
}

export function CollisionCanvas({ hasCollided, className = "" }: CollisionCanvasProps) {
  const [collisionProgress, setCollisionProgress] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Animate collision progress
  useEffect(() => {
    if (!hasCollided) return;

    let startTime: number | null = null;
    const duration = 3000; // 3 seconds for full collision animation

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCollisionProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasCollided]);

  return (
    <div
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        mixBlendMode: 'screen',
      }}
    >
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 50,
        }}
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <CollisionShader
          collisionProgress={collisionProgress}
          hasCollided={hasCollided}
        />
      </Canvas>
    </div>
  );
}
