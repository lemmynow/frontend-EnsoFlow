"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Play, Maximize2, Terminal, Workflow } from "lucide-react";

export function Demo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-40 px-4 overflow-hidden bg-gradient-to-b from-[#0A0A0C] via-[#0D0D10] to-[#0A0A0C]"
    >
      {/* Violet glow pool */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        {/* Main pool glow */}
        <motion.div
          className="absolute w-[800px] h-[600px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#5C5CF0] via-[#7B7BFF] to-[#A076FF] opacity-30 blur-[120px]" />
        </motion.div>

        {/* Secondary glow (wider, softer) */}
        <motion.div
          className="absolute w-[1000px] h-[700px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#3F00FF] via-[#5C5CF0] to-transparent opacity-20 blur-[150px]" />
        </motion.div>

        {/* Water reflection effect at bottom */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[300px]"
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#5C5CF0]/20 via-[#7B7BFF]/10 to-transparent blur-[80px]" />
        </motion.div>
      </div>

      <motion.div
        style={{ opacity, y, scale }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            See it in{" "}
            <span className="bg-gradient-to-r from-[#5C5CF0] via-[#A076FF] to-[#FF9A5A] bg-clip-text text-transparent">
              action
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[#B0B0C0] max-w-2xl mx-auto">
            Watch how EnsoFlow turns complex deployments into a visual workflow.
            No terminal commands, just drag, drop, and deploy.
          </p>
        </motion.div>

        {/* Floating browser mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative max-w-6xl mx-auto perspective-1000"
        >
          {/* Browser window */}
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-[#0D0D10]/80 border border-white/10 shadow-2xl"
          >
            {/* Browser chrome */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0A0A0C]/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 mx-8">
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-3 h-3 text-[#5C5CF0]">🔒</div>
                  <span className="text-xs text-[#B0B0C0]">app.ensoflow.dev/project/deploy</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Maximize2 className="w-4 h-4 text-[#B0B0C0]/50" />
              </div>
            </div>

            {/* Browser content */}
            <div className="aspect-[16/10] relative overflow-hidden">
              {/* Sidebar */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-[#0A0A0C]/80 border-r border-white/10 flex flex-col items-center py-6 gap-6">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="p-2.5 rounded-lg bg-gradient-to-br from-[#5C5CF0] to-[#7B7BFF]"
                >
                  <Workflow className="w-5 h-5 text-white" />
                </motion.div>
                <div className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <Terminal className="w-5 h-5 text-[#B0B0C0]" />
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <svg className="w-5 h-5 text-[#B0B0C0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
              </div>

              {/* Main canvas area */}
              <div className="ml-16 p-8 h-full">
                {/* Animated node connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ left: 64 }}>
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#5C5CF0" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#A076FF" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                  {/* Connection lines */}
                  <motion.path
                    d="M 120 150 Q 250 150 300 200"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                  <motion.path
                    d="M 300 220 Q 400 220 450 280"
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                </svg>

                {/* Node cards */}
                <div className="relative space-y-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-br from-[#5C5CF0]/20 to-[#7B7BFF]/20 border border-[#5C5CF0]/30 backdrop-blur-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#5C5CF0] to-[#7B7BFF] flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Next.js App</div>
                      <div className="text-xs text-[#B0B0C0]">Port 3000</div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#28C840] animate-pulse ml-2" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-br from-[#A076FF]/20 to-[#FF9A5A]/20 border border-[#A076FF]/30 backdrop-blur-sm ml-32"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#A076FF] to-[#FF9A5A] flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                        <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                        <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">PostgreSQL</div>
                      <div className="text-xs text-[#B0B0C0]">Port 5432</div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#28C840] animate-pulse ml-2" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                    className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-br from-[#FF9A5A]/20 to-[#FF4D97]/20 border border-[#FF9A5A]/30 backdrop-blur-sm ml-64"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF9A5A] to-[#FF4D97] flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Production</div>
                      <div className="text-xs text-[#B0B0C0]">Live</div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#28C840] animate-pulse ml-2" />
                  </motion.div>
                </div>

                {/* Deployment log terminal */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute bottom-4 right-4 left-20 rounded-lg bg-[#0A0A0C]/90 border border-white/10 backdrop-blur-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Terminal className="w-4 h-4 text-[#5C5CF0]" />
                    <span className="text-xs font-semibold text-white">Deployment Log</span>
                  </div>
                  <div className="space-y-1 text-xs font-mono">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      className="text-[#28C840]"
                    >
                      ✓ Building application...
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.6 }}
                      className="text-[#28C840]"
                    >
                      ✓ Deploying to production...
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8 }}
                      className="text-[#5C5CF0] flex items-center gap-2"
                    >
                      <span>🚀 Live at</span>
                      <span className="text-[#A076FF]">https://my-app.ensoflow.app</span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Decorative glow around browser */}
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-4 bg-gradient-to-br from-[#5C5CF0]/20 via-[#A076FF]/20 to-[#FF9A5A]/20 blur-3xl -z-10"
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#5C5CF0] to-[#A076FF] text-white font-semibold shadow-lg shadow-[#5C5CF0]/30 hover:shadow-[#5C5CF0]/50 transition-all"
          >
            <Play className="w-5 h-5" />
            <span>Watch Full Demo</span>
          </motion.button>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  );
}
