"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { LiquidBeamBackground } from "./LiquidBeamBackground";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Staggered text animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.19, 1, 0.22, 1] as const, // easeOutExpo
      }
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative flex items-center min-h-screen overflow-hidden bg-gradient-to-br from-[#0B0B0F] via-[#0E0E14] to-[#0B0B0F] px-6 md:px-12 lg:px-20"
    >
      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none z-30">
        <div className="absolute inset-0 bg-noise animate-grain" />
      </div>

      {/* Liquid Light Beam - offset to right */}
      <LiquidBeamBackground variant="hero" opacity={1} />

      {/* Radial gradient emanating from beam */}
      <div className="absolute top-0 left-[60%] -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#5141FF]/20 via-[#5141FF]/5 to-transparent blur-3xl pointer-events-none z-10" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none z-10" />

      {/* Content - Left aligned */}
      <motion.div
        className="relative z-20 max-w-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Badge with glow */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] mb-10 group hover:border-[#5141FF]/30 transition-all duration-500">
            <Sparkles className="w-3.5 h-3.5 text-[#5141FF]" />
            <span className="text-sm font-medium text-white/60 tracking-wide uppercase">
              Platform of the Future
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#5141FF]/0 via-[#5141FF]/5 to-[#5141FF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          </div>
        </motion.div>

        {/* Headline with gradient */}
        <motion.h1
          className="font-black text-[clamp(2.75rem,7vw,7rem)] leading-[0.92] tracking-[-0.02em] mb-8 text-white"
          variants={itemVariants}
        >
          Where ideas
          <br />
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-[#FFFFFF] via-[#C0A8FF] to-[#5141FF] bg-clip-text text-transparent">
              flow like light
            </span>
            {/* Text glow */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#FFFFFF]/20 via-[#C0A8FF]/20 to-[#5141FF]/20 blur-2xl" />
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-[1.25rem] leading-relaxed text-white/50 mb-12 max-w-lg font-light"
          variants={itemVariants}
        >
          A visual platform where infrastructure becomes fluid.
          Build, deploy, and scale with cinematic precision.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap items-center gap-4"
          variants={itemVariants}
        >
          {/* Primary CTA with beam-like glow */}
          <Link href="/marketplace">
            <motion.button
              className="group relative px-8 py-4 rounded-full font-semibold text-[0.9375rem] text-white bg-gradient-to-r from-[#5141FF] via-[#7B6BFF] to-[#5141FF] bg-size-200 overflow-hidden shadow-[0_0_40px_rgba(81,65,255,0.3)]"
              whileHover={{ scale: 1.03, boxShadow: "0 0 60px rgba(81,65,255,0.5)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#5141FF] via-[#FFFFFF]/30 to-[#5141FF]"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundSize: "200% 100%" }}
              />

              {/* Button content */}
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </span>
            </motion.button>
          </Link>

          {/* Secondary CTA */}
          <Link href="#demo">
            <motion.button
              className="px-8 py-4 rounded-full font-semibold text-[0.9375rem] text-white/80 border border-white/10 backdrop-blur-xl hover:border-white/20 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Watch Demo
            </motion.button>
          </Link>
        </motion.div>

        {/* Trust indicators with subtle glow */}
        <motion.div
          className="mt-16 flex items-center gap-8 text-white/40 text-sm"
          variants={itemVariants}
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-[#5141FF]/80 via-[#7B6BFF]/60 to-[#C0A8FF]/80 border-2 border-[#0B0B0F] shadow-lg"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.8 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                />
              ))}
            </div>
            <span className="font-medium">10,000+ teams</span>
          </div>

          <div className="h-4 w-px bg-white/10" />

          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-[#5141FF]" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="font-medium">4.9/5</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating element on right side, near beam */}
      <motion.div
        className="absolute right-[15%] top-1/2 -translate-y-1/2 z-20 hidden lg:block"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 1.2, ease: "easeOut" }}
      >
        <motion.div
          className="relative w-[280px] h-[380px]"
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Glass card with beam reflection */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Beam reflection glow */}
            <div className="absolute -left-20 top-0 bottom-0 w-40 bg-gradient-to-r from-transparent via-[#5141FF]/10 to-transparent" />

            {/* Content inside card */}
            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#5141FF] to-[#7B6BFF] mb-6 flex items-center justify-center shadow-lg shadow-[#5141FF]/30">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Fluid Workflows
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Watch your infrastructure flow seamlessly from idea to production
                </p>
              </div>

              {/* Animated metrics */}
              <div className="space-y-3">
                {[
                  { label: "Deploy Time", value: "2.3s", color: "#5141FF" },
                  { label: "Uptime", value: "99.9%", color: "#7B6BFF" },
                  { label: "Efficiency", value: "+340%", color: "#C0A8FF" }
                ].map((metric, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center justify-between text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2 + i * 0.1 }}
                  >
                    <span className="text-white/40">{metric.label}</span>
                    <span className="font-bold text-white">{metric.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#5141FF]/20 via-transparent to-[#C0A8FF]/10 blur-2xl -z-10" />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 cursor-pointer group"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs text-white/30 uppercase tracking-widest mb-1">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2 group-hover:border-white/40 transition-colors">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white/60"
            />
          </div>
        </motion.div>
      </motion.div>

      <style jsx>{`
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

        .animate-grain {
          animation: grain 8s steps(10) infinite;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .bg-noise {
          width: 100%;
          height: 100%;
          background-size: 200px 200px;
        }

        .bg-size-200 {
          background-size: 200% 100%;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-grain {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
