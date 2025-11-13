"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { LiquidBeamBackground } from "./LiquidBeamBackground";

const testimonials = [
  {
    quote: "EnsoFlow transformed how we ship features. What used to take hours now takes minutes. The visual canvas is incredibly intuitive.",
    author: "Sarah Chen",
    role: "Engineering Lead",
    company: "TechCorp",
    avatar: "SC",
    rating: 5,
  },
  {
    quote: "The best developer experience I've had with any platform. Deploy previews for every PR saved us countless hours in testing.",
    author: "Marcus Johnson",
    role: "Full Stack Developer",
    company: "StartupXYZ",
    avatar: "MJ",
    rating: 5,
  },
  {
    quote: "We migrated our entire infrastructure in a weekend. The drag-and-drop interface made complex deployments feel simple.",
    author: "Elena Rodriguez",
    role: "CTO",
    company: "GrowthLabs",
    avatar: "ER",
    rating: 5,
  },
  {
    quote: "Finally, a platform that doesn't require a DevOps degree. Our team went from zero to production in less than an hour.",
    author: "David Park",
    role: "Product Manager",
    company: "InnovateCo",
    avatar: "DP",
    rating: 5,
  },
  {
    quote: "The automatic scaling saved us during our launch. We went from 100 to 10,000 users overnight without any manual intervention.",
    author: "Priya Patel",
    role: "Founder",
    company: "NextGen Apps",
    avatar: "PP",
    rating: 5,
  },
  {
    quote: "EnsoFlow's Git integration is seamless. Push to deploy, automatic rollbacks, and preview environments — everything just works.",
    author: "Alex Turner",
    role: "Senior Engineer",
    company: "CloudNative Inc",
    avatar: "AT",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 px-4 relative overflow-hidden bg-gradient-to-b from-[#0A0A0C] via-[#0D0D10] to-[#0A0A0C]">
      {/* Post-collision diffused mist glow */}
      <LiquidBeamBackground variant="post-collision" opacity={0.4} />

      {/* Background glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-[#5C5CF0]/20 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-[#A076FF]/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
              TRUSTED BY TEAMS
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Loved by{" "}
            <span className="bg-gradient-to-r from-[#5C5CF0] via-[#A076FF] to-[#FF9A5A] bg-clip-text text-transparent">
              developers worldwide
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[#B0B0C0] max-w-2xl mx-auto">
            Join thousands of developers who are building the future with EnsoFlow.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="relative p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 group"
            >
              {/* Blurred gradient circle behind card */}
              <motion.div
                className="absolute -inset-4 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#5C5CF0]/30 via-[#A076FF]/30 to-[#FF9A5A]/30 blur-2xl rounded-full" />
              </motion.div>

              {/* Quote icon with luminance */}
              <motion.div
                className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity"
                animate={{
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3,
                }}
              >
                <Quote className="w-8 h-8 text-[#A076FF]" />
              </motion.div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 + i * 0.05 }}
                  >
                    <Star className="w-4 h-4 fill-[#FF9A5A] text-[#FF9A5A]" />
                  </motion.div>
                ))}
              </div>

              {/* Quote with fade-in animation */}
              <motion.p
                className="text-[#B0B0C0] mb-6 leading-relaxed relative z-10 group-hover:text-[#D0D0D0] transition-colors duration-300"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
              >
                "{testimonial.quote}"
              </motion.p>

              {/* Author with glow effect */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  {/* Avatar gradient circle glow */}
                  <motion.div
                    className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#5C5CF0] to-[#A076FF] blur-xl rounded-full" />
                  </motion.div>
                  {/* Avatar */}
                  <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#5C5CF0] to-[#A076FF] flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                    {testimonial.avatar}
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm text-[#B0B0C0]">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>

              {/* Luminance glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 20%, rgba(92, 92, 240, 0.1), transparent 70%)",
                    "radial-gradient(circle at 80% 80%, rgba(160, 118, 255, 0.1), transparent 70%)",
                    "radial-gradient(circle at 20% 20%, rgba(92, 92, 240, 0.1), transparent 70%)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "10K+", label: "Active Users", gradient: "from-[#5C5CF0] to-[#7B7BFF]" },
            { value: "500K+", label: "Deployments", gradient: "from-[#A076FF] to-[#C8AFFF]" },
            { value: "99.99%", label: "Uptime", gradient: "from-[#FF9A5A] to-[#FF4D97]" },
            { value: "24/7", label: "Support", gradient: "from-[#7B7BFF] to-[#A076FF]" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className="text-center group"
            >
              <motion.div
                className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-[#B0B0C0] group-hover:text-[#D0D0D0] transition-colors">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
