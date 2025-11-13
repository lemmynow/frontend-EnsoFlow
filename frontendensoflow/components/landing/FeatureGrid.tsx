"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Zap, Users, Rocket, Shield, Layers, GitBranch } from "lucide-react";
import { LiquidBeamBackground } from "./LiquidBeamBackground";
import { useRef } from "react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Deploy in seconds. From Git push to production faster than you can blink.",
    position: "left", // Position relative to beam
  },
  {
    icon: Layers,
    title: "Visual Canvas",
    description: "Build complex infrastructure with intuitive drag-and-drop simplicity.",
    position: "left",
  },
  {
    icon: Shield,
    title: "Ultra Secure",
    description: "Enterprise-grade security with automatic SSL and DDoS protection built-in.",
    position: "left",
  },
  {
    icon: Users,
    title: "Team First",
    description: "Real-time collaboration tools designed for modern development teams.",
    position: "right", // Right side near beam
  },
  {
    icon: Rocket,
    title: "Auto-Scale",
    description: "Handle any load effortlessly. From 10 to 10 million users automatically.",
    position: "right",
  },
  {
    icon: GitBranch,
    title: "Preview Branches",
    description: "Every branch gets a live environment. Test before you merge with confidence.",
    position: "right",
  },
];

export function FeatureGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const beamGlow = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.6, 0.6, 0.3]);

  const leftFeatures = features.filter(f => f.position === "left");
  const rightFeatures = features.filter(f => f.position === "right");

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-32 px-6 overflow-hidden bg-gradient-to-b from-[#0B0B0F] via-[#0A0A0E] to-[#0B0B0F]"
    >
      {/* Beam flows through center-right */}
      <LiquidBeamBackground variant="features" opacity={0.5} />

      {/* Radial glow from beam */}
      <motion.div
        className="absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-radial from-[#5141FF]/20 via-[#5141FF]/5 to-transparent blur-3xl pointer-events-none"
        style={{ opacity: beamGlow }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#5141FF] animate-pulse" />
            <span className="text-xs text-white/60 uppercase tracking-wider font-medium">
              Powerful Features
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
            Built for
            <br />
            <span className="bg-gradient-to-r from-[#FFFFFF] via-[#C0A8FF] to-[#5141FF] bg-clip-text text-transparent">
              modern teams
            </span>
          </h2>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
            Everything you need to ship faster, delivered through an interface that feels alive.
          </p>
        </motion.div>

        {/* Feature cards arranged around the beam */}
        <div className="relative">
          {/* Left column - further from beam */}
          <div className="absolute left-0 top-0 w-[40%] space-y-8">
            {leftFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.8,
                    ease: [0.19, 1, 0.22, 1] as const
                  }}
                >
                  <motion.div
                    className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/[0.08] hover:border-white/20 transition-all duration-500 cursor-default"
                    whileHover={{
                      scale: 1.02,
                      x: 10,
                      borderColor: "rgba(81, 65, 255, 0.2)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {/* Beam-side glow (right side) */}
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-l from-[#5141FF]/0 via-[#5141FF]/5 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Icon */}
                    <div className="relative mb-5">
                      <motion.div
                        className="inline-flex p-3.5 rounded-xl bg-gradient-to-br from-[#5141FF]/10 to-[#7B6BFF]/5 border border-[#5141FF]/20"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Icon className="w-5 h-5 text-[#5141FF]" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-[#C0A8FF] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Light ray towards beam */}
                    <div className="absolute top-1/2 -right-8 w-8 h-px bg-gradient-to-r from-[#5141FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Right column - closer to beam, more illuminated */}
          <div className="absolute right-0 top-0 w-[40%] space-y-8">
            {rightFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    delay: index * 0.15 + 0.1,
                    duration: 0.8,
                    ease: [0.19, 1, 0.22, 1] as const
                  }}
                >
                  <motion.div
                    className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-xl border border-white/[0.12] hover:border-[#5141FF]/40 transition-all duration-500 cursor-default shadow-[0_0_40px_rgba(81,65,255,0.1)]"
                    whileHover={{
                      scale: 1.03,
                      x: -10,
                      boxShadow: "0 0 60px rgba(81, 65, 255, 0.3)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {/* Stronger beam illumination from left */}
                    <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-[#5141FF]/10 via-[#5141FF]/20 to-transparent blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Icon with glow */}
                    <div className="relative mb-5">
                      <motion.div
                        className="inline-flex p-3.5 rounded-xl bg-gradient-to-br from-[#5141FF]/20 to-[#7B6BFF]/10 border border-[#5141FF]/30 shadow-lg shadow-[#5141FF]/20"
                        whileHover={{ scale: 1.15, rotate: -5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Icon className="w-5 h-5 text-[#7B6BFF]" />
                      </motion.div>
                      {/* Icon glow */}
                      <div className="absolute inset-0 bg-[#5141FF]/30 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#C0A8FF] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Light ray from beam */}
                    <div className="absolute top-1/2 -left-8 w-8 h-px bg-gradient-to-l from-[#5141FF]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-[#5141FF]/5 to-transparent opacity-0 group-hover:opacity-100"
                      animate={{
                        x: ["-100%", "200%"]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Spacer for proper height */}
          <div className="h-[1400px]" />
        </div>

        {/* Bottom decorative text */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <p className="text-white/30 text-sm font-light">
            And that's just the beginning — explore{" "}
            <span className="text-[#5141FF] font-medium">40+ features</span> designed for speed
          </p>
        </motion.div>
      </div>
    </section>
  );
}
