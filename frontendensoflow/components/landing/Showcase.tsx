"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Code2, Workflow, Gauge } from "lucide-react";

const showcaseItems = [
  {
    title: "Visual Canvas",
    description: "Design your infrastructure with an intuitive drag-and-drop interface. Connect services, databases, and APIs with ease.",
    icon: Workflow,
    gradient: "from-primary to-secondary",
    features: ["Drag & Drop", "Real-time Preview", "Auto-connect"],
  },
  {
    title: "Instant Deployments",
    description: "Push to deploy in seconds. Watch your changes go live with automatic builds and zero-downtime deployments.",
    icon: Gauge,
    gradient: "from-accent to-info",
    features: ["Git Integration", "Auto SSL", "Edge Network"],
  },
  {
    title: "Developer Experience",
    description: "Built for developers who value speed and simplicity. Powerful CLI, comprehensive API, and beautiful UI.",
    icon: Code2,
    gradient: "from-secondary to-accent",
    features: ["CLI Tools", "REST API", "TypeScript SDK"],
  },
];

export function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <section
      id="showcase"
      ref={containerRef}
      className="py-24 md:py-32 px-4 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <motion.div style={{ opacity, scale }} className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Built for{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              modern teams
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you expect from a modern platform, with none of the complexity.
          </p>
        </motion.div>

        {/* Showcase items */}
        <div className="space-y-32">
          {showcaseItems.map((item, index) => {
            const Icon = item.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  isEven ? "" : "lg:grid-flow-dense"
                }`}
              >
                {/* Content */}
                <div className={isEven ? "" : "lg:col-start-2"}>
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.gradient} mb-6`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">{item.title}</h3>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    {item.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-lg glass border border-border text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                  >
                    Learn more
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Visual mockup */}
                <motion.div
                  whileHover={{ scale: 1.02, rotateY: 2 }}
                  transition={{ duration: 0.3 }}
                  className={`relative ${isEven ? "" : "lg:col-start-1 lg:row-start-1"}`}
                >
                  <div className="relative aspect-[4/3] rounded-2xl glass border border-border overflow-hidden shadow-2xl">
                    {/* Mock UI */}
                    <div className="absolute inset-0 p-6">
                      {/* Header */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 rounded-full bg-destructive" />
                        <div className="w-3 h-3 rounded-full bg-warning" />
                        <div className="w-3 h-3 rounded-full bg-success" />
                      </div>
                      {/* Content */}
                      <div className="space-y-3">
                        <div className="h-8 bg-gradient-to-r from-primary/20 to-transparent rounded" />
                        <div className="h-6 bg-gradient-to-r from-secondary/20 to-transparent rounded w-3/4" />
                        <div className="grid grid-cols-3 gap-3 mt-6">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="aspect-square rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-border"
                            />
                          ))}
                        </div>
                        <div className="h-4 bg-gradient-to-r from-accent/20 to-transparent rounded w-1/2 mt-6" />
                        <div className="h-4 bg-gradient-to-r from-info/20 to-transparent rounded w-2/3" />
                      </div>
                    </div>
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-5`} />
                  </div>
                  {/* Decorative blur */}
                  <div className={`absolute -inset-4 bg-gradient-to-br ${item.gradient} opacity-20 blur-3xl -z-10`} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
