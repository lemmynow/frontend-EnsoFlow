"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function CTABanner() {
  return (
    <section className="py-24 md:py-32 px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-10 rounded-3xl blur-3xl" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-20 rounded-3xl blur-2xl"
          />
        </div>

        {/* Content container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative p-12 md:p-16 rounded-3xl glass border border-primary/20 text-center overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Start building today</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Ready to{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ship faster?
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Join thousands of developers building the future.
            Start deploying in seconds — no credit card required.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/marketplace"
              className="group relative px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 rounded-xl glass border border-border hover:border-primary/50 font-semibold transition-all duration-300 hover:scale-105"
            >
              Sign In
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Free tier available</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Cancel anytime</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
