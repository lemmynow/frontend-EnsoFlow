"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

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
    <section className="py-24 md:py-32 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Loved by{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              developers
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of developers who are shipping faster with EnsoFlow.
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
              whileHover={{ y: -4, scale: 1.02 }}
              className="relative p-6 rounded-2xl glass border border-border hover:border-primary/30 transition-all duration-300 group"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-30 transition-opacity">
                <Quote className="w-8 h-8 text-primary" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-muted-foreground mb-6 leading-relaxed relative z-10">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>

              {/* Gradient glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
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
            { value: "1,000+", label: "Active Users" },
            { value: "50K+", label: "Deployments" },
            { value: "99.9%", label: "Uptime" },
            { value: "24/7", label: "Support" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
