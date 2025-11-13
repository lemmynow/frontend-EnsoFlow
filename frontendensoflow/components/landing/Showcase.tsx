"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LiquidBeamBackground } from "./LiquidBeamBackground";
import { Zap, Shield, Layers } from "lucide-react";

export function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const centerY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const centerScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.95]);
  const centerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0B0B0F] via-[#0A0A0E] to-[#0B0B0F] py-32 px-6"
    >
      {/* Beam continues flowing through */}
      <LiquidBeamBackground variant="features" opacity={0.6} />

      {/* Radial glow from beam */}
      <div className="absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-[#5141FF]/15 via-[#5141FF]/5 to-transparent blur-3xl pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
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
              Experience the Flow
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
            Infrastructure
            <br />
            <span className="bg-gradient-to-r from-[#FFFFFF] via-[#C0A8FF] to-[#5141FF] bg-clip-text text-transparent">
              that adapts
            </span>
          </h2>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
            Watch your workflows transform in real-time, powered by the most fluid platform ever built.
          </p>
        </motion.div>

        {/* Central showcase - Product mockup with beam passing behind */}
        <motion.div
          className="relative mx-auto max-w-5xl"
          style={{ y: centerY, scale: centerScale, opacity: centerOpacity }}
        >
          {/* Main glass container */}
          <div className="relative aspect-[16/10] rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Beam reflection on left side of mockup */}
            <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-gradient-to-r from-[#5141FF]/5 via-transparent to-transparent pointer-events-none" />

            {/* Grid pattern inside */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Content inside mockup */}
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between">
              {/* Top bar - simulated UI */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-3">
                  <motion.div
                    className="h-8 w-24 rounded-lg bg-gradient-to-r from-[#5141FF]/20 to-[#7B6BFF]/20 border border-[#5141FF]/30"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#5141FF] to-[#7B6BFF] flex items-center justify-center shadow-lg shadow-[#5141FF]/30"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                  >
                    <Zap className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
              </div>

              {/* Center content - animated flow visualization */}
              <div className="flex-1 flex items-center justify-center py-8">
                <div className="relative w-full max-w-3xl">
                  {/* Flowing nodes */}
                  <div className="flex items-center justify-between gap-4">
                    {[
                      { icon: Shield, label: "Secure", delay: 0 },
                      { icon: Zap, label: "Fast", delay: 0.2 },
                      { icon: Layers, label: "Scale", delay: 0.4 }
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex-1"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 + item.delay, duration: 0.8 }}
                      >
                        <motion.div
                          className="relative aspect-square max-w-[140px] mx-auto rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/10 p-6 flex flex-col items-center justify-center gap-3"
                          whileHover={{ scale: 1.05, borderColor: "rgba(81, 65, 255, 0.3)" }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5141FF]/20 to-[#7B6BFF]/20 flex items-center justify-center border border-[#5141FF]/30">
                            <item.icon className="w-6 h-6 text-[#5141FF]" />
                          </div>
                          <span className="text-xs text-white/60 font-medium uppercase tracking-wider">
                            {item.label}
                          </span>

                          {/* Connection line */}
                          {i < 2 && (
                            <motion.div
                              className="absolute top-1/2 -right-2 w-4 h-px bg-gradient-to-r from-[#5141FF]/50 to-transparent"
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: 1.5 + item.delay, duration: 0.6 }}
                            />
                          )}

                          {/* Glow effect */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#5141FF]/10 via-transparent to-[#C0A8FF]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Flowing data particles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-[#5141FF]"
                      animate={{
                        x: [0, 400, 800],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 1,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom stats */}
              <div className="flex items-center justify-between gap-6">
                {[
                  { value: "99.9%", label: "Uptime" },
                  { value: "2.3s", label: "Deploy" },
                  { value: "340%", label: "Faster" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.8 + i * 0.1, duration: 0.8 }}
                  >
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              animate={{
                x: ["-100%", "200%"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Glow beneath mockup */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#5141FF]/20 via-[#7B6BFF]/10 to-[#C0A8FF]/20 blur-3xl -z-10 opacity-60" />

          {/* Reflection below */}
          <div className="absolute top-full left-0 right-0 h-32 bg-gradient-to-b from-white/[0.02] to-transparent -mt-2 rounded-b-3xl blur-xl" />
        </motion.div>

        {/* Floating feature badges */}
        <motion.div
          className="mt-20 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {[
            "Real-time Sync",
            "Zero Config",
            "Auto-Scale",
            "Edge Optimized"
          ].map((badge, i) => (
            <motion.div
              key={i}
              className="px-5 py-2.5 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] text-sm text-white/60 hover:text-white hover:border-[#5141FF]/30 transition-all duration-300 cursor-default"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + i * 0.1 }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(81, 65, 255, 0.05)" }}
            >
              {badge}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
