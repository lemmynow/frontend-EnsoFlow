"use client";

import { motion } from "framer-motion";
import { Zap, Users, Rocket, Shield, Layers, GitBranch } from "lucide-react";
import { LiquidBeamBackground } from "./LiquidBeamBackground";

const features = [
  {
    icon: Zap,
    title: "Lightning-Fast Deployments",
    description: "From Git push to production in under 60 seconds. Watch your changes go live in real-time with zero configuration.",
    color: "from-[#FF9A5A] to-[#FF4D97]",
    glowColor: "rgba(255, 154, 90, 0.3)",
  },
  {
    icon: Layers,
    title: "Visual Canvas Builder",
    description: "Design complex infrastructure with an intuitive drag-and-drop canvas. Connect services like building blocks.",
    color: "from-[#5C5CF0] to-[#7B7BFF]",
    glowColor: "rgba(92, 92, 240, 0.3)",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Real-time collaboration built in. Share projects, review changes, and ship together as one unified team.",
    color: "from-[#A076FF] to-[#C8AFFF]",
    glowColor: "rgba(160, 118, 255, 0.3)",
  },
  {
    icon: Rocket,
    title: "Auto-Scaling Magic",
    description: "Handle 10 or 10 million users effortlessly. Our infrastructure scales automatically with zero manual intervention.",
    color: "from-[#7B7BFF] to-[#A076FF]",
    glowColor: "rgba(123, 123, 255, 0.3)",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "SOC 2 compliant with automatic SSL, DDoS protection, encrypted secrets, and private networking out of the box.",
    color: "from-[#5C5CF0] to-[#A076FF]",
    glowColor: "rgba(92, 92, 240, 0.3)",
  },
  {
    icon: GitBranch,
    title: "Preview Environments",
    description: "Every branch gets its own live environment. Test, review, and iterate with confidence before merging.",
    color: "from-[#A076FF] to-[#FF9A5A]",
    glowColor: "rgba(160, 118, 255, 0.3)",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export function FeatureGrid() {
  return (
    <section className="py-24 md:py-32 px-4 relative overflow-hidden bg-[#0A0A0C]">
      {/* Liquid beam flows subtly behind features */}
      <LiquidBeamBackground variant="features" opacity={0.3} />

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-to-br from-[#5C5CF0]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-[#FF9A5A]/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-[#A076FF]/15 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-[#5C5CF0] animate-pulse" />
            <span className="text-sm font-medium text-[#B0B0C0] tracking-wide">
              POWERFUL FEATURES
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-[#5C5CF0] via-[#A076FF] to-[#FF9A5A] bg-clip-text text-transparent">
              build faster
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[#B0B0C0] max-w-2xl mx-auto">
            A complete platform for modern development teams. From idea to production in minutes, not days.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -8 }}
                className="group relative p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 cursor-pointer"
                style={{
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
                }}
              >
                {/* Gradient glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${feature.glowColor}, transparent 40%)`,
                    filter: "blur(40px)",
                  }}
                />

                {/* Animated beam on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    background: [
                      `linear-gradient(135deg, transparent 0%, ${feature.glowColor} 50%, transparent 100%)`,
                      `linear-gradient(135deg, transparent 30%, ${feature.glowColor} 80%, transparent 100%)`,
                      `linear-gradient(135deg, transparent 0%, ${feature.glowColor} 50%, transparent 100%)`,
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Icon */}
                <div className="relative mb-6">
                  <motion.div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  {/* Icon glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500 rounded-xl`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-[#B0B0C0] leading-relaxed group-hover:text-[#D0D0D0] transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20 blur-2xl rounded-full`} />
                </div>

                {/* Border gradient on hover */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${feature.color} -z-20`} style={{ padding: "1px" }}>
                  <div className="absolute inset-[1px] rounded-2xl bg-[#0A0A0C]" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
