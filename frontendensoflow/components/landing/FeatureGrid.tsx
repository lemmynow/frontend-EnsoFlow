"use client";

import { motion } from "framer-motion";
import { Zap, Users, Rocket, Shield, Layers, GitBranch } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Deploy Instantly",
    description: "From code to live in seconds. Connect your Git repo and deploy automatically on every push.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Layers,
    title: "Visual Workflow Builder",
    description: "Design complex infrastructure with an intuitive drag-and-drop canvas. No YAML required.",
    color: "from-primary to-secondary",
  },
  {
    icon: Users,
    title: "Collaborate Effortlessly",
    description: "Real-time collaboration built in. Share projects, review changes, and ship together.",
    color: "from-accent to-info",
  },
  {
    icon: Rocket,
    title: "Scale Seamlessly",
    description: "Grow from prototype to production without changing a thing. Auto-scaling included.",
    color: "from-secondary to-accent",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant infrastructure with automatic SSL, DDoS protection, and encrypted secrets.",
    color: "from-success to-accent",
  },
  {
    icon: GitBranch,
    title: "Git-Native Workflow",
    description: "Every branch gets a preview environment. Merge with confidence using automatic deployments.",
    color: "from-info to-primary",
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
  },
};

export function FeatureGrid() {
  return (
    <section className="py-24 md:py-32 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ship faster
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A complete platform for modern development teams. Build, deploy, and scale with confidence.
          </p>
        </motion.div>

        {/* Feature grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group relative p-8 rounded-2xl glass border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
              >
                {/* Gradient glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 from-primary via-secondary to-accent" />

                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative element */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
