"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import the WebGL collision canvas
const CollisionCanvas = dynamic(
  () => import("./CollisionCanvas").then((mod) => mod.CollisionCanvas),
  { ssr: false }
);

interface BeamCollisionProps {
  useShader?: boolean;
}

export function BeamCollision({ useShader = true }: BeamCollisionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasCollided, setHasCollided] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Detect when beam reaches collision point
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.2 && !hasCollided) {
        setHasCollided(true);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, hasCollided]);

  // Transform values for collision animation
  const impactScale = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const splashOpacity = useTransform(scrollYProgress, [0.2, 0.35, 0.5], [0, 1, 0.3]);
  const rippleScale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 3]);
  const rippleOpacity = useTransform(scrollYProgress, [0.2, 0.35, 0.6], [0, 0.8, 0]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* WebGL Collision Shader (if enabled) */}
      {useShader && hasCollided && (
        <Suspense fallback={null}>
          <CollisionCanvas hasCollided={hasCollided} className="z-20" />
        </Suspense>
      )}

      {/* CSS Fallback - always render for browsers without WebGL or as backup */}
      {!useShader && (
        <>
          {/* Incoming beam (intensifies before collision) */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[140px] h-[50%]"
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.2, 0.25], [0.6, 1, 0.3]),
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#5141FF]/50 to-[#FFFFFF]/30 blur-[50px] animate-beamIntensify" />
            <div className="absolute left-1/2 -translate-x-1/2 w-[70px] h-full bg-gradient-to-b from-transparent via-[#7B7BFF]/70 to-[#FFFFFF]/50 blur-[25px]" />
          </motion.div>

          {/* Collision point - where beam hits */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ scale: impactScale, opacity: splashOpacity }}
          >
            {/* Impact flash */}
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px]"
              animate={hasCollided ? {
                scale: [1, 1.5, 1.2],
                opacity: [1, 0.5, 0.2],
              } : {}}
              transition={{
                duration: 1.5,
                ease: "easeOut",
              }}
            >
              <div className="absolute inset-0 bg-gradient-radial from-[#FFFFFF]/80 via-[#5141FF]/60 to-transparent blur-[40px]" />
            </motion.div>

            {/* Splash center - bright core */}
            <div className="absolute -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-gradient-radial from-[#FFFFFF]/90 via-[#7B7BFF]/70 to-[#5141FF]/30 blur-[30px] animate-splashPulse" />
          </motion.div>

          {/* Ripple waves expanding outward */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ scale: rippleScale, opacity: rippleOpacity }}
          >
            {/* Primary ripple */}
            <div className="absolute -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border-2 border-[#5141FF]/60 blur-[2px]" />

            {/* Secondary ripple (delayed) */}
            <motion.div
              className="absolute -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-[#C0A8FF]/40 blur-[3px]"
              animate={hasCollided ? {
                scale: [0.9, 1.2],
                opacity: [0.6, 0],
              } : {}}
              transition={{
                duration: 2,
                delay: 0.2,
                ease: "easeOut",
              }}
            />

            {/* Refraction distortion effect */}
            <div className="absolute -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-radial from-[#5141FF]/10 to-transparent blur-[80px] animate-rippleDistortion" />
          </motion.div>

          {/* Split currents - beam divides into two flowing streams */}
          {hasCollided && (
            <>
              {/* Left current */}
              <motion.div
                className="absolute left-1/2 top-1/2 origin-center"
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{
                  opacity: [0, 1, 0.6, 0.3],
                  scale: [0, 1.2, 1.5, 2],
                  rotate: -45,
                  x: [0, -100, -200, -350],
                  y: [0, 80, 150, 250],
                }}
                transition={{
                  duration: 3,
                  ease: [0.19, 1, 0.22, 1],
                }}
              >
                <div className="w-[100px] h-[300px] bg-gradient-to-b from-[#FFFFFF]/40 via-[#5141FF]/50 to-transparent blur-[40px]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[250px] bg-gradient-to-b from-[#FFFFFF]/60 via-[#7B7BFF]/60 to-transparent blur-[20px]" />
              </motion.div>

              {/* Right current */}
              <motion.div
                className="absolute left-1/2 top-1/2 origin-center"
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{
                  opacity: [0, 1, 0.6, 0.3],
                  scale: [0, 1.2, 1.5, 2],
                  rotate: 45,
                  x: [0, 100, 200, 350],
                  y: [0, 80, 150, 250],
                }}
                transition={{
                  duration: 3,
                  ease: [0.19, 1, 0.22, 1],
                }}
              >
                <div className="w-[100px] h-[300px] bg-gradient-to-b from-[#FFFFFF]/40 via-[#5141FF]/50 to-transparent blur-[40px]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[250px] bg-gradient-to-b from-[#FFFFFF]/60 via-[#7B7BFF]/60 to-transparent blur-[20px]" />
              </motion.div>

              {/* Particle dispersal - smaller droplets scatter outward */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30) * (Math.PI / 180);
                const distance = 150 + Math.random() * 100;
                const xOffset = Math.cos(angle) * distance;
                const yOffset = Math.sin(angle) * distance;

                return (
                  <motion.div
                    key={i}
                    className="absolute left-1/2 top-1/2 w-[12px] h-[12px] rounded-full bg-gradient-to-br from-[#FFFFFF]/80 to-[#5141FF]/60 blur-[2px]"
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{
                      opacity: [0, 1, 0.6, 0],
                      scale: [0, 1.2, 0.8, 0.3],
                      x: [0, xOffset * 0.5, xOffset, xOffset * 1.3],
                      y: [0, yOffset * 0.5, yOffset, yOffset * 1.5],
                    }}
                    transition={{
                      duration: 2.5 + Math.random() * 1,
                      delay: 0.3 + i * 0.05,
                      ease: "easeOut",
                    }}
                  />
                );
              })}
            </>
          )}
        </>
      )}

      <style jsx>{`
        @keyframes beamIntensify {
          0%, 100% {
            opacity: 1;
            transform: scaleY(1);
          }
          50% {
            opacity: 1.3;
            transform: scaleY(1.05);
          }
        }

        @keyframes splashPulse {
          0%, 100% {
            opacity: 0.9;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }

        @keyframes rippleDistortion {
          0%, 100% {
            opacity: 0.1;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.15;
            transform: translate(-50%, -50%) scale(1.05);
          }
        }

        .animate-beamIntensify {
          animation: beamIntensify 2s ease-in-out infinite;
        }

        .animate-splashPulse {
          animation: splashPulse 1.5s ease-in-out infinite;
        }

        .animate-rippleDistortion {
          animation: rippleDistortion 3s ease-in-out infinite;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-beamIntensify,
          .animate-splashPulse,
          .animate-rippleDistortion {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
