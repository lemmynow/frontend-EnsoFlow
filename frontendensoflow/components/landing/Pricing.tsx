"use client";

import { motion } from "framer-motion";
import { Check, Zap, Sparkles, Crown } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    description: "Perfect for side projects and prototypes",
    price: "Free",
    period: "forever",
    icon: Zap,
    gradient: "from-[#5C5CF0] to-[#7B7BFF]",
    features: [
      "1 project",
      "500 MB RAM",
      "1 GB storage",
      "Community support",
      "Automatic SSL",
      "Git integration",
    ],
    cta: "Get Started",
    href: "/marketplace",
    popular: false,
  },
  {
    name: "Pro",
    description: "For growing teams and production apps",
    price: "$20",
    period: "per month",
    icon: Sparkles,
    gradient: "from-[#A076FF] to-[#FF9A5A]",
    features: [
      "Unlimited projects",
      "8 GB RAM",
      "50 GB storage",
      "Priority support",
      "Custom domains",
      "Preview environments",
      "Advanced analytics",
      "Team collaboration",
    ],
    cta: "Start Free Trial",
    href: "/marketplace",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Custom infrastructure at scale",
    price: "Custom",
    period: "contact us",
    icon: Crown,
    gradient: "from-[#FF4D97] to-[#FF9A5A]",
    features: [
      "Unlimited everything",
      "Dedicated resources",
      "SLA guarantee",
      "24/7 phone support",
      "SSO & SAML",
      "Audit logs",
      "Private networking",
      "Custom contracts",
    ],
    cta: "Contact Sales",
    href: "/contact",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden bg-[#0A0A0C]">
      {/* Background glow layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Center glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#5C5CF0] via-[#A076FF] to-transparent opacity-20 blur-[100px]" />
        </motion.div>

        {/* Side accents */}
        <div className="absolute top-20 left-0 w-[400px] h-[400px] bg-gradient-to-br from-[#5C5CF0] to-transparent opacity-10 blur-[120px]" />
        <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-gradient-to-br from-[#FF9A5A] to-transparent opacity-10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
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
              SIMPLE, TRANSPARENT PRICING
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Scale at your{" "}
            <span className="bg-gradient-to-r from-[#5C5CF0] via-[#A076FF] to-[#FF9A5A] bg-clip-text text-transparent">
              own pace
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[#B0B0C0] max-w-2xl mx-auto">
            Start for free, upgrade when you're ready. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`relative group ${plan.popular ? "md:-mt-4" : ""}`}
              >
                {/* Glowing beam behind popular plan */}
                {plan.popular && (
                  <motion.div
                    className="absolute inset-0 -z-10"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-30 blur-[60px]`} />
                  </motion.div>
                )}

                {/* Card */}
                <div
                  className={`relative h-full p-8 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
                    plan.popular
                      ? "bg-white/10 border-white/20 shadow-2xl"
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className={`px-4 py-1 rounded-full bg-gradient-to-r ${plan.gradient} text-white text-sm font-semibold shadow-lg`}>
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${plan.gradient} mb-6`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Plan name */}
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-[#B0B0C0] text-sm mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      {plan.price !== "Free" && plan.price !== "Custom" && (
                        <span className="text-[#B0B0C0]">/{plan.period}</span>
                      )}
                      {plan.price === "Free" && <span className="text-[#B0B0C0] ml-1">{plan.period}</span>}
                    </div>
                    {plan.price === "Custom" && (
                      <p className="text-sm text-[#B0B0C0] mt-1">{plan.period}</p>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Link href={plan.href}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 px-6 rounded-xl font-semibold mb-8 transition-all duration-300 ${
                        plan.popular
                          ? `bg-gradient-to-r ${plan.gradient} text-white shadow-lg hover:shadow-xl`
                          : "bg-white/10 text-white border border-white/20 hover:bg-white/15"
                      }`}
                    >
                      {plan.cta}
                    </motion.button>
                  </Link>

                  {/* Features */}
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <div className={`mt-0.5 p-0.5 rounded-full bg-gradient-to-br ${plan.gradient}`}>
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-[#B0B0C0] text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-[#B0B0C0] mb-6">
            Need something custom?{" "}
            <Link href="/contact" className="text-[#A076FF] hover:text-[#5C5CF0] font-semibold transition-colors">
              Let's talk →
            </Link>
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-[#B0B0C0]/60">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#5C5CF0]" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#5C5CF0]" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#5C5CF0]" />
              <span>14-day money-back guarantee</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
