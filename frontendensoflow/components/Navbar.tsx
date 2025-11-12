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
      className="sticky top-0 z-50 w-full border-b-2 border-border/50 glass shadow-lg shadow-primary/5"
    >
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="gradient-primary p-2.5 rounded-xl group-hover:scale-110 transition-transform shadow-md shadow-primary/30">
              <Layers className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:from-secondary group-hover:to-accent transition-all">
              EnsoFlow
            </span>
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
                      "gap-2 relative font-medium transition-all",
                      isActive && "bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 shadow-sm text-primary"
                    )}
                  >
                    <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-t-full"
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
            <div className="flex items-center gap-3 bg-gradient-to-r from-primary/10 to-secondary/10 px-4 py-2 rounded-full border border-primary/20 shadow-sm">
              <span className="hidden sm:inline text-sm font-medium text-primary">
                {user.username}
              </span>
              {user.avatarUrl && (
                <img
                  src={user.avatarUrl}
                  alt={user.username}
                  className="h-9 w-9 rounded-full border-2 border-primary/30 ring-2 ring-primary/10 shadow-md"
                />
              )}
            </div>
          ) : isGuestMode ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-info/20 to-accent/20 border border-info/30 text-info">
                <Eye className="h-4 w-4" />
                <span className="text-sm font-medium">Guest Mode</span>
              </div>
              <Button asChild variant="outline" size="lg" className="shadow-sm">
                <Link href="/login">Login</Link>
              </Button>
            </div>
          ) : (
            <Button asChild size="lg" className="shadow-md shadow-primary/30">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
