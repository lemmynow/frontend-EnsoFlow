"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/hooks/useUser";
import { useGuestMode } from "@/lib/hooks/useGuestMode";

export default function Home() {
  const router = useRouter();
  const { data: user, isLoading } = useUser();
  const { isGuestMode, isInitialized } = useGuestMode();

  useEffect(() => {
    if (!isLoading && isInitialized) {
      if (user) {
        router.push("/dashboard");
      } else if (isGuestMode) {
        router.push("/marketplace");
      } else {
        router.push("/login");
      }
    }
  }, [user, isLoading, isGuestMode, isInitialized, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}
