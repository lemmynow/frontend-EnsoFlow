"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Layers, Eye } from "lucide-react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useGuestMode } from "@/lib/hooks/useGuestMode";
import gsap from "gsap";

export default function LoginPage() {
  const router = useRouter();
  const { enableGuestMode } = useGuestMode();
  const githubOAuthUrl = process.env.NEXT_PUBLIC_GITHUB_OAUTH_URL || "/auth/github";
  const buttonRef = useRef<HTMLButtonElement>(null);
  const guestButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // GSAP hover animation for buttons
    const button = buttonRef.current;
    const guestButton = guestButtonRef.current;

    const setupButtonAnimation = (btn: HTMLElement) => {
      const handleMouseEnter = () => {
        gsap.to(btn, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(btn, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      btn.addEventListener("mouseenter", handleMouseEnter);
      btn.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        btn.removeEventListener("mouseenter", handleMouseEnter);
        btn.removeEventListener("mouseleave", handleMouseLeave);
      };
    };

    const cleanup: (() => void)[] = [];
    if (button) cleanup.push(setupButtonAnimation(button));
    if (guestButton) cleanup.push(setupButtonAnimation(guestButton));

    return () => {
      cleanup.forEach((fn) => fn());
    };
  }, []);

  const handleLogin = () => {
    window.location.href = githubOAuthUrl;
  };

  const handleGuestMode = () => {
    enableGuestMode();
    router.push("/marketplace");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="mb-6"
          >
            <div className="bg-primary text-primary-foreground p-4 rounded-2xl">
              <Layers className="h-16 w-16" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold mb-2">EnsoFlow</h1>
          <p className="text-muted-foreground text-lg">Visual PaaS Platform</p>
        </div>

        <Card className="border-2 shadow-xl">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription className="text-base">
              Sign in with your GitHub account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button
                ref={buttonRef}
                className="w-full gap-2 h-12 text-base font-semibold"
                size="lg"
                onClick={handleLogin}
              >
                <Github className="h-5 w-5" />
                Login with GitHub
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t-2" />
                </div>
                <div className="relative flex justify-center text-sm uppercase">
                  <span className="bg-card px-3 text-muted-foreground font-medium">
                    Or
                  </span>
                </div>
              </div>

              <Button
                ref={guestButtonRef}
                variant="outline"
                className="w-full gap-2 h-12 text-base font-semibold border-2"
                size="lg"
                onClick={handleGuestMode}
              >
                <Eye className="h-5 w-5" />
                Explore as Guest
              </Button>
            </div>

            <div className="mt-8 text-center text-sm text-muted-foreground">
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
          <p>No account? No problem! Sign in with GitHub or explore as a guest.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
