"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Layers } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LoginPage() {
  const githubOAuthUrl = process.env.NEXT_PUBLIC_GITHUB_OAUTH_URL || "/auth/github";
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // GSAP hover animation for button
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleLogin = () => {
    window.location.href = githubOAuthUrl;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mb-4"
          >
            <Layers className="h-16 w-16 text-primary" />
          </motion.div>
          <h1 className="text-4xl font-bold">EnsoFlow</h1>
          <p className="text-muted-foreground mt-2">Visual PaaS Platform</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>
              Sign in with your GitHub account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              ref={buttonRef}
              className="w-full gap-2 h-11"
              size="lg"
              onClick={handleLogin}
            >
              <Github className="h-5 w-5" />
              Login with GitHub
            </Button>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>By signing in, you agree to our Terms of Service</p>
            </div>
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center text-sm text-muted-foreground"
        >
          <p>No account? No problem! Sign in with GitHub to get started.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
