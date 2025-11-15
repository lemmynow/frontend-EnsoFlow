"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { LiquidBeamBackground } from "./LiquidBeamBackground";

export function CTABanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Beam fade out effect
  const beamOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 0.3, 0]);
  const horizonGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.8, 1]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0A0A0E] via-[#0B0B0F] to-[#0E0E14] py-32 px-6"
    >
      {/* Beam fading out and filling bottom like liquid */}
      <LiquidBeamBackground variant="liquid-fill" opacity={0.8} />

      {/* Radial glow emanating from beam */}
      <motion.div
        className="absolute top-1/2 left-[63%] -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-[#5141FF]/15 via-[#5141FF]/5 to-transparent blur-3xl pointer-events-none"
        style={{ opacity: horizonGlow }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] mb-10 group hover:border-[#5141FF]/30 transition-all duration-500">
            <Sparkles className="w-3.5 h-3.5 text-[#5141FF]" />
            <span className="text-xs text-white/60 uppercase tracking-wider font-medium">
              Start Your Journey
            </span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#5141FF]/0 via-[#5141FF]/5 to-[#5141FF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-5xl md:text-6xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-[0.95]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2, duration: 1, ease: [0.19, 1, 0.22, 1] as const }}
        >
          Build the
          <br />
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-[#FFFFFF] via-[#C0A8FF] to-[#5141FF] bg-clip-text text-transparent">
              future, today
            </span>
            {/* Text glow */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#FFFFFF]/20 via-[#C0A8FF]/20 to-[#5141FF]/20 blur-3xl" />
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-xl md:text-2xl text-white/50 mb-16 max-w-2xl mx-auto font-light leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Join thousands of developers who chose speed, simplicity,
          and a platform that feels alive.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          {/* Primary CTA */}
          <Link href="/marketplace">
            <motion.button
              className="group relative px-10 py-5 rounded-full font-bold text-base text-white bg-gradient-to-r from-[#5141FF] via-[#7B6BFF] to-[#5141FF] bg-size-200 overflow-hidden shadow-[0_0_60px_rgba(81,65,255,0.4)]"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 80px rgba(81,65,255,0.6)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {/* Animated gradient background */}
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
              <span className="relative z-10 flex items-center gap-3">
                Start Building Free
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </span>

              {/* Particle effects */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-white"
                  style={{
                    top: "50%",
                    left: "20%"
                  }}
                  animate={{
                    x: [0, 100, 200],
                    y: [0, -10, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.button>
          </Link>

          {/* Secondary CTA */}
          <Link href="#demo">
            <motion.button
              className="px-10 py-5 rounded-full font-bold text-base text-white/80 border-2 border-white/10 backdrop-blur-xl hover:border-white/30 hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Features
            </motion.button>
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 text-white/40 text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          {[
            { icon: "✓", text: "No credit card required" },
            { icon: "✓", text: "Free tier forever" },
            { icon: "✓", text: "Cancel anytime" }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 + i * 0.1 }}
            >
              <span className="text-[#5141FF] text-lg font-bold">{item.icon}</span>
              <span className="font-medium">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating stats */}
        <motion.div
          className="mt-20 flex flex-wrap items-center justify-center gap-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          {[
            { value: "10K+", label: "Active Teams" },
            { value: "1M+", label: "Deployments" },
            { value: "99.9%", label: "Uptime" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4 + i * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-black text-white mb-2 bg-gradient-to-r from-white via-[#C0A8FF] to-[#5141FF] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs text-white/40 uppercase tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes liquidFlowSlow {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          50% {
            transform: translateY(10%);
            opacity: 0.6;
          }
        }

        .animate-liquidFlowSlow {
          animation: liquidFlowSlow 20s ease-in-out infinite;
        }

        .bg-size-200 {
          background-size: 200% 100%;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-liquidFlowSlow {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
