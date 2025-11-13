"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const beamY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX - innerWidth / 2) / innerWidth);
      mouseY.set((clientY - innerHeight / 2) / innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const beamRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [2, -2]);
  const beamRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-2, 2]);

  // Staggered text animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.19, 1, 0.22, 1] as const, // Custom easing: easeOutExpo
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative flex items-center justify-start min-h-screen overflow-hidden bg-[#0B0B0D] px-8 md:px-16 lg:px-24"
    >
      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none z-30">
        <div className="absolute inset-0 bg-noise animate-grain" />
      </div>

      {/* Beam layers - multiple for depth */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center perspective-1000"
        style={{
          y: beamY,
          opacity: beamOpacity,
          rotateX: beamRotateX,
          rotateY: beamRotateY,
        }}
      >
        {/* Primary beam */}
        <motion.div
          className="absolute w-[clamp(250px,35vw,500px)] h-[120%] top-[-10%]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#5C5CF0] via-[#7B7BFF] to-[#C8AFFF] opacity-50 blur-[100px] animate-beamPulse" />
        </motion.div>

        {/* Secondary beam (wider, softer) */}
        <motion.div
          className="absolute w-[clamp(350px,45vw,650px)] h-[110%] top-[-5%]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, delay: 0.2, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#3F00FF] via-[#5C5CF0] to-transparent opacity-30 blur-[120px] animate-beamPulseSecondary" />
        </motion.div>

        {/* Accent glow (center) */}
        <motion.div
          className="absolute w-[clamp(150px,20vw,300px)] h-[80%] top-[10%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#8888FF] to-transparent opacity-60 blur-[60px] animate-beamPulseTertiary" />
        </motion.div>
      </motion.div>

      {/* Radial texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.05)_0%,transparent_60%)] pointer-events-none z-10" />

      {/* Glass reflection at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[rgba(255,255,255,0.06)] via-[rgba(255,255,255,0.02)] to-transparent pointer-events-none z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-20 max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: contentY }}
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#5C5CF0] animate-pulse" />
            <span className="text-sm font-medium text-[#B0B0C0] tracking-wide">
              NEXT-GEN PLATFORM
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-black text-[clamp(2.5rem,6vw,6rem)] leading-[0.95] tracking-tight mb-6 text-white"
          variants={itemVariants}
        >
          Deploy in Seconds
          <br />
          <span className="bg-gradient-to-r from-[#5C5CF0] via-[#A076FF] to-[#FF9A5A] bg-clip-text text-transparent">
            Scale to Millions
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-[1.125rem] leading-relaxed text-[#B0B0C0] mb-10 max-w-xl"
          variants={itemVariants}
        >
          The visual deployment platform that makes infrastructure feel like magic.
          From localhost to production in 60 seconds—no DevOps degree required.
        </motion.p>

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <Link href="/marketplace">
            <motion.button
              className="group relative px-8 py-4 rounded-full font-semibold text-[0.9375rem] text-white bg-gradient-to-r from-[#FF9A5A] to-[#FF4D97] overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {/* Button glow */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "radial-gradient(circle at center, rgba(255,77,151,0.8), transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Button content */}
              <span className="relative z-10 flex items-center gap-2">
                SEE IN ACTION
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </span>

              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["0%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
              />
            </motion.button>
          </Link>
        </motion.div>

        {/* Trust indicator */}
        <motion.div
          className="mt-12 flex items-center gap-3 text-[#B0B0C0]/60 text-sm"
          variants={itemVariants}
        >
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5C5CF0] to-[#C8AFFF] border-2 border-[#0B0B0D]"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + i * 0.1, duration: 0.5 }}
              />
            ))}
          </div>
          <span>Trusted by 1,000+ teams worldwide</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-white/40"
          />
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes beamPulse {
          0%, 100% {
            opacity: 0.5;
            transform: scaleY(1) scaleX(1);
          }
          50% {
            opacity: 0.7;
            transform: scaleY(1.05) scaleX(1.02);
          }
        }

        @keyframes beamPulseSecondary {
          0%, 100% {
            opacity: 0.3;
            transform: scaleY(1) scaleX(1);
          }
          50% {
            opacity: 0.5;
            transform: scaleY(1.03) scaleX(1.01);
          }
        }

        @keyframes beamPulseTertiary {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }

        .animate-beamPulse {
          animation: beamPulse 8s ease-in-out infinite;
        }

        .animate-beamPulseSecondary {
          animation: beamPulseSecondary 10s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-beamPulseTertiary {
          animation: beamPulseTertiary 6s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        .animate-grain {
          animation: grain 8s steps(10) infinite;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .bg-noise {
          width: 100%;
          height: 100%;
          background-size: 200px 200px;
        }

        .perspective-1000 {
          perspective: 1000px;
          transform-style: preserve-3d;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-beamPulse,
          .animate-beamPulseSecondary,
          .animate-beamPulseTertiary,
          .animate-grain {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
