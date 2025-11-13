"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import the WebGL canvas to avoid SSR issues
const LiquidLightCanvas = dynamic(
  () => import("./LiquidLightCanvas").then((mod) => mod.LiquidLightCanvas),
  { ssr: false }
);

interface LiquidBeamBackgroundProps {
  variant?: "hero" | "features" | "pre-collision" | "post-collision";
  opacity?: number;
  useShader?: boolean; // Toggle between WebGL shader and CSS fallback
}

export function LiquidBeamBackground({
  variant = "hero",
  opacity = 1,
  useShader = true
}: LiquidBeamBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Vertical flow animation - simulates liquid falling
  const beamY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const beamOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [opacity, opacity * 0.8, opacity * 0.5, opacity * 0.2]
  );

  // If WebGL shader is enabled, use it
  if (useShader) {
    return (
      <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <Suspense fallback={<CSSFallback variant={variant} opacity={opacity} beamY={beamY} beamOpacity={beamOpacity} />}>
          <LiquidLightCanvas variant={variant} opacity={opacity} />
        </Suspense>
      </div>
    );
  }

  // CSS fallback for older devices or when shader is disabled
  return <CSSFallback variant={variant} opacity={opacity} beamY={beamY} beamOpacity={beamOpacity} />;
}

// CSS-based fallback component (original implementation)
function CSSFallback({
  variant,
  opacity,
  beamY,
  beamOpacity
}: {
  variant: "hero" | "features" | "pre-collision" | "post-collision";
  opacity: number;
  beamY: any;
  beamOpacity: any;
}) {

  // Render different beam configurations based on variant
  const renderBeam = () => {
    switch (variant) {
      case "hero":
        return (
          <>
            {/* Primary liquid beam - narrow vertical flow */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-[120px] h-[150vh] top-[-20vh]"
              style={{ y: beamY, opacity: beamOpacity }}
              initial={{ opacity: 0, scaleY: 0.8 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              {/* Core beam - bright center like plasma */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF]/10 via-[#5141FF] to-[#C0A8FF] opacity-70 blur-[40px] animate-liquidFlow" />

              {/* Inner glow - white hot center */}
              <div className="absolute left-1/2 -translate-x-1/2 w-[60px] h-full bg-gradient-to-b from-[#FFFFFF]/20 via-[#7B7BFF] to-transparent opacity-80 blur-[20px] animate-liquidPulse" />

              {/* Outer diffusion - soft violet halo */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#5141FF]/30 via-[#8B7BFF]/40 to-[#C0A8FF]/20 opacity-50 blur-[80px] animate-liquidFlowSecondary" />
            </motion.div>

            {/* Liquid particles - simulating droplets */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 -translate-x-1/2 w-[8px] h-[8px] rounded-full bg-gradient-to-b from-[#FFFFFF]/60 to-[#5141FF]/80 blur-[2px]"
                style={{
                  top: `${i * 20}%`,
                  left: `calc(50% + ${(i % 2 === 0 ? 1 : -1) * (i * 8)}px)`,
                }}
                animate={{
                  y: ["0vh", "150vh"],
                  opacity: [0, 1, 1, 0],
                  scale: [0.8, 1.2, 1, 0.6],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </>
        );

      case "features":
        return (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-[100px] h-full top-0"
            style={{ opacity: beamOpacity }}
          >
            {/* Subtle background beam - reduced opacity */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#5141FF]/15 via-[#8B7BFF]/10 to-transparent opacity-40 blur-[100px] animate-liquidFlowSlow" />
          </motion.div>
        );

      case "pre-collision":
        return (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-[130px] h-full top-0"
            style={{ opacity: beamOpacity }}
          >
            {/* Intensifying beam as it approaches collision */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#5141FF]/40 via-[#7B7BFF]/50 to-[#C0A8FF]/30 opacity-60 blur-[60px] animate-liquidFlowIntense" />
            <div className="absolute left-1/2 -translate-x-1/2 w-[80px] h-full bg-gradient-to-b from-[#FFFFFF]/15 via-[#5141FF]/40 to-transparent opacity-70 blur-[30px] animate-liquidPulseIntense" />
          </motion.div>
        );

      case "post-collision":
        return (
          <>
            {/* Diffused mist effect after collision */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              {/* Horizontal diffusion layers */}
              <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-[#C0A8FF]/20 via-[#8B7BFF]/10 to-transparent opacity-30 blur-[120px]" />
              <div className="absolute top-[20%] left-0 right-0 h-[60%] bg-gradient-to-b from-[#5141FF]/10 via-transparent to-transparent opacity-20 blur-[150px]" />

              {/* Ambient glow particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-[100px] h-[100px] rounded-full bg-gradient-to-br from-[#5141FF]/20 to-[#C0A8FF]/10 blur-[60px]"
                  style={{
                    left: `${20 + i * 10}%`,
                    top: `${30 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {renderBeam()}

      <style jsx>{`
        @keyframes liquidFlow {
          0%, 100% {
            transform: translateY(0) scaleY(1);
            opacity: 0.7;
          }
          50% {
            transform: translateY(5%) scaleY(1.02);
            opacity: 0.85;
          }
        }

        @keyframes liquidFlowSecondary {
          0%, 100% {
            transform: translateY(0) scaleY(1) scaleX(1);
            opacity: 0.5;
          }
          50% {
            transform: translateY(3%) scaleY(1.03) scaleX(1.05);
            opacity: 0.65;
          }
        }

        @keyframes liquidPulse {
          0%, 100% {
            opacity: 0.8;
            filter: blur(20px);
          }
          50% {
            opacity: 1;
            filter: blur(25px);
          }
        }

        @keyframes liquidFlowSlow {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(10%);
            opacity: 0.5;
          }
        }

        @keyframes liquidFlowIntense {
          0%, 100% {
            transform: translateY(0) scaleY(1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(8%) scaleY(1.05);
            opacity: 0.8;
          }
        }

        @keyframes liquidPulseIntense {
          0%, 100% {
            opacity: 0.7;
            filter: blur(30px);
          }
          50% {
            opacity: 0.95;
            filter: blur(35px);
          }
        }

        .animate-liquidFlow {
          animation: liquidFlow 12s ease-in-out infinite;
        }

        .animate-liquidFlowSecondary {
          animation: liquidFlowSecondary 16s ease-in-out infinite;
          animation-delay: 2s;
        }

        .animate-liquidPulse {
          animation: liquidPulse 4s ease-in-out infinite;
        }

        .animate-liquidFlowSlow {
          animation: liquidFlowSlow 20s ease-in-out infinite;
        }

        .animate-liquidFlowIntense {
          animation: liquidFlowIntense 8s ease-in-out infinite;
        }

        .animate-liquidPulseIntense {
          animation: liquidPulseIntense 3s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-liquidFlow,
          .animate-liquidFlowSecondary,
          .animate-liquidPulse,
          .animate-liquidFlowSlow,
          .animate-liquidFlowIntense,
          .animate-liquidPulseIntense {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
