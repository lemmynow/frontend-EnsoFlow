"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/lib/hooks/useUser";
import { useGuestMode } from "@/lib/hooks/useGuestMode";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Home, Layers, ShoppingBag, User, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { data: user } = useUser();
  const { isGuestMode, disableGuestMode } = useGuestMode();

  // Only show Dashboard if user is logged in
  const navItems = user
    ? [
        { href: "/dashboard", label: "Dashboard", icon: Home },
        { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
      ]
    : [{ href: "/marketplace", label: "Marketplace", icon: ShoppingBag }];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b-2 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
    >
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg group-hover:scale-110 transition-transform">
              <Layers className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold group-hover:text-primary transition-colors">EnsoFlow</span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname?.startsWith(item.href);

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="lg"
                    className={cn(
                      "gap-2 relative font-medium",
                      isActive && "bg-secondary shadow-sm"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3 bg-secondary/50 px-4 py-2 rounded-full">
              <span className="hidden sm:inline text-sm font-medium">
                {user.username}
              </span>
              {user.avatarUrl && (
                <img
                  src={user.avatarUrl}
                  alt={user.username}
                  className="h-9 w-9 rounded-full border-2 border-primary/20 ring-2 ring-background"
                />
              )}
            </div>
          ) : isGuestMode ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/70 text-secondary-foreground">
                <Eye className="h-4 w-4" />
                <span className="text-sm font-medium">Guest Mode</span>
              </div>
              <Button asChild variant="outline" size="lg">
                <Link href="/login">Login</Link>
              </Button>
            </div>
          ) : (
            <Button asChild size="lg">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
