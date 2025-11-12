"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/hooks/useUser";
import { useGuestMode } from "@/lib/hooks/useGuestMode";

interface AuthGuardProps {
  children: React.ReactNode;
  allowGuest?: boolean; // Allow guest mode access
}

export function AuthGuard({ children, allowGuest = false }: AuthGuardProps) {
  const router = useRouter();
  const { data: user, isLoading, isError } = useUser();
  const { isGuestMode, isInitialized } = useGuestMode();

  useEffect(() => {
    // Wait for both user and guest mode to initialize
    if (!isLoading && isInitialized) {
      // If no user and guest mode not allowed (or not enabled), redirect to login
      if ((isError || !user) && (!allowGuest || !isGuestMode)) {
        router.push("/login");
      }
    }
  }, [user, isLoading, isError, isGuestMode, isInitialized, allowGuest, router]);

  // Show loading while initializing
  if (isLoading || !isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Allow access if user is logged in OR guest mode is enabled for this page
  if (!user && (!allowGuest || !isGuestMode)) {
    return null;
  }

  return <>{children}</>;
}
