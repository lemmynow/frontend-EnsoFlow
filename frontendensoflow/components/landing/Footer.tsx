"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, Workflow } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "/marketplace" },
    { label: "Showcase", href: "#showcase" },
    { label: "Documentation", href: "/docs" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Community", href: "/community" },
    { label: "Help Center", href: "/help" },
    { label: "API Reference", href: "/api" },
    { label: "Status", href: "/status" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Security", href: "/security" },
    { label: "Cookies", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@ensoflow.dev", label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative pt-20 pb-10 px-4 border-t border-white/10 bg-[#050507]">
      {/* Background gradient with radial glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0C] to-[#050507]" />
        {/* Radial glow behind logo area */}
        <motion.div
          className="absolute top-20 left-1/4 w-96 h-96"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#5C5CF0] via-[#7B7BFF] to-transparent opacity-20 blur-3xl rounded-full" />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand column - spans 2 columns on md+ */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group relative">
              {/* Logo glow */}
              <motion.div
                className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#5C5CF0] to-[#A076FF] blur-2xl rounded-full" />
              </motion.div>
              <motion.div
                className="relative p-2 rounded-lg bg-gradient-to-br from-[#5C5CF0] to-[#A076FF] shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Workflow className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold text-white">EnsoFlow</span>
            </Link>
            <p className="text-[#B0B0C0] mb-6 max-w-xs">
              The visual deployment platform that makes infrastructure feel like magic.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg backdrop-blur-xl bg-white/5 border border-white/10 hover:border-[#5C5CF0]/50 hover:bg-white/10 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5 text-[#B0B0C0] group-hover:text-white transition-colors" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#B0B0C0] hover:text-[#5C5CF0] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#B0B0C0] hover:text-[#5C5CF0] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#B0B0C0] hover:text-[#5C5CF0] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#B0B0C0] hover:text-[#5C5CF0] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#B0B0C0]">
              © {new Date().getFullYear()} EnsoFlow. Made with{" "}
              <span className="text-[#FF9A5A]">✦</span> for developers who move fast.
            </p>
            <div className="flex items-center gap-6 text-sm text-[#B0B0C0]">
              <Link href="/sitemap" className="hover:text-[#5C5CF0] transition-colors">
                Sitemap
              </Link>
              <Link href="/rss" className="hover:text-[#5C5CF0] transition-colors">
                RSS
              </Link>
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 rounded-full bg-[#28C840]"
                  animate={{
                    opacity: [1, 0.5, 1],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
