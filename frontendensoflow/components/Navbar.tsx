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
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Layers className="h-6 w-6" />
            <span className="text-xl font-bold">EnsoFlow</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname?.startsWith(item.href);

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "gap-2 relative",
                      isActive && "bg-secondary"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-sm text-muted-foreground">
                {user.username}
              </span>
              {user.avatarUrl && (
                <img
                  src={user.avatarUrl}
                  alt={user.username}
                  className="h-8 w-8 rounded-full border-2 border-border"
                />
              )}
            </div>
          ) : isGuestMode ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-3 py-1 rounded-md bg-secondary text-secondary-foreground text-sm">
                <Eye className="h-4 w-4" />
                <span>Guest Mode</span>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link href="/login">Login</Link>
              </Button>
            </div>
          ) : (
            <Button asChild size="sm">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
